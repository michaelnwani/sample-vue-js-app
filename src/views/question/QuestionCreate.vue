<template lang="pug">
  li(class="nested-fields list-group-item question-list-item")
    div(class='panel-section')
      div(class='panel-description')
        div(class='panel-title') Question {{questionIdx + 1}}
      div(class='panel-content')
        div
          div(class='add-first add-title')
            div(class='form-group')
              label(for='description') New Question:
              input(class='form-control new-question-text-field'
                    type='text'
                    placeholder='Enter a question'
                    name='description'
                    required='true'
                    v-model='description'
              )

            div(class='form-group')
              label(for='banner') Banner:
              input(
                class='form-control question_banner'
                type='file'
                accept='image/jpeg,image/gif,image/png, video/mp4, video/mpeg4'
                name='banner'
                @change='onBannerChange'
              )
              p(class='help-block')
                small Gives this question a unique banner image or video (optional).

          PossibleAnswerUpdate(
            v-for="(possibleAnswer, index) in question.possible_answers"
            v-bind:key="`possibleAnswer-${index}`"
            v-bind:questionIdx='questionIdx'
            v-bind:possibleAnswer='possibleAnswer'
            v-bind:possibleAnswerIdx='index'
          )

          div(class='form-group links')
            button(class='btn btn-primary add_question' @click='addPossibleAnswer') + Add Possible Answer
            button(class='btn btn-warning delete_question' @click='removeSelf') Delete Question
</template>

<script>
import store from '@/store';
import PossibleAnswerUpdate from '../possible_answer/PossibleAnswerUpdate';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'questionCreate',
  components: {
    PossibleAnswerUpdate
  },
  props: {
    question: Object,
    questionIdx: Number
  },
  computed: {
    ...mapState(['survey']),
    description: {
      set(description) {
        console.log(`setting description. Object.keys(this.survey): ${Object.keys(this.survey)}`);
        this.$store.commit('survey/SET_QUESTION_DESCRIPTION', { questionIdx: this.questionIdx, description });
      },
      get() {
        console.log(`setting description. Object.keys(this.survey): ${Object.keys(this.survey)}`);
        // return this.survey.survey.questions[this.questionIdx].description;
        return this.question.description;
      }
    }
  },
  methods: {
    ...mapMutations('survey', {
      deleteQuestion: 'DELETE_QUESTION'
    }),

    addPossibleAnswer() {
      this.$store.commit('survey/ADD_POSSIBLE_ANSWER', {
        questionIdx: this.questionIdx
      });
    },

    removeSelf() {
      if (confirm('Confirm?')) {
        this.deleteQuestion({ questionIdx: this.questionIdx });
      }
    },

    onBannerChange(e) {
      var files = e.target.files;
      store.commit(`survey/SET_QUESTION_BANNER`, { file: files[0], questionIdx: this.questionIdx });
    }
  }
};
</script>
