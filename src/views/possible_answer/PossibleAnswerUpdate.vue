<template lang="pug">
  div(class="form-group possible-answer-fields")
    label(for="answer") Answer:
    input(class='form-control answer-text-field'
          type='text'
          placeholder='Enter multiple choice'
          name='answer'
          required='true'
          v-model='answer'
    )

    button(class='btn btn-secondary btn-sm possible-answer-fields' @click='removeSelf') X
</template>

<script>
import store from '@/store';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'possibleAnswerUpdate',
  props: {
    questionIdx: Number,
    possibleAnswer: Object,
    possibleAnswerIdx: Number
  },
  computed: {
    ...mapState(['survey']),
    answer: {
      set(answer) {
        this.$store.commit('survey/SET_POSSIBLE_ANSWER', {
          questionIdx: this.questionIdx,
          possibleAnswerIdx: this.possibleAnswerIdx,
          answer
        });
      },
      get() {
        return this.possibleAnswer.answer;
      }
    }
  },
  methods: {
    ...mapMutations('survey', {
      deletePossibleAnswer: 'DELETE_POSSIBLE_ANSWER'
    }),
    removeSelf() {
      this.deletePossibleAnswer({
        questionIdx: this.questionIdx,
        possibleAnswerIdx: this.possibleAnswerIdx
      });
    }
  }
};
</script>
