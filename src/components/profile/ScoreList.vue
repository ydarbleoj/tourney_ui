<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2 mb-5" style="color:#999">
          <BackButton
            :routeName="'ProfileScorecard'"
            :routeParams="{
              id: this.$auth.user().id,
              scorecard_id: this.$route.params.scorecard_id
            }"
          />
          Scores
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list class="pa-0">
          <v-list-item v-for="userScore in scorecardScores" :key="userScore.id">
            <v-card flat class="score-display">
              <v-container>
                <v-row align="center" class="pb-2">
                  <v-col cols="2">
                    <h3 class="text-left font-weight-regular">{{ userScore.number }}</h3>
                  </v-col>
                  <v-col>
                    <span style="font-size: 24px; padding-right: 5px; color: #74c9d7">
                      {{ userScore.net }}
                    </span>
                    <span style="font-size: 24px" v-if="userScore.net">/</span>
                    <span class="grey--text" style="font-size: 24px; padding-left: 5px">
                      {{ userScore.score }}
                    </span>
                  </v-col>
                  <v-col>
                    <span
                      class="text-center"
                      style="font-size: 24px"
                      :style="{ color: puttColor(userScore.putts) }"
                    >
                      {{ userScore.putts }} pts
                    </span>
                  </v-col>
                  <v-col>
                    <div>
                      Par {{ userScore.par }}
                      <span
                        class="text-center pa-0"
                        style="color: #f8c977; font-size: 24px; height: 24px"
                      >
                        {{ strokes(userScore.handicap) }}
                      </span>
                    </div>
                    <span>{{ userScore.handicap }}</span> hcap
                  </v-col>
                  <v-col cols="1" class="text-right"></v-col>
                </v-row>
              </v-container>
              <v-divider></v-divider>
            </v-card>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "pinia";
import { useProfileStore } from "../../store/profile";
import BackButton from "../BackButton.vue";

export default {
  name: "ScoreList",

  components: {
    BackButton,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(useProfileStore, ["scorecardScores", "scorecard"]),
  },
  mounted() {
    console.log('mmm',this.scorecardScores);
  },
  methods: {
    strokes: function (holeHcap) {
      let hcap = this.scorecard.handicap;

      if (hcap < 19 && hcap >= holeHcap) return "*";
      if (hcap > 19) {
        let newHcap = hcap - 18;
        return newHcap >= holeHcap ? "* *" : "*";
      }
    },
    puttColor: function (putts) {
      return putts > 2 ? "#F79256" : "";
    },
  },
};
</script>
<style>
.two-putt {
  color: #9fb8ce;
}
.three-putt {
  color: #f79256;
}
div.list__tile__sub-title.text-center.handicap-color span {
  color: #9fb8ce;
}
.slide-fade-enter-active {
  transition: all 8s ease;
}
.slide-fade-leave-active {
  transition: all 0s;
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translate(200px);
  opacity: 0;
}
</style>
