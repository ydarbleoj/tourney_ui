<template>
  <v-card
    @click="toPuttingleaderboard"
    rounded
    class="lb-button bg-color pa-2"
  >
    <v-card-title class="pa-0">
      <h2 class="text-xs-left font-weight-medium" >Putting</h2>
    </v-card-title>
    <div class="text-xs-right">
      <h5 class="black--text font-weight-regular">Total</h5>
    </div>
    <v-card-text v-if="!isloading" class="pa-0">
      <v-list
        dense
        class="bg-color white--text"
        v-for="(item, index) in putting_leaderboard" :key="index"
      >
        <v-layout row class="pt-1">
          <v-flex xs2 class="text-xs-left">
            {{ item.attributes.position }}
          </v-flex>
          <v-flex class="text-xs-left pr-2 pl-2">
            {{ item.attributes.username }}
          </v-flex>
          <v-flex class="text-xs-right">
            {{ item.attributes.total_putts }}
          </v-flex>
        </v-layout>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PuttingButton',
  props: ['current'],
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      putting_leaderboard: state => state.putting_leaderboard
    })
  },
  data () {
    return {
      isloading: true,
      isPreview: true
    }
  },
  methods: {
    toPuttingleaderboard () {
      this.$router.push({
        name: 'PuttingLeaderboard',
        params: {
          id: this.current.id
        }
      })
    }
  },
  watch: {
    current: function () {
      this.$store.dispatch(
        'LOAD_PUTTING_LEADERBOARD',
        {
          id: this.current.id, preview: true
        }
      ).then(response => {
        this.isloading = false
      })
    }
  },
  created: function () {
    this.$store.dispatch(
      'LOAD_PUTTING_LEADERBOARD',
      { id: this.current.id, preview: true })
      .then(response => {
        this.isloading = false
      })
  }


}
</script>
<style scoped>
.bg-color {
  background-color: #A8C256;
}
.lb-button {
  border-radius: 20px;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
}
</style>
