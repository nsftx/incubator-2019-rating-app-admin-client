/* eslint-disable no-tabs */
import Vue from 'vue';
import Router from 'vue-router';

const Settings = () => import('./views/Settings.vue');
const Reports = () => import('./views/Reports.vue');
const Today = () => import('./views/Today.vue');
const Logout = () => import('./views/Logout.vue');

Vue.use(Router);

export default new Router({
  routes: [
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
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
});
