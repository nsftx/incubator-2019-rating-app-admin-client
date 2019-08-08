import ApiService from '@/services/ApiService';

const API_URL = 'http://172.20.116.163:3000';
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
    getActiveSettings({ commit }) {
      ApiService.getData(`${API_URL}/settings/last`).then((response) => {
        commit('setActiveSettings', response.data.data);
        commit('setActiveEmoticons', response.data.emoticons);
      });
    },
    getEmoticons({ commit, getters }) {
      ApiService.getData(`${API_URL}/emoticonsGroups`, getters.token).then((response) => {
        commit('setEmoticons', response.data.data);
      });
    },
    updateSettings({ getters }, settings) {
      ApiService.putData(`${API_URL}/settings/${settings.id}`, settings, getters.token);
    },
    createThanksMessage({ getters }, message) {
      ApiService.postData(`${API_URL}/messages`, message, getters.token);
    },
    getThanksMessages({ commit, getters }) {
      ApiService.getData(`${API_URL}/messages`, getters.token).then((response) => {
        commit('setThanksMessages', response.data.data);
      });
    },
  },
});
