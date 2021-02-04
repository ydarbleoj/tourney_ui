<template>
  <v-card
    class="putting-lb-card"
  >
    <v-card-title class="pa-0 pt-2 pl-2">
     <Header :purse="headerPurse" :name="'Putting'" />
    </v-card-title>
    <v-card-text v-if="!isloading" class="pa-0">
      <putting-table />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PuttingTable from './Table'
import Header from '../Header'

export default {
  name: 'index',
  props: ['current'],
  components: {
    PuttingTable,
    Header
  },

  data () {
    return {
      headerPurse: 0,
      isloading: true,
      year: ""
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament
    })
  },

  watch: {
    current () {
      this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.currentTournament.id, preview: false })
        .then(response => {
          this.headerPurse = this.puttingPurse
          this.year = this.currentTournament.year
          this.isloading = false
        })
    }
  },

  mounted () {
    this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.currentTournament.id, preview: false })
      .then(response => {
        this.headerPurse = this.puttingPurse
        this.year = this.currentTournament.year
        this.isloading = false
      })
  }
}
</script>
<style scoped>
.putting-lb-card {
  width: 100vw;
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  height: 100vh;
  overflow: scroll;
  color: #f1f1f1;
  background-color: #A8C256;
}
</style>
