<template>
  <v-card>
		<v-layout row wrap>
			<v-flex xs6>
				<h3>{{ player.username }}</h3>
				<p>{{ player.player_handicap }}</p>
			</v-flex>
			<v-flex xs6>
				<v-layout>
					<v-flex xs2>
						<h5>{{ player.lowest_total }}</h5>
					</v-flex>
				` <v-flex xs2>
						<h5>{{ player.second_lowest_total }}</h5>
					</v-flex>
					<v-flex xs2>
						<h5>{{ player.potential_total }}</h5>
					</v-flex>
					<v-flex xs3>
						<h5>{{ player.impact }}%</h5>
					</v-flex>
					<v-flex xs3>
						<h5>{{ player.adjusted_score }}</h5>
					</v-flex>
				</v-layout>
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