<template>
	<v-layout row align-center>
		<v-flex xs12 :class="klass">
			<img
				src="/static/sand.jpg"
				class="profile-image bx-shadow"
				align="left"
				@click="editPic()"
			/>
			<h1 class="wrap-info">
				{{ this.name }}
				<br>
				<span class="info-span text-xs-left">
					{{ this.subtext }}
				</span>
			</h1>
		</v-flex>
	</v-layout>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ImageContainer',
	props: ['name', 'subtext', 'classType'],
  components: {

  },
  data () {
    return {
			klass: ""
    }
  },

	methods: {
		editPic() {
			this.$emit('showOverlay')
		}
	},

	mounted() {
		this.klass = this.classType
	}
}
</script>
<style scoped>
.profile-image {
  height: 125px;
  width: 125px;
  border-radius: 25px;
  margin-right: 10px;
}
.info-span {
	font-size: 20px;
	color: #666;
}
.player-profile h1 {
	font-size: 28px;
}
.wrap-info {
	padding-top: 5px;
  font-weight: 400;
  font-size: 20px;
}
.bx-shadow {
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>