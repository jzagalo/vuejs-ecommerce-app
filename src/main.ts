import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/filters';
import Vuelidate from "vuelidate";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  validations: {},
}).$mount('#app')
