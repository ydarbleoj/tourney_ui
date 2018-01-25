<template>
  <v-layout row wrap class="team-list">
    <v-flex xs12>
      <v-card flat>
        <round-list :round="teamLeaderboard[0]" />
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card flat>
        <round-list :round="teamLeaderboard[1]" />
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card flat>
        <round-list :round="teamLeaderboard[2]" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import RoundList from './RoundList'

export default {
  name: 'TeamList',
  props: ['current'],

  components: {
    RoundList
  },

  computed: {
    ...mapState([
      'teamLeaderboard'
    ]),

  },

  data () {
    return {
      headers: [
        {
          text: 'Pos',
          align: 'center',
          sortable: false,
          value: 'pos'
        },
        {
          text: 'Group',
          align: 'center',
          sortable: false,
          value: 'group'
        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'players'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total_net'
        },
      ]
    }
  },

  watch: {
    current: function () {
      console.log('team watch', this.teamLeaderboard)
      this.$store.dispatch('LOAD_TEAM_LEADERBOARD', { id: this.current.id })
    }
  },

  created: function (current) {
    console.log('team', this.teamLeaderboard)
    this.$store.dispatch('LOAD_TEAM_LEADERBOARD', { tournId: this.current.id })
  }


}
</script>
<style>
div.team-list {
  padding-top: 80px;
}
/*div.table__overflow.team {
}*/
.team thead {
  background-color: #ef5350;
}
table.table thead th {
  font-size: 12px;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 10px;
}
</style>