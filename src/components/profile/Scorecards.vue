<template>
  <div v-if="scorecards.length > 0">
    <h1 class="text-h2 mb-5" style="color:#999">
      <BackButton
        :routeName="'profile'"
        :routeParams="{}"
      />
      Scorecards
    </h1>
    <div v-for="scorecard in scorecards" :key="scorecard.year" class="pa-5 mb-6">
      <h2 class="text-h4 mb-4" style="color:#999">{{ scorecard.year }}</h2>
      <ScorecardLink
        v-for="card in scorecard.cards"
        :key="card.id"
        :card="card"
        @click="toScorecard(card.id)"
      />
    </div>
  </div>
  <div v-else>
    <!-- Loading or empty state here -->
  </div>
</template>

<script>
import { mapState } from "pinia";
import { mapActions } from "pinia";
import ScorecardLink from "./ScorecardLink.vue"; // Ensure to create this component
import { useProfileStore } from "@/store/profile";
import BackButton from "../BackButton.vue";

export default {
  components: {
    ScorecardLink,
    BackButton
  },
  data() {
    return {
      scorecards: [],
    };
  },
  computed: {
    ...mapState(useProfileStore, ["playerScorecards"])
  },
  created() {
    this.loadScorecards().then(() => {
      this.scorecards = this.playerScorecards;
    });
  },
  methods: {
    ...mapActions(useProfileStore, ["loadScorecards"]),
    toScorecard(id) {
      this.$router.push({
        name: "ProfileScorecard",
        params: {
          id: this.$auth.user().id,
          scorecard_id: id
        }
      });
    },
  },
};
</script>
