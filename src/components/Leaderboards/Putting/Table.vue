<template>
  <v-data-table
    :headers="headers"
    :items="putting_leaderboard"
    hide-actions
    class='putting-table board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props" >
      <tr @click="preview ? null : props.expanded = !props.expanded" v-bind:class="displayRow(props)">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-left">{{ props.item.attributes.username }}</td>
        <td class="text-xs-center">{{ props.item.attributes.total_3_putts }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ props.item.attributes.rnd1_putts }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ props.item.attributes.rnd2_putts }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ props.item.attributes.rnd3_putts }}</td>
        <td class="text-xs-center">{{ props.item.attributes.total_putts }}</td>
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
                      <h2 class="putting-avg">{{ props.item.attributes.rnd1_putting_avg }} <span>%</span></h2>
                    </v-flex>
                    <v-flex xs12>
                      <h5 class="grey--text font-weight-regular">putting avg</h5>
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
                      <h2 class="putting-avg">{{ props.item.attributes.rnd2_putting_avg }} <span>%</span></h2>
                    </v-flex>
                    <v-flex xs12>
                      <h5 class="grey--text font-weight-regular">putting avg</h5>
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
                      <h2 class="putting-avg">{{ props.item.attributes.rnd3_putting_avg }} <span>%</span></h2>
                    </v-flex>
                    <v-flex xs12>
                      <h5 class="grey--text font-weight-regular">putting avg</h5>
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
import { mapState } from 'vuex'

export default {
  name: 'Table',
  props: ['preview'],

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
          text: '3 Putts',
          align: 'center',
          sortable: false,
          value: 'total_3_putts'
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd1_putts',
          class: 'putting-rounds hidden_row'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_putts',
          class: 'putting-rounds hidden_row'
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_putts',
          class: 'putting-rounds hidden_row'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'net_total'
        }
      ]
    }
  },

  computed: mapState(['putting_leaderboard']),

  methods: {
    displayRow: function (props) {
      let klass;
      if (this.preview) {
        klass = props.index < 3 || props.item.attributes.username == this.$auth.user().username ? '' : 'hidden_row'
      } else {
        klass = ''
      }
      return klass
    },
  },

  watch: {
    preview () {
      let array = [0, 1, 2]
      let headers = document.getElementsByClassName('putting-rounds');
      array.map(num => headers[num].classList.toggle('hidden_row'))
    }
  },

  mounted () {
    console.log('this state', this.putting_leaderboard)
  }

}
</script>
<style>
.hidden_row {
  display: none;
}
.putting-avg {
  color: #30c9e8;
}
.board-table {
  overflow:hidden;
  border-radius: 0 0 20px 20px;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.putting-table table.theme--light thead {
  background-color: #FE8202;
}
.putting-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}

table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0;
}
</style>