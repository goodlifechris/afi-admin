<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      app
      dark
      height="100%"
      color="blue"
      permanent
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dark
      color="#1976d2"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title>Welcome AFI Admin portal</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-account-group',
          title: 'Delegates',
          to: '/delegates'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Programme',
          to: '/programme'
        },
        {
          icon: 'mdi-account-details',
          title: 'Exhibitors',
          to: '/exhibitors'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Sponsors',
          to: '/sponsors'
        },
        {
          icon: 'mdi-view-gallery',
          title: 'Gallery',
          to: '/gallery'
        },
        {
          icon: 'mdi-account-voice',
          title: 'Speakers',
          to: '/speakers'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Hotel rates',
          to: '/hotelrates'
        },

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
