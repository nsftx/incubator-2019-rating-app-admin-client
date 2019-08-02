import ApiService from '@/services/ApiService';

const API_URL = 'http://172.20.16.94:3000';
export default ({
  state: {
    activeSettings: {},
    emoticons: [],
    activeEmoticons: {},
    activeMessage: {},
    thanksMessages: [],
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
    setActiveMessage(state, message) {
      state.activeMessage = message;
    },
    setThanksMessages(state, messages) {
      state.thanksMessages = messages;
    },
  },
  getters: {
    activeSettings: state => state.activeSettings,
    emoticons: state => state.emoticons,
    activeEmoticons: state => state.activeEmoticons,
    activeMessage: state => state.activeMessage,
    thanksMessages: state => state.thanksMessages,
  },
  actions: {
    getActiveSettings({ commit }) {
      ApiService.getData(`${API_URL}/settings/last`).then((response) => {
        commit('setActiveSettings', response.data);
        commit('setActiveEmoticons', response.emoticons);
      });
    },
    getEmoticons({ commit, getters }) {
      ApiService.getData(`${API_URL}/emoticonsGroups`, getters.token).then((response) => {
        commit('setEmoticons', response.data);
      });
    },
    updateSettings({ getters }, settings) {
      ApiService.putData(`${API_URL}/settings/${settings.id}`, settings, getters.token);
    },
    createThanksMessage({ commit, getters }, message) {
      ApiService.postData(`${API_URL}/messages`, message, getters.token).then((response) => {
        commit('setActiveMessage', response.data);
      });
    },
    getThanksMessages({ commit, getters }) {
      ApiService.getData(`${API_URL}/messages`, getters.token).then((response) => {
        commit('setThanksMessages', response.data);
      });
    },
  },
});
