<template>
  <v-data-table
    :headers="headers"
    v-bind:items="round"
    hide-actions
    class='team'
    item-key="round_number"
  >
    <template slot="items" slot-scope="props">
      <tr>
        <td class="text-xs-center">{{ props.item.pos }}</td>
        <td class="text-xs-center">{{ props.item.group.split(' ')[1] }}</td>
        <td class="text-xs-center">
          <v-layout row>
            <v-flex xs6>
              {{ props.item.players[0] }}
              <v-spacer></v-spacer>
              {{ props.item.players[1] }}
            </v-flex>
            <v-flex xs6>
              {{ props.item.players[2] }}
              <v-spacer></v-spacer>
              {{ props.item.players[3] }}
            </v-flex>
          </v-layout>
        </td>
        <td class="text-xs-center">{{ props.item.total_net }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RoundList',
  props: ['round'],
  computed: mapState([
    'teamLeaderboard'
  ]),

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
          text: 'Round Players',
          align: 'center',
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

  // watch: {
  //   current: function () {
  //     console.log('team watch', this.teamLeaderboard)
  //     this.$store.dispatch('LOAD_TEAM_LEADERBOARD', { id: this.current.id })
  //   }
  // },

  // created: function (current) {
  //   console.log('team', this.teamLeaderboard)
  //   this.$store.dispatch('LOAD_TEAM_LEADERBOARD', { tournId: this.current.id })
  // }


}
</script>
<style>
.team thead {
  background-color: #f44336;
}
table.table thead th {
  font-size: 12px;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 10px;
}
</style>