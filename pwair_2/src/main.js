import Vue from 'vue'
import App from './App'
import router from './router' 
import axios from 'axios'
import { ChartPlugin } from './plugins/chart.js'

Vue.use(ChartPlugin);

Vue.config.productionTip = false

Vue.prototype.$http = axios;

// components
// this.$jaeyoune.get();
// axios.get();

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
