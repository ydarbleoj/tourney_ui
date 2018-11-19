<template>
  <v-app>
    <!-- <tournament-menu :tourns="tournaments" /> -->
    <main>
      <v-content>
        <v-container color="white" fluid text-xs-center class="pa-0" >
          <v-layout row-wrap>
            <handicap :current="currentTournament" v-if="currentTournament.handicap == false" />
          </v-layout>
          <v-layout row-wrap>
            <leaderboards :current="currentTournament" />
          </v-layout>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Leaderboards from '../components/Leaderboards'
import Rounds from '../components/Rounds'
import Stats from '../components/Stats/index'
import Handicap from '../components/Leaderboards/Handicap'
import TournamentMenu from '../components/TournamentMenu'

export default {
  name: 'Tournament',
  components: {
    Leaderboards,
    Rounds,
    Stats,
    Handicap,
    TournamentMenu
  },
  computed: {
    ...mapState(['tournaments', 'currentTournament', 'currentRound']),
    ...mapGetters(['getTournament', 'getTournaments'])
  },

  data () {
    return {
      current: this.currentTournament,
      year: '2018',
      clipped: false,
      drawer: true,
      items: [],
      title: 'Bandon',
    }
  },

  created: function () {
    this.$store.dispatch('LOAD_TOURNAMENT_LIST')
  },

}

</script>
<style>

</style>