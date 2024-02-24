<template>
  <!-- <v-bottom-navigationj> -->
    <!-- <v-row align="center">
      <v-col cols="4" class="pl-2">
        <span @click="goBack()">
          <v-icon color="#FFCB47" style="font-size:35px;">
            arrow_backward
          </v-icon>
        </span>
      </v-col>
      <v-col
        cols="4"
        class="text-center"
        @click="scorecardPage()"
      >
        <h2 style="color:#333;text-decoration: underline;">
          Scorecard
        </h2>
      </v-col>
      <v-col cols="4" class="text-right pr-2">
        <span @click="goNext()" v-if="!isEighteen()">
          <v-icon color="#FFCB47" style="font-size:35px;">
            arrow_forward
          </v-icon>
        </span>
      </v-col>
    </v-row> -->
  <!-- </v-bottom-navigation> -->
</template>

<script>
import { mapState } from 'pinia'
import { useTournamentStore } from "@/store/tournament";
import { useScorecardsStore } from "@/store/scorecards";

export default {
  name: "HoleFooter",
  data () {
    return {
      holeNumber: this.$route.params.number,
      scorecardId: this.$route.params.id,
      roundId: null
    }
  },

  computed: {
    ...mapState(useTournamentStore, ['currentTournament']),
    ...mapState(useScorecardsStore, ['playerScorecard'])
  },

  methods: {
    scorecardPage () {
      // this.$store.commit("setPageTransition", "back");
      this.$router.push({
        name: 'Scorecard',
        params: {
          id: this.currentTournament.id,
          scorecard_id: this.scorecardId
        }
      })
    },
    goBack () {
      // this.$store.commit("setPageTransition", "back");
      this.$router.go(-1)
    },
    goNext () {
      const next = +this.holeNumber + 1
      // this.$store.commit("setPageTransition");
      this.$router.push({
        name: 'ScorecardHole',
        params: {
          id: this.scorecardId,
          number: next
        }
      })
    },
    isEighteen () {
      return this.holeNumber == 18 ? true : false;
    }
  },

  created () {
    console.log('hehrehejrhk')
    // this.roundId = this.playerScorecard.tournament_round_id
    // this.scorecard_id = this.playerScorecard.id
  }

}
</script>
