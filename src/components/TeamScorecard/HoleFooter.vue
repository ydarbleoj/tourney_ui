<template>
  <v-bottom-nav
    fixed
    :value="true"
    color="white"
    style="background-color:#FF9D72;"
  >
    <v-layout row fill-height align-center>
      <v-flex xs4 class="pl-2">
        <span @click="goBack()">
          <v-icon color="#FFCB47" style="font-size:35px;">
            arrow_backward
          </v-icon>
        </span>
      </v-flex>
      <v-flex
        xs4
        class="text-xs-center"
        @click="scorecardPage()"
      >
        <h3 style="color:#74C9D7;text-decoration: underline;">
          Team Scorecard
        </h3>
      </v-flex>
      <v-flex xs4 class="text-xs-right pr-2">
        <span
          @click="goNext()"
          v-if="!isEighteen()"
        >
          <v-icon color="#FFCB47" style="font-size:35px;">
            arrow_forward
          </v-icon>
        </span>
      </v-flex>
    </v-layout>
  </v-bottom-nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "HoleFooter",
  data () {
    return {
      holeNumber: this.$route.params.number,
      roundId: null
    }
  },

  computed: {
    ...mapGetters({
      scorecard: 'scorecards/scorecard',
      getTournament: 'tournament/getTournament'
    })
  },

  methods: {
    scorecardPage () {
      this.$store.commit("setPageTransition", "back");
      this.$router.push(
        {
          name: 'TeamScorecard',
          params: {
            id: this.getTournament.id,
            team_id: this.scorecard_id
          }
        }
      )
    },
    goBack () {
      this.$store.commit("setPageTransition", "back");
      this.$router.go(-1)
    },
    goNext () {
      const next = +this.holeNumber + 1
      this.$store.commit("setPageTransition");
      this.$router.push(
        {
          name: 'TeamScorecardHole',
          params: {
            id: this.scorecard_id,
            number: next
          }
        }
      )
    },
    isEighteen () {
      return this.holeNumber == 18 ? true : false;
    }
  },

  created () {
    this.roundId = this.scorecard.tournament_round_id
    this.scorecard_id = this.scorecard.id
  }

}
</script>
