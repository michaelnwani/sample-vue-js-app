<template lang="pug">
  ul(class='surveys')
    li(
      v-for='survey in surveys'
    )
      a(:href='survey.detailUrl') {{ survey.title }} |
      p status:
      span(
        v-if='survey.active'
        style='color:blue'
      ) active
      span(
        v-else
        style='color:red'
      ) inactive

      span(
        v-if='survey.published'
        style='color:blue'
      ) published
      span(
        v-else
        style='color:red'
      ) unpublished

      | {{ survey.updated_at }}

</template>

<script>
import store from '@/store';
import { get, sync } from 'vuex-pathify';

export default {
  name: 'surveyIndex',
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch(`survey/getAllSurveys`)
    ]).then((data) => {
      console.log(`[beforeRouteEnter] getAllSurveys resp: ${JSON.stringify(data)}`);
      next();
    });
  },
  computed: {
    surveys: sync('survey/surveys')
  },
  methods: {}
};
</script>
