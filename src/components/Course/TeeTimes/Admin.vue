<template>
  <v-container fluid class="pa-0">
    <v-layout row>
      <v-flex xs6 class="ma-0">
        <v-card flat tile>
          <v-list two-line>
            <template v-for="groups in adminTeeTimeGetter">
              <label>{{ groups[0].group }}</label>
              <v-divider></v-divider>
              <group :teeGroup="groups[0]" :parentData="awaitingTees" @event="addToAwaiting"/>
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
            <v-list-group v-for="(user, index) in awaitingTees" :value="user" v-bind:key="user.user">
              <v-list-tile slot="item" @click="">
                <v-list-tile-content>
                  <v-list-tile-title>{{ user.user }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-for="subitem in groupChoices" v-bind:key="subitem" @click="addTeeTime(subitem, user, index)">
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
  name: 'Admin',
  props: ['current', 'teeGroup'],
  components: {
    Group
  },

      // awaitingTees: [],
  data () {
    return {
      teeTimes: [],
      groupChoices: ["Group A", "Group B", "Group C", "Group D"],

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
  },

  // watch: {
  //   current: function () {
  //     // console.log('getter', this.adminTeeTimeGetter)
  //     // this.$store.dispatch('LOAD_ADMIN_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
  //   }
  // },

  mounted: function (current) {
    console.log('tee time', this.currentTournament.id)
  }
}
</script>
<style>
  p.hide {
    display: none;
  }
</style>