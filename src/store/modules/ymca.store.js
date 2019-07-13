// Vue
import Vue from 'vue';

// pathify
import { make } from 'vuex-pathify';

// local files
import { default as ApiService, YmcaApiService } from '../../common/api.service';
import YmcaService from '../../common/ymca.service';

// Used to prepare store data to be sent to the API
import { Feedback, createFeedback, createFeedbackFormData, createUserInfoFormData } from '../../models/ymca/Feedback';
import { createFeedbackQuestion } from '../../models/ymca/FeedbackQuestion'; 

// base state
const state = {
  feedback: new Feedback(),
  options: [
    { text: 'YMCA at Baptist North', value: 'ymca_at_baptist_north' },
    { text: 'YMCA at Bank of America Tower', value: 'ymca_at_bank_of_america_tower' },
    { text: 'Barco-Newton Family YMCA', value: 'barco_newton_family_ymca' },
    { text: 'Brooks Family YMCA', value: 'brooks_family_ymca' },
    { text: 'Dye Clay Family YMCA', value: 'dye_clay_family_ymca' },
    { text: 'Flagler Center YMCA', value: 'flagler_center_ymca' },
    { text: 'Johnson Family YMCA', value: 'johnson_family_ymca' },
    { text: 'McArthur Family YMCA', value: 'mc_arthur_family_ymca' },
    { text: 'Ponte Vedra YMCA', value: 'ponte_vedra_ymca' },
    { text: 'St. Augustine YMCA', value: 'st._augustine_ymca' },
    { text: 'Williams Family YMCA', value: 'williams_family_ymca' },
    { text: 'Winston Family YMCA', value: 'winston_family_ymca' }
  ],
  feedbackQuestions: [],
  error: false,
  success: false
};

// getter overrides
export const getters = {
  feedback (state) {
    return state.feedback;
  },
  options (state) {
    return state.options;
  },
  feedbackQuestions (state) {
    return state.feedbackQuestions;
  }
};

// automatically generate mutations
export const mutations = {
  ...make.mutations(state),

  SET_YMCA_QUESTIONS (state, questions) {
    questions.forEach(ymcaQuestion => {
      state.feedbackQuestions.push(createFeedbackQuestion(ymcaQuestion));
    });
    // console.log(`[SET_YMCA_QUESTIONS] ${state.feedbackQuestions[0]}`);
  }
};

// manually-created actions
export const actions = {
  getFeedbackForm({commit}) {
    YmcaService.saveTokens();
    // console.log(`[getFeedbackForm] YmcaService.getEmail(): ${YmcaService.getEmail()}`);
    // console.log(`[getFeedbackForm] YmcaService.getPhoneNumber(): ${YmcaService.getPhoneNumber()}`);

    return YmcaApiService.get('feedback')
      .then((resp) => {
        // console.log(`[getFeedbackForm] resp: ${JSON.stringify(resp)}`);
        commit('SET_YMCA_QUESTIONS', resp.data.data);
        return resp.data.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  submitFeedbackForm({commit}, payload) {
    let formData = createFeedbackFormData(payload);

    return YmcaApiService.create('feedback', formData)
      .then((resp) => {
        // console.log(`[submitFeedbackForm] resp: ${JSON.stringify(resp)}`);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  submitUserInfo({commit}, payload) {
    let formData = createUserInfoFormData(payload);

    return YmcaApiService.create('user_info', formData)
      .then((resp) => {
        // console.log(`[submitUserInfo] resp: ${JSON.stringify(resp)}`);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export const ymca = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
