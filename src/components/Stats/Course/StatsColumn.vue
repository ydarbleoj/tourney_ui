<template>
  <v-container fluid pa-0 class="orange lighten-3">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card flat class="orange lighten-3">
          <v-card-title class="pr-0 pl-0 font-weight-regular">
            <h4 class="ml-2">Scoring</h4>
            <div style="width:100%;">
              <span class="scoring-net">net</span> / <span class="scoring-gross">gross</span>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card flat>
          <v-card-text>
            Putting
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card flat>
          <v-card-text>
            Par 3 Avg
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card flat>
          <v-card-text>
            Par 4 Avg
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card flat>
          <v-card-text>
            Par 5 Avg
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card flat>
          <v-card-text>
            Par 4 Avg
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'StatsColumn',
  components: {
  },

  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
  },

  created: function () {
  }
}
</script>
<style>
.scoring-net {
  color: #6CADED;
}
.scoring-gross {
  color: #999;
}
.record {
  color: #6CADED;
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