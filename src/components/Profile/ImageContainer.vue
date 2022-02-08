<template>
	<v-layout row align-center>
		<v-flex xs12 :class="klass" v-if="avatarEmpty">
			<v-layout row wrap justify-center align-center>
				<v-flex xs5
				>
					<div
						class="bx-shadow text-xs-center pt-5"
						style="height: 125px;width:125px;border-radius: 25px;margin-right: 10px;"
					>
						<v-icon
							color="#666"
						>
							mdi-upload
						</v-icon>
					</div>
				</v-flex>
				<v-flex xs7>
					<h1 class="wrap-info">
						{{ this.name }}
						<br>
						<span class="info-span text-xs-left">
							{{ this.subtext }}
						</span>
					</h1>
				</v-flex>
			</v-layout>
		</v-flex>
		<v-flex xs12 :class="klass" v-else>
			<img
				:src="playerAvatar"
				class="profile-image bx-shadow"
				align="left"
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

export default {
  name: 'ImageContainer',
	props: ['name', 'subtext', 'classType', 'image_name'],
  data () {
    return {
			klass: "",
			mime_type: 'image/jpeg',
      cropedImage: '',
      autoCrop: false,
      selectedFile: '',
      image: {
				src: null,
				type: null
			},
      dialog: false,
      files: '',
			avatarEmpty: true,
			playerAvatar: null
    }
  },

	methods: {
		defaultSize({ imageSize, visibleArea }) {
			return {
				width: (visibleArea || imageSize).width,
				height: (visibleArea || imageSize).height,
			};
		},
	},

	mounted() {
		this.klass = this.classType
	}
}
</script>
<style lang="scss">
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
.hide-dialog {
	display: none;
}
.display-dialog {
	z-index: 100;
	width:100vw;
	height:100vh;
	top:0;
	left:0;
}
</style>
