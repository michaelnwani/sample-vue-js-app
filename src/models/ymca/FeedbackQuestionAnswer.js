export class FeedbackQuestionAnswer {
  constructor({
    foo = ``
  } = {}) {
    this.foo = foo;
  }
}

export function createFeedbackQuestionAnswer(data) {
  return new FeedbackQuestionAnswer(data);
}
