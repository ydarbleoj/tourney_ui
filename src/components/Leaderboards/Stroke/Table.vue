<template>
  <v-data-table
    :headers="headers"
    :items="strokeLeaderboard"
    hide-actions
    class='stroke-table board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-left">
          {{ props.item.attributes.username }}
          <v-spacer></v-spacer>
          <span class="grey--text">handicap {{ props.item.attributes.handicap }}</span>
        </td>
        <td class="text-xs-center">{{ props.item.attributes.total_score }}</td>
        <td class="text-xs-center">{{ props.item.attributes.rnd1_score }}</td>
        <td class="text-xs-center">{{ props.item.attributes.rnd2_score }}</td>
        <td class="text-xs-center">{{ props.item.attributes.rnd3_score }}</td>
        <td class="text-xs-center">{{ props.item.attributes.net_total }}</td>
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
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Table',
  computed: {
    ...mapState(['strokeLeaderboard']),
  },

  data () {
    return {
      headers: [
        {
          text: 'Pos',
          align: 'center',
          sortable: false,
          value: 'pos',
          class: 'sticky-header'
        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username',
          class: 'sticky-header'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total_score',
          class: 'stroke-row sticky-header'
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd1_score',
          class: 'stroke-row sticky-header'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          class: "stroke-row sticky-header"
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_score',
          class: 'stroke-row stiky-header'
        },
        {
          text: 'Score',
          align: 'center',
          sortable: false,
          value: 'net_total sticky-header'
        }
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
    }
  },
  mounted () {
    this.onMutate()
  }
}
</script>
<style>
.v-data-table /deep/ .sticky-header {
  position: sticky;
  top: 0;
}
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
  border-radius: 0 0 20px 20px;
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