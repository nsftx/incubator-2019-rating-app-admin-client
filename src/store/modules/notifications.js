export default ({
  state: {
    notificationMSg: '',
  },
  mutations: {
    setMessage(state, message) {
      state.notificationMSg = message;
    },
  },
  getters: {
    notifications: state => state.notificationMSg,
  },
  actions: {
    setMessage({ commit }, message) {
      commit('setMessage', message);
    },
  },
});
