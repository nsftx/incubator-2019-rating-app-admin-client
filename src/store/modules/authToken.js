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
    getToken(context, token) {
      context.commit('setToken', token);
    },
  },
})