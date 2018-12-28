<template>
  <v-data-table
    :headers="headers"
    :items="skins_leaderboard"
    hide-actions
    class='skins-table board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props" >
      <tr @click="preview ? null : props.expanded = !props.expanded" v-bind:class="displayRow(props)">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-center">{{ props.item.attributes.username }}</td>
        <td class="text-xs-center">${{ props.item.attributes.skins_money.total }}</td>
        <td v-if="{ hidden_row : preview }" class="text-xs-center">{{ preview ? null : cardFilter(props.item.attributes.cards, 'round_1')['total'] }}</td>
        <td v-if="{ hidden_row : preview }" class="text-xs-center">{{ preview ? null : cardFilter(props.item.attributes.cards, 'round_2')['total'] }}</td>
        <td v-if="{ hidden_row : preview }" class="text-xs-center">{{ preview ? null : cardFilter(props.item.attributes.cards, 'round_3')['total'] }}</td>
        <td class="text-xs-center">{{ props.item.attributes.total_skins }}</td>
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
                      <h1 class="stroke-stats"><span class="black--text font-weight-regular" style="font-size:18px;">$</span> {{ props.item.attributes.skins_money.round_one}} </h1>
                    </v-flex>
                    <v-flex xs12 style="width:100%;">
                      <h5 class="grey--text font-weight-regular">holes</h5>
                      <ul
                        style="width:100%;padding:0;"
                      >
                        <li
                          v-for="(item, i) in cardFilter(props.item.attributes.cards, 'round_1')['holes_won']"
                          id="this"
                          :key="i"
                          d-inline-flex
                          style="display:inline-block;margin:0 5px;"

                        >
                          {{ item }}
                        </li>
                      </ul>
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
                      <h1 class="stroke-stats"><span class="black--text font-weight-regular" style="font-size:18px;">$</span> {{ props.item.attributes.skins_money.round_two }}</h1>
                    </v-flex>
                    <v-flex xs12 style="width:100%;">
                      <h5 class="grey--text font-weight-regular">holes</h5>
                      <ul
                        style="width:100%;padding:0;"
                      >
                        <li
                          v-for="(item, i) in cardFilter(props.item.attributes.cards, 'round_2')['holes_won']"
                          id="this"
                          :key="i"
                          d-inline-flex
                          style="display:inline-block;margin:0 5px;"

                        >
                          {{ item }}
                        </li>
                      </ul>
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
                      <h1 class="stroke-stats"><span class="black--text font-weight-regular" style="font-size:18px;">$</span> {{ props.item.attributes.skins_money.round_three }} </h1>
                    </v-flex>
                    <v-flex xs12 style="width:100%;">
                      <h5 class="grey--text font-weight-regular">holes</h5>
                      <ul
                        style="width:100%;padding:0;"
                      >
                        <li
                          v-for="(item, i) in cardFilter(props.item.attributes.cards, 'round_3')['holes_won']"
                          id="this"
                          :key="i"
                          d-inline-flex
                          style="display:inline-block;margin:0 5px;"

                        >
                          {{ item }}
                        </li>
                      </ul>
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
          text: 'Money',
          align: 'center',
          sortable: false,
          value: ''
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          class: 'skins-row hidden_row',
          value: 'rnd1'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          class: 'skins-row hidden_row',
          value: 'rnd2'
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          class: 'skins-row hidden_row',
          value: 'rnd3'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total'
        },
      ]
    }
  },

  computed: mapState(['skins_leaderboard']),

  methods: {
    displayRow (props) {
      let klass;
      if (this.preview) {
        klass = props.item.attributes.position < 6 || props.item.attributes.username == this.$auth.user().username ? '' : 'hidden_row'
      } else {
        klass = ''
      }
      return klass
    },
    cardFilter (cards, rnd) {
      let nn = cards.filter(el => el[rnd])
      return nn[0][rnd]

    }
  },

  watch: {
    preview () {
      let array = [0, 1, 2]
      let headers = document.getElementsByClassName('skins-row');
      array.map(num => headers[num].classList.toggle('hidden_row'))
      console.log('suns', this.skins_leaderboard)
    }
  },

  created: function (current) {
  }


}
</script>
<style>
.board-table {
  overflow:hidden;
  border-radius: 0 0 20px 20px;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.skins-table table.theme--light thead {
  background-color: #17B890;
  background-color: #ABCE57;
}
.skins-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}

table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0;
}
</style>