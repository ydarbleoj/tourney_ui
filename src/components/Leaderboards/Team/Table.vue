<template>
  <v-data-table
    :headers="headers"
    :items="teamLeaderboard"
    hide-actions
    class='leaderboard-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr @click="toPage(props.item.id)">
        <td class="font-weight-regular text-xs-center" style="font-size:20px;">
          {{ props.item.attributes.position }}
        </td>
        <td class="text-xs-left mt-5">
          <h1
            class="font-weight-medium mb-2"
            style="font-size:20px;color:#9FB8CE"
          >
            {{ props.item.attributes.group }}
          </h1>
          <v-layout row wrap>
            <v-flex xs12 style="width:100%;">
              <ul
                style="width:100%;padding:0;"
              >
                <li
                  v-for="(item, i) in props.item.attributes.players"
                  id="this"
                  :key="i"
                  d-inline-flex
                  style="display:inline-block;margin-bottom:4px;;width:50%"
                  class="font-weight-regular"
                >
                  <h3>
                    {{ item.username }}
                    <br style="height:2px;margin:0;padding:0;">
                    <span style="font-size:12px;color:#666;">Handicap {{ item.handicap }}</span>
                  </h3>
                </li>
              </ul>
            </v-flex>
          </v-layout>
        </td>
        <td
          class="text-xs-center mr-1"
          style="font-size:20px;"
        >
          {{ props.item.attributes.total }}
        </td>
        <td
          class="text-xs-center"
          style="font-size:20px;"
        >
          {{ props.item.attributes.total_net }}
        </td>
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
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Table',
  props: ['preview'],
  computed: {
    ...mapState({
      teamLeaderboard: state => state.leaderboards.team.teamLeaderboard,
      currentTournament: state => state.tournament.currentTournament
    }),
  },

  data () {
    return {
      setStyle: {},
      headers: [
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'pos',
          width: '10%'
        },
        {
          text: 'Group',
          align: 'left',
          sortable: false,
          value: 'group',
          width: '60%'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total',
          width: '10%'

        },
        {
          text: 'Strokes',
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
      ]
    }
  },

  methods: {
    toPage (teamId) {
      this.$store.commit("setPageTransition", "");
      this.$router.push({
        name: "TeamPage",
        params: {
          id: this.currentTournament.id,
          team_id: teamId
        }
      })
    }
  },

  watch: {
    preview () {
      let h = this.preview ? {} : { height: '18vh' }
      this.setStyle = Object.assign(h)
    }
  },

  created () {

  }

}
</script>
<style>
.team-stats {
  color: #FE8202;
}
.board-table {
  overflow:hidden;
}
.hidden_row {
  display: none;
}
.team-table table.theme--light thead {
  background-color: #ACA885;
}
.team-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}
table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 0;
  padding-left: 0;
}
table.v-table thead th {
  white-space: normal
}
</style>
