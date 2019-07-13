<template lang="pug">
  b-navbar(toggleable="md" type="light")
    b-navbar-toggle(target="nav_collapse")
    b-navbar-brand(href="#")
      img(
        src='../assets/removed_logo.jpg'
        alt='removed Logo'
        class='img-fluid'
        width='160'
        height='59'
      )

    b-collapse(is-nav id="nav_collapse")
      //- Right aligned nav items
      b-navbar-nav(class="ml-auto")
        b-nav-item(href='/') Home
        b-nav-item(href='/privacy') Privacy Policy

        b-nav-item-dropdown(
          v-if='isAuthenticated'
          :text='email'
          right
        )
          b-dropdown-item(href="/dashboard") Dashboard
          b-dropdown-item(href="/surveys/new") New Survey
          b-dropdown-item(href="/rewards/new") New Reward
          b-dropdown-item(href="/surveys") Past Surveys
          b-dropdown-item(href="/rewards") Past Rewards
          b-dropdown-divider
          b-dropdown-item(@click.prevent='logout') Logout

        b-nav-item(v-if='!isAuthenticated' href='/login') Log in
        b-nav-item(v-if='!isAuthenticated' href='/signup') Sign up
</template>

<script>
import store from '@/store';
import { mapState, mapMutations, mapGetters } from 'vuex';
import { get, sync } from 'vuex-pathify';

export default {
  name: 'navbar',
  computed: {
    isAuthenticated: sync('auth/isAuthenticated'),
    email: sync('auth/email')
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then((resp) => {
        this.$router.push('/');
      }).catch((err) => {
        console.log(`[logout] err: ${JSON.stringify(err)}`);
      });
    }
  }
};
</script>
