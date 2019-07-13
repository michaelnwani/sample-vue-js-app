// Vue
import Vue from 'vue';

// pathify
import { make } from 'vuex-pathify';

// local files
import { default as ApiService, SurveysService } from '../../common/api.service';

import {
  GET_SURVEY,
  ADD_SURVEY_LOCATION,
  REMOVE_SURVEY_LOCATION,
  REMOVE_SURVEY_QUESTION,
  SET_BANNER,
  SURVEY_EDIT
} from '../actionTypes';

// Used to prepare store data to be sent to the API
import { Survey, createSurvey, createSurveyFormData } from '../../models/Survey';
import { createRewards } from '../../models/Reward';
import { SurveyLocation } from '../../models/SurveyLocation';

// We're using reusable form modules
// to store the data of our forms.
import question from './forms/question';
import { Question } from '../../models/Question';
import { PossibleAnswer } from '../../models/PossibleAnswer';

// base state
const state = {
  survey: new Survey(),
  surveys: [],
  rewards: [],
  surveyTypes: [
    'default',
    'instant'
  ],
  error: false,
  success: false
};

// getter overrides
export const getters = {
  survey (state) {
    // console.log(`getters returning survey: ${JSON.stringify(state.survey)}`);
    return state.survey;
  },
  surveys (state) {
    return state.surveys;
  },
  questions (state, getters) {
    return getters.survey.questions;
  },
  rewards (state) {
    return state.rewards;
  }
};

// automatically generate mutations
export const mutations = {
  ...make.mutations(state),

  /*************** Survey Mutations ***************/

  NEW_SURVEY (state, data) {
    // var foo = createSurvey(data.survey);
    console.log(`[NEW_SURVEY] data=${JSON.stringify(data)}`);
    console.log(`[NEW_SURVEY] data.data=${JSON.stringify(data.data)}`);
    // state.survey.title = data.survey.title;
    state.rewards = createRewards(data.rewards);
    // state.survey.questions.forEach((question) => {
    //   state.question.rows.push(new Question(question)); // this is awesome.
    // });

    // data.survey.surveyLocations = data.survey.survey_locations;
    // // state.survey = data.survey;
    // // Vue.set(state.survey, 'surveyLocations', data.survey.survey_locations);
    // // state.survey.surveyLocations = data.survey.survey_locations;
    // // state.survey.surveyQuestions = data.survey.questions;

    // state.rewards = data.rewards || [];
    // console.log(`[SET_SURVEY] survey.surveyLocations: ${JSON.stringify(state.survey.surveyLocations)}`);
  },

  GET_SURVEY (state, data) {
    // var foo = createSurvey(data.survey);
    console.log(`[GET_SURVEY] data=${JSON.stringify(data)}`);
    console.log(`[GET_SURVEY] data.data=${JSON.stringify(data.data)}`);
    // state.survey.title = data.survey.title;
    state.survey = createSurvey(data.data);
    state.rewards = createRewards(data.rewards);
    // state.survey.questions.forEach((question) => {
    //   state.question.rows.push(new Question(question)); // this is awesome.
    // });

    // data.survey.surveyLocations = data.survey.survey_locations;
    // // state.survey = data.survey;
    // // Vue.set(state.survey, 'surveyLocations', data.survey.survey_locations);
    // // state.survey.surveyLocations = data.survey.survey_locations;
    // // state.survey.surveyQuestions = data.survey.questions;

    // state.rewards = data.rewards || [];
    // console.log(`[SET_SURVEY] survey.surveyLocations: ${JSON.stringify(state.survey.surveyLocations)}`);
  },

  SET_SURVEYS (state, surveys) {
    surveys.forEach(survey => {
      state.surveys.push(createSurvey(survey));
    });
  },

  SET_SURVEY_BANNER (state, data) {
    console.log(`[SET_SURVEY_BANNER]`);
    state.survey.banner = data.file;
    // state.survey.newBannerName = bannerFile.name;
  },

  UNPUBLISH_SURVEY (state) {
    state.survey.published = false;
  },

  PUBLISH_SURVEY (state) {
    state.survey.published = true;
  },

  DEACTIVATE_SURVEY (state) {
    state.survey.active = false;
  },

  ACTIVATE_SURVEY (state) {
    state.survey.active = true;
  },

  /*************** Question Mutations ***************/

  ADD_QUESTION (state) {
    state.survey.questions.push(new Question());
  },

  DELETE_QUESTION (state, payload) {
    console.log(`[DELETE_QUESTION] payload=${JSON.stringify(payload)}`);
    state.survey.questions.splice(payload.questionIdx, 1);
  },

  SET_QUESTION_DESCRIPTION (state, payload) {
    console.log(`[SET_QUESTION_DESCRIPTION] payload=${JSON.stringify(payload)}`);
    state.survey.questions[payload.questionIdx].description = payload.description;
  },

  SET_QUESTION_BANNER (state, payload) {
    console.log(`[SET_QUESTION_BANNER] payload=${JSON.stringify(payload)}`);
    state.survey.questions[payload.questionIdx].banner = payload.file;
  },

  /*************** PossibleAnswer Mutations ***************/

  ADD_POSSIBLE_ANSWER (state, payload) {
    console.log(`[ADD_POSSIBLE_ANSWER] payload=${JSON.stringify(payload)}`);
    state.survey.questions[payload.questionIdx].possible_answers.push(new PossibleAnswer());
  },

  SET_POSSIBLE_ANSWER (state, payload) {
    console.log(`[SET_POSSIBLE_ANSWER] payload=${JSON.stringify(payload)}`);
    state.survey.questions[payload.questionIdx].possible_answers[payload.possibleAnswerIdx].answer = payload.answer;
  },

  DELETE_POSSIBLE_ANSWER (state, payload) {
    // console.log(`[DELETE_POSSIBLE_ANSWER] payload=${JSON.stringify(payload)}`);
    state.survey.questions[payload.questionIdx].possible_answers.splice(payload.possibleAnswerIdx, 1);
  },

  /*************** SurveyLocation Mutations ***************/

  ADD_SURVEY_LOCATION (state) {
    console.log(`[ADD_SURVEY_LOCATION]`);
    state.survey.survey_locations.push(new SurveyLocation());
  },

  DELETE_SURVEY_LOCATION (state, payload) {
    console.log(`[DELETE_SURVEY_LOCATION] payload=${JSON.stringify(payload)}`);
    var index = state.survey.survey_locations.findIndex(loc => loc.id === payload);
    state.survey.survey_locations.splice(index, 1);
  },

  SET_SURVEY_LOCATION_LAT (state, payload) {
    console.log(`[SET_SURVEY_LOCATION_LAT]`);
    state.survey.survey_locations[payload.locationIdx].lat = +payload.lat;
  },

  SET_SURVEY_LOCATION_LNG (state, payload) {
    console.log(`[SET_SURVEY_LOCATION_LNG]`);
    state.survey.survey_locations[payload.locationIdx].lng = +payload.lng;
  },

  SET_SURVEY_LOCATION_DISTANCE (state, payload) {
    console.log(`[SET_SURVEY_LOCATION_DISTANCE]`);
    state.survey.survey_locations[payload.locationIdx].distance = +payload.distance;
  }
};

