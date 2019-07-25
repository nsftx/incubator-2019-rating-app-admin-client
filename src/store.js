/* eslint-disable no-tabs */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    diagramData: {},
  },
  mutations: {
    setDiagramData(state, data) {
      state.diagramData = data;
    },
  },
  getters: {
    diagramData: state => state.diagramData,
  },
  actions: {

  },
});
