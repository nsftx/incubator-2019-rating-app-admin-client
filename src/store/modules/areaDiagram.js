import ApiService from '@/services/ApiService';

const API_URL = 'http://172.20.15.193:3000/api/v1';
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
            dispatch('setMessage', response.statusText);
          }
        })
        .catch((error) => {
          dispatch('setMessage', error.response.data.error);
        });
    },
    getDiagramRange({ commit, getters, dispatch }, date) {
      ApiService.postData(`${API_URL}/ratings/days`, date, getters.token).then((response) => {
        if (response.status === 200) {
          commit('setDiagramData', response.data);
        } else {
          dispatch('setMessage', response.statusText);
        }
      })
        .catch((error) => {
          dispatch('setMessage', error.response.data.error);
        });
    },
  },
});
