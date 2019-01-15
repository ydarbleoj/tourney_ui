<template>
  <v-card flat>
    <v-card-title flat class="pa-0 pt-2 pl-2">
        <span @click="editView"><v-icon color="#F8C977" style="font-size:35px;" >arrow_backward</v-icon></span>
        <v-spacer></v-spacer>
        <h3 class="font-weight-medium">Edit Scorecards</h3>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-text v-if="!loading" class="pa-0" ref="cardContainer">
      <v-container>
        <v-layout row wrap>
          <v-flex
            xs12
            v-for="card in userScorecards"
            :key="card['id']"
            style="margin: 10px 0;"
          >
            <scorecard :card="card" @open="isOpen"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import Scorecard from '../Admin/Scorecard'

export default {
  name: 'PlayerScorecards',
  props: ['user'],
  components: {
    Scorecard
  },
  computed: {
    ...mapState({
      currentTournament: state => state.currentTournament,
      userScorecards: state => state.scorecards.userScorecards
    })
  },

  data () {
    return {
      loading: true,
    }
  },

  methods: {
    editView () {
      this.$emit('toggleView', { view: 'player-edit', user: this.user })
    },
    isOpen () {
      console.log('emit', this.$refs.cardContainer)
      this.$refs.cardContainer.classList.toggle('open')
    }
  },

  created () {
    this.$store.dispatch('scorecards/USER_SCORECARD_LIST', { tournId: this.currentTournament.id, lbId: this.user.item.id })
      .then(response => {
        this.loading = false
      })
  }

}
</script>
<style>
.open {
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  overflow: scroll;
}
.admin--add_button {
  background-color: #74C9D7;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
</style>