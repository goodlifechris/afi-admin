export const state = () => ({
      events: [],
  events_local:[],
      date:""
})

export const mutations = {
  SET_EVENTS(state, layout) {
    state.events = layout;
  },
  SET_EVENTS_LOCAL(state, layout) {
    state.events_local = layout;
  },
  SET_DATE(state, data) {
    state.date = data;
  }

}

export const actions = {
  async getEvents({ commit }, payload) {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://afi-backend-wcomf.ondigitalocean.app/api/session/", requestOptions)
      .then(response => response.json())
      .then(result => {
        commit("SET_EVENTS", result.data);
        this.$toast.success('Events fetched successfully')

      })
      .catch(error => console.log('error', error));
  },
  async deleteSession({ commit,dispatch }, id) {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch("https://afi-backend-wcomf.ondigitalocean.app/api/session/"+id, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch("getEvents");
        this.$toast.success('Session deleted successfully')
      })
      .catch(error => console.log('error', error));
  },
  async setEventsLocal({commit, dispacth}, events_local){
    commit("SET_EVENTS_LOCAL", events_local);

  }
}
