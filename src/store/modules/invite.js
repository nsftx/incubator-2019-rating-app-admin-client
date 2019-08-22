import ApiService from '@/services/ApiService';

export default ({
  state: {},
  mutations: {},
  getters: {},
  actions: {
    invite({ dispatch, getters }, mail) {
      ApiService.postData(`${getters.apiUrl}/invites`, mail, getters.token)
        .then((response) => {
          if (response.status === 201) {
            dispatch('setMessage', { type: 'success', text: 'Invite successfully sent' });
          } else {
            dispatch('setMessage', { type: 'error', text: 'Invite is already sent' });
          }
        }).catch((error) => {
          if (error.response) {
            dispatch('setMessage', { type: 'error', text: error.response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: error.message });
          }
        });
    },
  },
});
