<template>
  <v-card flat class="cards-bg-color" v-if="isLoaded">
    <v-img :src="courseImage" class="course-image">
      <v-row class="fill-height" align="end" justify="center">
        <v-col cols="12">
          <div class="back-button bandon-dark-color">
            <BackButton
              :routeName="'RoundInfo'"
              :routeParams="{
                id: $route.params.id,
                round_id: roundId
              }" />
          </div>
        </v-col>
        <v-col cols="6" class="pa-0 pl-5 text-left">
          <v-img :src="courseLogoUrl" class="default-color course-logo" />
        </v-col>
        <v-col cols="6" class="pa-0 pl-5 font-weight-medium text-center">
          <h2 class="pa-0 font-weight-medium default-color">
            Round {{ roundNumber }}
          </h2>
          <h3 class="default-color">{{ date }} {{ year }}</h3>
        </v-col>
      </v-row>
    </v-img>
    <v-row>
      <v-col cols="6" class="pt-2 text-left">
        <v-card-text class="text-center">
          <h2 class="pb-1">Par <span class="details-size bandon-orange-color">{{ course_par }}</span></h2>
          <h3 class="">
           Handicap <span style="padding-left: 2px; font-size: 20px;">{{ handicap }}</span>
        </h3>

        </v-card-text>
      </v-col>
      <v-col cols="6" class="pb-0 pt-2 text-right">
        <v-card-text class="text-center">
          <h3 class="mb-1">{{ teeName }} {{ yardage }} yds</h3>
          <h3 class="mb-0 font-weight-regular pt-1">Rating / Slope</h3>
          <h3 class="mb-0 pt-1">
            <span class="less-neutral-gray pr-2">{{ teeRating }}</span>
            <span class="less-neutral-gray">/</span>
            <span class="less-neutral-gray pl-2">{{ teeSlope }}</span>
          </h3>
        </v-card-text>
      </v-col>
      <v-col class="text-right mr-2">
        <h3 @click="toScores()">
          Scores
          <v-icon class="bandon-orange-color">mdi-chevron-right</v-icon>
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pa-5 pt-0">
          <v-row align="center" justify="start">
            <v-col cols="6" class="text-center pa-0 pl-1 pt-5">
              <h2 class="bandon-orange-color font-weight-regular text-h3 pr-2">
                <span style="font-size: 20px" class="pl-2">+</span>{{ total_score }}
              </h2>
              <h1 class="font-weight-regular text-h4 less-neutral-gray">
                {{ total_net }} <span class="neutral-gray">/ {{ gross }}</span>
              </h1>
              <h4 class="font-weight-regular less-neutral-gray">
                NET <span class="neutral-gray">/ GROSS</span>
              </h4>
            </v-col>
            <v-col cols="6" class="stroke-bg font-weight-regular mt-5 text-center pt-5">
              <v-row>
                <v-col cols="12">
                  <h3 class="font-weight-regular less-neutral-gray pt-2">
                    Putts <span style="padding-right:5px;" class="bandon-dark-color">{{ total_putts }}</span>
                  </h3>
                  <h3 class="font-weight-regular less-neutral-gray">
                    3 Putts <span style="padding-right:5px;color:#F79256;font-weight:900" >{{ total_3putts }}</span>
                  </h3>
                  <h3 class="font-weight-regular less-neutral-gray mb-5">
                    Waisted Shots <span style="padding-right:5px;" class="bandon-dark-color">{{ total_putts }}</span>
                  </h3>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pa-5">
        <div class="rounded-border pt-5 pb-5">
          <v-row>
            <v-col cols="6" class="pa-2 font-weight-regular text-center">
              <h1 class="font-weight-regular neutral-gray">
                <span style="padding-right:2px;" class="less-neutral-gray">{{ out_net }}</span> / {{ out_gross }}
              </h1>
            </v-col>
            <v-col cols="6" class="pa-2 font-weight-regular text-center">
              <h1 class="font-weight-regular neutral-gray">
                <span style="padding-right:2px;" class="less-neutral-gray">{{ in_net }}</span> / {{ in_gross }}
              </h1>
            </v-col>
          </v-row>
          <v-row class="pt-0 mt-0">
            <v-col cols="6" class="pa-0 font-weight-medium text-center">
              <h3>OUT</h3>
            </v-col>
            <v-col cols="6" class="pa-0 font-weight-medium text-center">
              <h3>IN</h3>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="6" class="pa-2 font-weight-regular text-center">
              <h1 class="font-weight-regular" style="color: #999">
                <span style="padding-right:2px;" class="less-neutral-gray">{{ out_putts }}</span> / <span style="padding-right:5px;color:#F79256">{{ out_3putts }}</span>
              </h1>
            </v-col>
            <v-col cols="6" class="pa-2 font-weight-regular text-center">
              <h1 class="font-weight-regular less-neutral-gray">
                <span style="padding-right:2px;">{{ in_putts }}</span> / <span style="padding-right:5px;color:#F79256">{{ in_3putts }}</span>
              </h1>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-5 stroke-bg pa-5">
      <v-col cols="12">
        <h2 class="text-left font-weight-regular">Round Breakdown</h2>
      </v-col>
      <v-col cols="12">
        <h3 class="pb-2 default-color">Tourney</h3>
        <v-divider class="mb-2"></v-divider>
        <p class="pt-2">
          {{ movement }}
        </p>
      </v-col>
      <v-col cols="12">
        <h3 class="pb-2 bandon-orange-color">Mudder Cup</h3>
        <v-divider class="mb-2"></v-divider>

        <p class="pt-2">
          {{ team }}
        </p>
      </v-col>
      <v-col cols="12">
        <h3 class="pb-2">Skins</h3>
        <v-divider class="mb-2"></v-divider>
        <p class="pt-2">
          {{ skins }}
        </p>
      </v-col>
      <v-col cols="12">
        <h3 class="pb-2 putting-color">Putting</h3>
        <v-divider class="mb-2"></v-divider>
        <p class="pt-2">
          {{ three_putts }}
        </p>
      </v-col>
    </v-row>
    <v-row class="stroke-bg">
      <v-col cols="12" class="mb-5 mt-5"></v-col>
    </v-row>
  </v-card>
  <div v-else>
    <!-- Loading state here -->
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import BackButton from "../BackButton.vue";
import { useScorecardsStore } from '../../store/scorecards';

