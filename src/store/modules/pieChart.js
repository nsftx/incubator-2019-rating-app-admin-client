import ApiService from '@/services/ApiService';

const API_URL = 'http://172.20.15.193:3000/api/v1';
export default ({
  state: {
    pieChartData: {},
  },
  mutations: {
    setPieChartData(state, data) {
      state.pieChartData = data;
    },
  },
  getters: {
    pieChartData: state => state.pieChartData,
  },
  actions: {
    getPieChartToday({ commit, getters, dispatch }, date) {
      ApiService.postData(`${API_URL}/ratings/count`, date, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setPieChartData', response.data);
          } else {
            dispatch('setMessage', response.statusText);
          }
        })
        .catch((error) => {
          dispatch('setMessage', error.response.data.error);
        });
    },
    getPieChartReport({ commit, getters, dispatch }, date) {
      ApiService.postData(`${API_URL}/ratings/report`, date, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setPieChartData', response.data);
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
