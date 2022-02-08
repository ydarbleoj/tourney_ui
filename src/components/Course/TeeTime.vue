<template>
  <v-card class="pl-4 pt-2 mt-5"  style="background-color:#A8C256;" width="100%" flat>
    <h2 class="font-weight-regular mb-4 pt-3">
      Tee Times
    </h2>
    <v-toolbar flat style="background-color:#A8C256;">
      <template>
        <v-tabs
          style="background-color:#A8C256;"
          v-model="tab"
          centered
          class="pb-4"
        >
          <v-tabs-slider style="background-color:#A8C256;" color="white"></v-tabs-slider>
          <v-tab
            style="background-color:#A8C256;"
            v-for="i in items"
            :key="i"
            class="pl-2 pr-2"
          >
            {{ i }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab" style="background-color:#A8C256;">
      <v-tab-item
        style="background-color:#A8C256;"
        v-for="n in group"
        :key="n['id']"
        transition="false"
        reverse-transition="false"
      >
        <TeeTimeGroup :group="n" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import TeeTimeGroup from './TeeTimeGroup'

export default {
  name: 'TeeTime',
  components: {
    TeeTimeGroup
  },

  data () {
    return {
      roundTime: '',
      tab: 0,
      items: [],
      group: [],
      currentTime: null,
    }
  },

  computed: {
    ...mapState({
      teeTimes: state => state.course.teeTimes
    })
  },

  method: {
  },

  created () {
    this.items = this.teeTimes.map(t => t.attributes.time)
    this.group = this.teeTimes
  }
}
</script>
<style>
div.theme--light.v-tabs__bar {
  background-color: #A8C256;
}
</style>


