import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
// import VueCookies from 'vue-cookies'

createApp(App).use(Quasar, quasarUserOptions).use(store).use(router).mount('#app')

// Require dependencies
// Vue.use(VueCookies);
// Vue.$cookies.config("7d");