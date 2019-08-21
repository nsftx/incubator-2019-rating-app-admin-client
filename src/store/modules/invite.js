import ApiService from '@/services/ApiService';

export default ({
  state: {},
  mutations: {},
  getters: {},
  actions: {
    invite({ commit, getters }, mail) {
      ApiService.postData(`${getters.apiUrl}/invites`, mail, getters.token)
        .then(() => {
          commit('setMessage', { type: 'success', text: 'Invite successfully sent' });
        }).catch(() => {
          commit('setMessage', { type: 'error', text: 'Invite is already sent' });
        });
    },
  },
});
