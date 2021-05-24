import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueFlicking from "@egjs/vue-flicking";
Vue.use(VueFlicking);
Vue.config.productionTip = false

import './models/index';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
