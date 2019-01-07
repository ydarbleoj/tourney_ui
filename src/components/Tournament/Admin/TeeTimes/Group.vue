<template>
  <v-layout row>
    <v-flex xs12>
      <v-card flat tile>
        <v-list>
          <v-list-tile v-for="(item, index) in teeGroup.attributes.players" v-bind:key="item.user_id" @click="removeElement(item, index)">
            <v-list-tile-content style="height: 30px">
              <v-list-tile-title>{{ item.first_name }} {{ item.last_name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-card-actions class="trans">
          <v-btn flat value="teeGroup" @click="updateTeeTime()">
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
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Group',
  props: ['teeGroup', 'parentData'],
  components: {
  },

  computed: {
    ...mapState([
      'adminMessage',
      'currentTournament',
      'currentRound'
    ]),
    ...mapGetters([
      'adminMessageGetter'
    ])
  },


  methods: {
    removeElement(user, key) {
      this.teeGroup.users.splice(key, 1);
      this.$emit('event', user)
    },
    updateTeeTime(event){
      console.log('group', this.teeGroup.users[0])

      if (this.teeGroup.users[0].tee_time_id == null) {
        this.$store.dispatch('CREATE_TEE_TIMES', {
          tournId: this.currentTournament.id,
          roundNumber: this.currentRound.round_number,
          teeTimes: this.teeGroup,
        })
      } else {
        this.$store.dispatch('UPDATE_ADMIN_TEE_TIME', {
          tournId: this.currentTournament.id,
          roundNumber: this.currentRound.round_number,
          teeTimes: this.teeGroup,
          id: this.teeGroup.users[0].tee_time_id
        })

      }
    }
  },

  created: function (current) {
    // this.$store.dispatch('LOAD_USER_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
  }
}
</script>