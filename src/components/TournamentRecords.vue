<template>
  <div class="default-bg mb-2" v-if="tournament.length > 0">
    <div style="color:#999">
      <BackButton
        :routeName="'profile'"
        :routeParams="{}"
      />
    </div>
    <h1 class="text-h2 mb-5 pl-3 pt-5 neutral-gray">
      Records
    </h1>
    <v-row class="pa-2">
      <v-col cols="12" class="text-left pa-5">
        <h3 class="neutral-gray font-weight-medium">Most Wins</h3>
        <div class="pt-2 font-weight-medium stroke-color">
          <h1>
            {{ mostWins.current_value }} <span class="neutral-gray name-size">{{ mostWins.holder_name }}</span>
          </h1>
        </div>
        <div class="pl-5 neutral-gray">
          {{ mostWins.description }}
        </div>
        <div class="pt-5 text-right" @click="toRecord(mostWins.id)">
          <span class="underline-text neutral-gray">More Details</span><v-icon color="#666"> mdi-chevron-right </v-icon>
        </div>
      </v-col>
    </v-row>
    <v-row class="pa-2 pt-0 mt-0">
      <v-col cols="6" class="text-left pa-5">
        <h3 class="neutral-gray font-weight-medium">Most Putting Wins</h3>
        <div class="pt-2 font-weight-medium putting-color">
          <h1>
            {{ mostPuttingWins.current_value }} <span class="neutral-gray name-size">{{ mostPuttingWins.holder_name }}</span>
          </h1>
        </div>
        <div class="text-center" @click="toRecord(mostPuttingWins.id)">
          <span class="underline-text neutral-gray">More Details</span><v-icon color="#666"> mdi-chevron-right </v-icon>
        </div>
      </v-col>
      <v-col cols="6" class="text-left pa-5">
        <h3 class="neutral-gray font-weight-medium">Most Skins</h3>
        <div class="pt-2 font-weight-medium skins-color">
          <h1>
            {{ mostPuttingWins.current_value }} <span class="neutral-gray name-size">{{ mostPuttingWins.holder_name }}</span>
          </h1>
        </div>
        <div class="text-center" @click="toRecord(mostPuttingWins.id)">
          <span class="underline-text neutral-gray">More Details</span><v-icon color="#666"> mdi-chevron-right </v-icon>
        </div>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <!-- Loading or empty state here -->
  </div>
</template>

<script>
import { mapState } from "pinia";
import { mapActions } from "pinia";
import BackButton from "./BackButton.vue";
import { useTournamentStore } from "@/store/tournament";

export default {
  components: {
    BackButton
  },
  data() {
    return {
      tournament: [],
      mostWins: {},
      mostPuttingWins: {},
      fewestPutts: {},
      net: {},
      gross: {},
      fewestTotalPutts: {},
      fewestTotalThreePutts: {},
      handicapDiff: {},
    };
  },
  computed: {
    ...mapState(useTournamentStore, ["tournamentRecords"])
  },
  created() {
    this.loadTournamentRecords().then(() => {
      this.tournament = this.tournamentRecords;
      this.mostWins = this.findRecordsByName('Most Wins')[0];
      this.mostPuttingWins = this.findRecordsByName('Most Putting Wins')[0];
      this.fewestPutts = this.findRecordsByName('Fewest Putts')[0];
      this.net = this.findRecordsByName('Net')[0];
      this.gross = this.findRecordsByName('Gross')[0];
      this.fewestTotalPutts = this.findRecordsByName('Fewest Total Putts')[0];
      this.fewestTotalThreePutts = this.findRecordsByName('Fewest Total Three Putts')[0];
      this.handicapDiff = this.findRecordsByName('Handicap Diff')[0];
    });
  },
  methods: {
    ...mapActions(useTournamentStore, ["loadTournamentRecords"]),
    findRecordsByName(name) {
      return this.tournamentRecords.filter((record) => record.name === name);
    },
    toRecord(id) {
      console.log(id);
      this.$router.push({
        name: "TournamentRecord",
        params: { id: id }
      });
    },
  },
};
</script>

<style scoped>
.record-number {
  font-size: 38px;
}
.name-size {
  font-size: 20px;
}
</style>
