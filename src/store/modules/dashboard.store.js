// Vue
import Vue from 'vue';

// pathify
import { make } from 'vuex-pathify';

// local files
import { default as ApiService, DashboardService } from '../../common/api.service';

// Used to prepare store data to be sent to the API
import { Dashboard, createDashboard } from '../../models/Dashboard';

// base state
const state = {
  dashboard: new Dashboard(),
  error: false,
  success: false
};

// getter overrides
export const getters = {
  dashboard (state) {
    return state.dashboard;
  }
};

// automatically generate mutations
export const mutations = {
  ...make.mutations(state),

  /*************** Dashboard Mutations ***************/

  NEW_DASHBOARD (state, data) {
    state.reward = createDashboard(data.reward);
  },

  GET_DASHBOARD (state, data) {
    state.reward = createDashboard(data.reward);
    for (var i = 0; i <= state.reward.lottery_ratio; i++) {
      state.lotteryRatioRange.push(i);
    }
  },

  SET_DASHBOARDS (state, rewards) {
    rewards.forEach(reward => {
      state.rewards.push(createDashboard(reward));
    });
  },

  SET_MAIN_DASHBOARD (state, data) {
    console.log(`[SET_MAIN_DASHBOARD]`);
    state.dashboard = createDashboard(data);
  }
};

// manually-created actions
export const actions = {
  newDashboard({commit}) {
    return DashboardService.get('new')
      .then((resp) => {
        console.log(`[newDashboard] resp: ${JSON.stringify(resp)}`);
        console.log(`[newDashboard] resp.data: ${JSON.stringify(resp.data)}`);
        commit('NEW_DASHBOARD', resp.data);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  getUsersDashboard({commit}) {
    return DashboardService.get('users')
      .then((resp) => {
        console.log(`[getUsersDashboard] resp: ${JSON.stringify(resp)}`);
        // console.log(`[getUsersDashboard] resp.data: ${JSON.stringify(resp.data)}`);
        // commit('GET_SURVEY', resp.data);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    // commit(`title/${SET_TITLE}`);
  },

  getMainDashboard({commit}) {
    return DashboardService.get('main')
      .then((resp) => {
        console.log(`[getMainDashboard] resp: ${JSON.stringify(resp)}`);
        // console.log(`[getUsersDashboard] resp.data: ${JSON.stringify(resp.data)}`);
        commit('SET_MAIN_DASHBOARD', resp.data);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    // commit(`title/${SET_TITLE}`);
  },

  getAllDashboards({commit}) {
    return DashboardService.index()
      .then((resp) => {
        console.log(`[getAllDashboards] resp: ${JSON.stringify(resp)}`);
        commit('SET_DASHBOARDS', resp.data.data);
        return resp.data.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  deleteDashboard({commit, state}) {}, // just deactivate it

  createDashboard({commit, state}) {}
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export const dashboard = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
