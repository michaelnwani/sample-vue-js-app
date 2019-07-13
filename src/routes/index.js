import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import privacyRoutes from './privacy';
import signupRoutes from './signup';
import loginRoutes from './login';
import logoutRoutes from './logout';
import surveysRoutes from './surveys';
import clientRoutes from './clients';
import rewardsRoutes from './rewards';
import dashboardRoutes from './dashboard';
import ymcaRoutes from './ymca';
import store from '../store/index';
import ApiService from '../common/api.service';
import { CHECK_AUTH } from '@/store/actionTypes';

Vue.use(Router);

const isAuthenticated = (to, from, next) => {
  return store.getters['auth/isAuthenticated'];
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];

const routes = baseRoutes.concat(
  privacyRoutes,
  signupRoutes,
  loginRoutes,
  logoutRoutes,
  surveysRoutes,
  clientRoutes,
  rewardsRoutes,
  dashboardRoutes,
  ymcaRoutes
);

const router = new Router({
  mode: 'history',
  routes: routes
});

ApiService.init();
ApiService.setInterceptors(router);

// Ensure we check auth before each page load.
router.beforeEach((to, from, next) => {
  // console.log(`router.beforeEach. to=${to.path}, from=${from.path}`);
  if (to.meta.auth && !isAuthenticated(to, from, next)) {
    return next('/login');
  }

  if (to.path === '/login' && isAuthenticated(to, from, next)) {
    console.log("[login route] already authenticated, can't visit login route");
    return next('/'); // TODO: update to dashboard or surveys list
  }

  next();
});

export default router;
