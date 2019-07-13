<template lang="pug">
  div.form-group
    i {{ possibleAnswer.answer }}
</template>

<script>
export default {
  name: 'possibleAnswerDetail',
  props: {
    questionIdx: Number,
    possibleAnswer: Object,
    possibleAnswerIdx: Number
  }
};
</script>
