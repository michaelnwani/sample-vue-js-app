import { createPossibleAnswer, appendPossibleAnswersToFormData } from './PossibleAnswer';

export class Question {
  constructor({
    id = ``,
    client_id = ``,
    description = ``,
    active = true,
    banner = ``,
    banner_width = ``,
    banner_height = ``,
    created_at = ``,
    updated_at = ``,
    possible_answers = []
  } = {}) {
    this.id = id;

    this.client_id = client_id;
    this.description = description;
    this.active = active;
    this.banner = banner;
    this.banner_width = banner_width;
    this.banner_height = banner_height;
    this.created_at = created_at;
    this.updated_at = updated_at;

    this.possible_answers = [];
    possible_answers.forEach(data => {
      this.possible_answers.push(createPossibleAnswer(data));
    });

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
    this.isFreeformAnswer = this.possible_answers.length > 0 && this.possible_answers[0].freeform === true;
    this._destroy = false;
  }
}

export function createQuestion(data) {
  return new Question(data);
}

export function appendQuestionsToFormData(formData, question, questionIdx) {
  formData.append(`survey[questions_attributes][${questionIdx}][client_id]`, question.client_id);
  formData.append(`survey[questions_attributes][${questionIdx}][description]`, question.description);
  formData.append(`survey[questions_attributes][${questionIdx}][banner]`, question.banner);
  // formData.append(`survey[questions_attributes][${questionIdx}][banner_cache]`, question.banner_cache);
  formData.append(`survey[questions_attributes][${questionIdx}][_destroy]`, question._destroy);
  formData.append(`survey[questions_attributes][${questionIdx}][id]`, question.id);

  question.possible_answers.forEach((possibleAnswer, possibleAnswerIdx) => {
    appendPossibleAnswersToFormData(formData, possibleAnswer, questionIdx, possibleAnswerIdx);
  });
}
