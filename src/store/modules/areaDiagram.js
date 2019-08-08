import ApiService from '@/services/ApiService';

const API_URL = 'http://172.20.116.163:3000';
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
    getDiagramToday({ commit, getters }, interval) {
      ApiService.postData(`${API_URL}/ratings/range`, interval, getters.token).then((response) => {
        commit('setDiagramData', response.data);
      });
    },
    getDiagramRange({ commit, getters }, date) {
      ApiService.postData(`${API_URL}/ratings/days`, date, getters.token).then((response) => {
        commit('setDiagramData', response.data);
      });
    },
  },
});
