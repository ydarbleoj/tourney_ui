<template>
  <v-card class='white'>
    <v-container fluid grid-list-md>
      <v-layout row wrap align-center class="grey darken-3">
        <v-flex d-flex xs4 class="grey darken-3">
          <v-card tile flat class="grey darken-3">
            <p class="hide">{{ current}}</p>
            <h5 class='white--text mb-1'>{{ this.teeTime[0][0]}}</h5>
            <v-icon color='blue accent-2'>schedule</v-icon>
            <h5 class='white--text mt-1'>{{ this.teeTime[0][1] }}</h5>
          </v-card>
        </v-flex>
        <v-flex d-flex xs8 class='grey darken-2 pa-0'>
          <v-list dense class='grey darken-2'>
            <v-list-tile v-for="user in teeTime[1]" :key="user">
              <v-list-tile-content class="white--text">
                {{ user.user }}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Preview',
  props: ['current'],
  components: {
  },

  computed: {
    ...mapState(['teeTime', 'currentRound', 'currentTournament', 'currentCourse'])
  },

  watch: {
    current: function () {
      console.log('curr rounf', this.currentRound.round_number)
      this.$store.dispatch('LOAD_USER_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_USER_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
  }
}
</script>
<style>
  p.hide {
    display: none;
  }

  .name-list {
    color: #9ad3de;
  }
</style>
