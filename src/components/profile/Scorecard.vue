<template>
  <v-card flat class="cards-bg-color" v-if="isLoaded">
    <v-img :src="courseImage" class="white--text course-image">
      <v-row class="fill-height" align="end" justify="start">
        <v-col cols="12">
          <div class="back-button">
            <BackButton :routeName="'ProfileScorecards'" :routeParams="{}" />
          </div>
          <div class="course-info-overlay">
            <h2 class="font-weight-regular">{{ course_name }}</h2>
            <h3 class="font-weight-regular">
              <span class="grey--text">Par</span> {{ course_par }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-img>
    <v-row>
      <v-col cols="6" class="pa-3 text-center">
        <h4
          :class="[teeName == 'Green' ? 'green-tee' : 'gold-tee']"
          class="font-weight-regular">
          {{ teeName }} tees
        </h4>
        <h4 class="mb-0 font-weight-light" style="color:#999">
          Handicap <span style="padding-left: 2px">{{ handicap }}</span>
        </h4>
      </v-col>
      <v-col cols="6" class="pa-3 text-center">
        <h4 class="mb-0 font-weight-regular">Rating / Slope</h4>
        <h4 class="mb-0 font-weight-light">
          <span style="color: #999">{{ teeRating }}</span>
          <span style="color: #999; padding-left: 4px">/</span>
          <span style="color: #999; padding-left: 4px">{{ teeSlope }}</span>
        </h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="font-weight-regular pa-5 text-center">
        <h1 class="font-weight-regular" style="color:#74c9d7; font-size:60px">
          {{ total_net }} <span style="font-size: 16px; color: #999">/ {{ total_score }}</span>
        </h1>
      </v-col>
      <v-col cols="6" class="font-weight-regular mt-5 text-center">
        <v-row>
          <v-col cols="12">
            <h3 class="font-weight-regular" style="color: #999">
              Putts <span style="padding-right:5px;color:#f8c977">{{ total_putts }}</span>
            </h3>
            <h3 class="font-weight-regular" style="color: #999">
              3 Putts <span style="padding-right:5px;color:#F79256">{{ total_3putts }}</span>
            </h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pa-5">
        <div class="rounded-border pt-5">
          <v-row>
            <v-col cols="5" class="pa-2 font-weight-regular text-right">
              <h1 class="font-weight-regular" style="color: #999">
                <span style="padding-right:2px;color:#74c9d7">{{ out_net }}</span> / {{ out_gross }}
              </h1>
            </v-col>
            <v-col cols="2" class="pa-0 pt-1 font-weight-medium text-center">
              <h1>OUT</h1>
            </v-col>
            <v-col cols="5" class="pa-2 font-weight-regular text-left">
              <h1 class="font-weight-regular" style="color: #999">
                <span style="padding-right:2px;color:#f8c977">{{ out_putts }}</span> / <span style="padding-right:5px;color:#F79256">{{ out_3putts }}</span>
              </h1>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col cols="5" class="pa-2 font-weight-regular text-right">
              <h1 class="font-weight-regular" style="color: #999">
                <span style="padding-right:2px;color:#74c9d7">{{ in_net }}</span> / {{ in_gross }}
              </h1>
            </v-col>
            <v-col cols="2" class="pa-0 pt-1 font-weight-medium text-center">
              <h1>IN</h1>
            </v-col>
            <v-col cols="5" class="pa-2 font-weight-regular text-left">
              <h1 class="font-weight-regular" style="color: #999">
                <span style="padding-right:2px;color:#f8c977">{{ in_putts }}</span> / <span style="padding-right:5px;color:#F79256">{{ in_3putts }}</span>
              </h1>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pa-5 mb-5">
        <v-row
          class="bx-shadow pa-3 mb-4"
          style="border-radius: 25px"
          @click="toScores()"
        >
          <v-col cols="10">
            <h3 class="font-weight-regular text-right">Scores</h3>
          </v-col>
          <v-col cols="2" class="text-right">
            <h3>
              <v-icon color="#666"> mdi-chevron-right </v-icon>
            </h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
  <div v-else>
    <!-- Loading state here -->
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import BackButton from "../BackButton.vue";
import { useProfileStore } from "../../store/profile";

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
      scorecardId: this.$route.params.scorecard_id,
      out_net: 0,
      out_gross: 0,
      out_putts: 0,
      out_3putts: 0,
      in_net: 0,
      in_gross: 0,
      in_putts: 0,
      in_3putts: 0,
      teeName: "Green",
      teeRating: 72.0,
      teeSlope: 113,
      user_id: this.$auth.user().id,
    };
  },

  computed: {
    ...mapState(useProfileStore, ["scorecard"]),
  },

  methods: {
    ...mapActions(useProfileStore, ["loadScorecard"]),
    loadHeaderInfo() {
      const card = this.scorecard;
      if (!card) return;
      this.user_id = card.user_id;
      this.course_name = card.course_name;
      this.total_net = card.total_net;
      this.course_par = card.par;
      this.total_putts = card.total_putts;
      this.total_3putts = card.total_3putts;
      this.handicap = card.handicap;
      this.total_score = card.total_score;
      this.scorecardId = card.id;
      this.out_net = card.out_net;
      this.out_gross = card.out_gross;
      this.out_putts = card.out_putts;
      this.out_3putts = card.out_3putts;
      this.in_net = card.in_net;
      this.in_gross = card.in_gross;
      this.in_putts = card.in_putts;
      this.in_3putts = card.in_3putts;
      this.teeName = card.tee_name;
      this.teeRating = card.tee_rating;
      this.teeSlope = card.tee_slope;
      this.courseImage = `../../../src/assets/${card.new_course_id}course.jpg`;
    },
    toScores() {
      this.$router.push({
        name: "ProfileScoreList",
        params: {
          id: this.user_id,
          scorecard_id: this.scorecardId,
        },
      });
    },
  },

  created() {
    this.loadScorecard(this.$route.params.scorecard_id)
      .then(() => {
        this.loadHeaderInfo();
        this.isLoaded = true;
      })
      .catch((err) => console.error(err));
  },
};
</script>

<style scoped>
.course-image {
  height: 33%; /* 33% of the viewport height */
  width: 100%;
}

.bx-shadow {
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}

.back-button {
  top: 0; /* Adjust as needed */
  left: 0;
  padding-bottom: 16px;
  color: white;
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
