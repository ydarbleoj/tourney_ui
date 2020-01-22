<template>
  <v-card flat height="56px">
    <v-list>
      <v-list-tile v-for="item in tournaments" :key="item" @click="updateMenu(item)">
        <v-list-tile-title>Bandon {{ item.attributes.year }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-spacer></v-spacer>

  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'TournamentMenu',
  props: ['tourns'],
  components: {
  },
  computed: {
    ...mapState(['tournaments', 'currentTournament']),
    ...mapGetters(['getTournament', 'getTournaments'])
  },

  data () {
    return {

      items: [],
    }
  },

  methods: {
    updateMenu: function(event) {
      let nn = this.tournaments.filter(tourn => tourn.attributes.year == event.attributes.year)[0]

      this.current = nn.attributes
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
    console.log('touns', this.tourns)
    this.$store.dispatch('LOAD_TOURNAMENT_LIST')
  },

  mounted: function() {
    // this.items = this.tournaments
  }
}

</script>
<style>

</style>