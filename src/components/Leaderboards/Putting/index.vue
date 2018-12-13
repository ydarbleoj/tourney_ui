<template>
  <v-card class="rounded-card card--shadow">
    <v-card-title class="putting--title pb-0 pt-1 pl-2">
      <h2 class="text-align-left font-weight-medium" >Putting</h2>
    </v-card-title>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <v-card-text v-else class="pa-0">
      <putting-table />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import PuttingTable from './Table'

export default {
  name: 'index',
  props: ['current'],
  components: {
    PuttingTable
  },

  data () {
    return {
      loading: true
    }
  },

  computed: mapState(['putting_leaderboard']),

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id })
        .then(response => {
          this.loading = false
        })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id })
      .then(response => {
        this.loading = false
      })
  }


}
</script>
<style>
.card--shadow {
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
}
.putting--title {
  background-color: #C49799;
  color: white;
}
</style>