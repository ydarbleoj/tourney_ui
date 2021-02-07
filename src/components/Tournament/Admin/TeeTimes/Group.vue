<template>
  <v-layout row>
    <v-flex xs12>
      <v-card flat tile class="pa-0">
        <v-list>
          <v-list-tile fill-height v-for="(item, index) in teeGroup.attributes.players" v-bind:key="item.user_id" @click="removeElement(item, index)">
            <v-layout row align-center>
              <v-flex xs10>
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
              <v-flex xs2>
                <span>
                  <v-icon
                    color="#FF9D72" style="font-size:20px;"
                  >
                    mdi-minus-circle
                  </v-icon>
                </span>
              </v-flex>
            </v-layout>
          </v-list-tile>
        </v-list>
        <v-card-actions class="justify-center pa-0 mb-3">
          <v-btn round color="grey light-2" value="teeGroup" @click="updateTeeTime()">
            <span>Submit</span>
          </v-btn>
          <p>
            {{ this.adminMessage }}
          </p>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Group',
  props: ['teeGroup', 'parentData'],

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      adminMessage: state => state.adminMessage,
      currentRound: state => state.currentRound
    }),
  },

  methods: {
    removeElement(user, key) {
      let g = this.teeGroup.attributes.group
      this.$emit('event', { user: user, key: key, group: g })
    },
    updateTeeTime(event){
      const group = this.teeGroup.attributes
      const ids   = this.mapScorecardIds(group.players)

      this.$store.dispatch(
        'CREATE_TEE_TIMES',
        {
          tournId: this.currentTournament.id,
          teamId: group.id,
          ids: ids
        }
      )
    },
    mapScorecardIds (players) {
      return players.map(p => (p.attributes == undefined) ? p.scorecard_id : p.id)
    }
  },
}
</script>