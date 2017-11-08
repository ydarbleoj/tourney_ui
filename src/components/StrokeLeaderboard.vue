<template>
  <!-- <v-flex xs12 sm12> -->
    <!-- <v-card> -->
      <!-- <v-card-title class="light-blue lighten-1">
        Stroke
        <v-spacer></v-spacer>
        purse $360
      </v-card-title> -->
      <!-- <template> -->
        <v-data-table
          :headers="headers"
          v-bind:items="stroke_leaderboard"
          hide-actions
          class='stroke'
          item-key="username"
        >
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td class="text-xs-left">{{ props.item.username }} ({{ props.item.handicap }})</td>
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
      <!-- </template> -->
    <!-- </v-card> -->
  <!-- </v-flex> -->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StrokeLeaderboard',
  computed: mapState([
    'stroke_leaderboard'
  ]),

  data () {
    return {
      headers: [
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
  }
}
</script>
<style>
.stroke thead {
  background-color: #29b6f6;
}
tr th {
  font-size: 100px;
}
</style>