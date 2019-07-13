// Models are used to prepare store data
// to be sent to an API.
import { Title } from '../../../models/Title';
import { ADD_ROW, SET_TITLE } from '../../actionTypes';
import Vue from 'vue';

const mutations = {
  [ADD_ROW](state) {
    // To enable multi-row form handling,
    // we make it possible to add new rows.
    console.log(`[ADD_ROW] state.rows: ${JSON.stringify(state.rows[0])}`);
    state.rows.push(new Title());
  },
  [SET_TITLE](state) {
    console.log('[SET_TITLE]');
    state.rows[0].title = 'Lorem Ipsum Title';
  }
};

// The state must return a function to make the module reusable.
// See: https://vuex.vuejs.org/en/modules.html#module-reuse
const state = () => ({
  // Pre-fill one row with an empty 'Title' model.
  rows: [new Title()]
});

const actions = {};

const getters = {
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
