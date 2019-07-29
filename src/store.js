/* eslint-disable no-tabs */
import Vue from 'vue';
import Vuex from 'vuex';
import ApiService from '@/services/ApiService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    diagramData: {},
    pieChartData: {},
  },
  mutations: {
    setDiagramData(state, data) {
      state.diagramData = data;
    },
    setPieChartData(state, data) {
      state.pieChartData = data;
    },
  },
  getters: {
    diagramData: state => state.diagramData,
    pieChartData: state => state.pieChartData,
  },
  actions: {
    getDiagramToday(context, interval) {
      ApiService.createNewRange(interval).then((response) => {
        context.commit('setDiagramData', response);
      });
    },
    getDiagramRange(context, date) {
      ApiService.createReportForDays(date).then((response) => {
        context.commit('setDiagramData', response);
      });
    },
    getPieChartToday(context, date) {
      ApiService.createNewDaily(date).then((response) => {
        context.commit('setPieChartData', response);
      });
    },
    getPieChartReport(context, date) {
      ApiService.createNewReport(date).then((response) => {
        context.commit('setPieChartData', response);
      });
    },
  },
});
