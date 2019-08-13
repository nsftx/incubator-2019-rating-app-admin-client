export default ({
  state: {
    notifications: {},
  },
  mutations: {
    setMessage(state, message) {
      state.notifications = message;
    },
  },
  getters: {
    notifications: state => state.notifications,
  },
  actions: {
    setMessage({ commit }, message) {
      commit('setMessage', message);
    },
  },
});
