<template>
  <v-app>
    <v-card color="grey lighten-4" flat height="56px">
      <v-toolbar fixed color="white darken-1">
        <v-menu :nudge-width="50">
          <v-toolbar-title slot="activator">
            <span class='grey--text'>{{ title }} {{ year }} </span>
            <v-icon light>arrow_drop_down</v-icon>
          </v-toolbar-title>
          <v-list>
            <v-list-tile v-for="item in items" :key="item" @click="updateMenu(item)">
              <v-list-tile-title v-text="item"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu
          origin="center center"
          transition="scale-transition"
          bottom
        >
          <v-btn icon slot="activator" dark>
            <v-icon color='blue-grey darken-1'>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>
                <router-link :to="'profile'">Profile</router-link>
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>
                <router-link :to="'login'">Login</router-link>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

      </v-toolbar>
    </v-card>
    <main>
      <v-content>
        <v-container fluid text-xs-center class="pa-0">
          <v-layout row-wrap>
            <leaderboards :current="currentTournament" />
          </v-layout>
          <v-layout row-wrap>
            <rounds :current="currentTournament" />
          </v-layout>
           <v-layout row-wrap>
            <stats :current="currentTournament" />
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

export default {
  name: 'Tournament',
  components: {
    Leaderboards,
    Rounds,
    Stats
  },
  computed: {
    ...mapState(['tournaments', 'currentTournament', 'currentRound']),
    ...mapGetters(['getTournament'])
  },

  data () {
    return {
      current: this.currentTournament,
      year: '',
      clipped: false,
      drawer: true,
      items: ['2017', '2016', 'Overall'],
      links: [
        'login', 'Courses', 'Home'
      ],
      title: 'Bandon',
    }
  },

  methods: {
    updateMenu: function(event) {
      this.current = this.tournaments.filter(tourn => tourn.year == event)[0]
      this.$store.dispatch('UPDATE_CURRENT_TOURNAMENT', this.current)
    }
  },

  watch: {
    current: function () {
      this.year = this.current.year
    }
  },

  created: function () {
    this.$store.dispatch('LOAD_TOURNAMENT_LIST')
  },

  mounted: function() {
    this.year = this.currentTournament.year
    console.log('after', this.currentTournament)
  }
}

</script>
<style>

</style>