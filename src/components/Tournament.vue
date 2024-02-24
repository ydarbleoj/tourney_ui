<template>
  <v-container class="pa-0 default-bg">
    <v-row>
      <v-col cols="3" class="text-left">
        <BackButton :routeName="'profile'" :routeParams="{ id: $auth.user().id }" />
      </v-col>
      <v-col cols="6"> </v-col>
      <v-col cols="3">
        <div class="text-weight-regular text-right pt-2 pr-3">
          <v-icon> mdi-dots-horizontal </v-icon>
        </div>
      </v-col>
      <div class="font-weight-regular pl-1">
        <h1 class="text-h3 pl-5">Bandon {{ year }}</h1>
      </div>
    </v-row>
    <v-row class="default-bg">
      <v-col cols="12">
        <leaderboards />
        <MudderCupPreview v-if="showMudderCup" />
        <CourseLeaderboardPreview v-if="!loading" />
        <MoneyBreakdown />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "pinia";
import { mapActions } from "pinia";
import BackButton from "./BackButton.vue";
import { useTournamentStore } from "@/store/tournament";
import Leaderboards from "./Leaderboards.vue";
import MudderCupPreview from "../components/muddercup/LeaderboardPreview.vue";
import CourseLeaderboardPreview from "./courses/CourseLeaderboardPreview.vue";
import MoneyBreakdown from "../components/money/TournamentBreakdown.vue";

export default {
  name: "Tournament",
  components: {
    BackButton,
    CourseLeaderboardPreview,
    Leaderboards,
    MoneyBreakdown,
    MudderCupPreview,
  },
  computed: {
    ...mapState(useTournamentStore, ["currentTournament", "tournaments"]),
  },

  data() {
    return {
      clipped: false,
      drawer: true,
      items: [],
      loading: true,
      userAdmin: false,
      overall: false,
      showMudderCup: false,
      year: "",
    };
  },
  methods: {
    renderOverall(value) {
      this.overall = value;
    },
    toAdmin() {
      this.$router.push({
        name: "TournamentAdmin",
        params: {
          id: this.currentTournament.id,
        },
      });
    },
    ...mapActions(useTournamentStore, ["loadTournament"]),
  },

  created() {
    this.loadTournament(this.$route.params.id).then((response) => {
      this.year = this.currentTournament.year;
      const cup = this.currentTournament.mudder_cup;
      this.showMudderCup = cup.mudder_cup;
      this.loading = false;
    });
  },
};
</script>
<style>
a {
  color: black;
  text-decoration: none;
}
.v-application__wrap {
  overflow-x: hidden;
}
</style>
