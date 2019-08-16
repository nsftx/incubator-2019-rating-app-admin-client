import router from '../../router';
import ApiService from '@/services/ApiService';

export default ({
  state: {
    token: '',
    isLogged: false,
    loggedUser: {},
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setLogged(state, isLogged) {
      state.isLogged = isLogged;
    },
    setUser(state, user) {
      state.loggedUser = user;
    },
  },
  getters: {
    token: state => state.token,
    isLogged: state => state.isLogged,
    loggedUser: state => state.loggedUser,
  },
  actions: {
    createToken({ commit }, token) {
      commit('setToken', token);
    },
    login({ commit, dispatch, getters }, payload) {
      ApiService.postData('http://172.20.15.193:3000/api/v1/users/login', payload, getters.token)
        .then((response) => {
          if (response.data.error == false) {
            commit('setLogged', true);
            commit('setUser', response.data.data);
            dispatch('setMessage', { type: 'success', text: 'Login success! Welcome' });
            localStorage.setItem('token', getters.token);
            localStorage.setItem('inLocal', true);
            router.push({ path: '/today' });
          } else {
            dispatch('setMessage', { type: 'success', text: 'Oops. You are a non-existing user. Please ask for an invite.' });
            router.push({ path: '/' });
          }
        });
    },
  },
});
