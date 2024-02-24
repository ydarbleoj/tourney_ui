<template>
  <v-card
    flat
    class="cards-bg-color round-borders ma-2"
    @click="scorecardPage"
    v-if="state.data.userHasACard"
    :class="{ 'opacity-click': state.data.clicked }"
  >
    <v-container>
      <v-row>
        <v-col>
          <h2 class="font-weight-regular white--text">{{ state.data.course_name }}</h2>
          <h3 class="font-weight-regular white--text">
            <span style="color: #999">Par</span> {{ state.data.course_par }}
          </h3>
        </v-col>
        <v-col>
          <h3 class="mb-0 pt-2 text-center white--text font-weight-regular">
            {{ state.data.handicap }} Handicap
          </h3>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center pb-2">
        <v-col class="text-center">
          <v-row>
            <v-col class="pa-0">
              <h1
                class="font-weight-regular ma-0"
                style="color: #a8c256; font-size: 30px"
              >
                {{ state.data.total_net }}
              </h1>
              <label class="scorecard-label">NET</label>
            </v-col>
            <v-col cols="2">
              <h1 style="color: #999; font-size: 30px">/</h1>
            </v-col>
            <v-col class="pa-0">
              <h1 class="ma-0 font-weight-regular" style="color: #999; font-size: 30px">
                {{ state.data.total_score }}
              </h1>
              <label class="scorecard-label">GROSS</label>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2"></v-col>
        <v-col class="text-center">
          <v-row justify="center">
            <v-col class="pa-0">
              <h1
                style="color: #a8c256; font-size: 30px"
                class="ma-0 font-weight-regular"
              >
                {{ state.data.total_putts }}
              </h1>
              <label class="scorecard-label">PUTTS</label>
            </v-col>
            <v-col cols="3">
              <h1 class="font-weight-regular" style="color: #999; font-size: 30px">/</h1>
            </v-col>
            <v-col class="pa-0">
              <h1 class="pers-record ma-0 font-weight-regular" style="font-size: 30px">
                {{ state.data.total_3putts }}
              </h1>
              <label class="scorecard-label font-weight-regular">3PTS</label>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script setup>
import { useRouter } from "vue-router";
import { reactive, onMounted } from "vue";
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";

const router = useRouter();
const leaderboardsStore = useLeaderboardsStore();
const tournamentStore = useTournamentStore();

const props = defineProps({
  round: Object,
});

const state = reactive({
  data: {
    isLoaded: false,
    course_name: "Scorecard",
    scorecardId: null,
    course_par: 0,
    total_net: 0,
    total_putts: 0,
    total_3putts: 0,
    handicap: 0,
    total_score: 0,
    roundId: null,
    userHasACard: true,
    clicked: false,
  },
});

function scorecardPage() {
  const id = state.data.scorecardId;
  state.data.clicked = true;

  router.push({
    name: "Scorecard",
    params: {
      id: tournamentStore.currentTournament.id,
      scorecard_id: id,
    },
  });
}

onMounted(() => {
  const preview = leaderboardsStore.scorecardPreviews.filter(
    (el) => el.attributes.round_num == props.round.attributes.round_number
  );

  if (preview.length == 0) {
    this.userHasACard = false;
    return;
  }
  const scorecard = preview[0].attributes;
  state.data.scorecardId = scorecard.id;
  console.log("a", scorecard.id);
  state.data.course_name = scorecard.course_name;
  state.data.total_net = scorecard.total_net;
  state.data.total_putts = scorecard.total_putts;
  state.data.total_3putts = scorecard.total_3putts;
  state.data.handicap = scorecard.handicap;
  state.data.total_score = scorecard.total_score;
  state.data.roundId = scorecard.tournament_round_id;
  state.data.course_par = scorecard.par;
});
</script>
<style>
.cards-bg-color {
  background-color: #424242;
}
.round-borders {
  border-radius: 20px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
.record {
  color: #a8c256;
}
.pers-record {
  color: #f79256;
}
label.scorecard-label {
  color: #999;
  font-size: 12px;
}
.white--text {
  color: white;
}
.opacity-click {
  opacity: calc(0.7);
  margin: 5px 0 -5px 0;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
