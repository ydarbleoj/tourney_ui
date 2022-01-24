<template>
  <v-data-table
    :headers="headers"
    :items="skinsLeaderboard"
    hide-actions
    class='leaderboard-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props" >
      <tr @click="toPlayerPage(props.item.attributes.id)">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
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
        <td class="text-xs-left">{{ props.item.attributes.username }}
          <v-spacer></v-spacer>
          <span class="grey--text">handicap {{ props.item.attributes.handicap }}</span>
        </td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.total_money }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.rnd1_net }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.rnd2_net }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.rnd3_net }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.skins_total }}</td>
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
  computed: mapState({
    currentTournament: state => state.tournament.currentTournament,
    skinsLeaderboard: state => state.leaderboards.skinsLeaderboard
  }),

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
          width: '12%'
        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username',
          width: '30%'
        },
        {
          text: 'Money',
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
          width: '10%'
        },
      ],

    }
  },

  methods: {
    cardFilter (cards, rnd) {
      let nn = cards.filter(el => el[rnd])
      if (nn === undefined || !nn.length) return {};
      return nn[0][rnd]

    },
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
        name: 'SkinsPlayerPage',
        params: {
          tournId: this.currentTournament.id,
          leaderboard_id: id
        }
      })
    },
  },
}
</script>
<style>
.skins-total {
  color: #FFCB47;
}
.dollar-sign {
  font-weight: 200;
  color: #2E2F2F;
  font-size: 20px;
}
.board-table {
  overflow:hidden;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.skins-table table.theme--light thead {
  background-color: #FFCB47;
}
.skins-table table.theme--light thead tr th {
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
