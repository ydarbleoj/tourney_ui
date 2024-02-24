<template>
  <div>
    <div class="pt-5 pb-5">
      <h1 class="text-h3 pl-5">Gallery</h1>
    </div>

    <div class="gallery-section mt-5 pl-5" style="height:20vh" v-for="section in sections" :key="section.id">
      <h2>{{ section.title }}</h2>
      <Carousel
        :itemsToShow="1.5"
        :mouseDrag="true"
        :hideArrows="true"
        :hideDots="true"
        :dragSpeed="900"
      >
        <Slide v-for="(image, index) in section.images" :key="index">
          <div class="ml-2 mr-2">
            {{ image }}
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      sections: [
        { id: 1, title: 'Round 1 - [Course Name]', images: [1, 2, 3, 4] },
        { id: 2, title: 'Round 2 - [Course Name]', images: [1, 2, 3, 4] },
        { id: 3, title: 'Round 3 - [Course Name]', images: [1, 2, 3, 4] },
        { id: 4, title: 'Pig Stories', images: [1, 2, 3, 4] },
      ]
    }
  }
}
</script>

<style>
/* Add your CSS here */
</style>
