/* eslint-disable prefer-destructuring */
/* eslint-disable no-tabs */
import Vue from 'vue';
import Vuex from 'vuex';
import ApiService from '@/services/ApiService';

Vue.use(Vuex);

// Create store folder and separate files for actions, mutations, getters and state.

export default new Vuex.Store({
  state: {
    diagramData: {},
    pieChartData: {},
    token: '',
  },
  mutations: {
    setDiagramData(state, data) {
      state.diagramData = data;
    },
    setPieChartData(state, data) {
      state.pieChartData = data;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  getters: {
    diagramData: state => state.diagramData,
    pieChartData: state => state.pieChartData,
    token: state => state.token,
  },
  actions: {
    // Use object destructing
    getDiagramToday(context, interval) {
      const token = this.state.token;
      ApiService.createNewRange(interval, token).then((response) => {
        context.commit('setDiagramData', response);
      });
    },
    // Use object destructing
    getDiagramRange(context, date) {
      const token = this.state.token;
      ApiService.createReportForDays(date, token).then((response) => {
        context.commit('setDiagramData', response);
      });
    },
    // Use object destructing
    getPieChartToday(context, date) {
      const token = this.state.token;
      ApiService.createNewDaily(date, token).then((response) => {
        context.commit('setPieChartData', response);
      });
    },
    // Use object destructing
    getPieChartReport(context, date) {
      const token = this.state.token;
      ApiService.createNewReport(date, token).then((response) => {
        context.commit('setPieChartData', response);
      });
    },
    // Get token and set token
    getToken(context, token) {
      context.commit('setToken', token);
    },
  },
});
