import Vue from 'vue'
import Router from 'vue-router'
import Settings from './views/Settings.vue'
import Reports from './views/Reports.vue'
import Today from './views/Today.vue'


Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'today',
      component: Today
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})