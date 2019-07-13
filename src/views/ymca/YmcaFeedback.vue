<template lang="pug">
  b-container
    h2(class="text-center") We Want to Hear From You!
    h3(class="text-center")
      |Our goal is to make every experience at the Y exceptional.
      |We value your candid feedback and appreciate you taking the time to complete this survey to help us be better for you.
      |As a thank you, you’ll receive 100 Y Rewards points once you complete the survey.

    b-form-group
      transition(
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:before-leave="beforeLeave"
        v-on:leave="leave"

        v-bind:css="false"
        mode="out-in"
      )
        b-form-group(
          v-for="(feedbackQuestion, index) in feedbackQuestions"
          v-if="idx == index"
          :label=`feedbackQuestion.question_description`
          :key="`question-${feedbackQuestion.question_id}`"
          label-text-align="center"
        )

          b-row(v-if="feedbackQuestion.type === 'multiple_choice'")
            b-col
            b-col
              b-form-radio-group(
                v-model="feedbackQuestion.answer"
                :options="feedbackQuestion.possible_answers"
                stacked
                :name="`question-${feedbackQuestion.question_id}-name`"
                :key="`question-${feedbackQuestion.question_id}-key`"
              )
            b-col

          b-form-textarea(
            v-else
            v-model="feedbackQuestion.answer"
            placeholder="Enter something"
            :rows="3"
            :max-rows="6"
          )

        b-form-group(
          v-if="idx >= feedbackQuestions.length && !feedbackCompleted"
          label="Please tell us a little about yourself so we can thank you for your feedback."
          label-size="lg"
          :key="`idx-${idx}`"
        )
          b-form-group(
            label="Name"
            label-for="name"
          )
            b-form-input(id="name" v-model='name')

          b-form-group(
            label="Phone"
            label-for="phone"
          )
            b-form-input(id="phone" v-model='phone')

          b-form-group(
            label="Email"
            label-for="email"
          )
            b-form-input(id="email" v-model='email')

        b-row(
          v-if="feedbackCompleted"
        )
          h3(class="text-center") Thank you! We'll be in touch.

      b-row(
        v-if="!feedbackCompleted"
      )
        b-col
        b-col
          button(
            class='btn btn-info'
            @click='submit'
          ) Submit
        b-col

</template>

<script>

import store from '@/store';
import { get, sync } from 'vuex-pathify';
import { mapState, mapMutations } from 'vuex';
import Velocity from 'velocity-animate';

export default {
  name: 'ymcaFeedback',
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      idx: 0,
      feedbackCompleted: false
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(`[beforeRouteEnter] cookies: ${document.cookie}`);
    Promise.all([
      store.dispatch(`ymca/getFeedbackForm`)
    ]).then((data) => {
      // console.log(`[beforeRouteEnter] ymca/getFeedbackForm resp: ${JSON.stringify(data)}`);
      next();
    });
  },
  computed: {
    options: sync('ymca/options'),
    feedbackQuestions: sync('ymca/feedbackQuestions')
  },
  methods: {
    submit() {
      if (this.idx >= this.feedbackQuestions.length) {
        this.$store.dispatch('ymca/submitUserInfo', {
          name: this.name,
          email: this.email,
          phone: this.phone
        }).then((resp) => {
          // redirect to home page currently
          // TODO: make this better
          this.feedbackCompleted = true;
          // this.$router.push('/');
        }).catch((err) => {
          console.log(`[submit] err: ${JSON.stringify(err)}`);
        });
      } else {
        // console.log(`this.feedbackQuestions[this.idx]: ${JSON.stringify(this.feedbackQuestions[this.idx])}`);
        this.$store.dispatch('ymca/submitFeedbackForm', {
          answer: this.feedbackQuestions[this.idx].answer,
          ymca_feedback_question_id: this.feedbackQuestions[this.idx].question_id
        }).then((resp) => {
          this.idx++;
        }).catch((err) => {
          console.log(`[submit] err: ${JSON.stringify(err)}`);
        });
      }
    },
    beforeEnter: function (el) {
      // ...
    },
    // the done callback is optional when
    // used in combination with CSS
    enter: function (el, done) {
      // ...
      done();
    },
    beforeLeave: function(el) {
    },
    leave: function(el, done) {
      console.log(`[leave]`);
      // the syntax;
      // hash 1: is a group of properties that must be animated
      // hash 2: group of options that influence how the animation should be done
      // all options have default values so they don't explicitly need to be overriden
      // Velocity(document.getElementById("myelement",
      //   { property1: value,
      //     property2: value },
      //   { option1: value,
      //     option2: value }
      // );
      Velocity(el, {opacity: 1, translateY: '-40px'}, {duration: 400});
      // Velocity(el, 'slideDown', {duration: 500});
      Velocity(el, {opacity: 0}, {duration: 200, complete: done});
      // done()
    }
  }
};
</script>
