<template>
  <v-card flat class="pa-0">
    <v-card-title class="pt-1 pl-3">
      <h2 class="text-xs-left" style="color:#FF9D72;width:100%;">Set Teams</h2>
      <v-spacer></v-spacer>
      <h3 class="font-weight-regular">{{ adminTeeTimes[0].attributes.course_name }}</h3>
    </v-card-title>

    <v-card-text v-if="!loading" class="pa-0" style="overflow-y:auto;">
      <v-container fluid class="pa-0">
        <v-layout row fill-height>
          <v-flex xs6 class="ma-0">
            <v-card flat tile>
              <v-list two-line>
                <template v-for="groups in adminTeeTimes">
                  <label class="pl-2"> {{ groups.attributes.group }}</label>
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
                  :key="item.id"
                  no-action
                >
                  <v-list-tile slot="activator">
                    <v-list-tile-content>
                      <v-list-tile-title style="font-size: 12px;" v-if="item.first_name">
                         {{ item.first_name }} {{ item.last_name }}
                      </v-list-tile-title>
                      <v-list-tile-title style="font-size: 12px;"v-else>
                        {{ item.attributes.first_name }} {{ item.attributes.last_name }}
                      </v-list-tile-title>
                      <span class="grey--text" style="font-size:14px;">
                        Hcap {{ setHandicap(item) }}
                      </span>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-for="subitem in groupChoices" v-bind:key="subitem" @click="addTeeTime(subitem, item, index)">
                    <v-list-tile-content>
                      <v-list-tile-title style="font-size: 16px;">Group {{ subitem }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-group>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-bottom-nav
        fixed
        :active.sync="roundNumber"
        :value="true"
        style="background-color:#FF9D72;margin-bottom:8vh;"
      >
        <v-btn flat value="1" style="color:#fff; opacity:0.7;">
          <h3>Round 1</h3>
        </v-btn>
        <v-btn flat value="2" style="color:#fff;opacity:0.7;">
          <h3>Round 2</h3>
        </v-btn>
        <v-btn flat value="3" style="color:#fff;opacity:0.7;">
          <h3>Round 3</h3>
        </v-btn>
      </v-bottom-nav>

    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import Group from './Group'

export default {
  name: 'index',
  props: ['current', 'teeGroup'],
  components: {
    Group
  },

  data () {
    return {
      loading: true,
      roundTabs: [1, 2, 3],
      groupChoices: ["A", "B", "C", "D"],
      roundNumber: 1,
      roundId: null,
      active: null,
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      currentRound: state => state.currentRound,
      adminTeeTimes: state => state.adminTeeTimes,
      awaitingTees: state => state.awaitingTees
    }),
      // 'teeTime', 'adminTeeTimes', 'currentRound', 'awaitingTees', 'currentTournament', 'currentCourse'
    ...mapGetters([
      'adminTeeTimeGetter'
    ]),
    ...mapMutations(['ADD_USER_TEE_TIME', 'ADD_USER_AWAITING'])
  },

  methods: {
    availableGroup (){
    },
    setHandicap (item) {
      return typeof(item.attributes) !== 'undefined' ? item.attributes.handicap : item.handicap
    },
    addToAwaiting: function(event) {
      this.$store.commit(
        'ADD_USER_AWAITING',
        {
          user: event.user,
          key: event.key,
          group: event.group
        }
      )
    },
    addTeeTime: function(event, user, index) {
      let i = this.groupChoices.findIndex(group => group === event);
      this.$store.commit('ADD_USER_TEE_TIME', { user: user, index: index, group: i })
    },
    roundFilter (rounds, num) {
      let r = rounds.filter((el) => el.roundNumber == num)
      this.roundId = r[0].roundId
    },
    loadTeeTimes () {
      this.$store.dispatch(
        'LOAD_ADMIN_TEE_TIME',
        {
          tournId: this.currentTournament.id,
          roundId: this.roundId
        }
      ).then(response => {
        this.loading = false
      })
    }
  },

  watch: {
    roundNumber () {
      let num = this.roundNumber
      let rounds = this.currentTournament.round_info
      this.roundFilter(rounds, num)
      this.loadTeeTimes()
    }
  },

  created: function (current) {
    console.log('awating', this.awaitingTees)
    let rounds = this.currentTournament.round_info
    console.log('rounds', rounds)
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