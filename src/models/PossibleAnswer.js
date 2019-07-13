export class PossibleAnswer {
  constructor({
    id = ``,
    question_id = ``,
    answer = ``,
    freeform = ``,
    banner = ``,
    banner_width = ``,
    banner_height = ``,
    created_at = ``,
    updated_at = ``
  } = {}) {
    this.id = id;
    this.question_id = question_id;
    this.answer = answer;
    this.freeform = freeform;
    this.banner = banner;
    this.banner_width = banner_width;
    this.banner_height = banner_height;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this._destroy = false;
  }
}

export function createPossibleAnswer(data) {
  return new PossibleAnswer(data);
}

export function appendPossibleAnswersToFormData(formData, possibleAnswer, questionIdx, possibleAnswerIdx) {
  formData.append(`survey[questions_attributes][${questionIdx}][possible_answers_attributes][${possibleAnswerIdx}][answer]`, possibleAnswer.answer);
  formData.append(`survey[questions_attributes][${questionIdx}][possible_answers_attributes][${possibleAnswerIdx}][banner]`, possibleAnswer.banner);
  // formData.append(`survey[questions_attributes][${questionIdx}][possible_answers_attributes][${possibleAnswerIdx}][banner_cache]`, possibleAnswer.banner_cache);
  formData.append(`survey[questions_attributes][${questionIdx}][possible_answers_attributes][${possibleAnswerIdx}][_destroy]`, possibleAnswer._destroy);
  formData.append(`survey[questions_attributes][${questionIdx}][possible_answers_attributes][${possibleAnswerIdx}][id]`, possibleAnswer.id);
}
