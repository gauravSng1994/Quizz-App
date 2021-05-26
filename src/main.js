import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueFlicking from "@egjs/vue-flicking";
Vue.use(VueFlicking);
Vue.config.productionTip = false
import {IS_MUSIC_OFF,IS_SOUND_OFF} from "./constants";
import './models/index';
localStorage.setItem(IS_MUSIC_OFF,"true");
localStorage.setItem(IS_SOUND_OFF,"true");
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
