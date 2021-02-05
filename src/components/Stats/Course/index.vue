<template>
 <v-card class="course-card">
    <v-img
      :src="'/static/summary.jpg'"
      height='250px'
      class="course-header"
    >
      <v-container fill-height pa-0>
        <BackButton />
        <v-layout row align-end>
          <v-flex xs12 ma-4>
            <h3 class="headline white--text">
              {{ year }}
            </h3>
            <h2 class="white--text text-center">Summary</h2>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-text style="background-color:white;" transition="fade-transition">
      <v-card flat class="mb-2 text-right">
        <v-container>
          <v-layout row>
            <v-flex xs6>
              <h2 class="font-weight-regular">Green Tees</h2>
              <h3 class="font-weight-regular pa-2">
                <span class="grey--text font-weight-medium">yards</span>
              </h3>
            </v-flex>
            <v-flex xs6>
              <h2 class="font-weight-regular">
                Par
              </h2>
              <h3 class="font-weight-regular pa-2">
              </h3>
            </v-flex>
          </v-layout>
        </v-container>
        <h3 class="font-weight-medium pr-2 pl-2 pb-4" style="color:#FFCB47">
          Currently, ranked as the third most difficult.
        </h3>
      </v-card>
      <v-divider class="mb-4" style="background-color:;"></v-divider>

      <stats v-if="!isLoading" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import Stats from './Stats/index'
import BackButton from '../../BackButton'

export default {
  name: 'index',
  components: {
    BackButton,
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

  watch: {
    summary: function () {
      this.$store.dispatch('summary/LOAD_SUMMARY_DATA', { tourn_id: this.currentTournament.id })
    },
    preview () {
      this.isPreview = !this.isPreview
      this.$el.classList.toggle('open')
    }
  },

  created: function () {
    this.year = this.currentTournament.year
    this.$store.dispatch(
      'overallSummary/LOAD_SUMMARY_DATA',
      { tourn_id: this.currentTournament.id }
    ).then(response => {
      this.isLoading = false
    })
  }

}
</script>
<style>
.hide {
  display: none;
}
.course-card {
  position: relative;
  background-color: #FBFCFD;
  z-index: 1;
}
.card, .tee-times {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
