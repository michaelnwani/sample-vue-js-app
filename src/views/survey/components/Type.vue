<template lang="pug">
  option(
    :value='surveyType',
    :selected='isCurrentSurveyType'
  ) {{ surveyType }}
</template>

<script>
export default {
  name: 'surveyType',
  props: [
    'surveyType',
    'isCurrentSurveyType'
  ]
};
</script>
