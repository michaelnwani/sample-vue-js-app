// libraries
import Vue from 'vue';
import Vuex from 'vuex';

// optional configuration
import pathify from 'vuex-pathify';

import auth from './modules/auth.store';
import survey from './modules/survey.store';
import reward from './modules/reward.store';
import dashboard from './modules/dashboard.store';
import ymca from './modules/ymca.store';

pathify.debug();

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  plugins: [ pathify.plugin ], // activate plugin,

  modules: {
    auth,
    survey,
    reward,
    dashboard,
    ymca
  }
});
