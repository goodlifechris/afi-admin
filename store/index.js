export const state = () => ({
      events: [],
})

export const mutations = {
  SET_EVENTS(state, layout) {
    state.events = layout;
  }
}

export const actions = {
  async getEvents({ commit }, payload) {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://afi-backend-wcomf.ondigitalocean.app/api/event/", requestOptions)
      .then(response => response.json())
      .then(result => {
        commit("SET_EVENTS", result.data);
        this.$toast.success('Events fetched successfully')

      })
      .catch(error => console.log('error', error));
  },
}
