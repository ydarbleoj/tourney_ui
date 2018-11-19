<template>
  <v-card class="rounded-card elevation-24">
    <v-card-title class="stroke">
      <h4 class="text-align-left mb-0 ml-2" >Stroke</h4>
    </v-card-title>
    <v-card-text class="stroke">
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <div class="loaded" v-else>
        <stroke-table />
      </div>
    </v-card-text>
  </v-card>
</template>
<script>


import { mapState, mapGetters } from 'vuex'
import StrokeTable from './Table'

export default {
  name: 'index',
  props: ['current'],
  components: {
    StrokeTable
  },
  data () {
    return {
      loading: true,
    }
  },

  computed: {
    ...mapState(['stroke_leaderboard']),
    ...mapGetters(['getStrokeLeaderboard'])
  },

  methods: {

  },
  watch: {
    current: function () {
      this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id })
        .then(response => {
          this.loading = false
        })
    },
  },

  created: function () {
    this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id })
      .then(response => {
        this.loading = false
      })
  },
}
</script>
<style>
.rounded-card {
  border-radius: 9px;
}
.stroke {
  background-color: #62bcfa;
  padding: 0;
  font-size: 16px;
  color: #666;
}
</style>