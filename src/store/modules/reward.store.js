// Vue
import Vue from 'vue';

// pathify
import { make } from 'vuex-pathify';

// local files
import { default as ApiService, RewardsService } from '../../common/api.service';

// Used to prepare store data to be sent to the API
import { Reward, createReward, createRewardFormData } from '../../models/Reward';

// base state
const state = {
  reward: new Reward(),
  rewards: [],
  lotteryRatioRange: [],
  error: false,
  success: false
};

// getter overrides
export const getters = {
  reward (state) {
    return state.reward;
  },
  lotteryRatioRange (state) {
    return state.lotteryRatioRange;
  }
};

// automatically generate mutations
export const mutations = {
  ...make.mutations(state),

  /*************** Reward Mutations ***************/

  NEW_REWARD (state, data) {
    state.reward = createReward(data.reward);
  },

  GET_REWARD (state, data) {
    state.reward = createReward(data.reward);
    for (var i = 0; i <= state.reward.lottery_ratio; i++) {
      state.lotteryRatioRange.push(i);
    }
  },

  SET_REWARDS (state, rewards) {
    rewards.forEach(reward => {
      state.rewards.push(createReward(reward));
    });
  },

  SET_REWARD_WINNERS_BANNER (state, data) {
    console.log(`[SET_REWARD_WINNERS_BANNER]`);
    state.reward.winners_banner = data.file;
  },

  SET_REWARD_DEFAULT_BANNER (state, data) {
    console.log(`[SET_REWARD_DEFAULT_BANNER]`);
    state.reward.default_banner = data.file;
  }
};

// manually-created actions
export const actions = {
  newReward({commit}) {
    return RewardsService.get('new')
      .then((resp) => {
        console.log(`[newReward] resp: ${JSON.stringify(resp)}`);
        console.log(`[newReward] resp.data: ${JSON.stringify(resp.data)}`);
        commit('NEW_REWARD', resp.data);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  getReward({commit}, rewardId) {
    return RewardsService.get(rewardId)
      .then((resp) => {
        console.log(`[getReward] resp: ${JSON.stringify(resp)}`);
        console.log(`[getReward] resp.data: ${JSON.stringify(resp.data)}`);
        commit('GET_SURVEY', resp.data);
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    // commit(`title/${SET_TITLE}`);
  },

  getAllRewards({commit}) {
    return RewardsService.index()
      .then((resp) => {
        console.log(`[getAllRewards] resp: ${JSON.stringify(resp)}`);
        commit('SET_REWARDS', resp.data.data);
        return resp.data.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  deleteReward({commit, state}) {}, // just deactivate it

  createReward({commit, state}) {},

  editReward ({commit, state}) {
    console.log(`[editReward] state=${JSON.stringify(state)}`);
    let formData = createRewardFormData(state.reward);
    return RewardsService.update(state.reward.id, formData)
      .then((resp) => {
        console.log(`[editReward] resp=${JSON.stringify(resp)}`);
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

export const reward = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
