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
      ApiService.postData(`${getters.apiUrl}/users/login`, payload, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setLogged', true);
            commit('setUser', response.data.data);
            dispatch('setMessage', { type: 'success', text: 'Login success! Welcome' });
            localStorage.setItem('token', getters.token);
            localStorage.setItem('inLocal', true);
            router.push({ path: '/today' });
          } else {
            dispatch('setMessage', { type: 'error', text: response.data.message });
            router.push({ path: '/' });
          }
        })
        .catch((error) => {
          if (error.response) {
            dispatch('setMessage', { type: 'error', text: error.response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: error.message });
          }
        });
    },
    setUser({ commit, dispatch, getters }) {
      ApiService.postData(`${getters.apiUrl}/users/user`, { email: localStorage.email }, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setUser', response.data.data);
          } else {
            dispatch('setMessage', { type: 'error', text: 'Error with user email.' });
          }
        })
        .catch((error) => {
          if (error.response) {
            dispatch('setMessage', { type: 'error', text: error.response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: error.message });
          }
        });
    },
    getUserById({ getters }, id) {
      return ApiService.getData(`${getters.apiUrl}/users/${id}`, getters.token);
    },
  },
});
