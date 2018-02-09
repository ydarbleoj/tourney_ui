<template>
  <v-card tile>
    <v-container fluid>
      <v-layout row>
        <v-flex xs4>
          <v-text-field
            name="handicap"
            label="Handicap"
            v-model="hcap"
            placeholder="max 36.2"
          >
          </v-text-field>
          <v-card-actions>
            <v-btn flat class="text-xs-center" color="orange" @click="updateHandicap">Save</v-btn>
          </v-card-actions>
            {{ handicapMessage }}
        </v-flex>
        <v-flex xs8 pl-4>
          <label>
            {{ message }}
          </label>
        </v-flex>
      </v-layout>
    </v-container>

  </v-card>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: 'Handicap',
  props: ['current'],
  components: {
  },

  data () {
    return {
      hcap: '',
      show: false,
      message: "Please enter your current handicap. If you don't have one, consider your average and then subtract 3. Your handicap for this year will be 90% of what you enter here."
    }
  },

  computed: {
    ...mapState(['currentTournament', 'handicapMessage'])
  },

  methods: {
    updateHandicap: function (event) {
      this.$store.dispatch('UPDATE_HANDICAP', { tournId: this.current.id, leaderboardId: this.current.leaderboard_id, handicap: this.hcap })
    console.log('event', event)
    }
  },


  created: function (current) {
  }
}
</script>
<style>
  p.hide {
    display: none;
  }
</style>