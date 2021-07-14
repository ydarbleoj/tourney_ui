<template>
  <v-card
    @click="toLeaderboard"
    rounded
		:class="bgColor"
    class="lb-button pa-2"
  >
    <v-card-title class="pa-0">
      <h2 class="text-xs-left font-weight-medium" >{{ title }}</h2>
    </v-card-title>
    <div class="text-xs-right">
      <h5 class="white--text font-weight-regular">Total</h5>
    </div>
    <v-card-text class="pa-0">
      <v-list
        dense
				:class="bgColor"
        class="white--text"
        v-for="(item, index) in leaderboard" :key="index"
      >
        <v-layout row class="pt-1">
          <v-flex xs2 class="text-xs-left">
            {{ item.attributes.position }}
          </v-flex>
          <v-flex class="text-xs-left pr-2">
            {{ item.attributes.username }}
          </v-flex>
          <v-flex class="text-xs-center">
            {{ item.attributes.total }}
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
		title: String
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
