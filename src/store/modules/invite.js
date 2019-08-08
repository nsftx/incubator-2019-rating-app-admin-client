import ApiService from '@/services/ApiService';

const API_URL = 'http://172.20.116.163:3000/api/v1';

export default ({
  state: {
    snackbarExist: false,
    snackbarSuccess: false,
  },
  mutations: {
    snackbarExist(state, value) {
      state.snackbarExist = value;
    },
    snackbarSuccess(state, value) {
      state.snackbarSuccess = value;
    },
  },
  getters: {
    snackbarExist: state => state.snackbarExist,
    snackbarSuccess: state => state.snackbarSuccess,
  },
  actions: {
    invite({ commit, getters }, mail) {
      ApiService.postData(`${API_URL}/invites`, mail, getters.token)
        .then(() => {
          commit('snackbarSuccess', true);
        }).catch(() => {
          commit('snackbarExist', true);
        });
    },
    setSnackbarExist({ commit }, value) {
      commit('snackbarExist', value);
    },
    setSnackbarSuccess({ commit }, value) {
      commit('snackbarSuccess', value);
    },
  },
});
