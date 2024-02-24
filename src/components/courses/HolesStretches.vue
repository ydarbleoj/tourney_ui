<template>
  <v-row class="bandon-dark-color mt-5 pl-2">
    <v-col cols="12" class="text-left">
      <h4 class="pl-2 pr-2">
        Setting expectations here is a must and that means knowing when to play for bogey / double bogey and when to be aggressive.
      </h4>
    </v-col>
  </v-row>
  <v-row class="align-center justify-center">
    <v-col cols="7" class="d-flex flex-column align-center justify-center text-center">
      <h1 class="bandon-orange-color">{{ hardestHoles }}</h1>
      <h2 class="pl-2 pr-2">Toughest Stretch</h2>
      <h3 class="less-neutral-gray">Par {{ hardestPar }}</h3>
    </v-col>
    <v-col cols="5" class="d-flex flex-column align-start text-center justify-center pl-5">
      <h5 style="margin-bottom:-5px">Avg Net<span class="bandon-orange-color details-size pl-2">
        {{ hardestNet }}</span> <span class="neutral-gray" style="font-size:16px">+{{ hardestDiff }}</span></h5>
      <h5 style="margin-bottom:-5px">Avg Putts<span class="bandon-orange-color details-size pl-2">{{ hardestPutts }}</span></h5>
      <h5 style="margin-bottom:-5px">Avg 3 Putts<span class="bandon-orange-color details-size pl-2">{{ hardest3Putts }}</span></h5>
    </v-col>
  </v-row>
  <v-row class="bandon-dark-color default-bg pt-2 pl-2 pb-5">
    <v-col cols="12" class="pt-0 text-left">
      <h3 style="width:50%" class="pl-5 underline-text">And how about you? </h3>
    </v-col>
    <v-row class="text-center">
      <v-col cols="4">
          <h1 class="text-h4 bandon-orange-color">
            {{ playerHardNet }} <span class="neutral-gray" style="font-size:16px">{{ playerHardDiff }}</span>
          </h1>
          <h4 class="less-neutral-gray">Avg Net Score</h4>
      </v-col>
      <v-col cols="4">
          <h3 class="text-h4 bandon-orange-color">{{ playerHardPutts }}</h3>
          <h4 class="less-neutral-gray">Avg Putts</h4>
      </v-col>
      <v-col cols="4">
          <h3 class="text-h4 bandon-orange-color">{{ playerHard3Putts }}</h3>
          <h4 class="less-neutral-gray">Avg 3 Putts</h4>
      </v-col>
    </v-row>
  </v-row>
  <v-row class="align-center justify-center stroke-bg">
    <v-col cols="5" class="d-flex flex-column align-center justify-center pl-5">
      <div>
        <h5 style="margin-bottom:-5px">Avg Net<span class="bandon-orange-color details-size pl-2">{{ easiestNet }}</span></h5>
        <h5 style="margin-bottom:-5px">Avg Putts<span class="bandon-orange-color details-size pl-2">{{ easiestPutts }}</span></h5>
        <h5 style="margin-bottom:-5px">Avg 3 Putts<span class="bandon-orange-color details-size pl-2">{{ easiest3Putts }}</span></h5>
      </div>
    </v-col>
    <v-col cols="7" class="d-flex flex-column align-center justify-center text-center">
      <h1 class="bandon-orange-color">{{ easiestHoles }}</h1>
      <h2 class="pl-2 pr-2">Easiest Stretch</h2>
      <h3 class="less-neutral-gray">Par {{ easiestPar }}</h3>
    </v-col>
  </v-row>
  <v-row class="bandon-dark-color stroke-bg pl-2 pt-2 pb-5">
    <v-col cols="12" class="pt-0 text-left">
      <h3 style="width:50%" class="pl-5 underline-text">And how about you? </h3>
    </v-col>
    <v-row class="text-center">
      <v-col cols="4">
          <h1 class="text-h4 bandon-orange-color">{{ playerEasiestNet }}</h1>
          <h4 class="less-neutral-gray">Avg Net Score</h4>
      </v-col>
      <v-col cols="4">
          <h3 class="text-h4 bandon-orange-color">{{ playerEasiestPutts }}</h3>
          <h4 class="less-neutral-gray">Avg Putts</h4>
      </v-col>
      <v-col cols="4">
          <h3 class="text-h4 bandon-orange-color">{{ playerEasiest3Putts }}</h3>
          <h4 class="less-neutral-gray">Avg 3 Putts</h4>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
export default {
  name: "HolesStretches",
  props: {
    hardestStretch: {
      type: Object,
      required: true
    },
    easiestStretch: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hardestHoles: "",
      playerHardNet: "",
      playerHardPutts: "",
      playerHard3Putts: "",
      playerHardDiff: "",
      easiestHoles: "",
      playerEasiestNet: "",
      playerEasiestPutts: "",
      playerEasiest3Putts: "",
      playerEasiestDiff: "",
      hardestPar: "",
      easiestPar: "",
      hardestNet: "",
      easiestNet: "",
      hardestPutts: "",
      hardest3Putts: "",
      easiestPutts: "",
      easiest3Putts: "",
      hardestDiff: "",
      easiestDiff: ""
    };
  },
  mounted () {
    const hardCourse = this.hardestStretch.course
    const hardPlayer = this.hardestStretch.player

    this.hardestHoles = hardCourse.hole_numbers
    this.hardestPar = hardCourse.total_par
    this.hardestNet = hardCourse.avg_net
    this.hardestPutts = hardCourse.avg_putts
    this.hardest3Putts = hardCourse.three_putts
    this.hardestDiff = hardCourse.diff
    this.playerHardNet = hardPlayer.avg_net
    this.playerHardPutts = hardPlayer.avg_putts
    this.playerHard3Putts = hardPlayer.three_putts
    this.playerHardDiff = hardPlayer.diff

    const easyCourse = this.easiestStretch.course
    const easyPlayer = this.easiestStretch.player

    this.easiestHoles = easyCourse.hole_numbers
    this.easiestPar = easyCourse.total_par
    this.easiestNet = easyCourse.avg_net
    this.easiestPutts = easyCourse.avg_putts
    this.easiest3Putts = easyCourse.three_putts
    this.easiestDiff = easyCourse.diff
    this.playerEasiestNet = easyPlayer.avg_net
    this.playerEasiestPutts = easyPlayer.avg_putts
    this.playerEasiest3Putts = easyPlayer.three_putts
    this.playerEasiestDiff = easyPlayer.diff
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
