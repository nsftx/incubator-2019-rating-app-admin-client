import ApiService from '@/services/ApiService';

const API_URL = 'http://172.20.116.163:3000/api/v1';
export default ({
  state: {
    activeSettings: {},
    emoticons: [],
    activeEmoticons: {},
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
    setActiveEmoticons(state, emoticons) {
      state.activeEmoticons = emoticons;
    },
    setThanksMessages(state, messages) {
      state.thanksMessages = messages;
    },
  },
  getters: {
    activeSettings: state => state.activeSettings,
    emoticons: state => state.emoticons,
    activeEmoticons: state => state.activeEmoticons,
    thanksMessages: state => state.thanksMessages,
    emoticonGroupNames: state => state.emoticons.map(group => group.name),
  },
  actions: {
    getActiveSettings({ commit, dispatch }) {
      ApiService.getData(`${API_URL}/settings/last`)
        .then((response) => {
          if (response.status === 200) {
            commit('setActiveSettings', response.data.data);
            commit('setActiveEmoticons', response.data.emoticons);
          } else {
            dispatch('insertMessage', response.statusText);
          }
        })
        .catch((error) => {
          dispatch('insertMessage', error.response.data.error);
        });
    },
    getEmoticons({ commit, getters, dispatch }) {
      ApiService.getData(`${API_URL}/emoticonsGroups`, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setEmoticons', response.data.data);
          } else {
            dispatch('insertMessage', response.statusText);
          }
        })
        .catch((error) => {
          dispatch('insertMessage', error.response.data.error);
        });
    },
    updateSettings({ getters, dispatch }, settings) {
      ApiService.putData(`${API_URL}/settings/${settings.id}`, settings, getters.token)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            dispatch('insertMessage', response.statusText);
          } else {
            dispatch('insertMessage', 'Settings successfully updated');
          }
        })
        .catch((error) => {
          dispatch('insertMessage', error.response.data.error);
        });
    },
    createThanksMessage({ getters, dispatch }, message) {
      ApiService.postData(`${API_URL}/messages`, message, getters.token)
        .then((response) => {
          if (response.status !== 201) {
            dispatch('insertMessage', response.statusText);
          } else {
            dispatch('insertMessage', 'Message successfully created');
          }
        })
        .catch((error) => {
          dispatch('insertMessage', error.response.data.error);
        });
    },
    getThanksMessages({ commit, getters, dispatch }) {
      ApiService.getData(`${API_URL}/messages`, getters.token)
        .then((response) => {
          if (response.status === 200) {
            commit('setThanksMessages', response.data.data);
          } else {
            dispatch('insertMessage', response.statusText);
          }
        })
        .catch((error) => {
          dispatch('insertMessage', error.response.data.error);
        });
    },
  },
});
