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
			<input ref="FileInput" type="file" style="display: none;" @change="loadImage($event)" />
			<v-dialog v-model="dialog" :class="[dialog == false ? 'hide-dialog' : 'display-dialog']">
				<v-card flat style="height:90vh;background-color:black;">
					<cropper
						ref="cropper"
						:src="image.src"
						:default-size="defaultSize"
						:stencil-props="{
							handlers: {},
							movable: false,
							scalable: false,
							aspectRatio: 1 / 1,
						}"
					/>
					<v-card-text class="text-xs-center mt-5">
						<v-layout row wrap>
							<v-flex xs6>
						 		<h1 class="white--text" @click="dialog = false">Cancel</h1>
							</v-flex>
							<v-flex xs6>
								<h1 class="white--text mb" @click="saveImage">Save</h1>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
			</v-dialog>
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
import { mapState, mapGetters } from 'vuex'
import axios from 'axios'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import CryptoJS from 'crypto-js'

function getMimeType(file, fallback = null) {
	const byteArray = (new Uint8Array(file)).subarray(0, 4);
    let header = '';
    for (let i = 0; i < byteArray.length; i++) {
       header += byteArray[i].toString(16);
    }
	switch (header) {
        case "89504e47":
            return "image/png";
        case "47494638":
            return "image/gif";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            return "image/jpeg";
        default:
            return fallback;
    }
}

// Note that for larger files, you may want to hash them incrementally.
// Taken from https://stackoverflow.com/questions/768268/
const md5FromFile = (file) => {
  // FileReader is event driven, does not return promise
  // Wrap with promise api so we can call w/ async await
  // https://stackoverflow.com/questions/34495796
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (fileEvent) => {
      let binary = CryptoJS.lib.WordArray.create(fileEvent.target.result)
      const md5 = CryptoJS.MD5(binary)
      resolve(md5)
    }
    reader.onerror = () => {
      reject('oops, something went wrong with the file reader.')
    }
    // For some reason, readAsBinaryString(file) does not work correctly,
    // so we will handle it as a word array
    reader.readAsArrayBuffer(file)
  })
}

const fileChecksum = async(file) => {
  const md5 = await md5FromFile(file)
  const checksum = md5.toString(CryptoJS.enc.Base64)
  return checksum
}

const createPresignedUrl = async(file_name, byte_size, checksum) => {
  let options = {
		file: {
			filename: file_name,
			byte_size: byte_size,
			checksum: checksum,
			content_type: 'multipart/form-data',
			metadata: {}
    }
	}

  const res = await axios.post('/presigned_url', options, {
		headers: {
			'Accept': 'application/json',
      'Content-Type': 'application/json'
		}
	});

	return res
}
const uploadFile = async(blob, imageName) => {
	const checksum = await fileChecksum(blob)
	const presignedFileParams = await createPresignedUrl(imageName, blob.size, checksum)

	const s3PutOptions = {
		method: 'PUT',
		headers: presignedFileParams.data.direct_upload.headers,
		body: blob,
	}
	console.log('hit', presignedFileParams.data.direct_upload.url)
	let awsRes = await fetch(presignedFileParams.data.direct_upload.url, s3PutOptions)
	console.log('hiha', awsRes)
	if (awsRes.status !== 200) return awsRes
}
export default {
  name: 'ImageContainer',
	props: ['name', 'subtext', 'classType', 'image_name'],
  components: { Cropper },
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
		loadImage(event) {
			const { files } = event.target;

			if (files && files[0]) {
				if (this.image.src) {
					URL.revokeObjectURL(this.image.src)
				}
				const blob = URL.createObjectURL(files[0]);
				const reader = new FileReader();

				reader.onload = (e) => {
					this.dialog = true

					this.image = {
						src: blob,
						type: getMimeType(e.target.result, files[0].type),
					};
				};
				reader.readAsArrayBuffer(files[0]);
			}
		},
		saveImage() {
			const id = this.$auth.user().id;
			const { canvas } = this.$refs.cropper.getResult();
      const imageName =`${this.$auth.user().last_name}-avatar`
			if (canvas) {
				canvas.toBlob((blob) => {
					const form = new FormData();
					form.append('file', blob, imageName)

					uploadFile(blob, imageName)
				}, this.mime_type)
			}
    },
	},

	mounted() {
		// this.playerAvatar = this.$auth.user().profile_avatar
		// this.avatarEmpty = false
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
.cropper-stencil {
  // &__preview {
  //   &:after,
  //   &:before {
  //     content: "";
  //     opacity: 0;
  //     transition: opacity 0.25s;
  //     position: absolute;
  //     pointer-events: none;
  //     z-index: 1;
  //   }

  //   &:after {
  //     border-left: solid 1px white;
  //     border-right: solid 1px white;
  //     width: 33%;
  //     height: 100%;
  //     transform: translateX(-50%);
  //     left: 0;
  //     top: 0;
  //   }

  //   &:before {
  //     border-top: solid 1px white;
  //     border-bottom: solid 1px white;
  //     height: 33%;
  //     width: 100%;
  //     transform: translateY(-50%);
  //     top: 50%;
  //     left: 0;
  //   }
  // }

  // &--dragging {
  //   .cropper-stencil__preview {
  //     &:after,
  //     &:before {
  //       opacity: 0.7;
  //     }
  //   }
  // }
}

.cropper-line {
  border-color: rgba(white, 0.8);
}

.cropper-handler-wrapper {
  width: 24px;
  height: 24px;
  &--west-north {
    transform: translate(0, 0);
  }
  &--east-south {
    transform: translate(-100%, -100%);
  }
  &--west-south {
    transform: translate(0, -100%);
  }
  &--east-north {
    transform: translate(-100%, 0);
  }
}

.cropper-handler {
  display: block;
  position: relative;
  flex-shrink: 0;
  transition: opacity 0.5s;
  border: none;
  background: white;
  height: 4px;
  width: 4px;
  opacity: 0;
  top: auto;
  left: auto;

  &--west-north,
  &--east-south,
  &--west-south,
  &--east-north {
    display: block;
    height: 16px;
    width: 16px;
    background: none;
    opacity: 0.7;
  }

  &--west-north {
    border-left: solid 2px white;
    border-top: solid 2px white;
  }

  &--east-south {
    border-right: solid 2px white;
    border-bottom: solid 2px white;
  }

  &--west-south {
    border-left: solid 2px white;
    border-bottom: solid 2px white;
  }

  &--east-north {
    border-right: solid 2px white;
    border-top: solid 2px white;
  }

  &--hover {
    opacity: 1;
  }
}
</style>