/* eslint-disable no-tabs */
import Vue from "vue"
import Vuetify from "vuetify"
import Axios from "axios"
import VueAxios from "vue-axios"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import "vuetify/dist/vuetify.min.css"

// eslint-disable-next-line no-unused-vars


Vue.use(Vuetify)
Vue.use(VueAxios, Axios)
Vue.config.productionTip = false
// eslint-disable-next-line no-unused-expressions
Vue.com

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app")
