import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: router

}).$mount('#app')
