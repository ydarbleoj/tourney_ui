<template>
  <v-card
    @click="toLeaderboard"
    rounded
		:class="[bgColor, { 'opacity-click': clicked }]"
    class="lb-button pa-2"
  >
    <v-card-title class="pa-0 mb-2">
      <h4
        class="text-xs-left pl-2 font-weight-regular"
        style="color:#333;"
      >
        {{ title }}
        <br>
        <span v-if="!isMoneyList">Leaderboard</span>
      </h4>
    </v-card-title>
    <div class="text-xs-right mb-1">
      <h4 class="font-weight-regular pr-1">Total</h4>
    </div>
    <v-divider :class="[isMoneyList ? 'money-divide' : 'reg-divide']"></v-divider>
    <v-card-text class="pa-0">
      <v-list
        dense
				:class="bgColor"
        v-for="(item, index) in leaderboard" :key="index"
      >
        <v-layout row class="pt-1 mb-2">
          <v-flex xs1 class="text-xs-left" style="color:#333;">
            {{ position == 'count' ? index + 1 : item.attributes[position] }}.
          </v-flex>
          <v-flex class="text-xs-left pl-1 font-weight-regular">
            <h4>
              {{ item.attributes.username }}
            </h4>
          </v-flex>
          <v-flex class="text-xs-right pr-1 font-weight-regular">
            <h4>
              <span v-if="isMoneyList" class="" style="font-size:14px;color:#9FB8CE;">$</span>
              {{ item.attributes[total] }}
            </h4>
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
			return this.title.toLowerCase().split(' ')[0];
		}
	},
  data () {
    return {
      isloading: true,
      clicked: false,
      isMoneyList: false
    }
  },
  methods: {
    toLeaderboard () {
      this.clicked = true;
      this.$nextTick(() => {
        this.$router.push({
          name: this.link,
          params: {
            id: this.current.id
          }
        })
      });
    }
  },
	created () {
    if (this.link == 'MoneyList') {
      this.isMoneyList = true
    }
	}
}
</script>
<style scoped>
.stroke {
  background-color: #9FB8CE;
  color: #fff;
}
.putting {
	background-color: #FFCB47;
  color: #fff;
}
.skins {
	background-color: #A8C256;
  color: #fff;
}
.team {
	background-color: #ACA885;
  color: #fff;
}
.money {
  background-color: #f1f1f1;
  color: rgba(0, 0, 0, .93);
}
.reg-divide {
  color: white;
  background-color: #333;
}
.money-divide {
  padding-top: 1px;
  color: rgba(0, 0, 0, .93);
  background-color: #9FB8CE;
}
.opacity-click {
  opacity: calc(0.9);
  margin: 2px 0 -2px 0;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
.lb-button {
  border-radius: 20px;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>
