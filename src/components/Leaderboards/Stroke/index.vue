<template>
  <v-card class="lb-card" @click="isPreview = !isPreview; previewToggle();">
    <v-card-title class="stroke--title pb-0 pt-1 pl-2">
      <h2 class="text-align-left font-weight-medium" >Stroke</h2>
      <h2 class="ml-2 font-weight-medium" v-if="!isPreview" transition="fade-transition">Leaderboard</h2>
    </v-card-title>

    <v-card-text v-if="!loading" class="pa-0">
      <stroke-table :preview="isPreview"/>
    </v-card-text>
  </v-card>
</template>
<script>


import { mapState, mapGetters } from 'vuex'
import StrokeTable from './Table'

export default {
  name: 'index',
  props: ['current'],
  components: {
    StrokeTable
  },
  data () {
    return {
      isPreview: true,
      loading: true,
    }
  },

  computed: {
    ...mapState(['stroke_leaderboard']),
    ...mapGetters(['getStrokeLeaderboard', 'userScorecardIds'])
  },

  methods: {
    previewToggle () {
      this.$emit('event')
      this.$parent.$el.style.margin = this.isPreview ? '0 auto' : '0';
      this.$parent.$el.style.paddingTop = this.isPreview ? '20px' : '0';
      this.$parent.$el.style.width = this.isPreview ? '90%' : '100%';
      this.$el.classList.toggle('open')
    },
  },
  watch: {
    current: function () {
      this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id })
        .then(response => {
          this.loading = false
        })
    },
  },

  created: function () {
    this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id })
      .then(response => {
        this.loading = false
      })
  },
}
</script>
<style>
.lb-card {
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.lb-card.open {
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;

}

.stroke--title {
  color: #f1f1f1;
  background-color: #30c9e8;
}
</style>