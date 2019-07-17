/* eslint-disable no-tabs */
import Vue from "vue"
import Vuetify from "vuetify"
import Axios from "axios"
import VueAxios from "vue-axios"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import "vuetify/dist/vuetify.min.css"

const _ = require('lodash');


Vue.use(Vuetify)
Vue.use(VueAxios, Axios)
Vue.config.productionTip = false
Vue.com

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app")
