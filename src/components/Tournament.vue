<template>
    <!-- <tournament-menu :tourns="tournaments" /> -->
    <main style="height:100%;" class="tournament-wrapper">
      <v-container color="white" fluid text-xs-center class="pa-0" style="height: 100%;">
        <v-layout row-wrap v-if="currentTournament.handicap == false">
          <handicap :current="currentTournament" />
        </v-layout>
        <leaderboards :current="currentTournament" />
        <rounds :current="currentTournament"  />
      </v-container>
    </main>
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
.tournament-wrapper {
  background-color: white;
}
</style>