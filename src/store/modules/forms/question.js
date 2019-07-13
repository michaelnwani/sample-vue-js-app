// Models are used to prepare store data
// to be sent to an API.
import { Question } from '../../../models/Question';
import { ADD_ROW } from '../../actionTypes';
import Vue from 'vue';

export const actions = {};

export const mutations = {
  [ADD_ROW](state) {
    console.log(`[ADD_ROW] adding a new question`);
    // To enable multi-row form handling,
    // we make it possible to add new rows.
    // state.rows.push(new Question());
  }
};

// The state must return a function to make the module reusable.
// See: https://vuex.vuejs.org/en/modules.html#module-reuse
const state = () => ({
  // Pre-fill one row with an empty 'Question' model.
  rows: []
});

const getters = {
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
