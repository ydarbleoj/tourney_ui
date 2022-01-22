<template>
  <v-data-table
    :headers="headers"
    :items="strokeLeaderboard"
    hide-actions
    class='stroke-table board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr >
        <td class="text-xs-center">{{ props.item.attributes.current_position }}</td>
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
        <td class="text-xs-left">
          {{ props.item.attributes.username }}
          <v-spacer></v-spacer>
          <span class="grey--text">handicap {{ props.item.attributes.handicap }}</span>
        </td>
        <td class="text-xs-center">{{ props.item.attributes.total_score }}</td>
        <td class="text-xs-right">{{ props.item.attributes.rnd1_score }}</td>
        <td class="text-xs-right">{{ props.item.attributes.rnd2_score }}</td>
        <td class="text-xs-right">{{ props.item.attributes.rnd3_score }}</td>
        <td class="text-xs-right">{{ props.item.attributes.total_net }}</td>
        <td class="text-xs-center">
          <v-icon color="#999">
            mdi-chevron-right
          </v-icon>
        </td>
      </tr>
    </template>

    <template slot="expand" slot-scope="props">
      <v-layout row wrap class="font-weight-regular pt-3 pb-3 pr-2" align-center>
        <v-flex xs12 mb-2 ml-3>
          <h3 class="text-xs-left grey--text font-weight-regular">Greens in Regulation</h3>
        </v-flex>
        <v-flex xs4>
          <v-layout row align-center>
            <v-flex xs6 class="text-xs-right">
              <h4 class="font-weight-regular">R1</h4>
            </v-flex>
            <v-flex xs6>
              <h1 class="stroke-stats">
                {{ props.item.attributes.rnd1_gnr }}<span class="stroke-percent">%</span>
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs4>
          <v-layout row align-center>
            <v-flex xs6 class="text-xs-right">
              <h4 class="font-weight-regular">R2</h4>
            </v-flex>
            <v-flex xs6>
              <h1 class="stroke-stats">
                {{ props.item.attributes.rnd2_gnr }}<span class="stroke-percent">%</span>
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-layout row align-center>
            <v-flex xs6 class="text-xs-right">
              <h4 class="font-weight-regular">R3</h4>
            </v-flex>
            <v-flex xs6>
              <h1 class="stroke-stats">
                {{ props.item.attributes.rnd3_gnr }}<span class="stroke-percent">%</span>
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Table',
  computed: {
    ...mapState({
      strokeLeaderboard: state => state.leaderboards.strokeLeaderboard

    }),
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
          text: 'Total',
          align: 'right',
          sortable: false,
          value: 'total_score',
        },
        {
          text: 'R1',
          align: 'right',
          sortable: false,
          value: 'rnd1_score',
          class: 'stroke-row'
        },
        {
          text: 'R2',
          align: 'right',
          sortable: false,
          value: 'rnd2_score',
          class: "stroke-row"
        },
        {
          text: 'R3',
          align: 'right',
          sortable: false,
          value: 'rnd3_score',
          class: 'stroke-row'
        },
        {
          text: 'Score',
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
    onMutate () {
      let height = 0
      const toolbar = this.$refs.toolbar
      if (toolbar) {
        height = `${toolbar.$el.offsetHeight}px`
      }
      document.documentElement.style.setProperty('--headerHeight', height)
    },
    movementUp (pos) {
      if (pos.movement > 0) { return true }
    },
    movementDown (pos) {
      if (pos.dnf) { return false }
      if (pos.movement < 0) { return true }
    }
  },
  mounted () {
    this.onMutate()
  }
}
</script>
<style>
.stroke-percent {
  font-weight: normal;
  color: #2E2F2F;
  font-size: 20px;
}
.stroke-stats {
  color: #9FB8CE;
}
.board-table {
  overflow:hidden;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
.stroke-table table.theme--light thead {
  background-color: #9FB8CE;
}
.stroke-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}

table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding: 0;
}
</style>