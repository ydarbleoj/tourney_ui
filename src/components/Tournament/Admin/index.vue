<template>
  <v-card flat class="mb-5">
    <v-container class="bg">
      <v-layout row>
        <v-flex xs3>
          <BackButton
            :routeName="'Tournament'"
            :routeParams="this.backParams()"
          />
        </v-flex>
        <v-flex xs6 class="text-xs-center white--text">
          <h1 style="font-weight:300;">BANDON</h1>
        </v-flex>
      </v-layout>
      <v-layout row mt-3>
        <v-flex xs12>
          <v-layout row align-center>
            <v-flex xs7>
              <h1 style="font-weight:300;font-size:60px;color:#F8C977">
                {{ this.currentTournament.year }}
              </h1>
              <h2 style="font-weight:400;" class="text-xs-left">
                Purse: $<span>{{ purse }}</span>
              </h2>
            </v-flex>
          </v-layout>
          <v-layout row align-end mt-3>
            <v-flex xs5 class="text-xs-left white--text">
              <h1 style="font-weight:400;">
                Active:
                <span style="color:#666;">
                  {{ this.currentTournament.active_players }}
                </span>
              </h1>
            </v-flex>
            <v-flex xs5 class="text-xs-center">
              <div class="white--text">
                <h1 style="font-weight:400;">
                  DNF:
                  <span style="color:#666;">
                    {{ this.currentTournament.dnf_players }}
                  </span>
                </h1>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <PlayerList />
    <BottomNavigation />
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PlayerList from '../Admin/PlayerList'
import TeeTimes from '../Admin/TeeTimes/index'
import BackButton from '../../BackButton'
import BottomNavigation from './BottomNavigation'

export default {
  name: 'TournamentAdmin',
  components: {
    BackButton,
    BottomNavigation,
    PlayerList,
    TeeTimes,
  },
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament
    }),
  },

  data () {
    return {
      view: 'player-list',
      clipped: false,
      drawer: true,
      items: [],
      loading: true,
      userAdmin: false,
      purse: "360",
      player: '',
    }
  },
  methods: {
    logout () {
      this.$auth.logout({
        params: {},
        data: {},
        redirect: '/login'
      })
    },
    backParams () {
      return { id: this.currentTournament.id }
    },
  },

  mounted () {
    console.log(this.currentTournament)
  }

}

</script>
<style scoped>
nav.v-toolbar div.v-toolbar__content {
  padding: 0;
}
a {
  color: black;
  text-decoration: none;
}
.tournament-wrapper {
  overflow:hidden;
  background-color: white;
}
.bg {
  background-color: #449ce9;
}
</style>