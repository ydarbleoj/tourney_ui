<template>
  <v-card flat class='transparent'>
    <v-container fluid grid-list-md>
      <v-layout row wrap align-center class="transparent">
        <v-flex d-flex xs12 class="transparent pa-0">
          <v-card tile flat class="transparent">
            <h5 class='white--text text-sm-left ma-0'>{{ this.teeTime[0][0]}}</h5>
           <h4 class='white--text ma-0'><v-icon class="tee-time-icon" color='white'>schedule</v-icon>{{ this.teeTime[0][1] }}</h4>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 class='transparent pa-0'>
          <v-list dense class='transparent pa-0'>
            <v-list-tile v-for="user in teeTime[1]" :key="user.user" class="tee-time-player">
              <v-list-tile-content class="white--text">
                {{ user.user }}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Preview',
  props: ['current'],
  components: {
  },

  computed: {
    ...mapState(['teeTime', 'currentRound', 'currentTournament', 'currentCourse'])
  },

  // watch: {
  //   current: function () {
  //     console.log('curr rounf', this.currentRound.round_number)
  //     this.$store.dispatch('LOAD_USER_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
  //   }
  // },

  // created: function (current) {
  //   this.$store.dispatch('LOAD_USER_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
  // }
}
</script>
<style>
i.material-icons.icon.tee-time-icon {
  padding-right: 20px;
}
li.tee-time-player {
  height: 25px;
}
  p.hide {
    display: none;
  }

  .name-list {
    color: #9ad3de;
  }
</style>
