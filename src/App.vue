<template lang="pug">
  div(id="app")
    Navbar
    router-view
</template>

<script>
import Navbar from './components/Navbar';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'App',
  components: { Navbar }
};
</script>

<style lang="scss" src="./stylesheets/style.scss"></style>
