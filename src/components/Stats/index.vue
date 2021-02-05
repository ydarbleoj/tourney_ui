<template>
  <v-container class="pa-4" ref="summaryCardContainer">
     <v-layout row wrap>
      <v-flex xs12 sm12 lg12>
        <h2 class="text-xs-left font-weight-regular pl-0 pb-4">
          Summary
        </h2>

        <div>
          <course-button />

        </div>
      </v-flex>
     </v-layout>
  </v-container>
</template>

<script>
import router from 'vue-router'
import { mapState } from 'vuex'
import MoneyPreview from './MoneyList/Preview'
import MoneyPreviewHeader from './MoneyList/PreviewHeader'
import MoneyList from './MoneyList/Full'
import MoneyListHeader from './MoneyList/FullHeader'
import CourseButton from './Course/Button'

export default {
  name: 'Stats',
  props: ['current'],
  components: {
    MoneyPreview,
    MoneyPreviewHeader,
    MoneyList,
    MoneyListHeader,
    CourseButton
  },

  data () {
    return {
      el: 'stats',
    }
  },

  computed: {
    ...mapState(['currentTournament'])
  },

  methods: {
  }

}
</script>
<style>

</style>
