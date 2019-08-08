export default ({
  state: {
    notificationMSg: '',
  },
  mutations: {
    insertMessage(state, message) {
      state.notificationMSg = message;
    },
    removeMessage(state) {
      state.notificationMSg = '';
    },
  },
  getters: {
    notifications: state => state.notificationMSg,
  },
  actions: {
    insertMessage({ commit }, message) {
      commit('insertMessage', message);
    },
    removeMessage({ commit }) {
      commit('removeMessage');
    },
  },
});
