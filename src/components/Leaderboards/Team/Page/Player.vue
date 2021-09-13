<template>
  <v-card
		flat
		class="border-card mb-4">
		<v-container fill-height pa-0>
			<v-layout row align-center>
				<v-flex xs7>
					<v-layout row align-center>
						<v-flex xs6>
							<v-img src="/static/sand.jpg" height="80px" style="width:80px;border-radius:25px;"></v-img>
						</v-flex>
						<v-flex>
							<h2 class="text-xs-left" style="font-weight:400;">
								{{ player.username }}
							</h2>
							<h4 class="text-xs-left" style="font-weight:500">
								Handicap {{ player.player_handicap }}
							</h4>
						</v-flex>
					</v-layout>
				</v-flex>

				<v-flex xs5 class="text-xs-right">
					<h1
						class="team-text-color"
						style="font-weight:400;font-size:65px;">
						{{ player.adjusted_score }}
					</h1>
				</v-flex>
			</v-layout>
		</v-container>
		<v-layout row align-center>
			<v-flex xs7 class="text-xs-left">
				<h1
					style="color:#BDBDBD;font-weight:400;font-size:80px;letter-spacing:-8px;">
					{{ player.impact }}%
				</h1>
			</v-flex>
			<v-flex >
				<div class="bar-wrapper text-xs-left">
					<div
					  v-bind:style="{width: barWidth(player.lowest_total)}"
						style="border-radius:8px;top:0;background-color:#A8C256;">
						<span style="margin-left:-25px;font-size:16px;">
							{{ player.lowest_total }}
						</span>
					</div>
					<div
						v-bind:style="{width: barWidth(player.second_lowest_total)}"
						style="border-radius:8px;top:35%;background-color:#e3ec65;">
						<span style="margin-left:-25px;font-size:16px;">
							{{ player.second_lowest_total }}
						</span>
					</div>
					<div
						v-bind:style="{width: barWidth(player.potential_total)}"
						style="border-radius:8px;top:70%;background-color:#999;">
						<span style="margin-left:-25px;font-size:16px;">
							{{ player.potential_total }}
						</span>
					</div>
				</div>
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
	methods: {
		barWidth (score) {
			console.log('here', `${((score / 18) * 100).toFixed(0)}%`)
			return `${((score / 18) * 100).toFixed(0)}%`
		},
	},
  mounted: function () {}
}
</script>
<style scoped>
.team-text-color {
	color: #ACA885;
	color: #A8C256;
  color: #e3ec65;
	color: #F79256;
}
.lowest-total-color {
	color: #A8C256;
}
.second-lowest-color {
  color: #e3ec65;
}
.potential-color {
	color: #999;
}
.team-background-color {
  background-color: #ACA885;
}
.rounded-card {
	background:linear-gradient(to right transparent 0%, white 10%, red 90%, red 100%);
}
.border-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1); */
}
.bar-wrapper {
	height: 100px;
	position : relative;
}
.bar-wrapper > div {
  height: 20px;
	left:15%;
  position : absolute;
  background-color: #aeaeae;
  display : inline-block;
}
/* #9FB8CE */
</style>