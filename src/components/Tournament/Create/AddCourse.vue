<template>
  <v-card flat>
    <v-container class="pa-0 mt-2">
      <v-layout row wrap>
        <v-flex xs12>
          <h4 class="text-xs-left">Round {{ roundNumber }}</h4>
          <h5 class="text-xs-left font-weight-regular" style="color:#FBFCFD;">{{ displayDate }}</h5>
          <v-select
            :items="courseMenuList"
            v-model="currentCourse"
            label="Choose Course"
            item-value="id"
            item-text="attributes.name"
            solo
            flat
          ></v-select>
          <v-divider></v-divider>
          <h4 class="text-xs-left font-weight-medium mt-3 mb-2">Add Tee Times</h4>
           <v-list class="pa-0">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-list-tile v-for="(group, index) in groups" v-bind:key="group" class="mt-1">
                    <v-list-tile-content style="padding:0px;">
                      <v-menu
                        ref="menu"
                        v-model="models['model' + (index + 1)]"
                        :return-value.sync="times['time' + (index + 1)]"
                        persistent
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                      >
                        <v-text-field
                          slot="activator"
                          v-model="times['time' + (index + 1)]"
                          v-bind:label="group"
                          prepend-icon="access_time"
                          style="padding-top: 20px;"
                          readonly
                        ></v-text-field>
                        <v-time-picker
                          v-if="models['model' + (index + 1)]"
                          v-model="times['time' + (index + 1)]"
                          full-width
                          @change="$refs.menu[index].save(times['time' + (index + 1)])"
                        >
                        </v-time-picker>
                      </v-menu>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
              </v-layout>
            </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddCourse',
  props: ['info'],
  components: {
  },
  computed: {
    ...mapState(['courseMenuList']),
  },

  data () {
    return {
      models: {
        model1: false,
        model2: false,
        model3: false,
        model4: false,
      },
      times: {
        time1: null,
        time2: null,
        time3: null,
        time4: null,
      },
      roundNumber: null,
      roundDate: null,
      displayDate: null,
      currentCourse: null,
      currentDate: null,
      groups: ['Group A', 'Group B', 'Group C', 'Group D'],
    }
  },

  methods: {
    save() {
      let data = {}
      let tee_times = {}

      tee_times['groupA'] = this.times.time1
      tee_times['groupB'] = this.times.time2
      tee_times['groupC'] = this.times.time3
      tee_times['groupD'] = this.times.time4

      data['course'] = this.currentCourse
      data['round_number'] = this.roundNumber
      data['round_date'] = this.roundDate
      data['tee_times'] = [tee_times]
      return data
    },
  },

  created: function () {
    this.roundNumber = this.info.round_number
    this.roundDate = this.info.round_date
    this.displayDate = this.info.display_date
  },

}

</script>
<style>
.admin--profile_button {
  background-color: #74C9D7;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.rounded-card {
  border-radius: 9px;
}
.home-container {
  background-color: white;
}
</style>