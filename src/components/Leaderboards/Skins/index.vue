<template>
  <v-card class="skins-lb-card" @click="isPreview ? previewToggle() : null ">
    <v-card-title class="skins--title pa-0 pt-2 pl-2">
      <h2 class="text-align-left font-weight-medium white--text" >Skins</h2>
      <h2 class="ml-2 font-weight-medium text-xs-left white--text" v-if="!isPreview" transition="fade-transition">Leaderboard</h2>
      <v-spacer></v-spacer>
      <span v-if="!isPreview" class="text-xs-right pr-2" @click="closeLeaderboard()">
        <v-icon color="white">clear</v-icon>
      </span>
    </v-card-title>
     <div class="skins--title text-xs-left pl-2 pt-0 pb-3">
      <h4 class="font-weight-regular" style="color:black;">Purse $<span>{{ purse }}</span></h4>
    </div>
    <v-card-text v-if="!loading" class="pa-0 mb-5">
      <skins-table :preview="isPreview" />
    </v-card-text>
  </v-card>
</template>
<script>


import { mapState, mapGetters } from 'vuex'
import SkinsTable from './Table'

export default {
  name: 'index',
  props: ['current'],
  components: {
    SkinsTable
  },
  data () {
    return {
      isPreview: true,
      loading: true,
      closed: true,
      purse: 0,
    }
  },

  computed: {
    ...mapState(['skins_leaderboard']),
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
      this.$store.dispatch('LOAD_SKINS', { id: this.current.id, preview: false })
        .then(response => {
          this.closed = false
          this.isPreview = false
        })
    },
  },

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_SKINS', { id: this.current.id, preview: true })
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
    this.$store.dispatch('LOAD_SKINS', { id: this.current.id, preview: true })
      .then(response => {
        this.purse = this.current.num_players * 30
        this.loading = false
      })
  },
}
</script>
<style>
.skins-lb-card {
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.skins-lb-card.open {
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  width: 100vw;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 100vh;
  overflow: scroll;
}

.skins--title {
  color: #f1f1f1;
  background-color: #FFCB47;
}
</style>