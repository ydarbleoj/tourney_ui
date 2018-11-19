<template>
  <v-card class="rounded-card elevation-24">
    <v-card-title class="putting">
      <h4 class="text-align-left mb-0 ml-2" >Putting</h4>
    </v-card-title>
    <v-card-text class="putting">
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <div class="loaded" v-else>
        <putting-table />
      </div>
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
.rounded-card {
  border-radius: 9px;
}
.putting {
  background-color: #ffa726;
  padding: 0;
  font-size: 16px;
  color: #666;
}
table.table thead th {
  font-size: 12px;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 10px;
}
</style>