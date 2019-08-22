/* eslint-disable prefer-destructuring */
/* eslint-disable no-tabs */
import Vue from 'vue';
import Vuex from 'vuex';
import apiUrl from './modules/apiUrl';
import areaDiagram from './modules/areaDiagram';
import authToken from './modules/authToken';
import invite from './modules/invite';
import notifications from './modules/notifications';
import pieChart from './modules/pieChart';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    apiUrl,
    areaDiagram,
    authToken,
    invite,
    notifications,
    pieChart,
    settings,
  },
});
