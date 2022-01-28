<template>
  <v-card
    flat
    style="background-color:#FFF;height:100%;"
    v-if="!isLoading"
  >
    <v-img
      :src="'/static/summary.jpg'"
      height='35vh'
    >
      <v-container fill-height pa-0>
         <BackButton
          :routeName="'Tournament'"
          :routeParams="{ id: this.currentTournament.id }"
        />
      </v-container>
    </v-img>
    <v-card-text
      class="pa-0"
      style="background-color:white;"
      transition="fade-transition"
    >
      <Container />
      <PuttingAvg />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import Stats from './Stats/index'
import BackButton from '../../BackButton'
import Container from './Container'
import PuttingAvg from './Stats/PuttingAvg'

export default {
  name: 'index',
  components: {
    BackButton,
    Container,
    PuttingAvg,
    Stats
  },

  data () {
    return {
      isLoading: true,
      year: ""
    }
  },

  computed: {
    ...mapState({
      summaryData: state => state.overallSummary.summaryData,
      userSummaryData: state => state.overallSummary.userSummaryData,
      currentTournament: state => state.tournament.currentTournament
    })
  },

  methods: {
  },

  created: function () {

    this.year = this.currentTournament.year
    this.$store.dispatch(
      'overallSummary/LOAD_SUMMARY_DATA',
      { id: this.currentTournament.id }
    ).then(response => {
      this.isLoading = false
    })
  }

}
</script>
<style>

</style>
