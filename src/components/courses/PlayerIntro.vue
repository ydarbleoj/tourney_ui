<template>
  <v-row class="bandon-dark-color mb-5 pl-2 align-center justify-space-between">
    <v-col cols="7" class="text-center pl-5">
      <h3>{{ playerInfo.intro }}</h3>
    </v-col>
    <v-col cols="5" class="text-center">
      <div class="d-flex flex-column align-center justify-center">
        <h1 class="text-h2 bandon-orange-color">{{ playerInfo.net_avg }}</h1>
        <h4 class="less-neutral-gray">Avg Net Score</h4>
      </div>
    </v-col>
  </v-row>
  <v-row class="bandon-dark-color mb-5 pl-2 align-center">
    <v-col cols="4">
      <div class="d-flex flex-column align-center justify-center">
        <h3 class="text-h2 bandon-orange-color">{{ playerInfo.putt_avg }}</h3>
        <h4 class="less-neutral-gray">Putting Avg</h4>
      </div>
    </v-col>
    <v-col cols="8" class="text-left pr-5">
      <h3>{{ playerInfo.intro_two }}</h3>
    </v-col>
  </v-row>
  <v-row class="pa-5">
    <v-col cols="12" class="text-left round-corners">
      <h3 class="underline-text">Notable Events</h3>
      <div v-if="playerInfo.notables.length > 0">
        <ul>
          <li v-for="(notable, index) in playerInfo.notables" :key="index">{{ notable }}</li>
        </ul>
      </div>
      <div v-else class="pa-5">
        This year's the perfect time to create some.
      </div>
    </v-col>
  </v-row>
  <v-row class="pa-5 neutral-bg mt-5">
    <v-col cols="12" class="text-left">
      <h2 class="bandon-orange-color">Ignobility</h2>
      <p class="underline-text less-neutral-color">You've made history and for that, I'm sorry.</p>
      <div v-if="playerInfo.ignobles.length > 0">
        <ul>
          <li v-for="(notable, index) in playerInfo.ignobales" :key="index">{{ notable }}</li>
        </ul>
      </div>
      <div v-else class="pa-5">
        Oh, nice. Some of your peers have not been as lucky.
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PlayerIntro",
  props: {
    playerInfo: {
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
