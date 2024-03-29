import ApiService from '@/services/ApiService';

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
    getActiveSettings({ commit, dispatch, getters }) {
      return ApiService.getData(`${getters.apiUrl}/settings/last`)
        .then((response) => {
          if (response.status === 200) {
            commit('setActiveSettings', response.data.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.data.message });
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
    getEmoticons({ commit, getters, dispatch }) {
      return ApiService.getData(`${getters.apiUrl}/emoticonsGroups`, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setEmoticons', response.data.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.data.message });
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
    updateSettings({ getters, dispatch }, settings) {
      return ApiService.putData(`${getters.apiUrl}/settings/${settings.id}`, settings, getters.token)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            dispatch('setMessage', { type: 'success', text: response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: response.data.message });
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
    createThanksMessage({ commit, getters, dispatch }, message) {
      return ApiService.postData(`${getters.apiUrl}/messages`, message, getters.token)
        .then((response) => {
          if (response.status === 201) {
            const settings = getters.activeSettings;
            settings.message = response.data.data;
            commit('setActiveSettings', settings);
            dispatch('setMessage', { type: 'success', text: response.data.message });
          } else {
            dispatch('setMessage', { type: 'error', text: response.data.message });
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
    getThanksMessages({ commit, getters, dispatch }) {
      return ApiService.getData(`${getters.apiUrl}/messages`, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setThanksMessages', response.data.data);
          } else {
            dispatch('setMessage', { type: 'error', text: response.data.message });
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
