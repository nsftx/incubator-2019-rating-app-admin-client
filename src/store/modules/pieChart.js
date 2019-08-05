import ApiService from '@/services/ApiService';

const API_URL = 'http://172.20.16.94:3000';
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
    getPieChartToday({ commit, getters }, date) {
      ApiService.postData(`${API_URL}/ratings/count`, date, getters.token).then((response) => {
        commit('setPieChartData', response);
      });
    },
    getPieChartReport({ commit, getters }, date) {
      ApiService.postData(`${API_URL}/ratings/report`, date, getters.token).then((response) => {
        commit('setPieChartData', response);
      });
    },
  },
});
