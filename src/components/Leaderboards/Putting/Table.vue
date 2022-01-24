<template>
  <v-data-table
    :headers="headers"
    :items="puttingLeaderboard"
    hide-actions
    class='leaderboard-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props" >
      <tr @click="toPlayerPage(props.item.attributes.id)">
        <td class="text-xs-center">
          {{ props.item.attributes.current_position }}</td>
        <td class="text-xs-left">
          <h2>
            <v-icon v-if="movementUp(props.item.attributes)" color="green">
              mdi-arrow-up
            </v-icon>
            <v-icon v-if="movementDown(props.item.attributes)" color="red">
              mdi-arrow-down
            </v-icon>
            <span class="font-weight-regular" style="color:#666">
              {{
                (props.item.attributes.movement == 0 || props.item.attributes.dnf) ? '' : props.item.attributes.movement
              }}
            </span>
          </h2>
        </td>
        <td class="text-xs-left" style="font-size:16px;">
          {{ props.item.attributes.username }}
           <v-spacer></v-spacer>
          <span class="grey--text">handicap {{ props.item.attributes.handicap }}</span>
        </td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.total_3_putts }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.rnd1_putts }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.rnd2_putts }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.rnd3_putts }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.total_putts }}</td>
        <td class="text-xs-center">
          <v-icon color="#999">
            mdi-chevron-right
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Table',
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      puttingLeaderboard: state => state.leaderboards.puttingLeaderboard
    })
  },

  data () {
    return {
      headers: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'pos',
          width: '8%'
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'pos',
          width: '15%'
        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username',
          width: '30%'
        },
        {
          text: '3ps',
          align: 'center',
          sortable: false,
          value: 'total_score',
          width: '12%'
        },//62
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd1_score',
          width: '7%'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          width: '7%'
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_score',
          width: '7%'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'net_total',
          width: '10%'
        },
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'pos',
          width: '7%'
        },
      ],
    }
  },

  methods: {
    movementUp (pos) {
      if (pos.movement > 0) { return true }
    },
    movementDown (pos) {
      if (pos.dnf) { return false }
      if (pos.movement < 0) { return true }
    },
    toPlayerPage (id) {
      this.$store.commit("setPageTransition");
      this.$router.push({
        name: 'PuttingPlayerPage',
        params: {
          tournId: this.currentTournament.id,
          leaderboard_id: id
        }
      })
    },
  }
}
</script>

<style>
.putting-percent {
  font-weight: normal;
  color: #2E2F2F;
  font-size: 20px;
}
.putting-avg {
  color: #A8C256;
}
.board-table {
  overflow:hidden;
}
.putting-table table.theme--light thead {
  background-color: #A8C256;
}
.putting-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}
.leaderboard-table table {
  table-layout: fixed;
}
table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 0;
  padding-left: 0;
}
table.v-table thead th {
  white-space: normal
}
</style>
