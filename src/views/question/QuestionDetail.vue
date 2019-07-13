<template lang="pug">
  li(class='list-group-item question-list-item')
    div(class='panel-section')
      div(class='panel-description')
        div(class='panel-title') {{ question.description }}

        div(class='panel-description')
          video(
            v-if="question.isVideo"
            width="350",
            height="350",
            controls=true,
            :src="question.bannerUrl"
          )
          img(
            v-else,
            width="350",
            height="350",
            :src="question.bannerUrl"
          )

          div(class='btn-group-vertical' role='group')
            form(
              v-if="question.active"
              @submit.prevent='disableUrl'
            )
              button.btn.btn-warning(type='submit') Disable
            form(
              v-else
              @submit.prevent='enableUrl'
            )
              button.btn.btn-warning(type='submit') Enable

      div(class='panel-content')
        div
          div(class='add-first add-title')
            div(class='form-group')
              u(v-if="question.isFreeformAnswer") Freeform Answer
              u(v-else) Possible Answers

            PossibleAnswerDetail(
              v-for="(possibleAnswer, index) in question.possible_answers"
              v-bind:key="`possibleAnswer-${index}`"
              v-bind:questionIdx='questionIdx'
              v-bind:possibleAnswer='possibleAnswer'
              v-bind:possibleAnswerIdx='index'
            )

</template>

<script>
import PossibleAnswerDetail from '../possible_answer/PossibleAnswerDetail';

export default {
  name: 'questionDetail',
  components: {
    PossibleAnswerDetail
  },
  props: {
    question: Object,
    questionIdx: Number
  },
  methods: {
    disableUrl() {
      if (confirm('Are you sure you want to disable this question?')) {
        console.log(`[disableUrl] lorem ipsum`);
      }
    },
    enableUrl() {
      if (confirm('This question will become visible to users. Are you sure you want to enable it?')) {
        console.log(`[enableUrl] lorem ipsum`);
      }
    }
  }
};
</script>
