<template>
  <v-card flat class="tournament-menu-card">
    <v-card-title>
      <h1 class="black--text font-weight-regular mr-1">
        Bandon
      </h1>
      <h3
        class="black--text font-weight-medium"
        style="border-bottom:1px solid #F8C977"
        @click="toggleMenu"
      >
        {{ displayYear }}
      </h3>
    </v-card-title>
    <v-card-text
      v-if="open"
    >
      <v-card
        v-bind:class="{ overlay: open }"
        class="d-flex align-end flex-column"
        flat
        transition="fade-transition"
      >
        <v-flex xs12 pr-2>
          <v-card
            v-for="item in items"
            class="flex xs12 pt-3 pb-3 pr-5 text-xs-right"
            :key="item['id']"
            @click="updateTournament(item)"
            flat
            transition="fade"
            reverse-trasition="fade"
          >
            <h1
              style="font-size:28px;"
              class="font-weight-regular"
              v-bind:class="{ active: isActive(item.attributes.year) }"
            >
              {{ item.attributes.year }}
            </h1>
          </v-card>
        <v-card-text>
          <v-card
            class="flex xs12 pt-4 text-xs-center"
            @click="toggleMenu"
            flat
          >
            <h1
              style="font-size:28px;"
              class="font-weight-regular"
            >
              Close
            </h1>
          </v-card>
        </v-card-text>
        </v-flex>
      </v-card>
    </v-card-text>
    <v-spacer></v-spacer>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'TournamentMenu',
  computed: {
    ...mapState({
      currentTournament: state=> state.tournament.currentTournament,
      tournaments: state => state.tournament.tournaments
    }),
    ...mapGetters({
      getTournament: 'tournament/getTournament'
      // getTournaments: state => state.tournament.getTournaments
    })
  },

  data () {
    return {
      open: false,
      loading: false,
      overlay: 'overlay',
      active: false,
      items: [],
      displayYear: ""
    }
  },

  methods: {
    toggleMenu () {
      this.open = !this.open
    },
    isActive (year) {
      return year === this.currentTournament.year
    },
    updateItemsList () {
      let tourns = this.tournaments.slice().reverse()
      this.items = tourns
    },
    updateTournament (item) {
      let itemId = item.id
      this.loading = true
      this.$store.dispatch('tournament/UPDATE_CURRENT_TOURNAMENT', item)
        .then(response => {
          this.loading = false
          this.open = false
          this.displayYear = this.currentTournament.year
          this.$router.push(
            {
              name: "Tournament",
              params: {
                id: item.id
              }
            }
          )
        })
    },
  },

  mounted: function () {
    this.displayYear = this.currentTournament.year
    this.updateItemsList()
  }
}

</script>
<style>
.tournament-menu-card {
  position: relative;
  height: 60px;
}
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 1;
  z-index: 10;
  background-color: #F8C977;
}
.active {
  color: #F8C977;
}
.fade-enter-active, .fade-leave-active {
  transition-timing-function: ease-out;
  transition: 0.25s;
  transform: translateY(0);
}
  /* transition: opacity 1s; */
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>