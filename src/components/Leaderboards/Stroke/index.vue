<template>
  <v-card
    class="lb-card"
   >
    <v-card-title class="pa-0 pt-2 pl-2">
      <Header :purse="strokePurse" :name="'Stroke'" />
    </v-card-title>
    <v-card-text v-if="!isloading" class="pa-0">
      <stroke-table />
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import StrokeTable from './Table'
import Header from '../Header'

export default {
  name: 'index',
  components: {
    StrokeTable,
    Header
  },
  data () {
    return {
      strokePurse: 0,
      isloading: true,
      year: ""
    }
  },

  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament
    }),
  },
  methods: {
    closeLeaderboard () {
      this.isPreview = true
    }
  },

  mounted: function () {
    console.log('get', this.currentTournament)
    this.$store.dispatch(
      'LOAD_STROKE_LEADERBOARD',
      {
        id: this.currentTournament.id, preview: false
      }
    ).then(response => {
      this.strokePurse = this.currentTournament.num_players * 30
      this.isloading = false
      this.year = this.currentTournament.year
    })
  }
}
</script>
<style scoped>
.lb-card {
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  height: 100vh;
  overflow: scroll;
  width: 100vw;
  background-color: #9FB8CE;
  color: #f1f1f1;
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
