<template>
  <v-app>
    <v-card color="grey lighten-4" flat height="56px">
      <v-toolbar fixed color="white darken-1">
        <v-menu :nudge-width="200">
          <v-toolbar-title slot="activator">
            <h4 class="mb-0"><span class='grey--text'>{{ title }} </span></h4>
          </v-toolbar-title>
        </v-menu>
        <v-flex xs3>
          <v-select
            v-bind:items="tournaments"
            v-model="current"
            label=''
            item-text="year"
            class="text-center green--text"
          >
          </v-select>
        </v-flex>
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
      fixed: false,
      links: [
        'login', 'Courses', 'Home'
      ],
      title: 'Bandon',
    }
  },

  watch: {
    current: function () {
      console.log('watch', this.current)
      this.$store.dispatch('UPDATE_CURRENT_TOURNAMENT',this.current)
    }
  },

  created: function () {
    this.$store.dispatch('LOAD_TOURNAMENT_LIST')
  },

  mounted: function() {
    console.log('after', this.currentTournament)
  }
}

</script>
<style>
.input-group__selections__comma {
  color: green;
}
/*.input-group__input {
  display: none;
}
*/</style>