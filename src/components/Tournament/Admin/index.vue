<template>
    <main style="height:100%;" class="tournament-wrapper">
      <v-container color="white" fluid text-xs-center class="pa-0" style="height: 100%;">
        <v-toolbar color="white" flat fixed style="padding:0;">

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
                      <v-icon class="mr-2">golf_course</v-icon><router-link :to="'/tournament'">Bandon</router-link>
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
              <h3 class="mt-1">{{ currentTournament.year }} Admin</h3>
            </v-flex>
          </v-layout>
        </v-toolbar>
        <v-layout row wrap>
          <v-flex xs12 style="margin-bottom:10vh;margin-top:9vh;">
            <component :is="view" />
          </v-flex>
        </v-layout>
        <v-layout row wrap >
          <v-flex xs12>
            <v-bottom-nav
              fixed
              value="true"
              :active.sync="view"
              shift
              color="white"
            >
              <v-btn flat color="#74C9D7" dark value="player-list">
                <span>Players</span>
                <v-icon>people_outline</v-icon>
              </v-btn>
              <v-btn flat color="#74C9D7" dark value="tee-times">
                <span>Tee Times</span>
                <v-icon>access_time</v-icon>
              </v-btn>
              <v-btn flat color="#74C9D7" dark value="edit">
                <span>Edit</span>
                <v-icon>edit</v-icon>
              </v-btn>
            </v-bottom-nav>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PlayerList from '../Admin/PlayerList'

export default {
  name: 'TournamentAdmin',
  components: {
    PlayerList
  },
  computed: {
    ...mapState(['currentTournament']),
  },

  data () {
    return {
      view: 'player-list',
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

  watch: {
    view () {
      console.log('here', this.view)
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