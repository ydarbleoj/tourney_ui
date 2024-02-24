<template>
  <div class="mb-5">
    <v-row>
      <v-col cols="12" class="bandon-orange-bg mb-5">
        <h2 class="default-color text-center mt-2">{{ title }}</h2>
      </v-col>
    </v-row>
    <div v-for="match in matches" :key="match.number">
      <v-row>
        <v-col cols="12" class="text-left pa-2 border-for-match">
          <h4 class="">Match {{ match.number }}
            <span class="less-neutral-gray" style="font-size:14px;">{{ match.tee_time }}</span>
          </h4>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center">
        <v-col cols="1" class="d-flex justify-center align-center pr-0 pt-0">
          <h1 class="stroke-color">{{ match.team_one.score }}</h1>
        </v-col>
        <v-col cols="4" class="d-flex flex-column justify-center align-center pt-0">
          <div v-if="roundThree">
          {{ match.team_one.team_id }}
            <h4>{{ playerOneName(match.team_one.players) }}</h4>
          </div>
          <div v-else>
            {{ match.team_one.team_id }}

            <h4 class="">{{ playerOneName(match.team_one.players) }}</h4>
            <h5 class="text-center">/</h5>
            <h4>{{ playerTwoName(match.team_one.players) }}</h4>
          </div>
        </v-col>
        <v-col cols="2" class="d-flex justify-center align-center">
          <h4 v-if="match.team_one.results">{{ match.team_one.results }}</h4>
          <h3 v-else>VS</h3>
        </v-col>
        <v-col cols="4" class="d-flex flex-column justify-center align-center pt-0">
          <div v-if="roundThree">
            {{ match.team_two.team_id }}
            <h4>{{ playerOneName(match.team_two.players) }}</h4>
          </div>
          <div v-else>
            {{ match.team_two.team_id }}
            <h4>{{ playerOneName(match.team_two.players) }}</h4>
            <h5 class="text-center">/</h5>
            <h4>{{ playerTwoName(match.team_two.players) }}</h4>
          </div>
        </v-col>
        <v-col cols="1" class="d-flex justify-center align-center pt-0">
          <h1 class="alt-putting-color text-left pr-3">{{ match.team_two.score }}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center pa-2"></v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndivMatches",
  props: {
    day: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      title: "Day One",
      matches: [],
      roundThree: false,
    }
  },

  methods: {
    playerOneName(players) {
      if (players) {
        return players.player1
      }
    },
    playerTwoName(players) {
      if (players) {
        return players.player2
      }
    }
  },

  mounted() {
    const d = this.day[0]
    this.title = d.title
    if (d.title === "Day Three") {
      this.roundThree = true;
    }
    this.matches = d.matches
  }
}
</script>

<style scoped>
.border-for-match {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
