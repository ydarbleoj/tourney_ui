<template>
  <v-data-table
    :headers="headers"
    :items="strokeLeaderboard"
    hide-actions
    class='stroke-table fixed-header board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr @click="preview ? null : props.expanded = !props.expanded" v-bind:class="displayRow(props)">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-left">
          {{ props.item.attributes.username }}
          <v-spacer></v-spacer>
          <span class="grey--text">handicap {{ props.item.attributes.handicap }}</span>
        </td>
        <td class="text-xs-center">{{ props.item.attributes.total_score }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ props.item.attributes.rnd1_score }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ props.item.attributes.rnd2_score }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ props.item.attributes.rnd3_score }}</td>
        <td class="text-xs-center">{{ props.item.attributes.net_total }}</td>
      </tr>
    </template>

    <template slot="expand" slot-scope="props">
      <v-layout row wrap class="font-weight-regular pt-3 pb-3 pr-2" align-center>
        <v-flex xs4>
          <v-card flat >
            <v-layout row align-center>
              <v-flex xs6>
                <h4 class="font-weight-regular">RND1</h4>
              </v-flex>
              <v-flex xs6>
                <v-card flat>
                  <v-layout column align-center>
                    <v-flex xs12>
                      <h1 class="stroke-stats">{{ props.item.attributes.rnd1_gnr }} <span>%</span></h1>
                    </v-flex>
                    <v-flex xs12>
                      <h5 class="grey--text font-weight-regular">greens in reg</h5>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card flat >
            <v-layout row align-center>
              <v-flex xs6>
                <h4 class="font-weight-regular">RND2</h4>
              </v-flex>
              <v-flex xs6>
                <v-card flat>
                  <v-layout column align-center>
                    <v-flex xs12>
                      <h1 class="stroke-stats">{{ props.item.attributes.rnd2_gnr }} <span>%</span></h1>
                    </v-flex>
                    <v-flex xs12>
                      <h5 class="grey--text font-weight-regular">greens in reg</h5>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card flat >
            <v-layout row align-center>
              <v-flex xs6>
                <h4 class="font-weight-regular">RND3</h4>
              </v-flex>
              <v-flex xs6>
                <v-card flat>
                  <v-layout column align-center>
                    <v-flex xs12>
                      <h1 class="stroke-stats">{{ props.item.attributes.rnd3_gnr }} <span>%</span></h1>
                    </v-flex>
                    <v-flex xs12>
                      <h5 class="grey--text font-weight-regular">greens in reg</h5>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-data-table>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Table',
  props: ['preview'],
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
          value: 'pos'
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
          value: 'rnd1_score',
          class: 'stroke-row hidden_row'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          class: "stroke-row hidden_row"
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_score',
          class: 'stroke-row hidden_row'
        },
        {
          text: 'Score',
          align: 'center',
          sortable: false,
          value: 'net_total'
        }
      ]
    }
  },

  methods: {
    displayRow: function (props) {
      let klass;
      if (this.preview) {
        klass = props.item.attributes.position < 6 || props.item.attributes.username == this.$auth.user().username ? '' : 'hidden_row'
      } else {
        klass = ''
      }
      return klass
    },
  },

  watch: {
    preview () {
      let array = [0, 1, 2];
      let hdrs = document.getElementsByClassName('stroke-row');
      array.map(num => hdrs[num].classList.toggle('hidden_row'));
    }
  },

  created () {
  }

}
</script>
<style>
.stroke-stats {
  color: #FE8202;
}
.board-table {
  overflow:hidden;
  border-radius: 0 0 20px 20px;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.hidden_row {
  display: none;
}
.stroke-table table.theme--light thead {
  background-color: #30c9e8;
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