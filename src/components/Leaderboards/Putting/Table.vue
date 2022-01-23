<template>
  <v-data-table
    :headers="headers"
    :items="puttingLeaderboard"
    hide-actions
    class='putting-table board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props" >
      <tr @click="toPlayerPage(props.item.attributes.id)">
        <td class="text-xs-center">
          {{ props.item.attributes.current_position }}</td>
        <td class="text-xs-left">
          <span>
            <v-icon v-if="movementUp(props.item.attributes)" color="green">
              mdi-arrow-up
            </v-icon>
            <v-icon v-if="movementDown(props.item.attributes)" color="red">
              mdi-arrow-down
            </v-icon>
          </span>
          {{
            (props.item.attributes.movement == 0 || props.item.attributes.dnf) ? '' : props.item.attributes.movement
          }}
        </td>
        <td class="text-xs-left" style="font-size:16px;">{{ props.item.attributes.username }}</td>
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
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'pos',
        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username',
        },
        {
          text: '3 Putts',
          align: 'center',
          sortable: false,
          value: 'total_score',
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd1_score',
          class: 'stroke-row'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          class: "stroke-row"
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_score',
          class: 'stroke-row'
        },
        {
          text: 'Total',
          align: 'right',
          sortable: false,
          value: 'net_total'
        },
        {
          text: '',
          align: 'right',
          sortable: false,
          value: 'pos',
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

<style lang="scss" scoped>
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
table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 3px;
  padding-left: 3px;
}
</style>
