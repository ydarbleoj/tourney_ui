<template>
  <v-app>
    <v-card color="grey lighten-4" flat height="60px">
      <v-toolbar fixed color="white darken-1">
        <v-menu :nudge-width="200">
          <v-toolbar-title slot="activator">
            <h5><span class='green--text'>{{ title }}</span></h5>
          </v-toolbar-title>
        </v-menu>
        <v-spacer></v-spacer>
        <v-flex xs1>
          <v-select
            v-bind:items="tournaments"
            v-model="current"
            label=''
            item-text="year"
            single-line
            bottom
            class="text-center green--text"
          >
          </v-select>
        </v-flex>
        <v-spacer></v-spacer>
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
                <router-link :to="'hello'">Home</router-link>
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
        <v-container fluid grid-list-lg text-xs-center>
          <v-layout row-wrap>
            <leaderboards :current="current" />
          </v-layout>
          <v-layout row-wrap>
            <rounds :current="current" />
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TournamentCourses from '../components/TournamentCourses'
import Leaderboards from '../components/Leaderboards'
import Rounds from '../components/Rounds'


export default {
  name: 'Tournament',
  components: {
    TournamentCourses,
    Leaderboards,
    Rounds
  },
  computed: {
    ...mapState(['tournaments', 'currentTournament']),
  },

  data () {
    return {
      current: '',
      clipped: false,
      drawer: true,
      fixed: false,
      links: [
        'login', 'Courses', 'Home'
      ],
      title: 'Bandon'
    }
  },

  beforeUpdate (current) {
    this.$store.dispatch('UPDATE_CURRENT_TOURNAMENT',this.current)
  },

  mounted: function () {
    this.$store.dispatch('LOAD_TOURNAMENT_LIST')
  },

}

</script>
