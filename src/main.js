// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueLodash from 'vue-lodash';
import App from './App';
import router from './routes';
import store from '@/store';
import BootstrapVue from 'bootstrap-vue';

Vue.config.productionTip = false;

// const options = { name: 'lodash' };

Vue.use(VueLodash); // options is optional
Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
