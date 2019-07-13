<template lang="pug">
  div(class='row')
    div(class='main-content')
      ol(class='list-group list-group-lg')
        li(id='survey-list-item', class='list-group-item')
          div(class='panel-section')
            div(class='panel-description')
              div(class='panel-title') Survey
              div(class='panel-details')
                | A survey is made up of questions, 
                | with varying (potential) answers, 
                | and a potential reward when completed.

            div(class='panel-content')
              div
                div(class='add-first add-title')
                  div(class='form-group')
                    label(for='title') Title:
                    input.form-control(
                      v-model='title'
                      type='text'
                      placeholder='Enter a survey title'
                      name='title'
                      required='true'
                    )

                  div(class='form-group')
                    label(for='description') Description:
                    textarea.form-control(
                      v-model='description'
                      type='text'
                      placeholder='Enter a survey description'
                      name='description'
                      required='true'
                    )

                  div(class='form-group')
                    label(for='new_banner') New Banner:
                    input(
                      class='form-control'
                      type='file',
                      name='new_banner',
                      accept="image/jpeg,image/gif,image/png, video/mp4, video/mpeg4"
                      @change='onBannerChange'
                    )
                    p(class="help-block")
                      small This will be used for every question by default.

                  div(class="form-group survey-reward")
                    label(for='reward') Reward:
                    select(name='reward')
                      RewardOption(
                        v-for='reward in rewards'
                        v-bind:key='reward.id'
                        v-bind:winnersDescription='reward.winners_description'
                        v-bind:isCurrentReward='reward.id === survey.reward_id'
                      )

                  div(class='form-group')
                    label(for='type') Survey Type:
                    select(name='type')
                      SurveyType(
                        v-for='surveyType in surveyTypes'
                        v-bind:key='surveyType'
                        v-bind:surveyType='surveyType'
                        v-bind:isCurrentSurveyType='surveyType === survey.survey_type'
                      )

                  LocationUpdate(
                    v-for="(location, index) in locations"
                    v-bind:key="`location-${index}`"
                    v-bind:location="location"
                    v-bind:locationIdx="index"
                  )

                  div(class='form-group survey-location-links')
                    button(class='btn btn-primary add_location' @click='addSurveyLocation') + Add Geolocation

                  div(class='form-group links')
                    button(
                      class='btn btn-primary add_question'
                      @click='addQuestion'
                    ) + Add Question

        QuestionCreate(
          v-for="(question, index) in questions"
          v-bind:key="`question-${index}`"
          v-bind:question='question'
          v-bind:questionIdx='index'
        )

        button(
          class='btn btn-success post_survey'
          @click='submit'
        ) Finish Survey
</template>

<script>
import store from '@/store';
import LocationUpdate from './components/location/LocationUpdate';
import QuestionCreate from '../question/QuestionCreate';
import SurveyType from './components/Type';
import RewardOption from '../reward/components/RewardOption';
import { get, sync } from 'vuex-pathify';
import { mapState, mapMutations } from 'vuex';
import {
  GET_SURVEY,
  ADD_SURVEY_LOCATION,
  REMOVE_SURVEY_LOCATION,
  REMOVE_SURVEY_QUESTION,
  ADD_ROW,
  SET_BANNER,
  SURVEY_EDIT
} from '@/store/actionTypes';
export default {
  name: 'surveyCreate',
  components: {
    LocationUpdate,
    QuestionCreate,
    SurveyType,
    RewardOption
  },
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch(`survey/newSurvey`)
    ]).then((data) => {
      console.log(`[beforeRouteEnter] getSurvey resp: ${JSON.stringify(data)}`);
      next();
    });
  },
  computed: {
    title: sync('survey/survey@title'),
    description: sync('survey/survey@description'),
    survey: sync('survey/survey'),
    questions: sync('survey/survey@questions'),
    locations: sync('survey/survey@survey_locations'),
    ...mapState('survey', [
      'rewards',
      'surveyTypes'
    ])
  },
  methods: {
    ...mapMutations('survey', {
      addSurveyLocation: 'ADD_SURVEY_LOCATION'
    }),

    onBannerChange(e) {
      var files = e.target.files;
      store.commit(`survey/SET_SURVEY_BANNER`, { file: files[0] });
    },

    addQuestion() {
      this.$store.commit('survey/ADD_QUESTION');
    },

    submit() {
      this.$store.dispatch('survey/editSurvey'); // should have everything it needs.
    }
  }
};
</script>
