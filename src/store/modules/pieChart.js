import ApiService from '@/services/ApiService';

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
      ApiService.postData(`${getters.apiUrl}/ratings/count`, date, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setPieChartData', response.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.statusText });
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
    getPieChartReport({ commit, getters, dispatch }, date) {
      ApiService.postData(`${getters.apiUrl}/ratings/report`, date, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setPieChartData', response.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.statusText });
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
