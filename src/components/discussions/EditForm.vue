<template>
  <div>
    <v-bottom-sheet :value="openSheet" @update:value="updateOpenSheet">
      <v-card
        class="message-form-container"
        style="height: 50vh; width: 100%;"
      >
        <v-form @submit.prevent="sendMessage" class="message-form">
          <v-row align="center" justify="center">
            <v-col cols="12" class="pa-0">
              <v-textarea
                v-model="newMessage"
                ref="messageInput"
                :placeholder="` Message #general`"
                maxlength="500"
                class="pa-0 message-input"
                row="3"
                variant="outlined"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="2" class="text-center">
              <span class="bandon-orange-color" @click="triggerFileSelect()">
                <v-icon>mdi-image</v-icon>
              </span>
            </v-col>
            <v-col cols="8"></v-col>
            <v-col cols="2" class="text-center">
              <span class="bandon-orange-color" @click="sendMessage()">
                <v-icon>mdi-send</v-icon>
              </span>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col class="">
              <input type="file" id="image-upload" multiple @change="handleFiles" hidden>
              <div class="thumbnails text-center" v-if="thumbnails.length">
                <div v-for="(thumb, index) in thumbnails" :key="index">
                  <img :src="thumb.url" class="thumbnail" />
                  <span class="thumbnail-remove" @click="removeThumbnail(index)">
                    <v-icon>mdi-close-circle</v-icon>
                  </span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import axios from "axios";
import { useMessagesStore } from '@/store/messages';

export default {
  props: {
    openSheet: {
      type: Boolean,
      required: true,
      default: false
    },
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newMessage: '',
      inputFocused: true,
      sheet: false,
      thumbnails: [],
    };
  },
  methods: {
    updateOpenSheet(newValue) {
      this.$emit('update:openSheet', newValue);
    },
    removeThumbnail(index) {
      this.thumbnails.splice(index, 1);
    },
    showBottomSheet() {
      this.sheet = true;
      this.$nextTick(() => {
        this.$refs.messageInput.focus();
      });
    },
    async uploadImagesToS3(files) {
      return Promise.all(files.map(async (file) => {
        console.log('Uploading file:', file)
        const filename = `discussion-${Date.now()}-${file.name}`;
        const response = await axios.get('/presigned_discussion_url', {
          params: { filename: filename }
        });
        const { url, fields } = response.data;

        await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        });

        return `${fields.key}`; // Assuming fields.key is the object key
      }));
    },
    async sendMessage() {
      console.log('beginning to send message');
      if (!this.newMessage.trim()) return;

      const tournamentId = this.$route.params.id;
      const url = `/api/v3/tournaments/${tournamentId}/messages/${this.message.id}`;

      let formData = new FormData();
      formData.append('content', this.newMessage);
      formData.append('sender_id', this.$auth.user().id);

      console.log('Thumbnails:', this.thumbnails);
      if (this.thumbnails.length > 0) {
        const uploadedImageKeys = await this.uploadImagesToS3(this.thumbnails.map(thumb => thumb.file));
        uploadedImageKeys.forEach((key, index) => {
          console.log('Appending image key:', key);
          formData.append(`discussion_images[${index}]`, key);
        });
      }

      try {
        const response = await axios.patch(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Message sent:', response.data)
        useMessagesStore().updateMessage(response.data.message);

        this.openSheet = false;
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    triggerFileSelect() {
      const uploader = document.getElementById('image-upload');
      if(uploader) {
        uploader.click();
      } else {
        console.error('File input not found');
      }
    },
    handleFiles(event) {
      const files = Array.from(event.target.files);
      this.thumbnails = files.map(file => ({
        url: URL.createObjectURL(file),
        file: file
      }));
    },
    applyCustomStyles() {
      const elements = document.querySelectorAll('.v-input .v-input__details');
      elements.forEach(el => {
        el.style.display = 'none';
      });
    },
    setFocus() {
      this.$refs.messageInput.focus();
    },
  },
  mounted() {
    this.applyCustomStyles();

  },
};
</script>

<style scoped>
.message-form-container {
  background-color: #f7f7f7;
}
.thumbnails {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.thumbnail {
  height: 75px;
  width: 75px;
  border-radius: 8px;
  object-fit: cover;
}

.thumbnail-remove {
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  cursor: pointer;
}
div.v-input__details {
  display: none;
  margin: 0;
  padding: 0;
}
.v-input .v-input__details {
  display: none !important;
}
</style>
