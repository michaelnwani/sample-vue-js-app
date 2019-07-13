<template lang="pug">
  div(class='row')
    div(class='main-content')
      ol(class='list-group list-group-lg')
        li(id='reward-list-item', class='list-group-item')
          div(class='panel-section')
            div(class='panel-description')
              div(class='panel-title') Reward
              div(class='panel-details')
                | Rewards are unique to your brand,
                | and will potentially be offered
                | to users upon completion of a survey.

            div(class='panel-content')
              div
                div(class='add-first add-title')
                  div(class='form-group')
                    label(for='delivery_method') Delivery Method:
                    input.form-control(
                      v-model='delivery_method'
                      type='text'
                      name='delivery_method'
                    )
                    p(class="help-block")
                      small (Optional) For your personal tracking purposes. Will not be shown to survey takers.

                  div(class='form-group')
                    label(for='lottery_ratio') Lottery Ratio:
                    select(name='lottery_ratio')
                      option(v-for="digit in lotteryRatioRange" :value="digit")
                    p(class="help-block")
                      small This value decides the percentage of users that will receive the best reward on survey completion <br>(for example, a value of 40 means 40% of users will win the best reward).

                  div(class='form-group')
                    label(for='winners_description') Winners Description:
                    textarea.form-control(
                      v-model='winners_description'
                      type='text'
                      name='winners_description'
                      placeholder='Describe the reward for survey winners'
                    )
                    p(class="help-block")
                      small This will be displayed to users that win the lottery.

                  div(class='form-group')
                    label(for='winners_redeem_link') Winners Redeem Link:
                    input.form-control(
                      v-model='winners_redeem_link'
                      type='text'
                      placeholder='Enter a URL for survey winners.'
                      name='winners_redeem_link'
                    )
                    p(class="help-block")
                      small This will be a link shown to the user that wins the lottery to claim their reward.

                  div(class='form-group')
                    label(for='winners_banner') Winners Banner:
                    input(
                      class='form-control'
                      type='file',
                      name='winners_banner',
                      accept="image/jpeg,image/gif,image/png, video/mp4, video/mpeg4"
                      @change='onWinnersBannerChange'
                    )
                    p(class="help-block")
                      small This image will be displayed to survey winners.

                  div(class='form-group')
                    label(for='default_description') Default Description:
                    textarea.form-control(
                      v-model='default_description'
                      type='text'
                      placeholder='The reward for everyone else'
                      name='default_description'
                    )
                    p(class="help-block")
                      small This will be displayed to users that don't win the lottery.

                  div(class='form-group')
                    label(for='default_redeem_link') Default Redeem Link:
                    input.form-control(
                      v-model='default_redeem_link'
                      type='text'
                      placeholder='URL for everyone else'
                      name='default_redeem_link'
                    )
                    p(class="help-block")
                      small This will be a link shown to the user that wins the lottery to claim their reward.

                  div(class='form-group')
                    label(for='default_banner') Default Banner:
                    input(
                      class='form-control'
                      type='file',
                      name='default_banner',
                      accept="image/jpeg,image/gif,image/png, video/mp4, video/mpeg4"
                      @change='onDefaultBannerChange'
                    )
                    p(class="help-block")
                      small Default image displayed to users that don't win the lottery.
                  
                  div(class='form-group')
                    button(
                      class='btn btn-success'
                      @click='submit'
                    ) Save Reward
</template>

<script>
import store from '@/store';
import { get, sync } from 'vuex-pathify';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'rewardCreate',
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch(`reward/newReward`)
    ]).then((data) => {
      // console.log(`[beforeRouteEnter] newReward resp: ${JSON.stringify(data)}`);
      next();
    });
  },
  computed: {
    reward: sync('reward/reward'),
    delivery_method: sync('reward/reward@delivery_method'),
    winners_description: sync('reward/reward@winners_description'),
    winners_redeem_link: sync('reward/reward@winners_redeem_link'),
    default_description: sync('reward/reward@default_description'),
    default_redeem_link: sync('reward/reward@default_redeem_link'),
    lotteryRatioRange: sync('reward/lotteryRatioRange')
  },
  methods: {
    ...mapMutations('survey', {
      addSurveyLocation: 'ADD_SURVEY_LOCATION'
    }),

    onWinnersBannerChange(e) {
      var files = e.target.files;
      store.commit(`survey/SET_REWARD_WINNERS_BANNER`, { file: files[0] });
    },

    onDefaultBannerChange(e) {
      var files = e.target.files;
      store.commit(`survey/SET_REWARD_DEFAULT_BANNER`, { file: files[0] });
    },

    addQuestion() {
      this.$store.commit('survey/ADD_QUESTION');
    },

    submit() {
      this.$store.dispatch('reward/submitReward');
    }
  }
};
</script>
