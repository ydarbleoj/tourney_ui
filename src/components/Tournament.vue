<template>
  <v-app>
    <v-card color="grey lighten-4" flat height="56px">
      <v-toolbar
        fixed
        color="white darken-1"
      >
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
          </v-list>
        </v-menu>

      </v-toolbar>
    </v-card>
    <main>
      <v-content>
        <v-container fluid text-xs-center class="pa-0" >
          <v-layout row-wrap>
            <handicap :current="currentTournament" v-if="currentTournament.handicap == false" />
          </v-layout>
          <v-layout row-wrap>
            <leaderboards :current="currentTournament" />
          </v-layout>
          <v-layout row-wrap>
            <rounds :current="currentTournament"  />
          </v-layout>
           <v-layout row-wrap>
            <stats :current="currentTournament"  />
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

export default {
  name: 'Tournament',
  components: {
    Leaderboards,
    Rounds,
    Stats,
    Handicap
  },
  computed: {
    ...mapState(['tournaments', 'currentTournament', 'currentRound']),
    ...mapGetters(['getTournament'])
  },

  data () {
    return {
      current: this.currentTournament,
      year: '2018',
      clipped: false,
      drawer: true,
      items: ['2018', '2017', '2016', '2015'],
      title: 'Bandon',
    }
  },

  methods: {
    updateMenu: function(event) {
      this.current = this.tournaments.filter(tourn => tourn.year == event)[0]
      this.$store.dispatch('UPDATE_CURRENT_TOURNAMENT', this.current)
    },
    visibilityChanged (isVisible, entry) {
      this.isVisible = isVisible
      console.log(entry)
    }
  },

  watch: {
    current: function () {
      this.year = this.current.year
    }
  },

  created: function () {
    console.log('created')
    this.year = '2018'
    this.$store.dispatch('LOAD_TOURNAMENT_LIST')
  },

  mounted: function() {
    // this.year = this.currentTournament.year
    console.log('after', this.currentTournament)
  }
}

</script>
<style>

</style>