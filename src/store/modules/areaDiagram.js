import ApiService from '@/services/ApiService';

const API_URL = 'http://172.20.116.163:3000/api/v1';
export default ({
  state: {
    diagramData: {},
  },
  mutations: {
    setDiagramData(state, data) {
      state.diagramData = data;
    },
  },
  getters: {
    diagramData: state => state.diagramData,
  },
  actions: {
    getDiagramToday({ commit, getters, dispatch }, interval) {
      ApiService.postData(`${API_URL}/ratings/range`, interval, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setDiagramData', response.data);
          } else {
            dispatch('insertMessage', response.statusText);
          }
        })
        .catch((error) => {
          dispatch('insertMessage', error.response.data.error);
        });
    },
    getDiagramRange({ commit, getters, dispatch }, date) {
      ApiService.postData(`${API_URL}/ratings/days`, date, getters.token).then((response) => {
        if (response.status === 200) {
          commit('setDiagramData', response.data);
        } else {
          dispatch('insertMessage', response.statusText);
        }
      })
        .catch((error) => {
          dispatch('insertMessage', error.response.data.error);
        });
    },
  },
});
