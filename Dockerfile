# build stage
FROM node:16.3.0-alpine as build-stage

ARG APP_API_BACK_END_URL
ARG APP_PORT
ARG APP_GHOST_URL
ARG APP_GHOST_API_KEY
ENV APP_BASE_URL=http://localhost:${APP_PORT}

# Create app directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY .env.template .
COPY deploy/nginx/nginx.conf.template nginx/
RUN apk add --update --no-cache gettext && \
    /bin/sh -c "envsubst '\$APP_API_BACK_END_URL \$APP_BASE_URL \$APP_GHOST_URL \$APP_GHOST_API_KEY' < .env.template > .env" && \
    /bin/sh -c "envsubst '\$APP_PORT' < nginx/nginx.conf.template > nginx/nginx.conf" && \
    apk del gettext

#RUN cat .env && cat nginx/nginx.conf

# global install & update
RUN npm i -g npm

#RUN rm yarn.lock
COPY package*.json /app/
RUN yarn

COPY . .
RUN yarn build

RUN ls -alh

# final stage
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf

# Configure nginx
## copy our custom nginx config into conf.d folder
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d

# Add application
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE ${APP_PORT}

# Nginx to serve 'static' dist directory 
CMD ["nginx","-g","daemon off;"]
