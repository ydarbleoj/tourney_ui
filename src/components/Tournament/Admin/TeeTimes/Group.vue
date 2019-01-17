<template>
  <v-layout row>
    <v-flex xs12>
      <v-card flat tile>
        <v-list>
          <v-list-tile v-for="(item, index) in teeGroup.attributes.players" v-bind:key="item.user_id" @click="removeElement(item, index)">
            <v-list-tile-content style="height: 30px">
              <v-list-tile-title v-if="item.first_name">{{ item.first_name }} {{ item.last_name }}</v-list-tile-title>
              <v-list-tile-title v-else>{{ item.attributes.first_name }} {{ item.attributes.last_name }}</v-list-tile-title>
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
import { mapState } from 'vuex'

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
  },


  methods: {
    removeElement(user, key) {
      let g = this.teeGroup.attributes.group
      this.$emit('event', { user: user, key: key, group: g })
    },
    updateTeeTime(event){
      this.$store.dispatch('CREATE_TEE_TIMES', { tournId: this.currentTournament.id, teeTimes: this.teeGroup.attributes })
    }
  },
  created: function () {
    console.log('thisl group', this.teeGroup)
  }
}


</script>