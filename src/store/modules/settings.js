import ApiService from '@/services/ApiService';

const API_URL = 'http://172.20.15.193:3000/api/v1';
export default ({
  state: {
    activeSettings: {},
    emoticons: [],
    thanksMessages: [],
    emoticonGroupNames: [],
  },
  mutations: {
    setActiveSettings(state, settings) {
      state.activeSettings = settings;
    },
    setEmoticons(state, emoticons) {
      state.emoticons = emoticons;
    },
    setThanksMessages(state, messages) {
      state.thanksMessages = messages;
    },
  },
  getters: {
    activeSettings: state => state.activeSettings,
    emoticons: state => state.emoticons,
    thanksMessages: state => state.thanksMessages,
    emoticonGroupNames: state => state.emoticons.map(group => group.name),
  },
  actions: {
    getActiveSettings({ commit, dispatch }) {
      return ApiService.getData(`${API_URL}/settings/last`)
        .then((response) => {
          if (response.status === 200) {
            commit('setActiveSettings', response.data.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.statusText });
          }
        })
        .catch((error) => {
          if (error.response) {
            dispatch('setMessage', { type: 'error', text: error.response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: error });
          }
        });
    },
    getEmoticons({ commit, getters, dispatch }) {
      return ApiService.getData(`${API_URL}/emoticonsGroups`, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setEmoticons', response.data.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.statusText });
          }
        })
        .catch((error) => {
          if (error.response) {
            dispatch('setMessage', { type: 'error', text: error.response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: error });
          }
        });
    },
    updateSettings({ getters, dispatch }, settings) {
      return ApiService.putData(`${API_URL}/settings/${settings.id}`, settings, getters.token)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            dispatch('setMessage', { type: 'success', text: response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: response.statusText });
          }
        })
        .catch((error) => {
          if (error.response) {
            dispatch('setMessage', { type: 'error', text: error.response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: error });
          }
        });
    },
    createThanksMessage({ getters, dispatch }, message) {
      return ApiService.postData(`${API_URL}/messages`, message, getters.token)
        .then((response) => {
          if (response.status === 201) {
            dispatch('setMessage', { type: 'success', text: response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: response.statusText });
          }
        })
        .catch((error) => {
          if (error.response) {
            dispatch('setMessage', { type: 'error', text: error.response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: error });
          }
        });
    },
    getThanksMessages({ commit, getters, dispatch }) {
      return ApiService.getData(`${API_URL}/messages`, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setThanksMessages', response.data.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.statusText });
          }
        })
        .catch((error) => {
          if (error.response) {
            dispatch('setMessage', { type: 'error', text: error.response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: error });
          }
        });
    },
  },
});
