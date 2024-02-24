<template>
	<v-row align="center">
		<v-col cols="12" :class="klass" v-if="avatarEmpty">
			<v-row align="center">
				<v-col cols="5" class="mt-5 ml-5">
					<div
						class="bx-shadow text-center pt-5"
						style="height: 150px;width:150px;border-radius: 25px;"
					>
						<v-icon
							color="#666"
						>
							mdi-upload
						</v-icon>
					</div>
				</v-col>
				<v-col cols="6" class="text-left">
					<h1 class="wrap-info">
						{{ this.name }}
						<br>
						<span class="info-span text-left">
							{{ this.subtext }}
						</span>
					</h1>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" :class="klass" v-else>
			<img
				:src="playerAvatar"
				class="profile-image bx-shadow"
				align="center"
			/>
			<h1 class="wrap-info">
				{{ this.name }}
				<br>
				<span class="info-span text-left">
					{{ this.subtext }}
				</span>
			</h1>
		</v-col>

		<v-dialog v-if="dialog" v-model="dialog" fullscreen hide-overlay>
      <v-card flat class="bandon-dark-bg" style="height:100vh">
        <v-app-bar flat color="#434949">
          <v-btn icon @click="dialog = false">
          </v-btn>
          <v-spacer></v-spacer>
        </v-app-bar>

          <v-row align="center" style="height:50vh">
						<input type="file" @change="onFileChange" accept="image/*" style="display: none;" ref="fileInput"/>
            <v-col >
             <img :src="selectedFile" class="preview-image" />
            </v-col>
          </v-row>

        <v-footer class="bandon-dark-bg">
          <v-row no-gutters>
						<v-col cols="12" class="text-center">
              <div v-if="!selectedFile" class="text-center">
                <v-btn @click="triggerFileSelect">Upload an Avatar</v-btn>
                <input type="file" id="image-upload" @change="onFileChange" style="display: none;" accept="image/*" />
              </div>
							<v-btn v-if="selectedFile" @click="uploadToS3" >Upload</v-btn>
						</v-col>
          </v-row>
        </v-footer>
      </v-card>
    </v-dialog>
	</v-row>
</template>
<script>
import axios from 'axios';

export default {
  name: 'ImageContainer',
	props: ['name', 'subtext', 'classType', 'playerUrl'],
  data () {
    return {
			klass: "",
			mime_type: 'image/jpeg',
      selectedFile: "",
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
		triggerFileSelect() {
			this.$refs.fileInput.click();
		},
		onFileChange(e) {
			const files = e.target.files;
			if (files.length > 0) {
				const fileReader = new FileReader();
				fileReader.onload = (e) => {
					this.selectedFile = e.target.result;
					this.dialog = true;
				};
				fileReader.readAsDataURL(files[0]);
			}
    },
		async uploadToS3() {
			try {
				const userId = this.$auth.user().id;
				const filename = `avatar-${this.$auth.user().id}.jpg`;
				const response = await axios.get('/presigned_url', {
					params: { filename: filename }
				});
				const { url, fields } = response.data;

				const file = this.$refs.fileInput.files[0];
				const uploadRes = await fetch(url, {
					method: 'PUT',
					headers: {
						'Content-Type': file.type,
					},
					body: file,
				});

				if (uploadRes.ok) {
					console.log('Upload successful', fields);

					const savedUrl = `${fields.key}`;

					await axios.put(`/api/v2/users/profiles/${userId}`, {
						avatarUrl: savedUrl
					});

					this.playerAvatar = this.selectedFile;
					this.dialog = false;
				} else {
					throw new Error('Failed to upload to S3');
				}
			} catch (error) {
				console.error("Error uploading file to S3 and saving URL", error);
			}
		}
	},
	mounted() {
		this.playerAvatar = this.playerUrl;
		if (this.playerAvatar) {
			this.avatarEmpty = false;
		} else {
			this.avatarEmpty = true;
			this.dialog = true;
		}
		this.klass = this.classType
	}
}
</script>
<style>
.profile-image {
  height: 300px;
  width: 300px;
  border-radius: 25px;
  margin-right: 10px;
	object-fit: cover;
}
.info-span {
	font-size: 20px;
	color: #666;
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
.preview-image, .profile-image {
  max-width: 100%;
  border-radius: 25px;
}
</style>
