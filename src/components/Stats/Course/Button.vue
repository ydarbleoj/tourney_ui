<template>
  <v-card class="summary-card" @click="summaryPage">
    <v-img
      :src="'/static/summary.jpg'"
      height='200px'
      class="course-header"
    >
      <v-container fill-height>
        <v-layout>
          <v-flex xs6 class="pa-0">
            <div style='height:100%;'>
              <v-layout align-end row style="width:100%;height:inherit;">
                <v-flex xs12 class="white--text ma-2">
                  <h2 class="white--text font-weight-regular text-xs-left">
                    Stats
                  </h2>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Button',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament
    })
  },
  methods: {
    summaryPage () {
      this.$router.push(
        {
          name: 'Summary',
          params: {
            id: this.currentTournament.id
          }
        }
      )
    }
  },

  created: function () {
  }
}
</script>
<style scoped>
.summary-card {
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  background-color: #FBFCFD;
  z-index: 1;
}
</style>