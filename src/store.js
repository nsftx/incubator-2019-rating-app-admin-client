/* eslint-disable no-tabs */
import Vue from 'vue';
import Vuex from 'vuex';
import ApiService from '@/services/ApiService';

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
    getDiagramRange(context, date) {
      ApiService.createReportForDays(date).then((response) => {
        context.commit('setDiagramData', response);
      });
    },
    getDiagramToday(context, interval) {
      ApiService.createNewRange(interval).then((response) => {
        context.commit('setDiagramData', response);
      });
    },
  },
});
