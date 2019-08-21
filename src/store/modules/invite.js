import ApiService from '@/services/ApiService';

const API_URL = 'http://172.105.81.4:3000/api/v1';

export default ({
  state: {},
  mutations: {},
  getters: {},
  actions: {
    invite({ commit, getters }, mail) {
      ApiService.postData(`${API_URL}/invites`, mail, getters.token)
        .then(() => {
          commit('setMessage', { type: 'success', text: 'Invite successfully sent' });
        }).catch(() => {
          commit('setMessage', { type: 'error', text: 'Invite is already sent' });
        });
    },
  },
});
