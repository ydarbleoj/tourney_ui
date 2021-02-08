<template>
  <v-card class="pa-0" width="100%" flat>
    <h2 class="font-weight-regular">
      Tee Times
    </h2>
    <v-toolbar flat color="transparent">
      <template>
        <v-tabs
          v-model="tab"
          centered
          class="pb-4"
        >
          <v-tabs-slider color="#A8C256"></v-tabs-slider>
          <v-tab
            color="white"
            v-for="i in items"
            :key="i"
            class="pl-2 pr-2"
          >
            {{ i }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="n in group"
          :key="n['id']"
          transition="false"
          reverse-transition="false"
        >
          <TeeTimeGroup :group="n" />
        </v-tab-item>
      </v-tabs-items>
     <v-divider class="mb-4" style="background-color:;"></v-divider>
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
      currentTime: null
    }
  },

  computed: {
    ...mapState({
      courseTeeTimes: state => state.course.teeTimes
    })
  },

  method: {
  },

  created () {
    this.items = this.courseTeeTimes.map(t => t.attributes.time)
    this.group = this.courseTeeTimes
  }
}
</script>
<style scoped>

</style>


