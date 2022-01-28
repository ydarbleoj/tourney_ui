<template>
  <v-bottom-nav
    fixed
    :value="true"
    color="white"
    style="background-color:#FF9D72;z-index:1;"
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
        <h2 style="color:#333;text-decoration: underline;">
          Scorecard
        </h2>
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
      scorecardId: this.$route.params.id,
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
      this.$router.push({
        name: 'Scorecard',
        params: {
          id: this.getTournament.id,
          scorecard_id: this.scorecardId
        }
      })
    },
    goBack () {
      this.$store.commit("setPageTransition", "back");
      this.$router.go(-1)
    },
    goNext () {
      const next = +this.holeNumber + 1
      this.$store.commit("setPageTransition");
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
    this.roundId = this.scorecard.tournament_round_id
    this.scorecard_id = this.scorecard.id
  }

}
</script>
