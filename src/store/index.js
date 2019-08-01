/* eslint-disable prefer-destructuring */
/* eslint-disable no-tabs */
import Vue from 'vue';
import Vuex from 'vuex';
import areaDiagram from './modules/areaDiagram';
import pieChart from './modules/pieChart';
import authToken from './modules/authToken';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    areaDiagram,
    pieChart,
    authToken,
  },
});
