<template>
  <v-data-table
    :headers="headers"
    v-bind:items="stroke_leaderboard"
    hide-actions
    class='stroke'
    item-key="username"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ props.item.pos }}</td>
        <td class="text-xs-left">
          {{ props.item.username }}
          <v-spacer></v-spacer>
          <span class="grey--text"> handicap {{ props.item.handicap }}</span>
        </td>
        <td class="text-xs-center">{{ props.item.total_score }}</td>
        <td class="text-xs-center">{{ props.item.rnd1_score }}</td>
        <td class="text-xs-center">{{ props.item.rnd2_score }}</td>
        <td class="text-xs-center">{{ props.item.rnd3_score }}</td>
        <td class="text-xs-center">{{ props.item.net_total }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>Peek-a-boo!</v-card-text>
      </v-card>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StrokeLeaderboard',
  props: ['current'],

  computed: mapState([
    'stroke_leaderboard'
  ]),

  data () {
    return {
      headers: [
        {
          text: 'Pos',
          align: 'center',
          sortable: false,
          value: 'pos',
        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total_score'
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd1_score'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_score'
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_score'
        },
        {
          text: 'Strokes',
          align: 'center',
          sortable: false,
          value: 'net_total'
        }
      ]
    }
  },

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id })
  }
}
</script>
<style>
.stroke thead {
  background-color: #62bcfa;
}
table.table thead th {
  font-size: 12px;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 3px;
}
</style>