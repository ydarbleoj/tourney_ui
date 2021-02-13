<template>
  <v-layout row>
    <v-flex xs12>
      <v-card flat tile class="pa-0">
        <v-list>
          <v-list-tile fill-height v-for="(item, index) in group.attributes.players" v-bind:key="item.user_id" >
            <v-layout row align-center>
              <v-flex xs12>
                <v-list-tile-title v-if="item.first_name">
                  {{ item.first_name }} {{ item.last_name }}
                </v-list-tile-title>
                <v-list-tile-title v-else>
                  {{ item.attributes.first_name }} {{ item.attributes.last_name }}
                </v-list-tile-title>
                <span class="grey--text" style="font-size:14px;">
                  Hcap {{ (item.attributes == undefined) ? item.handicap : item.attributes.handicap }}
                </span>
              </v-flex>
            </v-layout>
          </v-list-tile>
        </v-list>
          <v-flex
            class="text-xs-center"
            @click="scorecardPage()"
          >
            <h3 class="font-weight-regular">
              Scorecard
              <span>
                <v-icon color="#FFCB47" style="font-size:20px;">
                  arrow_forward
                </v-icon>
              </span>
            </h3>
          </v-flex>
        <v-card-actions class="justify-center pa-0 mb-3">
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Group',
  props: ['group'],

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      currentRound: state => state.currentRound
    }),
  },

  methods: {
    scorecardPage () {
      this.$store.commit("setPageTransition");
      this.$router.push(
        {
          name: 'TeamScorecard',
          params: {
            id: this.currentTournament.id,
            team_id: this.group.id
          }
        }
      )
    },
  },
}
</script>
<style >

</style>