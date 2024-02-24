<template>
  <div class="mb-5">
    <IndivMatch :day="firstMatch" v-if="loadMatches"/>
    <v-divider class=""></v-divider>
    <IndivMatch :day="secondMatch" v-if="loadMatches"/>
    <v-divider class=""></v-divider>
    <IndivMatch :day="thirdMatch" v-if="loadMatches"/>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import { useMudderCupStore } from '@/store/mudderCup'
import IndivMatch from "./IndivMatch.vue";

export default {
  name: "MainPageMatches",
  components: {
    IndivMatch
  },
  setup() {
    const mudderCupStore = useMudderCupStore();
    const matches = mudderCupStore.matches;

    const firstMatch = ref([])
    const secondMatch = ref([])
    const thirdMatch = ref([])
    const loadMatches = ref(false)

    onMounted(() => {
      const m = matches.matches

      firstMatch.value = m.filter((match) => match.show === 1)
      secondMatch.value = m.filter((match) => match.show === 2)
      thirdMatch.value = m.filter((match) => match.show === 3)
      loadMatches.value = true
    })

    return {
      firstMatch,
      loadMatches,
      secondMatch,
      thirdMatch
    }
  },

}
</script>

<style scoped>
.profile-image {
  height: 75px;
  width: 75px;
  border-radius: 25px;
  margin-right: 10px;
}
.info-span {
	font-size: 16px;
	color: #666;
}
.bx-shadow {
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
.border-for-match {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
