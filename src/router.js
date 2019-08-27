/* eslint-disable no-tabs */
import Vue from 'vue';
import Router from 'vue-router';

const Settings = () => import('./views/Settings.vue');
const Reports = () => import('./views/Reports.vue');
const Today = () => import('./views/Today.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Today,
    },
    {
      path: '/today',
      name: 'today',
      component: Today,
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
});
