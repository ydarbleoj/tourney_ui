<template>
  <v-card class="rounded-card elevation-24 pt-2" @click="">
    <h3 class="font-weight-regular">New Tournament</h3>
    <v-container>
      <v-layout row wrap justify-space-between>
        <v-flex xs12 md4>
          <v-form>
            <v-text-field
            v-model="name"
              name="name"
              label="Name"
              id="id"
            ></v-text-field>
            <v-text-field
              v-model.number="year"
              type="number"
              name="year"
              label="Year"
            ></v-text-field>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field
                  v-model.number="num_rounds"
                  type="number"
                  name="num_rounds"
                  label="# Rounds"
                ></v-text-field>

              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model.number="num_players"
                  type="number"
                  name="num_players"
                  label="# Players"
                ></v-text-field>

              </v-flex>
            </v-layout>
            <v-menu
              :close-on-content-click="true"
              v-model="menu1"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="computedStartDate"
                label="Start Date"
                persistent-hint
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
            </v-menu>
            <v-menu
              :close-on-content-click="true"
              v-model="menu2"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="computedEndDate"
                label="End Date"
                persistent-hint
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions class="pa-3">
      <div class="text-xs-right" style="width:100%;">
        <v-btn flat round class="admin--profile_button" @click="createTourn()">Create</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Build',
  components: {
  },
  computed: {
    computedStartDate () {
      let d = this.formatDate(this.date)
      this.start_date = d
      return d
    },
    computedEndDate () {
      let d = this.formatDate(this.date2)
      this.end_date = d
      return d
    },
    ...mapMutations(['tournament/RESET_CURRENT_TOURNAMENT'])
  },

  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      name: 'Bandon',
      year: 2021,
      num_players: 16,
      num_rounds: 3,
      start_date: null,
      end_date: null,
      menu1: false,
      menu2: false,
    }
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    createTourn () {
      let payload = {}
      payload['name'] = this.name
      payload['year'] = this.year
      payload['num_rounds'] = this.num_rounds
      payload['num_players'] = this.num_players
      payload['start_date'] = this.start_date
      payload['end_date'] = this.end_date

      this.$store.dispatch('CREATE_TOURNAMENT', { payload: payload }).then(response => {
        if (response) {
          console.log('this', response)
          this.$store.commit(
            'tournament/RESET_CURRENT_TOURNAMENT',
            { list: response }
          )
          this.$emit('toggleView', 'round')
        }
      })
    }
  },

  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
    date2 (val) {
      this.dateFormatted = this.formatDate(this.date2)
    }

  },

  created: function () {

  },

}

</script>
<style>
.admin--profile_button {
  background-color: #74C9D7;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.rounded-card {
  border-radius: 9px;
}
.home-container {
  background-color: white;
}
</style>