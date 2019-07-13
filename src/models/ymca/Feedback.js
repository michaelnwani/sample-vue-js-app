export class Feedback {
  constructor({
    foo = ''
  } = {}) {
    this.foo = foo;
  }
}

export function createFeedback(data) {
  return Object.freeze(new Feedback(data));
}

export function createFeedbackFormData(data) {
  let formData = new FormData();
  formData.append('feedback_survey[answer]', data.answer);
  formData.append('feedback_survey[ymca_feedback_question_id]', data.ymca_feedback_question_id);

  // GET temp user id from cookies
  // formData.append('feedback_survey[ymca_temp_user_id]', data.answer3);
  return formData;
}

export function createUserInfoFormData(data) {
  let formData = new FormData();
  formData.append('user_info[name]', data.name);
  formData.append('user_info[email]', data.email);
  formData.append('user_info[phone]', data.phone);
  return formData;
}
