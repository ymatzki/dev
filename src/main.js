import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
