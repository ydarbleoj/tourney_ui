<template>
  <v-card tile>
    <v-flex xs12>
      <v-list two-line>
        <template v-for="groups in adminTeeTimeGetter">
          <v-card>
            <v-list-tile>
              <v-list-tile-content>
                <h5 class="pa-0 ma-0">{{ groups.user }}</h5>
                <label class="pa-0">{{ groups.group }}</label>
              </v-list-tile-content>
              <v-list-tile-content>
                <v-flex xs12 sm6>
                  <v-select
                    label="Pick"
                    v-bind:items="times"
                    v-model="e6"
                    multiple
                    max-height="400"
                  ></v-select>
                </v-flex>
              </v-list-tile-content>
            </v-list-tile>
          </v-card>
        </template>
      </v-list>
    </v-flex>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Admin',
  props: ['current'],
  components: {
  },

  data () {
    return {
      e6: [],
      times: ['Group A', 'Group B', 'Group C', 'Group D']

    }
  },

  computed: {
    ...mapState(['teeTime', 'adminTeeTimes', 'currentRound', 'currentTournament', 'currentCourse'
    ]),
    ...mapGetters([
      'adminTeeTimeGetter'
    ])
  },

  watch: {
    current: function () {
      console.log('getter', this.adminTeeTimeGetter)
      this.$store.dispatch('LOAD_ADMIN_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
    }
  },

  mounted: function (current) {
    console.log('tee time', this.currentTournament.id)
    this.$store.dispatch('LOAD_ADMIN_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
  }
}
</script>
<style>
  p.hide {
    display: none;
  }
</style>