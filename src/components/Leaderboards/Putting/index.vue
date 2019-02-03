<template>
  <v-card class="putting-lb-card" @click="isPreview ? previewToggle() : null ">
    <v-card-title class="putting--title pb-0 pt-1 pl-2">
      <h2 class="text-align-left font-weight-medium" >Putting</h2>
      <h2 class="ml-2 font-weight-medium text-xs-left" v-if="!isPreview" transition="fade-transition">Leaderboard</h2>
      <v-spacer></v-spacer>
      <span v-if="!isPreview" class="text-xs-right pr-2" @click="closeLeaderboard()">
        <v-icon color="white">clear</v-icon>
      </span>
    </v-card-title>
    <div class="putting--title text-xs-left pl-2 pt-0 pb-3">
      <h4 class="font-weight-regular" style="color:black;">Purse $<span>{{ purse }}</span></h4>
    </div>
    <v-card-text v-if="!loading" class="pa-0">
      <putting-table :preview="isPreview" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import PuttingTable from './Table'

export default {
  name: 'index',
  props: ['current'],
  components: {
    PuttingTable
  },

  data () {
    return {
      purse: 0,
      loading: true,
      closed: true,
      isPreview: true,
    }
  },

  computed: mapState(['putting_leaderboard']),
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
      this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id, preview: false })
        .then(response => {
          this.closed = false
          this.isPreview = false
        })
    },
  },
  watch: {
    current: function () {
      this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id, preview: true })
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

  created: function (current) {
    this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id, preview: true })
      .then(response => {
        this.loading = false
      })
  }


}
</script>
<style>
.putting-lb-card {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
}
.putting-lb-card.open {
  width: 100vw;
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  height: 100vh;
  overflow: scroll;
}

.putting--title {
  color: #f1f1f1;
  background-color: #FE8202;
}

</style>