// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueRouter from 'vue-router'
import routes from './router/routes'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(axios);
const router = new VueRouter({
  routes
});

new Vue({
  router,
  axios,
  VueRouter,
  render: h => h(App)
}).$mount('#app');
