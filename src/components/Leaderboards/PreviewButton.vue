<template>
  <v-card
    @click="toLeaderboard"
    rounded
		:class="bgColor"
    class="lb-button pa-2"
  >
    <v-card-title class="pa-0 mb-2">
      <h4 class="text-xs-left pl-2 font-weight-regular" >
        {{ title }}
        <br>
        <span>Leaderboard</span>
      </h4>
    </v-card-title>
    <div class="text-xs-right mb-1">
      <h5 class="white--text font-weight-regular pr-1">Total</h5>
    </div>
    <v-divider color="white"></v-divider>
    <v-card-text class="pa-0">
      <v-list
        dense
				:class="bgColor"
        class="white--text"
        v-for="(item, index) in leaderboard" :key="index"
      >
        <v-layout row class="pt-1 mb-2">
          <v-flex xs1 class="text-xs-left">
            {{ position == 'count' ? index + 1 : item.attributes[position] }}.
          </v-flex>
          <v-flex class="text-xs-left pl-1">
            {{ item.attributes.username }}
          </v-flex>
          <v-flex class="text-xs-right pr-1" style="font-size:14px;">
            {{ item.attributes[total] }}
          </v-flex>
        </v-layout>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'PreviewButton',
  props: {
		current: Object,
		leaderboard: Array,
		link: String,
    position: String,
		title: String,
    total: String
	},
  computed: {
		bgColor () {
			return this.title.toLowerCase();
		}
	},
  data () {
    return {
      isloading: true,
    }
  },
  methods: {
    toLeaderboard () {
      this.$router.push({
        name: this.link,
        params: {
          id: this.current.id
        }
      })
    }
  },
	created () {
    console.log('props', this.leaderboard)
	}
}
</script>
<style scoped>
.stroke {
  background-color: #9FB8CE;
}
.putting {
	background-color: #A8C256;
}
.skins {
	background-color: #FFCB47;
}
.team {
	background-color: #ACA885;
}
.lb-button {
  border-radius: 20px;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
}
</style>
