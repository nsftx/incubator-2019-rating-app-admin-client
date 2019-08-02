export default ({
  state: {
    token: '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  getters: {
    token: state => state.token,
  },
  actions: {
    createToken({ commit }, token) {
      commit('setToken', token);
    },
  },
});
