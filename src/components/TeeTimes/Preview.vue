<template>
  <v-card class='white'>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs4 align-center class="grey darken-3">
          <v-card tile flat class="grey darken-3">
            <p class="hide">{{ current}}</p>
            <v-icon color='white'>schedule</v-icon>
            <h5 class='white--text'>{{ current.group }}</h5>
            <h5 class='white--text'>{{ current.tee_time.split('T')[1] }}</h5>
          </v-card>
        </v-flex>
        <v-flex d-flex xs8 class='grey darken-2'>
          <v-list dense class='grey darken-2'>
            <v-list-tile>
              <v-list-tile-content class="white--text">
                {{ current.player_one }}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="white--text">
                {{ current.player_two }}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="white--text">
                {{ current.player_three }}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="white--text">
                {{ current.player_four }}
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
