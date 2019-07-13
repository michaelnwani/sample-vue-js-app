<template lang="pug">
  div(class='row')
    div(class='main-content')
      ol(class='list-group list-group-lg')
        li(id='survey-list-item', class='list-group-item')
          div(class='panel-section')
            div(class='panel-description', v-if="survey.reward")
              div(class='panel-title')
                p {{ title }}
              div(class='panel-details')
                p {{ description }} (created {{ survey.created_at }} ago.)
              div(class='panel-details')
                p Winners Reward: {{survey.reward.winners_description}} (Redeem Link: {{survey.reward.winners_redeem_link}})
              div(class='panel-details')
                p Default Reward: {{survey.reward.default_description}} (Redeem Link: {{survey.reward.default_redeem_link}})
              div(class='panel-details')
                p Survey Type: {{ survey_type }}

              div(class='btn-group-vertical', role='group')
                a(class='btn btn-primary' :href="survey.editUrl") Edit

                form(
                  v-if="survey.published"
                  method='POST'
                  @submit.prevent='unpublish'
                )
                  button(
                    class='btn btn-info'
                    type='submit'
                  ) Unpublish

                form(
                  v-else
                  method='POST'
                  @submit.prevent='publish'
                )
                  button(
                    class='btn btn-info'
                    type='submit'
                  ) Publish Draft

                form(
                  v-if="survey.active"
                  method='POST'
                  @submit.prevent='deactivate'
                )
                  button(
                    class='btn btn-warning'
                    type='submit'
                  ) Deactivate

                form(
                  v-else
                  method='POST'
                  @submit.prevent='activate'
                )
                  button(
                    class='btn btn-warning'
                    type='submit'
                  ) Activate

                form(
                  method='POST'
                  @submit.prevent='destroy'
                )
                  button(
                    class='btn btn-danger'
                    type='submit'
                  ) Delete Survey

            div(class='panel-content')
              div
                div(class='add-first add-title')
                  video(
                    v-if="survey.isVideo"
                    width="350"
                    height="350"
                    controls=true
                    :src='survey.bannerUrl'
                  )
                  img(
                    v-else
                    width="350"
                    height="350"
                    :src='survey.bannerUrl'
                  )

                LocationDetail(
                  v-for="loc in survey.survey_locations"
                  v-bind:key="loc.lat"
                  v-bind:lat="loc.lat"
                  v-bind:lng="loc.lng"
                  v-bind:distance="loc.distance"
                )

        QuestionDetail(
          v-for="(question, index) in questions"
          v-bind:key="`question-${index}`"
          v-bind:question='question'
          v-bind:questionIdx='index'
        )
</template>

<script>
import store from '@/store/index';
import LocationDetail from './components/location/LocationDetail';
import QuestionDetail from '../question/QuestionDetail';
import { get, sync } from 'vuex-pathify';
import { GET_SURVEY } from '@/store/actionTypes';
import { mapGetters } from 'vuex';

export default {
  name: 'surveyDetail',
  components: {
    LocationDetail,
    QuestionDetail
  },
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch(`survey/getSurvey`, `${to.params.id}`)
    ]).then((data) => {
      // console.log(`[beforeRouteEnter] getSurvey resp: ${JSON.stringify(data)}`);
      next();
    });
  },
  computed: {
    title: sync('survey/survey@title'),
    description: sync('survey/survey@description'),
    survey: sync('survey/survey'),
    questions: sync('survey/survey@questions'),
    locations: sync('survey/survey@survey_locations'),
    survey_type: sync('survey/survey@survey_type')
  },
  methods: {
    unpublish() {
      console.log(`this.survey: ${this.survey}`);
      if (confirm(`Are you sure you want to unpublish this survey?`)) {
        // do thing
        // this.survey.unpublishUrl
        this.$store.dispatch('survey/toggleSurvey', this.survey.unpublishUrl).then((resp) => {
          // reload the current page
          // there's better ways to do this (just update its state)
          this.$store.commit('survey/UNPUBLISH_SURVEY');
          // window.location.reload();
        }).catch((err) => {
          console.log(`[unpublish] err: ${JSON.stringify(err)}`);
        });
      }
    },
    publish() {
      if (confirm('Are you sure you want to publish this draft?')) {
        // survey.publishUrl
        this.$store.dispatch('survey/toggleSurvey', this.survey.publishUrl).then((resp) => {
          // reload the current page
          this.$store.commit('survey/PUBLISH_SURVEY');
          // window.location.reload();
        }).catch((err) => {
          console.log(`[publish] err: ${JSON.stringify(err)}`);
        });
      }
    },
    deactivate() {
      if (confirm('Are you sure you want to deactivate this?')) {
        // survey.deactivateUrl"
        this.$store.dispatch('survey/toggleSurvey', this.survey.deactivateUrl).then((resp) => {
          // reload the current page
          this.$store.commit('survey/DEACTIVATE_SURVEY');
          // window.location.reload();
        }).catch((err) => {
          console.log(`[deactivate] err: ${JSON.stringify(err)}`);
        });
      }
    },
    activate() {
      if (confirm('Are you sure you want to activate this?')) {
        // survey.activateUrl
        this.$store.dispatch('survey/toggleSurvey', this.survey.activateUrl).then((resp) => {
          // reload the current page
          this.$store.commit('survey/ACTIVATE_SURVEY');
          // window.location.reload();
        }).catch((err) => {
          console.log(`[activate] err: ${JSON.stringify(err)}`);
        });
      }
    },
    destroy() {
      if (confirm('This survey will be gone forever. Are you sure?')) {
        // survey.destroyUrl
        this.$store.dispatch('survey/toggleSurvey', this.survey.destroyUrl).then((resp) => {
          // reload the current page
          this.$router.push('/surveys');
        }).catch((err) => {
          console.log(`[destroy] err: ${JSON.stringify(err)}`);
        });
      }
    }
  }
};
</script>
