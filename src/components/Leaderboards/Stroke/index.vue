<template>
  <v-card class="lb-card" @click="isPreview ? previewToggle() : null">
    <v-card-title class="stroke--title pa-0 pt-2 pl-2">
      <h2 class="text-xs-left font-weight-medium" >Stroke</h2>
      <h2 class="ml-2 font-weight-medium text-xs-left" v-if="!isPreview">Leaderboard</h2>
      <v-spacer></v-spacer>
      <span v-if="!isPreview" class="text-xs-right pr-2" @click="closeLeaderboard()">
        <v-icon color="white">clear</v-icon>
      </span>
    </v-card-title>
    <div class="stroke--title text-xs-left pb-3 pl-2 pt-0">
      <h4 class="black--text font-weight-regular">Purse $<span>{{ purse }}</span></h4>
    </div>
    <v-card-text v-if="!loading" class="pa-0 mb-5">
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
      purse: 0,
      isPreview: true,
      loading: true,
      closed: true,
    }
  },

  methods: {
    closeLeaderboard () {
      this.isPreview = true
    },
    previewToggle () {
      if (this.isPreview && this.closed) {
        this.getFullField()
      } else if (this.isPreview && !this.closed) {
        this.closed = !this.closed
      } else {
        return null
      }

    },
    toggleParent () {
      this.$parent.$el.style.margin = this.isPreview ? '0 auto' : '0';
      this.$parent.$el.style.width = this.isPreview ? '90%' : '100%';
    },
    getFullField () {
      this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id, preview: false })
        .then(response => {
          this.closed = false
          this.isPreview = false
        })
    },
  },
  watch: {
    current () {
      this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id, preview: true })
        .then(response => {
          this.loading = false
        })
    },
    isPreview () {
      this.toggleParent()
      this.$el.classList.toggle('open')
      this.$emit('event')
    }
  },

  created: function () {
    this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id, preview: true })
      .then(response => {
        this.purse = this.current.num_players * 30
        this.loading = false
      })
  },
}
</script>
<style>
.lb-card {
  width: 100%;
  border-radius: 20px;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
}
.lb-card.open {
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  height: 100vh;
  overflow: scroll;
  width: 100vw;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}

.stroke--title {
  color: #f1f1f1;
  background-color: #9FB8CE;
}
</style>