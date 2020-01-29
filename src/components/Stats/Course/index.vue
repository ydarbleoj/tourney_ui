<template>
  <v-container id="course-summary-container" class="pa-0" ref="courseSummaryContainer">
    <v-layout row wrap>
      <v-flex xs12 sm12 lg12>
        <h2 class="text-xs-left font-weight-regular pl-0" style="margin-left: 5%;" v-if="isPreview"></h2>
        <v-card class="course-card" @click="isPreview ? previewToggle() : null">
          <v-img
            :src="'/static/summary.jpg'"
            height='200px'
            class="course-header"
            ref="courseHeader"
          >
            <v-container fill-height pa-0 class=''>
              <v-layout>
                <v-flex xs7 flexbox>
                  <div class="headline white--text mt-5">Summary</div>
                </v-flex>
                <v-flex class="pa-0 mt-3">
                  <div class="text-xs-right">
                    <span v-if="!preview" class="text-xs-right mr-3" @click="closeCourse()">
                      <v-icon color="white">clear</v-icon>
                    </span>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-text style="background-color:white;" transition="slide-x-transition" v-if="!preview">
            <stats />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Stats from './Stats/index'

export default {
  name: 'index',
  props: ['current'],
  components: {
    Stats,
  },

  data () {
    return {
      isPreview: true,
      preview: true,
      show: false,
    }
  },

  computed: {
    ...mapState({
      summaryData: state => state.summary.summaryData,
      userSummaryData: state => state.overallSummary.userSummaryData,
      currentTournament: state => state.currentTournament
    })
  },

  methods: {
    previewToggle () {
      this.preview = !this.preview
    },
    closeCourse () {
      this.preview = !this.preview
    },
  },

  watch: {
    summary: function () {
      this.$store.dispatch('summary/LOAD_SUMMARY_DATA', { tourn_id: this.currentTournament.id })
    },
    preview () {
      this.isPreview = !this.isPreview
      this.$el.classList.toggle('open')
    }
  },

  created: function () {
    console.log('HEllo Summary')
  }

}
</script>
<style>
.hide {
  display: none;
}
.course-card {
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  background-color: #FBFCFD;
  z-index: 1;
}
.course-card.open {
  width: 100%;
  position: absolute;
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;

}
.card, .tee-times {
  background-color: rgba(255, 255, 255, 0.1);
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}
</style>
