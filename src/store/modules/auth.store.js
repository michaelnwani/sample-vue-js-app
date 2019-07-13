// Vue
import Vue from 'vue';

// pathify
import { make } from 'vuex-pathify';
import { Login, createLogin } from '../../models/Login';
import { Client, createClient } from '../../models/Client';

// local files
import AuthService from '../../common/auth.service';
import { default as ApiService, SessionService } from '../../common/api.service';

// base state
const state = {
  errors: null,
  client: new Client(),
  clientSession: {},
  isAuthenticated: AuthService.getToken() !== null,
  email: AuthService.getClientEmail(),
  brandName: AuthService.getClientBrandName(),
  status: '',
  login: new Login()
};

export const getters = {
  isAuthenticated (state) {
    return state.isAuthenticated;
  },
  authStatus (state) {
    return state.status;
  },
  login (state) {
    return state.login;
  },
  email (state) {
    return state.email;
  },
  brandName (state) {
    return state.brandName;
  }
};

export const mutations = {
  ...make.mutations(state),

  AUTH_SUCCESS (state, data) {
    console.log(`[AUTH_SUCCESS]`);
    // console.log(`[AUTH_SUCCESS] document.cookie: ${document.cookie}`);
    AuthService.saveTokens();
    state.client = createClient(data.data);
    AuthService.saveClient(state.client);
    state.isAuthenticated = AuthService.getToken() !== null;
    if (state.isAuthenticated) {
      state.email = state.client.email;
    }
  },

  AUTH_ERROR (state) {
    state.status = 'error';
  },

  PURGE_AUTH (state) {
    // state.isAuthenticated = false;
    console.log(`[PURGE_AUTH]`);
    state.client = {};
    state.errors = {};
    AuthService.destroyTokens();
    state.isAuthenticated = false;
  }
};

export const actions = {
  login({commit, dispatch}, credentials) {
    return new Promise((resolve, reject) => {
      // commit(AUTH_REQUEST);

      SessionService
        .login(credentials)
        .then(resp => {
          console.log(`[login] resp=${JSON.stringify(resp)}`);
          // console.log(`[login] document.cookie: ${document.cookie}`);
          if (resp.status === 200) {
            commit('AUTH_SUCCESS', resp.data);
          } else {
            commit('AUTH_ERROR');
          }
          // const clientSession = resp.data.session;
          // commit(AUTH_SUCCESS, clientSession);
          // localStorage.setItem('client-token', clientSession);
          // we have the client token, now log in the client
          // dispatch(USER_REQUEST);
          // console.log(`[login] response: ${JSON.stringify(resp)}`);
          // console.log(`[login] clientSession: ${JSON.stringify(clientSession)}`);
          resolve(resp);
        })
        .catch(err => {
          // commit(AUTH_ERROR, err);
          // localStorage.removeItem('client-token'); // if the request fails, remove client token if possible
          reject(err);
        });
    });
  },
  logout({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      // commit(AUTH_REQUEST);

      SessionService
        .logout()
        .then(resp => {
          console.log(`[logout] resp=${JSON.stringify(resp)}`);
          // console.log(`[login] document.cookie: ${document.cookie}`);
          commit('PURGE_AUTH');
          // if (resp.status === 'success') {
          //   commit('AUTH_SUCCESS');
          // } else {
          //   commit('AUTH_FAILURE');
          // }
          // const clientSession = resp.data.session;
          // commit(AUTH_SUCCESS, clientSession);
          // localStorage.setItem('client-token', clientSession);
          // we have the client token, now log in the client
          // dispatch(USER_REQUEST);
          // console.log(`[login] response: ${JSON.stringify(resp)}`);
          // console.log(`[login] clientSession: ${JSON.stringify(clientSession)}`);
          resolve(resp);
        })
        .catch(err => {
          // commit(AUTH_ERROR, err);
          // localStorage.removeItem('client-token'); // if the request fails, remove client token if possible
          reject(err);
        });
    });
  },

  checkAuth({commit}) {
    console.log('[CHECK_AUTH]');
    if (AuthService.getToken()) {
      ApiService.setHeader();
    } else {
      commit('PURGE_AUTH');
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
