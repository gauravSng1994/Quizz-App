import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueFlicking from "@egjs/vue-flicking";
Vue.use(VueFlicking);
Vue.config.productionTip = false
import {CURRENT_SLIDE_INDEX, IS_MUSIC_OFF, IS_SOUND_OFF} from "./constants";
import './models/index';
import LocalStorage from "./services/LocalStorage";
LocalStorage.setItem(IS_MUSIC_OFF,"true");
LocalStorage.setItem(IS_SOUND_OFF,"true");
LocalStorage.setItem(CURRENT_SLIDE_INDEX, 0);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
