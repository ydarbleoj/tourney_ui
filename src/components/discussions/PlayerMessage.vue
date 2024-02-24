<template>
  <div class="message">
    <div class="message-header pt-2">
      <img :src="defaultImage" class="user-image"/>
      <div style="width:100%;">
        <div>
          <h3 class="bandon-black-color sender-name">
            <span style="font-size: 20px; font-weight: bold">{{ message.sender_name }}</span>
            <span class="message-time text-left">{{ formatMessageDate(message.created_at) }}</span>
            <span v-if="canEdit" class="edit-icon pr-2">
              <v-icon @click="showEdit">mdi-dots-horizontal</v-icon>
            </span>
          </h3>
        </div>

        <div class="message-content pr-2">
          {{ message.content }}
          <div v-if="message.images && message.images.length" :class="imageContainerClass(message.images.length)">
            <img
              v-for="(url, index) in displayedImages"
              :key="index"
              :src="url"
              class="message-image"
              @click="openImageDialog(url)"
            />
            <div v-if="message.images.length > 4" class="more-images-overlay">+{{ message.images.length - 4 }}</div>
          </div>
        </div>
      </div>
    </div>

    <EditForm :openSheet="isEditFormOpen" @update:openSheet="isEditFormOpen = $event" :message="message"/>

    <v-dialog v-model="dialog" fullscreen hide-overlay>
      <v-card flat class="bandon-dark-bg" style="height:100vh">
        <v-app-bar flat color="#434949">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-toolbar-title>{{ message.sender_name }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>

        <v-container class="bandon-dark-bg mt-5">
          <v-row align="center" style="height:80vh">
            <v-col>
              <Carousel :itemsToShow="1" :hideArrows="false">
                <Slide v-for="(url, index) in displayedImages" :key="index">
                  <v-img :src="url" class="image-dialog" contain></v-img>
                </Slide>

                <template #addons>
                  <Navigation />
                  <Pagination />
                </template>
              </Carousel>
              <p style="font-size:12px; color: #999" class="pl-5 mt-5">
                {{ message.fulltime }}
              </p>
              <p style="font-size:20px; color: #f7f7f7" class="pl-5">
                {{ message.content }}
              </p>
            </v-col>
          </v-row>
        </v-container>

        <v-footer class="bandon-dark-bg">
          <v-row no-gutters>
            <v-col cols="6" class="text-left">
              <v-btn icon @click="downloadImage" class="footer-buttons">
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn icon @click="shareImage" class="footer-buttons">
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-footer>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import EditForm from './EditForm.vue';

export default {
  name: 'MessageComponent',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    Carousel,
    EditForm,
    Navigation,
    Pagination,
    Slide
  },
  data() {
    return {
      dialog: false,
      defaultImage: "https://www.bandondunesgolf.com/wp-content/uploads/2022/04/BandonDunes_CoursePreview.jpg",
      currentImage: "",
      sheet: false,
      isEditFormOpen: false,

    };
  },
  mounted() {
    console.log('MessageComponent mounted');
    if (this.message.sender_avatar_url) {
      this.defaultImage = this.message.sender_avatar_url;
    }
  },
  computed: {
    displayedImages() {
      return this.message.images.slice(0, 4); // Get first 4 images only
    },
    canEdit() {
      return this.message.sender_id === this.$auth.user().id;
    },
  },
  methods: {
    showEdit() {
      console.log('showEdit')
      this.isEditFormOpen = true;
    },
    downloadImage() {
      if (!this.currentImage) {
        console.error('No image selected for download');
        return;
      }

      const link = document.createElement('a');
      link.href = this.currentImage; // Assuming this.currentImage is the URL of the image
      link.download = 'download'; // You can set a default download filename here
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      console.log('Download initiated for image:', this.currentImage);
    },
    async shareImage() {
      if (!this.currentImage) {
        console.error('No image selected for sharing');
        return;
      }

      if (!navigator.share) {
        console.error('Web Share API not supported in this browser');
        return;
      }

      try {
        await navigator.share({
          title: 'Share Image',
          text: 'Check out this image',
          url: this.currentImage, // URL of the image to share
        });
        console.log('Image shared successfully');
      } catch (error) {
        console.error('Error sharing the image:', error);
      }
    },
    openImageDialog(url) {
      this.currentImage = url;
      this.dialog = true;
    },
    imageContainerClass(imageCount) {
      if (imageCount === 1) return 'single-image';
      if (imageCount === 2) return 'two-images';
      if (imageCount === 3) return 'three-plus-images';
      return 'four-plus-images';
    },
    formatMessageDate(datetime) {
      return datetime;
    }
  }
};
</script>

<style scoped>
.image-dialog {
  max-height: 60vh;
  max-width: 80%;
}
.dialog-bottom-transition .v-dialog {
  transform: translate(0, 100%);
}
.message {
  width: 100%;
  margin-bottom: 10px;
}

.user-image {
  width: 40px; /* Adjust size as needed */
  height: 40px; /* Equal width and height for square shape */
  border-radius: 20%; /* Rounded corners */
  margin-right: 10px; /* Space between the image and the text */
  object-fit: cover; /* Prevents image from stretching */
}

.message-header {
  display: flex;
}

.sender-name {
  display: flex;
  align-items: center;
  justify-content: space-between; /* This will push the icon to the far right */
  width: 100%;
}

.message-time {
  color: #999; /* Light gray color */
  font-size: 12px; /* Smaller font size */
  margin-left: 5px;
  margin-right: auto;
}
.edit-icon {
  color: #999;
  margin-left: auto;
}
.message-content {
  font-size: 16px; /* Adjust the font size */
}

.message-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Space between images */
}

.message-image {
  border-radius: 10px; /* Rounded corners */
  max-width: 100%; /* Prevents images from overflowing */
  height: auto;
  object-fit: cover;
}
.single-image .message-image {
  height: 20vh;
  width: 100%;
  border-radius: 10px;
}

.two-images .message-image {
  height: 15vh;
  width: 45%;
  margin: 5px;

}
.three-plus-images .message-image {
  height: 10vh;
  width: 10vh;
  margin: 2px;
}

.four-plus-images .message-image {
  height: 10vh;
  width: 10vh;
}

.more-images-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 10px;
  height: 10vh;
  width: 10vh;
  position: absolute;
  right: 0;
}
.footer-buttons {
  color: #f7f7f7;
  background-color: #434949;
}
</style>
