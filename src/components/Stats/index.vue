<template>
  <v-container class="pa-4" ref="summaryCardContainer">
     <v-layout row wrap justify-space-between>
      <v-flex xs12 sm12 lg12>
        <h2 class="text-xs-left font-weight-regular pl-0 pb-4">
          Summary
        </h2>
      </v-flex>
      <v-flex xs12 lg6>
        <preview-button
          :current="current"
          :title="'Money List'"
          :leaderboard="getMoneyPreview"
          :link="'MoneyList'"
          :position="'money_position'"
          :total="'total_money'"
        />
      </v-flex>
      <v-flex xs12 lg6 mt-5>
        <course-button />
      </v-flex>
     </v-layout>
  </v-container>
</template>

<script>
import router from 'vue-router'
import { mapGetters } from 'vuex'
import PreviewButton from '../Leaderboards/PreviewButton'
import CourseButton from './Course/Button'

export default {
  name: 'Stats',
  props: ['current'],
  components: {
    PreviewButton,
    CourseButton
  },

  data () {
    return {
      el: 'stats',
    }
  },

  computed: {
    ...mapGetters({
      getMoneyPreview: 'leaderboards/getMoneyPreview',
    }),
  },

  mounted () {
    console.log('this', this.getMoneyPreview);
  }

}
</script>
<style>

</style>
