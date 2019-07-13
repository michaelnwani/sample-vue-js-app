import RewardIndex from '../views/reward/RewardIndex';
import RewardDetail from '../views/reward/RewardDetail';
import RewardCreate from '../views/reward/RewardCreate';
import RewardUpdate from '../views/reward/RewardUpdate';

export default [
  {
    path: '/rewards',
    name: 'RewardIndex',
    component: RewardIndex,
    meta: {
      auth: true
    }
  },
  {
    path: '/rewards/new',
    name: 'RewardCreate',
    component: RewardCreate,
    meta: {
      auth: true
    }
  },
  {
    path: '/rewards/:id',
    name: 'RewardDetail',
    component: RewardDetail,
    meta: {
      auth: true
    }
  },
  {
    path: '/rewards/:id/edit',
    name: 'RewardUpdate',
    component: RewardUpdate,
    meta: {
      auth: true
    }
  }
];
