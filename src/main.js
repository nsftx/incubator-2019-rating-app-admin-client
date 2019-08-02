/* eslint-disable no-tabs */
import Vue from 'vue';
import Vuetify from 'vuetify';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import GAuth from 'vue-google-oauth2';
import App from './App.vue';
import router from './router';
import store from './store';
import mixin from './mixin';
import 'vuetify/dist/vuetify.min.css';

const gauthOption = {
  clientId: '641180167952-h84f394tnm50qm8j30t101cla1k2aglh.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
};
Vue.use(GAuth, gauthOption);

// eslint-disable-next-line no-unused-vars


Vue.use(Vuetify);
Vue.use(VueAxios, Axios);
Vue.use(mixin);
Vue.config.productionTip = false;
// eslint-disable-next-line no-unused-expressions
Vue.com;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
