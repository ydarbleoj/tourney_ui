<template>
  <v-row>
    <v-col cols="6">
      <v-card-text>
        <h2><span class="bandon-orange-color pr-2 details-size">{{ breakdown.numPlayers }}</span>Players</h2>
        <h2 class="pb-2 mt-2">3 Rounds</h2>
      </v-card-text>
    </v-col>
    <v-col cols="6" class="pb-0">
      <v-card-text>
        <h2 class="pb-1">Par <span class="details-size bandon-orange-color">{{ breakdown.totalPar }}</span></h2>
        <h3 class="mb-1">Green Tees <span>{{ breakdown.greenTees }}</span>yds</h3>
        <h3>Gold Tees <span>{{ breakdown.goldTees }}</span>yds</h3>
      </v-card-text>
    </v-col>
    <v-col class="text-right">
      <h3>
        Scorecards
        <v-icon class="bandon-orange-color">mdi-chevron-right</v-icon>
      </h3>
    </v-col>
    <!-- <v-divider class="mb-4"></v-divider> -->
  </v-row>
</template>

<script>
export default {
  name: "DetailsSection",
  props: {
    breakdown: {
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
</style>
