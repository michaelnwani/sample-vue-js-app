import SurveyIndex from '../views/survey/SurveyIndex';
import SurveyDetail from '../views/survey/SurveyDetail';
import SurveyCreate from '../views/survey/SurveyCreate';
import SurveyUpdate from '../views/survey/SurveyUpdate';

export default [
  {
    path: '/surveys',
    name: 'surveyIndex',
    component: SurveyIndex,
    meta: {
      auth: true
    }
  },
  {
    path: '/surveys/new',
    name: 'surveyCreate',
    component: SurveyCreate,
    meta: {
      auth: true
    }
  },
  {
    path: '/surveys/:id',
    name: 'surveyDetail',
    component: SurveyDetail,
    meta: {
      auth: true
    }
  },
  {
    path: '/surveys/:id/edit',
    name: 'surveyUpdate',
    component: SurveyUpdate,
    meta: {
      auth: true
    }
  }
];
