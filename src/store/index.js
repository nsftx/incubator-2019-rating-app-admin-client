/* eslint-disable prefer-destructuring */
/* eslint-disable no-tabs */
import Vue from 'vue';
import Vuex from 'vuex';
import areaDiagram from './modules/areaDiagram';
import authToken from './modules/authToken';
import pieChart from './modules/pieChart';
import settings from './modules/settings';
import invite from './modules/invite';
import notifications from './modules/notifications';
import apiUrl from './modules/apiUrl';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    areaDiagram,
    authToken,
    pieChart,
    settings,
    invite,
    notifications,
    apiUrl,
  },
});
