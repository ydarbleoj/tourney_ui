<template>
  <main style="height:100%;" class="tournament-wrapper"  id="tourn-container">
    <v-container color="white" fluid text-xs-center class="pa-0" style="height: 100%;">
      <v-layout row wrap>
        <v-flex xs3 class="text-xs-left">
          <BackButton
            :routeName="'Profile'"
            :routeParams="{ id: $auth.user().id }"
          />
        </v-flex>
        <v-flex xs6>
          <tournament-menu />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <leaderboards :current="currentTournament"  v-if="!loading" />
        <!-- <rounds :current="currentTournament" v-if="!loading" />
        <stats :current="currentTournament" v-if="!loading" /> -->
      </v-layout>
    </v-container>
  </main>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Handicap from '../components/Leaderboards/Handicap'
import Leaderboards from '../components/Leaderboards'
import Rounds from '../components/Rounds'
import Stats from '../components/Stats/index'
import TournamentMenu from '../components/TournamentMenu'
import BackButton from './BackButton'

export default {
  name: 'Tournament',
  components: {
    BackButton,
    Handicap,
    Leaderboards,
    Rounds,
    Stats,
    TournamentMenu
  },
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      tournaments: state => state.tournament.tournaments
    })
  },

  data () {
    return {
      clipped: false,
      drawer: true,
      items: [],
      loading: true,
      userAdmin: false
    }
  },
  methods: {
    logout () {
      this.$auth.logout({
        params: {},
        data: {},
        redirect: '/login'
      })
    }
  },

  mounted: function () {
    if (typeof this.currentTournament != "undefined") {
      this.loading = false
    }
  }

}

</script>
<style>
a {
  color: black;
  text-decoration: none;
}
.tournament-wrapper {
  overflow:hidden;
  background-color: white;
}
</style>