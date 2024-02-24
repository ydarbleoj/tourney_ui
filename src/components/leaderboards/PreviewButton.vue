<template>
  <v-card
    @click="toLeaderboard"
    rounded
		:class="[state.data.bgColor, { 'opacity-click': state.data.clicked }]"
    class="lb-button pa-3 ma-5"
    style="width:100%; min-height: 250px"
  >
    <v-row>
      <v-col>
        <h2 class="text-left bandon-dark-color font-weight-regular">
          {{ title }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-right pb-0">
        <h3 class="font-weight-regular underline-text">Total</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" >
        <div class="pa-0">
          <div
            :class="state.data.bgColor"
            v-for="(item, index) in leaderboard" :key="index"
          >
            <v-row>
              <v-col cols="8" class="text-left pr-0" style="color:#333;">
                <h3>
                  {{ position == 'count' ? index + 1 : item.attributes[position] }}.
                <span class="pl-2">
                  {{ item.attributes.username }}
                </span>
                </h3>
              </v-col>
              <v-col cols="4" class="text-center font-weight-regular">
                <h3>
                  <span v-if="state.data.isMoneyList" style="font-size:14px;color:#666">$</span>
                  {{ item.attributes[total] }}
                </h3>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup>
  import { useRouter } from "vue-router";
  import { reactive, nextTick } from "vue";
  import { onMounted } from "vue";

  const router = useRouter();

  const props = defineProps({
    current: Object,
    leaderboard: Array,
    link: String,
    position: String,
    title: String,
    total: String
  })

  const state = reactive({
    data: {
      isloading: true,
      clicked: false,
      isMoneyList: false,
      bgColor: props.title.toLowerCase().split(' ')[0],
    }
  });

  function toLeaderboard() {
    state.data.clicked = true;
    nextTick(() => {
      router.push({
        name: props.link,
        params: {
          id: props.current.id
        }
      })
    });
  }

  onMounted(() => {
    console.log(props.leaderboard)
    if (props.link == 'MoneyList') {
      state.data.isMoneyList = true
    }
  });
</script>
<style scoped>
.stroke {
  background-color: #9FB8CE;
  color: #666;
}
.putting {
  background-color: #FFCB47;
  background-color: #F9A875;
  color: #666;
}
.skins {
	background-color: #A8C256;
  color: #666;
}
.team {
	background-color: #ACA885;
  color: #fff;
}
.money {
  background-color: #c4c1c1;
}
.reg-divide {
  border-top: 10px solid #666;
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
