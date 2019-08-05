/* eslint-disable prefer-destructuring */
/* eslint-disable no-tabs */
import Vue from 'vue';
import Vuex from 'vuex';
import areaDiagram from './modules/areaDiagram';
import authToken from './modules/authToken';
import pieChart from './modules/pieChart';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    areaDiagram,
    authToken,
    pieChart,
    settings,
  },
});