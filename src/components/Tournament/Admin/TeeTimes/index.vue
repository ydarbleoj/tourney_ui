<template>
  <v-container v-if="loading">
    loading...
  </v-container>
  <v-container fluid class="pa-0" v-else>
    <v-layout row>
      <v-flex xs6 class="ma-0">
        <v-card flat tile>
          <v-list two-line>
            <template v-for="groups in adminTeeTimeGetter">
              <label>{{ groups.attributes.group }}</label>
              <v-divider></v-divider>
              <group :teeGroup="groups" :parentData="awaitingTees" @event="addToAwaiting"/>
              <v-divider></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs6 class="grey lighten-2">
        <v-card flat class="grey lighten-2 pt-1">
          <label>Awaiting</label>
          <v-divider></v-divider>
          <v-list class="grey lighten-2">
            <v-list-group
              v-for="(item, index) in awaitingTees"
              :value="false"
              :key="item.id"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title style="font-size: 12px;">{{ item.attributes.first_name }} {{ item.attributes.last_name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="subitem in groupChoices" v-bind:key="subitem" @click="addTeeTime(subitem, item, index)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ subitem }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Group from './Group'

export default {
  name: 'index',
  props: ['current', 'teeGroup'],
  components: {
    Group
  },

      // awaitingTees: [],
  data () {
    return {
      loading: true,
      teeTimes: [],
      groupChoices: ["Group A", "Group B", "Group C", "Group D"],
      roundNumber: 1,
      roundId: null,
    }
  },

  computed: {
    ...mapState(['teeTime', 'adminTeeTimes', 'currentRound', 'awaitingTees', 'currentTournament', 'currentCourse'
    ]),
    ...mapGetters([
      'adminTeeTimeGetter'
    ])
  },

  methods: {
    addToAwaiting: function(event) {
      this.awaitingTees.push(event)
    },
    addTeeTime: function(event, user, index) {
      this.awaitingTees.splice(index, 1);
      let i = this.groupChoices.findIndex(group => group === event);
      console.log('tee ti', this.adminTeeTimeGetter[i][0].users)
      this.adminTeeTimeGetter[i][0].users.push(user)
    },
    roundFilter (rounds, num) {
      let r = rounds.filter(el => el.roundNumber === num)
      this.roundId = r[0].roundId
    },
    loadTeeTimes () {
      this.$store.dispatch('LOAD_ADMIN_TEE_TIME', { tournId: this.currentTournament.id, roundId: this.roundId })
        .then(response => {
          this.loading = false
        })
    }
  },

  watch: {
    roundNumber () {
      let rounds = this.currentTournament.round_info
      this.roundFilter(rounds, this.roundNumber)
      this.loadTeeTimes()
    }
  },

  created: function (current) {
    let rounds = this.currentTournament.round_info
    this.roundFilter(rounds, 1)
    this.loadTeeTimes()
  }
}
</script>
<style>
  p.hide {
    display: none;
  }
</style>