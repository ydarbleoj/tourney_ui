<template>
  <v-container id="summary-container" class="pa-0" ref="summaryCardContainer">
     <v-layout row wrap>
      <v-flex xs12 sm12 lg12>
        <h2 class="text-xs-left font-weight-regular pl-0" style="margin-left: 5%;" >
          Summary
        </h2>

        <div class="ma-3">
          <course-stats :current="currentTournament" />

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
import CourseStats from './Course/index'

export default {
  name: 'Stats',
  props: ['current'],
  components: {
    MoneyPreview,
    MoneyPreviewHeader,
    MoneyList,
    MoneyListHeader,
    CourseStats
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
    expandParent: function(event) {
      event.moneyList.style.position = 'fixed';
      event.moneyList.style.backgroundColor = '#f1f1f1';
      event.moneyList.style.width = '100%';
      event.moneyList.style.left = '0';
      event.moneyList.style.top = '0';
      event.moneyList.style.height = '100%';
      event.moneyList.style.overflow = 'hidden';
      event.moneyList.style.zIndex = '8888';
      event.moneyList.style.transitionDelay = '0.5s';
      event.moneyListContainer.$el.style.height = '100%';
      event.moneyListContainer.$el.style.zIndex = '7777'
    },
    closeParent: function(event) {
      event.moneyList.style.cssText = null;
      event.moneyListContainer.$el.style.cssText = null;
    },
    toggleView: function (event) {
      if (event === 'money-preview') {
        this.$refs.moneyListCard.$el.classList.toggle('expand-stats')
        this.$refs.moneyListContainer.$el.classList.toggle('expand-container')
        this.currentView = 'money-list'
        this.currentHeader = 'money-list-header'
        this.expandParent(this.$refs)
      } else if (event == 'money-list') {
        this.$refs.moneyListCard.$el.classList.toggle('expand-stats')
        this.$refs.moneyListContainer.$el.classList.toggle('expand-container')
        this.currentView = 'money-preview'
        this.currentHeader = 'money-preview-header'
        this.closeParent(this.$refs)
      }
    },
    beforeEnter: function(el) {
      el.style.opacity = 0
    },
    enter: function(el) {
      el.style.opacity = 1
    },
    afterEnter: function(el) {
      el.style.opacity = 1
    },
  }

}
</script>
<style>
.expand-container {
  top: 0;
  left: 0;
  padding: 0;
  z-index: 9999;
  width: 100%;
  overflow:  scroll;
}
.expand-stats {
  top: 0;
  left: 0;
  padding: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  overflow:  scroll;
  position: absolute;
}
.money-list-container {
  transition-timing-function: ease-in-out;
  transition-delay: 2s;
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .0s;
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translate(200px);
  opacity: 0;
}

</style>
