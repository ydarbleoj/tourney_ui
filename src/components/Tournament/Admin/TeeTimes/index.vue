<template>
  <v-card flat class="pa-0 pb-4">
     <v-container class="bg">
      <v-layout row pb-5>
				<v-flex xs3>
          <BackButton
            :routeName="'TournamentAdmin'"
            :routeParams="{ id: this.currentTournament.id }"
          />
        </v-flex>
        <v-flex xs6 class="text-xs-center white--text">
          <h2 style="font-weight:500;">Team Tee-Times</h2>
        </v-flex>
        <v-flex xs3>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <h2 class="text-xs-left" style="color:whitewidth:100%;">Set Teams</h2>
          <v-spacer></v-spacer>
          <h3 class="font-weight-regular">{{ title }}</h3>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-text v-if="!loading" class="pa-0" style="overflow-y:auto;">
      <v-container fluid class="pa-0" style="height:100%;">
        <v-layout row fill-height>
          <v-flex xs6 class="ma-0">
            <v-card flat tile>
              <v-list two-line>
                <div v-for="groups in adminTeeTimes" :key="groups.id">
                  <label class="pl-2">Group {{ groups.attributes.group }}</label>
                  <v-divider></v-divider>
                  <group :teeGroup="groups" :parentData="awaitingTees" @event="addToAwaiting" />
                  <v-divider></v-divider>
                </div>
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
                      <v-list-tile-title style="font-size: 12px;" v-if="item.attributes.username">
                         {{ item.attributes.username }}
                      </v-list-tile-title>
                      <v-list-tile-title style="font-size: 12px;" v-else>
                        {{ item.attributes.first_name }} {{ item.username }}
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
        style="background-color:#FF9D72;bottom:0;"
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
import BackButton from '../../../BackButton'

export default {
  name: 'index',
  props: ['current', 'teeGroup'],
  components: {
    BackButton,
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
      title: "Bandon"
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      currentRound: state => state.currentRound,
      adminTeeTimes: state => state.adminTeeTimes,
      awaitingTees: state => state.awaitingTees
    }),
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
      let r = rounds.filter(el => el.roundNumber == num)
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
        this.title = this.adminTeeTimes[0].attributes.course_name
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
    let rounds = this.currentTournament.round_info
    this.roundFilter(rounds, 1)
    this.loadTeeTimes()
  }
}
</script>
<style>
.bg {
  background-color: #FF9D72;
}
p.hide {
  display: none;
}
</style>