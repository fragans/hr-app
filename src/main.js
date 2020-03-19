import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/css/styles.css'

Vue.config.productionTip = false
// Vue.config.resolve.symlinks(false);
// store = store.store();
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')

store.dispatch('employees/fetch')