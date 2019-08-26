import io from 'socket.io-client';
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
            dispatch('setMessage', { type: 'error', text: response.data.message });
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
    getDiagramRange({ commit, getters, dispatch }, date) {
      ApiService.postData(`${getters.apiUrl}/ratings/days`, date, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setDiagramData', response.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.data.message });
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
    newRating({ commit }) {
      // eslint-disable-next-line global-require
      const socket = io.connect('https://172.105.81.4:7000/', { secure: true, transports: ['websocket'] });
      socket.on('newRating', (rating) => {
        commit('setNewRating', rating);
      });
    },
  },
});
