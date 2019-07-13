<template lang="pug">
  b-container
    b-form(class='login' @submit.prevent="submit")
      b-form-group
        if errors
          ul
            for error in errors
              li!= error.msg

        div.form-group
          label(for='email') Email:
          input(
            id='email',
            class='form-control',
            type='text',
            placeholder='Enter your email',
            required='true',
            name='email',
            autocomplete='on',
            v-model='email'
          )

          label(for='password') Password:
          input(
            id='password',
            class='form-control',
            type='password',
            placeholder='Enter your password',
            name='password',
            autocomplete='current-password',
            required='true',
            v-model='password'
          )

        button(
          class='btn btn-primary'
          type='submit'
        ) Log in
</template>

<script>
import { get, sync } from 'vuex-pathify';

export default {
  name: 'login',
  computed: {
    email: sync('auth/login@email'),
    password: sync('auth/login@password')
  },
  methods: {
    submit() {
      const { email, password } = this;
      // console.log(`email: ${email}`);
      // console.log(`password: ${password}`);
      this.$store.dispatch('auth/login', { email, password }).then((resp) => {
        // console.log(`[submit] resp: ${JSON.stringify(resp)}`);
        this.$router.push('/surveys');
      }).catch((err) => {
        console.log(`[submit] err: ${JSON.stringify(err)}`);
      });

      // const response = await SessionService.postLogin({
      //   email: this.email,
      //   password: this.password
      // });
      // console.log(`response from server: ${JSON.stringify(response)}`);
    }
  }
};
</script>
