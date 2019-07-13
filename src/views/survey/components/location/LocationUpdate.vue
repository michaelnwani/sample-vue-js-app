<template lang="pug">
  div(class='form-group survey-location-fields row')
    div(class='col-sm-2')
      label(for='latitude') Latitude:

    div(class='col-2 col-sm-auto')
      input.form-control(
        class='form-control survey-location-lat-field'
        type='text'
        placeholder='Latitude'
        name='lat'
        required='true'
        v-model="lat"
      )

    div(class='col-sm-2')
      label(for='longitude') Longitude:

    div(class='col-2 col-sm-auto')
      input.form-control(
        class='form-control survey-location-lng-field'
        type='text'
        placeholder='Longitude'
        name='lng'
        required='true'
        v-model="lng"
      )

    div(class='col-sm-2')
      label(for='distance') Distance (mi):

    div(class='col-2 col-sm-auto')
      input.form-control(
        class='form-control survey-location-distance-field'
        type='text'
        placeholder='Distance (mi):'
        name='distance'
        required='true'
        v-model="distance"
      )
      button(class='btn btn-secondary btn-sm' @click='removeSelf') X
</template>

<script>
import store from '@/store';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'locationUpdate',
  props: {
    location: Object,
    locationIdx: Number
  },
  computed: {
    ...mapState(['survey']),
    lat: {
      set(lat) {
        this.$store.commit('survey/SET_SURVEY_LOCATION_LAT', {
          locationIdx: this.locationIdx,
          lat
        });
      },
      get() {
        return this.location.lat;
      }
    },
    lng: {
      set(lng) {
        this.$store.commit('survey/SET_SURVEY_LOCATION_LNG', {
          locationIdx: this.locationIdx,
          lng
        });
      },
      get() {
        return this.location.lng;
      }
    },
    distance: {
      set(distance) {
        this.$store.commit('survey/SET_SURVEY_LOCATION_DISTANCE', {
          locationIdx: this.locationIdx,
          distance
        });
      },
      get() {
        return this.location.distance;
      }
    }
  },
  methods: {
    ...mapMutations('survey', {
      deleteLocation: 'DELETE_SURVEY_LOCATION'
    }),
    removeSelf() {
      // console.log(`[removeSelf] triggered. id=${this.id}`);
      // this.$emit('clicked', this.id);
      // store.commit('REMOVE_LOCATION', this.locationIdx);
      this.deleteLocation(this.locationIdx);
    }
  }
};
</script>