export default {
  components: { BackButton },

  data() {
    return {
      isLoaded: false,
      courseImage: "", // Placeholder for course image URL
      course_name: "Scorecard",
      course_par: 0,
      course_id: 0,
      total_net: 0,
      total_putts: 0,
      total_3putts: 0,
      handicap: 0,
      total_score: 0,
      gross: 0,
      roundNumber: 1,
      scorecardId: this.$route.params.scorecard_id,
      out_net: 0,
      out_gross: 0,
      out_putts: 0,
      out_3putts: 0,
      in_net: 0,
      in_gross: 0,
      in_putts: 0,
      in_3putts: 0,
      date: "Feb 14",
      teeName: "Green",
      teeRating: 72.0,
      yardage: 0,
      year: 2021,
      teeSlope: 113,
      team: "",
      movement: "",
      skins: "",
      three_putts: "",
      user_id: this.$auth.user().id,
      roundId: this.$route.params.round_id,
    };
  },

  computed: {
    ...mapState(useScorecardsStore, ["playerScorecard"]),
    courseLogoUrl() {
      return `../../../src/assets/course${this.course_id}_titlelogo.webp`;
    },
  },

  methods: {
    ...mapActions(useScorecardsStore, ["loadScorecard"]),
    loadHeaderInfo() {
      const card = this.playerScorecard;
      if (!card) return;

      this.user_id = card.user_id;
      this.course_name = card.course_name;
      this.course_id = card.new_course_id;
      this.total_net = card.total_net;
      this.course_par = card.par;
      this.total_putts = card.total_putts;
      this.total_3putts = card.total_3putts;
      this.handicap = card.handicap;
      this.total_score = card.score;
      this.scorecardId = card.id;
      this.out_net = card.out_net;
      this.out_gross = card.out_gross;
      this.out_putts = card.out_putts;
      this.out_3putts = card.out_3putts;
      this.in_net = card.in_net;
      this.in_gross = card.in_gross;
      this.in_putts = card.in_putts;
      this.in_3putts = card.in_3putts;
      this.yardage = card.yardage;
      this.gross = card.total_score;
      this.teeName = card.tee_name;
      this.teeRating = card.tee_rating;
      this.teeSlope = card.tee_slope;
      this.roundNumber = card.round_num;
      this.date = card.date;
      const games = card.games_breakdown;
      this.team = games.team;
      this.movement = games.movement;
      this.skins = games.skins;
      this.three_putts = games.three_putt;
      console.log(card)
      this.roundId = card.tournament_round_id;

      this.year = card.year;
      this.courseImage = `../../../src/assets/scorecard${card.new_course_id}.jpg`;
    },
    toScores() {
      // this.$router.push({
      //   name: "ScoreList",
      //   params: {
      //     id: this.user_id,
      //     scorecard_id: this.scorecardId,
      //   },
      // });
    },
  },

  created() {
    this.loadScorecard(this.$route.params.id, this.$route.params.scorecard_id)
    .then(() => {
      this.loadHeaderInfo();
      this.isLoaded = true;
    })
    .catch((err) => console.error(err));
  },
};
</script>

<style scoped>
.course-logo {
  width: 100px;
  height: 100px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  color: #f7f7f7;
}
.course-image {
  height: 33%; /* 33% of the viewport height */
  width: 100%;
}

.bx-shadow {
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}

.back-button {
  position: fixed;
  left: 0;
  padding-top: 10px;
  padding-bottom: 16px;
}
.course-info-overlay {
  padding-left: 10px;
  color: #f7f7f7;
}
.rounded-border {
  border: 2px solid #999; /* Adjust the color as needed */
  border-radius: 8px; /* Adjust the radius as needed */
}
</style>
