<template>
  <v-card v-if="!loading" flat class="default-bg">
    <v-img :style="backgroundStyle" class="course-header">
      <v-row class="fill-height" align="end" justify="start">
        <v-col cols="8" class="pb-0">
          <v-img :src="courseLogoUrl" class="default-color course-logo" />
        </v-col>
        <v-col cols="4" class="text-center">
          <h2 class="font-weight-regular default-color">Round {{ roundNumber }}</h2>
        </v-col>
      </v-row>
    </v-img>

    <v-row>
      <v-col cols="6">
        <v-card-text>
          <h2 class="pb-1">
            Par <span class="details-size bandon-orange-color">{{ par }}</span>
          </h2>
        </v-card-text>
      </v-col>
      <v-col cols="6" class="pb-0">
        <v-card-text>
          <h3 class="mb-1">
            Green Tees <span>{{ greenTees }}</span
            >yds
          </h3>
          <h3>
            Gold Tees <span>{{ goldTees }}</span
            >yds
          </h3>
        </v-card-text>
      </v-col>
      <v-col class="text-right">
        <h3 @click="toScorecard">
          Scorecard
          <v-icon class="bandon-orange-color">mdi-chevron-right</v-icon>
        </h3>
      </v-col>
    </v-row>
    <v-row class="bandon-dark-color pl-5 pb-5 stroke-bg pt-5">
      <v-col cols="12" class="">
        <p>{{ info }}</p>
      </v-col>
      <v-col cols="12" class="mb-5">
        <v-row>
          <v-col cols="5" class="text-center pt-0">
            <h3 class="pt-2">
              <span class="bandon-orange-color details-size">{{ handicapDiff }}</span>
              Hcap Diff
            </h3>
            <h3>
              <span class="bandon-orange-color details-size">{{ netAvg }}</span> Net Avg
            </h3>
            <h3>
              <span class="bandon-orange-color details-size">{{ avgPutts }}</span> Avg
              Putts
            </h3>
          </v-col>
          <v-col cols="7" class="text-left pa-0 pr-3">
            <p class="pr-5">{{ infoTwo }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <PlayerIntro :playerInfo="playerInfo" />
    <HolesStretches :hardestStretch="hardestStretch" :easiestStretch="easiestStretch" />

    <v-img :style="sectionImage" style="height: 300px">
      <v-row class="fill-height" align="end" justify="start">
        <v-col cols="8" class="pb-0">
          <h1 class="text-h3 default-color pl-2 mt-5 pt-5 pb-5 font-weight-regular">
            Scoring History
          </h1>
        </v-col>
      </v-row>
    </v-img>

    <HistoryChart :courseData="finishingData" />
    <v-row>
      <v-col cols="12" class="pa-5 neutral-bg mb-5 mt-5">
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
import { mapState } from "pinia";
import { mapActions } from "pinia";
import { useTournamentStore } from "@/store/tournament";
import PlayerIntro from "./PlayerIntro.vue";
import HolesStretches from "./HolesStretches.vue";
import HistoryChart from "./HistoryChart.vue";
// import BackButton from '../BackButton';

export default {
  components: {
    HistoryChart,
    HolesStretches,
    PlayerIntro,
  },

  data() {
    return {
      show: false,
      loading: true,
      roundId: null,
      roundNumber: null,
      courseName: null,
      scorecardId: null,
      hardestStretch: {},
      easiestStretch: {},
      par: 72,
      greenTees: 0,
      goldTees: 0,
      info: "Get ready Mudders!",
      infoTwo: "Tourney's final prediction",
      netAvg: 0,
      avgPutts: 0,
      handicapDiff: 0,
      playerInfo: {},
      finishingData: [],
      backgroundImageUrl:
        "https://www.bandondunesgolf.com/wp-content/uploads/2022/04/BandonDunes_CoursePreview.jpg",
    };
  },

  computed: {
    ...mapState(useTournamentStore, ["currentTournament", "courseBreakdown"]),
    courseLogoUrl() {
      return `../../../src/assets/course${this.courseBreakdown.course_id}_titlelogo.webp`;
    },
    backgroundStyle() {
      return {
        height: "33vh",
        backgroundImage: `url(${this.backgroundImageUrl})`,
        backgroundSize: "cover",
      };
    },
    sectionImage() {
      const imagePath = `../../../src/assets/${this.courseBreakdown.course_id}course-old.jpg`;
      return {
        backgroundImage: `url(${imagePath})`,
        backgroundSize: "cover",
      };
    },
  },

  methods: {
    ...mapActions(useTournamentStore, ["loadCourseBreakdown"]),
    toScorecard() {
      this.$router.push({
        name: "Scorecard",
        params: {
          id: this.$route.params.id,
          scorecard_id: this.scorecardId,
        },
      });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    const roundId = this.$route.params.round_id;

    this.loadCourseBreakdown(id, roundId).then((response) => {
      const breakdown = this.courseBreakdown;

      this.courseName = breakdown.name;
      this.roundNumber = breakdown.round_number;
      this.par = breakdown.par;
      this.greenTees = breakdown.green_tees_yardage;
      this.goldTees = breakdown.gold_tees_yardage;
      this.backgroundImageUrl = `../../../src/assets/${breakdown.course_id}course.jpg`;
      this.scorecardId = breakdown.scorecard_id;
      this.info = breakdown.intro;
      this.infoTwo = breakdown.intro_two;
      this.netAvg = breakdown.net_avg;
      this.avgPutts = breakdown.putt_avg;
      this.handicapDiff = breakdown.handicap_diff;
      this.playerInfo = breakdown.player_intro;
      this.hardestStretch = breakdown.hardest_stretch;
      this.easiestStretch = breakdown.easiest_stretch;
      this.finishingData = breakdown.finishing_chart;
      this.loading = false;
    });
  },
};
</script>
<style>
.course-card {
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.course-header {
  height: 33%;
  width: 100%;
}
.back-button {
  border-color: white;
  background-color: transparent;
}
.course-logo {
  width: 100px;
  height: 100px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  color: #f7f7f7;
}
.details-size {
  font-size: 1.5rem;
}
</style>
