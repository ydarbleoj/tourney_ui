<template>
  <main style="height:100%;" class="tournament-wrapper"  id="tourn-container">
    <v-container color="white" fluid text-xs-center class="pa-0" style="height: 100%;">
      <v-layout row wrap>
        <v-flex xs3 class="text-xs-left">
          <v-menu
              transition="scale-transition"
              bottom
            >
            <v-btn icon slot="activator" light class="ml-2">
              <v-icon class="">more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-list-tile-title>
                  <v-icon class="mr-2">person_outline</v-icon><router-link style="color:black;text-decoration:none;" :to="'/profile'">Profile</router-link>
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile v-if="$auth.check('admin')">
                <v-list-tile-title>
                  <v-icon class="mr-2">apps</v-icon><router-link style="color:black;text-decoration:none;" :to="'/tournament/admin'">Admin</router-link>
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>
                  <v-icon class="mr-2">weekend</v-icon><a v-on:click="logout()" style="color:black;text-decoration:none;" href="javascript:void(0);">Log Out</a>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
        <v-flex xs6>
          <tournament-menu />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <leaderboards :current="currentTournament"  v-if="!loading" />
        <rounds :current="currentTournament" v-if="!loading" />
        <stats :current="currentTournament" v-if="!loading" />
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

export default {
  name: 'Tournament',
  components: {
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