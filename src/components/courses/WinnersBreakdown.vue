<template>
  <v-row class="bandon-dark-color mb-5">
    <v-col cols="7" class="text-center pl-5">
      <h2 class="pl-2 pt-2">A Typical Winner's</h2>
      <h2 class="pb-2 pl-2 text-center">Profile</h2>
    </v-col>
    <v-col cols="5" class="pt-5 text-center">
      <h1 class="text-h2 bandon-orange-color">{{ scoringBreakdown.per_round_avg }}</h1>
      <h4 class="less-neutral-gray">Net Per Round</h4>
    </v-col>
    <v-col cols="12" class="pa-0">
      <v-row class="text-center pl-5 pt-0 pr-5">
        <v-col cols="4" class="">
          <h3 class="">Total Putts</h3>
          <h2 class="">{{ puttingBreakdown.avg_putts }}</h2>
        </v-col>
        <v-col cols="4">
          <h3 class="">Total Score</h3>
          <h2 class="">+{{ scoringBreakdown.total_score_avg }}</h2>
        </v-col>
        <v-col cols="4">
          <h3 class="">Total Shots</h3>
          <h2 class="">{{ scoringBreakdown.net_total_avg }}</h2>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="mt-5">
      <v-row class="pa-5">
        <v-col cols="12" class="text-left round-corners">
          <h3 class="underline-text">They have a tendency to do 3 things:</h3>
          <h4 class="pt-2 pb-2">
            {{ scoringBreakdown.gnr_sentiment }}
          </h4>
          <v-divider></v-divider>
          <h4 class="pt-2 pb-2">
            {{ scoringBreakdown.shots_waisted_sentiment }}
          </h4>
          <v-divider></v-divider>
          <h4 class="pt-2">
            {{ puttingBreakdown.sentiment }}
          </h4>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="text-center">
          <h2 class="pl-5">
            Ok, So What If I Want
          </h2>
          <h2 class="pl-5">
            To Be In The Final Group?
          </h2>
        </v-col>
        <v-col cols="6" class="pt-5 text-center">
          <h1 class="text-h3 bandon-orange-color">{{ finalGroup.net_avg }}</h1>
          <h4 class="less-neutral-gray">Total Net</h4>
        </v-col>
        <v-col cols="6" class="pt-5 text-center">
          <h1 class="text-h3 bandon-orange-color">+{{ finalGroup.score_avg }}</h1>
          <h4 class="less-neutral-gray">Total Score</h4>
        </v-col>
        <v-col cols="12">
          <h2 class="pl-5 pr-5">You shoot this over the first 2 days and you just might feel the final group pressure.</h2>
          <h3 class="pl-5 pt-5 pr-5">Golf trip brain is real, let's break down this into daily bites:</h3>
        </v-col>
        <v-col cols="6" class="text-center">
          <h2 class="text-h4 bandon-orange-color">{{ finalGroup.per_round_avg }}</h2>
          <h4 class="less-neutral-gray">Avg Net Score</h4>
        </v-col>
        <v-col cols="6" class="text-center">
          <h2 class="text-h4 bandon-orange-color">{{ finalGroup.putts / 2 }}</h2>
          <h4 class="less-neutral-gray">Avg Putts</h4>
        </v-col>
        <v-col cols="6" class="text-center">
          <h2 class="text-h4 bandon-orange-color">{{ finalGroup.waisted_shots / 2 }}</h2>
          <h4 class="less-neutral-gray">Avg Waisted Shots</h4>
        </v-col>
        <v-col cols="6" class="text-center">
          <h1 class="text-h4">{{ finalGroup.three_putts / 2 }}</h1>
          <h4 class="less-neutral-gray">Avg 3 Putts</h4>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="text-left">
          <h2 class="pl-5">
            Does The Winner Always Come From The Final Group?
          </h2>
          <p class="pa-5 pb-0">
            {{ finalGroup.winner_final_group_sentiment }}
          </p>

          <p class="pa-5">
            {{ finalGroup.final_group_sentiment }}
          </p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "WinnersBreakdown",
  props: {
    puttingBreakdown: {
      type: Object,
      required: true
    },
    scoringBreakdown: {
      type: Object,
      required: true
    },
    finalGroup: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.details-size {
  font-size: 1.5rem;
}
.round-corners {
  border-radius: 10px;
  border: 2px solid #9FB8CE;
}
</style>
