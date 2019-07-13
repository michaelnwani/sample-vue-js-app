import { createFeedbackQuestionAnswer } from './FeedbackQuestionAnswer';

export class FeedbackQuestion {
  constructor({
    question_id = ``,
    question_description = ``,
    type = ``,
    possible_answers = []
  } = {}) {
    this.question_id = question_id;
    this.question_description = question_description;
    this.type = type;
    this.possible_answers = [];
    possible_answers.forEach(data => {
      this.possible_answers.push(data);
    });
    this.answer = '';
  }
}

export function createFeedbackQuestion(data) {
  return new FeedbackQuestion(data);
}
