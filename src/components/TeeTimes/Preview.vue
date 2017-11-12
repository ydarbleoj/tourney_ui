<template>
  <v-card class='white'>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs4 align-center class='light-blue lighten-4'>
          <v-card tile flat class="light-blue lighten-4">
            <p class="hide">{{ current}}</p>
            <v-icon>schedule</v-icon>
            <h5>{{ current.group }}</h5>
            <h5>{{ current.tee_time.split('T')[1] }}</h5>
          </v-card>
        </v-flex>
        <v-flex d-flex xs8>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>
                {{ current.player_one }}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                {{ current.player_two }}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                {{ current.player_three }}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
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
</style>
