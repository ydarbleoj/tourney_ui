<template>
  <v-card flat v-if="loading" class="white" color="white">
    loading...
  </v-card>
  <v-card flat v-else>
    <v-layout row wrap align-center>
      <v-flex xs12 pa-3>
        <h3 class="font-weight-regular">{{ easiestHole }}</h3>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center>
      <v-flex xs12 pa-3>
        <h3 class="font-weight-regular">{{ hardestHole }}</h3>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HcapDiff',
  data () {
    return {
      loading: true,
      easiestHole: '',
      hardestHole: ''
    }
  },

  computed: {
     ...mapState({
      courseStats: state => state.course.courseStats,
      roundStats: state => state.course.roundStats,
      userCourseStats: state => state.course.userCourseStats
    })
  },

  methods: {
    determineYear () {

    }
  },

  created () {
    this.easiestHole = this.roundStats.easiest_hole
    this.hardestHole = this.roundStats.hardest_hole
    this.loading = false
  }
}
</script>
<style>
.scoring--stats {
  transition: opacity 1s ease, box-shadow 1s ease;
}

score-label.record {
  color: #F8C977;
}
.pers-record {
  color: #ED6C6C;
}
.personal {
  color: #999;
  font-size: 18px;
}
  p.hide {
    display: none;
  }

  .name-list {
    color: #9ad3de;
  }
</style>

