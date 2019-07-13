import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import AuthService from '@/common/auth.service';
import { API_URL, DEV_API_URL } from './config';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    console.log(`[ApiService] flubflub. process.env.NODE_ENV = ${process.env.NODE_ENV}`);
    console.log(`[ApiService] flubflub. process.env.PORT = ${process.env.PORT}`);
    Vue.axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? API_URL : DEV_API_URL;
    Vue.axios.defaults.withCredentials = true;
  },

  setHeader(token) {
    Vue.axios.defaults.headers.common['Authorization'] = AuthService.getToken();
  },

  setInterceptors(router) {
    console.log(`[setInterceptors]`);

    Vue.axios.interceptors.request.use(function(req) {
      console.log(`[interceptor] req=${JSON.stringify(req)}`);
      return req;
    }, function(err) {
      // Do something with response error.
      router.push('/');
      return Promise.reject(err);
    });

    Vue.axios.interceptors.response.use(function(res) {
      console.log(`[interceptor] res: ${JSON.stringify(res)}`);
      return res;
    }, function(err) {
      // Do something with response error. 4xx automatically comes here
      var response = err.response;
      console.log(`[interceptor err] response: ${JSON.stringify(response)}`);
      if (response.status > 400) {
        console.log('in here');
        router.push('/');
      } else {
        location.reload();
      }
      return Promise.reject(err);
    });
  },

  get(resource, slug = '') {
    return Vue.axios
      .get(`${resource}/${slug}`)
      .catch((error) => {
        throw new Error(`ApiService ${error}`);
      });
  },

  post(resource, params = ``) {
    return Vue.axios
      .post(`${resource}`, params);
  },

  postWithSlug(resource, slug, params, config) {
    console.log(`[postWithSlug] params=${JSON.stringify(params)}`);
    return Vue.axios
      .post(`${resource}/${slug}`, params, config)
      .catch((error) => {
        throw new Error(`ApiService ${error}`);
      });
  },

  patch(resource, params = ``) {
    return Vue.axios
      .patch(`${resource}`, params);
  },

  update(resource, slug, params, config) {
    console.log(`[update] params=${JSON.stringify(params)}`);
    return Vue.axios
      .put(`${resource}/${slug}`, params, config)
      .catch((error) => {
        throw new Error(`ApiService ${error}`);
      });
  },

  // update(resource, slug, data, config) {
  //   return Vue.axios
  //     .put(`${resource}/${slug}`, {
  //       data: data,
  //       config: config
  //     })
  //     .catch((error) => {
  //       throw new Error(`ApiService ${error}`);
  //     });
  // },

  put(resource, params) {
    return Vue.axios
      .put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios
      .delete(resource)
      .catch((error) => {
        throw new Error(`ApiService ${error}`);
      });
  }
};

export default ApiService;

export const SessionService = {
  get(slug) {
    return ApiService.get('login', slug);
  },

  login(params) {
    return ApiService.post('login', params);
  },

  logout() {
    return ApiService.delete('logout');
  }
};

export const SurveysService = {
  index() {
    return ApiService.get('surveys');
  },

  get(slug) {
    return ApiService.get('surveys', slug);
  },

  create(params) {

  },

  update(slug, formData) {
    return ApiService.update(
      'surveys',
      slug,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
  },

  destroy(slug) {

  },

  patch(resource) {
    return ApiService.patch(
      resource
    );
  },

  post(resource) {
    return ApiService.post(
      resource
    );
  }
};

export const RewardsService = {
  index() {
    return ApiService.get('rewards');
  },

  get(slug) {
    return ApiService.get('rewards', slug);
  },

  create(params) {

  },

  update(slug, formData) {
    return ApiService.update(
      'rewards',
      slug,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
  },

  destroy(slug) {

  },

  patch(resource) {
    return ApiService.patch(
      resource
    );
  },

  post(resource) {
    return ApiService.post(
      resource
    );
  }
};

export const DashboardService = {
  index() {
    return ApiService.get('dashboard');
  },

  get(slug) {
    return ApiService.get('dashboard', slug);
  }
};

export const YmcaApiService = {
  get(slug) {
    return ApiService.get('ymca', slug);
  },

  create(slug, formData) {
    return ApiService.postWithSlug(
      'ymca',
      slug,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
  }
};
