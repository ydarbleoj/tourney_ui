<template>
  <v-card
		rounded
		flat
		class="rounded-card pa-2 text-xs-center">
		<v-layout row align-center>
			<v-flex xs6>
				<h3>
					{{ player.username }}
					<span style="color:grey;font-size:12px;padding:0px0px2px2px;">
						{{ player.player_handicap }}
					</span>
				</h3>
			</v-flex>
			<v-flex xs6>
				<h1 style="color:#ACA885;font-size:35px;">{{ player.adjusted_score }}
					<span
						style="color:grey;font-size:16px;padding-bottom-2px;">
					{{ player.impact }}%
					</span>
				</h1>
			</v-flex>
		</v-layout>
  </v-card>
</template>
<script>

export default {
  name: 'Player',
	props: ['player'],
  data () {
    return {
    }
  },
  computed: {
  },
  mounted: function () {}
}
</script>
<style scoped>
.team-text-color {
	color: #ACA885;
}
.team-background-color {
  background-color: #ACA885;
}
.rounded-card {
	background:linear-gradient(to right transparent 0%, white 10%, red 90%, red 100%);
}
/* #9FB8CE */
</style>