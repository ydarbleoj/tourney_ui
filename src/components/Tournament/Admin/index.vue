<template>
    <main style="height:100%;" class="tournament-wrapper">
      <v-container color="white" fluid text-xs-center class="pa-0" style="height: 100%;">
        <v-layout row wrap>
          <v-flex xs3 class="text-xs-left">
           <v-menu
                transition="scale-transition"
                bottom
              >
              <v-btn icon slot="activator" light class="ml-2">
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
          <v-flex xs6 class="pt-1">
            <h3 class="mt-2">{{ currentTournament.year }} Admin</h3>
          </v-flex>
        </v-layout>
        <!-- <v-layout row-wrap v-if="currentTournament.handicap == false">
          <handicap :current="currentTournament" />
        </v-layout> -->
        <v-layout row wrap >

        </v-layout>
      </v-container>
    </main>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'TournamentAdmin',
  components: {
  },
  computed: {
    ...mapState(['currentTournament']),
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
    updateTournament (item) {
      // this.loading = true
      // this.$store.dispatch('UPDATE_CURRENT_TOURNAMENT', item)
      //   .then(response => {
      //     let current = this.currentTournament
      //     this.items = this.tournaments.filter(el => el.attributes.year != current.year)
      //     this.loading = false
      //   })
    },
    logout () {
      this.$auth.logout({
        params: {},
        data: {},
        redirect: '/login'
      })
    }
  },

  created: function () {
    this.$store.dispatch('LOAD_ADMIN_PLAYERS', { tournId: this.currentTournament.id })
      .then(response => {
        this.loading = false
      })
  },

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