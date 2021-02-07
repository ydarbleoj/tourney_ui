<template>
    <main style="height:100%;" class="tournament-wrapper">
        <v-toolbar color="white"  flat fixed style="padding:0;height:8vh;">

          <v-layout row wrap>
            <v-flex xs3 class="text-xs-left">
             <v-menu
                transition="scale-transition"
                bottom
              >
                <v-btn icon slot="activator" light class="ma-0">
                  <v-icon class="">menu</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>
                      <v-icon class="mr-2">person_outline</v-icon><router-link :to="'/profile'">Profile</router-link>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>
                      <v-icon class="mr-2">golf_course</v-icon><router-link :to="`/tournament/${this.currentTournament.id}`">Bandon</router-link>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>
                      <v-icon class="mr-2">weekend</v-icon><a v-on:click="logout()" href="javascript:void(0);">Log Out</a>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
            <v-flex xs6>
              <h3 class="mt-1">{{ this.currentTournament.year }} Admin</h3>
            </v-flex>
          </v-layout>
        </v-toolbar>
      <v-card
        color="white"
        fluid
        text-xs-center
        class="pa-0"
        style="height:100%;margin-top:8vh;margin-bottom:8vh;">
        <v-card-text class="pa-0">
          <component :is="view" />

        </v-card-text>
      </v-card>
      <v-bottom-nav
        fixed
        value="true"
        :active.sync="view"
        shift
        color="white"
        style="height:8vh;"
      >
        <v-btn flat color="#74C9D7" dark value="player-list">
          <span>Players</span>
          <v-icon>people_outline</v-icon>
        </v-btn>
        <v-btn flat color="#FF9D72" dark value="tee-times">
          <span>Tee Times</span>
          <v-icon>access_time</v-icon>
        </v-btn>
        <v-btn flat color="#74C9D7" dark value="edit">
          <span>Edit</span>
          <v-icon>edit</v-icon>
        </v-btn>
      </v-bottom-nav>
    </main>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PlayerList from '../Admin/PlayerList'
import TeeTimes from '../Admin/TeeTimes/index'

export default {
  name: 'TournamentAdmin',
  components: {
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
    changeView (v) {
      this.view = v
    }
  },

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
</style>