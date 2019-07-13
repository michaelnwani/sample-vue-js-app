import Dashboard from '../views/dashboard/Dashboard';
import store from '../store/index';

export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true
    }
  }
];
