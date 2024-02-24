<template>
  <v-card flat class="default-bg" v-if="!loading">
    <v-img :src="backgroundImageUrl" class="course-header">
      <v-row class="fill-height" align="end" justify="start">
        <v-col cols="12">
          <div class="course-info-overlay">
            <h2 class="font-weight-regular">The Mudder Tournament</h2>
            <h2 class="font-weight-regular">
              Breakdown
            </h2>
          </div>
        </v-col>
      </v-row>
    </v-img>

    <DetailsSection :breakdown="{
      numPlayers: numPlayers,
      totalPar: totalPar,
      greenTees: greenTees,
      goldTees: goldTees,
    }" />

    <IntroSection :breakdown="{
      info: info,
      tourneySays: tourneySays
    }" />

    <v-row class="mb-5">
      <v-col cols="12" class="pb-5">
        <h2 class="pl-5">Dig Deeper</h2>
        <h2 class="pl-5 mb-5">Into Each Round</h2>
        <Carousel
          :itemsToShow="1.5"
          :mouseDrag="true"
          :hideArrows="true"
          :hideDots="true"
          :dragSpeed="900"
        >
          <Slide v-for="(item, index) in roundInfo" :key="index">
            <PreviewLink :round="item" />
          </Slide>
        </Carousel>
      </v-col>
    </v-row>

    <WinnersBreakdown
      :puttingBreakdown="putting"
      :scoringBreakdown="scoring"
      :finalGroup="finalFour"
    />

    <v-img :style="sectionImage" style="height:300px">
      <v-row class="fill-height" align="end" justify="start">
        <v-col cols="8" class="pb-0">
          <h1 class="text-h3 default-color pl-2 mt-5 pt-5 font-weight-regular">
            Scoring History
          </h1>
          <h3 class="pl-5 default-color">Final Total Score</h3>
        </v-col>
      </v-row>
    </v-img>
    <HistoryChart :courseData="chartData"/>

    <v-row>
      <v-col cols="12" class="pa-5 stroke-bg mb-5">
      <h2 class="default-color pa-5 text-right">
        More history
        <span>
          <v-icon class="pb-1">mdi-chevron-right</v-icon>
        </span>
      </h2>
    </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useTournamentStore } from '@/store/tournament';
import DetailsSection from "./DetailsSection.vue";
import IntroSection from "./IntroSection.vue";
import HistoryChart from './HistoryChart.vue';
import PreviewLink from "./PreviewLink.vue";
import WinnersBreakdown from "./WinnersBreakdown.vue";
import { Carousel, Slide } from "vue3-carousel";
import 'vue3-carousel/dist/carousel.css';

export default {
  components: {
    Carousel,
    DetailsSection,
    HistoryChart,
    IntroSection,
    PreviewLink,
    Slide,
    WinnersBreakdown
  },

  data () {
    return {
      loading: true,
      numPlayers: 0,
      totalPar: 0,
      greenTees: 0,
      goldTees: 0,
      totalPurse: 0,
      info: "This is Bandon!",
      tourneySays: "This is Bandon!",
      roundInfo: [],
      winners: [],
      imageId: 2,
      roundId: null,
      putting: {},
      scoring: {},
      finalFour: {},
      chartData: [],
      backgroundImageUrl: "https://www.bandondunesgolf.com/wp-content/uploads/2022/04/BandonDunes_CoursePreview.jpg"
    }
  },

  computed: {
    ...mapState(
      useTournamentStore,
      ['currentTournament', 'tournamentBreakdown']
    ),
    sectionImage() {
      const imagePath = `../../../src/assets/punchbowl.jpg`;
      return {
        backgroundImage: `url(${imagePath})`,
        backgroundSize: 'cover'
      };
    }
  },

  methods: {
    ...mapActions(
      useTournamentStore,
      ['loadTournamentBreakdown']
    )
  },

  mounted () {
    this.loadTournamentBreakdown(this.$route.params.id).then(response => {
      const breakdown = this.tournamentBreakdown
      this.numPlayers = breakdown.num_players
      this.totalPar = breakdown.total_par
      this.greenTees = breakdown.green_tees
      this.goldTees = breakdown.gold_tees
      this.totalPurse = breakdown.purse
      this.info = breakdown.intro
      this.tourneySays = breakdown.tourney_says
      this.roundInfo = breakdown.round_info

      const winners = breakdown.winner_sentiment
      console.log(breakdown)
      this.putting = winners.putting_sentiment
      this.scoring = winners.scoring_sentiment
      this.finalFour = winners.final_group
      this.chartData = breakdown.chart

      this.loading = false
    })
  }
}
</script>
<style scoped>
.course-header {
  height: 33%;
  width: 100%;
}
.details-size {
  font-size: 1.5rem;
}
.v-img__img--contain {
  object-fit: cover !important;
}
.course-card {
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.course-info-overlay {
  padding-left: 10px;
  color: #f7f7f7;
}
.lb-button {
  border-radius: 20px;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>
