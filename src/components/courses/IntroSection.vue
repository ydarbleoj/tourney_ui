<template>
  <v-row class="bandon-dark-color pl-5 pb-5 stroke-bg pt-5">
    <v-col cols="12" class="">
      <h4 class="pb-2">Get ready Mudders!</h4>
      <p>{{ breakdown.info }}</p>
    </v-col>
    <v-col cols="12" class="mb-5">
      <v-row>
        <v-col cols="5" class="pt-0 pr-0">
          <h3 class="text-left"><span class="bandon-orange-color details-size">+12</span> Score</h3>
          <h3 class="text-left"><span class="bandon-orange-color">228</span> Total Strokes</h3>
          <h5 class="text-left less-neutral-gray">Tourney's final prediction</h5>
        </v-col>
        <v-col cols="7" class="text-left pa-0 pr-2">
          <h4>Tourney Says: </h4>
          <p>{{ breakdown.tourneySays }}</p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "InfoSection",
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
