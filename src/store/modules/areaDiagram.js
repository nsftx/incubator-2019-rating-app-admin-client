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
    SOCKET_ONMESSAGE(state, message) {
      const rating = JSON.parse(message.data);
      if (rating.type === 'ratings') {
        state.newRating = rating;
      }
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
  },
});
