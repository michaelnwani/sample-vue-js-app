<template lang="pug">
  div(class='form-group survey-location-fields row')
    div(class='col-sm-2') Latitude:
    div(class='col-2 col-sm-auto')
      p {{ lat }}
    div(class='col-sm-2') Longitude:
    div(class='col-2 col-sm-auto')
      p {{ lng }}
    div(class='col-sm-2') Distance (mi):
    div(class='col-2 col-sm-auto')
      p {{ distance }}
</template>

<script>
export default {
  name: 'surveyLocation',
  props: ['lat', 'lng', 'distance'],
  data() {
    return {
      
    };
  }
};
</script>
