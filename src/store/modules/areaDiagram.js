import ApiService from '@/services/ApiService';

export default ({
  state: {
    diagramData: {},
    newRating: {},
  },
  mutations: {
    setDiagramData(state, data) {
      state.diagramData = data;
    },
    setNewRating(state, rating) {
      state.newRating = rating;
    },
  },
  getters: {
    diagramData: state => state.diagramData,
    newRating: state => state.newRating,
  },
  actions: {
    getDiagramToday({ commit, getters, dispatch }, interval) {
      ApiService.postData(`${getters.apiUrl}/ratings/range`, interval, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setDiagramData', response.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.statusText });
          }
        })
        .catch((error) => {
          if (error.response) {
            dispatch('setMessage', { type: 'error', text: error.response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: error });
          }
        });
    },
    getDiagramRange({ commit, getters, dispatch }, date) {
      ApiService.postData(`${getters.apiUrl}/ratings/days`, date, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setDiagramData', response.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.statusText });
          }
        })
        .catch((error) => {
          if (error.response) {
            dispatch('setMessage', { type: 'error', text: error.response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: error });
          }
        });
    },
    newRating({ commit }) {
      // eslint-disable-next-line global-require
      const socket = require('socket.io-client')('http://ratingsapp.ddns.net:7000/');
      socket.on('newRating', (rating) => {
        commit('setNewRating', rating);
      });
    },
  },
});