// manually-created actions
export const actions = {
  newSurvey({commit}) {
    return SurveysService.get('new')
      .then((resp) => {
        console.log(`[newSurvey] resp: ${JSON.stringify(resp)}`);
        console.log(`[newSurvey] resp.data: ${JSON.stringify(resp.data)}`);
        commit('NEW_SURVEY', resp.data);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  getSurvey({commit}, surveyId) {
    return SurveysService.get(surveyId)
      .then((resp) => {
        console.log(`[getSurvey] resp: ${JSON.stringify(resp)}`);
        console.log(`[getSurvey] resp.data: ${JSON.stringify(resp.data)}`);
        commit('GET_SURVEY', resp.data);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    // commit(`title/${SET_TITLE}`);
  },

  getAllSurveys({commit}) {
    return SurveysService.index()
      .then((resp) => {
        console.log(`[getAllSurveys] resp: ${JSON.stringify(resp)}`);
        commit('SET_SURVEYS', resp.data.data);
        return resp.data.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  deleteSurvey({commit, state}) {}, // just deactivate it

  createSurvey({commit, state}) {},

  editSurvey ({commit, state}) {
    console.log(`[editSurvey] state=${JSON.stringify(state)}`);
    let formData = createSurveyFormData(state.survey);
    // formData.append('newBanner', state.survey.banner);
    return SurveysService.update(state.survey.id, formData)
      .then((resp) => {
        console.log(`[editSurvey] resp=${JSON.stringify(resp)}`);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  toggleSurvey({commit, state}, toggleUrl) {
    return SurveysService.patch(toggleUrl)
      .then((resp) => {
        console.log(`[toggleSurvey] resp=${JSON.stringify(resp)}`);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
};

// const modules = {
//   question
// };

// export const getters = {
//   survey(state) {
//     // console.log(`getters returning survey: ${JSON.stringify(state.survey)}`);
//     return state.survey;
//   },
//   rewards(state) {
//     return state.rewards;
//   },
//   surveyTypes(state) {
//     return state.surveyTypes;
//   },
//   surveyLocations(state) {
//     return state.survey.surveyLocations;
//   },
//   surveyQuestions(state) {
//     return state.survey.surveyQuestions;
//   }
// };

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export const survey = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
