import { createQuestion, appendQuestionsToFormData } from './Question';
import { createReward } from './Reward';
import { createSurveyLocation, appendSurveyLocationsToFormData } from './SurveyLocation';

export class Survey {
  constructor({
    id = ``,
    bannerModel = {},
    brand_id = ``,
    client_id = ``,
    title = ``,
    description = ``,
    active = ``,
    banner = {},
    reward_id = ``,
    activated_at = ``,
    expires_at = ``,
    published = false,
    banner_width = ``,
    banner_height = ``,
    survey_type = `default`,
    group_id = ``,
    deleted = false,
    created_at = ``,
    updated_at = ``,
    brand = {},
    reward = {},
    survey_locations = [],
    questions = [],
    bannerUrl = ``,
    newBannerName = ``
  } = {}) {
    this.id = id;
    // this.url = url;

    this.detailUrl = 'surveys/' + this.id;
    this.editUrl = this.id + '/edit'; // applied to an <a> unlike the <form>'s below.
    this.publishUrl = 'surveys/' + this.id + '/publish_survey';
    this.unpublishUrl = 'surveys/' + this.id + '/unpublish_survey';
    this.activateUrl = 'surveys/' + this.id + '/activate_survey';
    this.deactivateUrl = 'surveys/' + this.id + '/deactivate_survey';
    this.destroyUrl = 'surveys/' + this.id + '/destroy';

    this.bannerModel = bannerModel;
    this.brand_id = brand_id;
    this.client_id = client_id;
    this.title = title;
    this.description = description;
    this.active = active;
    this.banner = banner;
    this.reward_id = reward_id;
    this.activated_at = activated_at;
    this.expires_at = expires_at;
    this.published = published;
    this.banner_width = banner_width;
    this.banner_height = banner_height;
    this.survey_type = survey_type;
    this.group_id = group_id;
    this.deleted = deleted;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.brand = brand;
    this.reward = createReward(reward);

    this.survey_locations = [];
    survey_locations.forEach(data => {
      this.survey_locations.push(createSurveyLocation(data));
    });

    this.questions = [];
    questions.forEach(data => {
      this.questions.push(createQuestion(data));
    });

    // this.questions = questions;
    // console.log(`banner=${JSON.stringify(banner)}`);
    if (banner.url) {
      if (banner.url.indexOf('https://app-redacted.s3.amazonaws.com') >= 0) {
        this.bannerUrl = banner.url;
      } else {
        this.bannerUrl = 'https://app-redacted.s3.amazonaws.com' + banner.url;
      }
      console.log(`banner=${banner}`);
      console.log(`banner=${Object.keys(banner)}`);
      console.log(`banner.url=${banner.url}`);
      this.bannerType = this.bannerUrl.split('.').pop();
    }

    this.isVideo = this.bannerType === 'mp4' || this.bannerType === 'mpeg';
    this.newBannerName = newBannerName;
  }
}

export function createSurvey(data) {
  var survey = new Survey(data);
  // survey.bannerType = data.bannerType;
  // survey.bannerUrl = data.bannerUrl;
  // survey.isVideo = data.bannerType === 'video';

  return survey;
}

export function createSurveyFormData(survey) {
  let formData = new FormData();
  formData.append('survey[id]', survey.id);
  formData.append('survey[description]', survey.description);
  formData.append('survey[title]', survey.title);

  survey.survey_locations.forEach((surveyLocation, idx) => {
    appendSurveyLocationsToFormData(formData, surveyLocation, idx);
  });

  formData.append('survey[brand_id]', survey.brand_id);
  formData.append('survey[client_id]', survey.client_id);
  formData.append('survey[description]', survey.description);
  formData.append('survey[banner]', survey.banner);
  formData.append('survey[reward_id]', survey.reward_id);

  if (survey.survey_type === 'default') {
    survey.survey_type_id = 1;
  } else {
    survey.survey_type_id = 2;
  }

  // formData.append('survey[survey_type]', survey.survey_type);

  formData.append('survey[survey_type_id]', survey.survey_type_id);

  survey.questions.forEach((question, idx) => {
    appendQuestionsToFormData(formData, question, idx);
  });

  // formData.append('survey', survey);
  return formData;
}
