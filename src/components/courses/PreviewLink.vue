<template>
   <v-card
    rounded
    class="round-card"
    :style="backgroundStyle"
    @click="toRoundInfoPage"
  >
    <div class="round-info" style="width: 100%">
      <div class="text-left">
        <h2 class="pa-5">{{ round.name }}</h2>
      </div>
      <div class="text-right pa-5">
        <h3>Round {{ round.number }}</h3>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "PreviewLink",
  props: {
    round: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      backgroundImageUrl: `../../../src/assets/${this.round.course_id}course.jpg`
    }
  },
  computed: {
    backgroundStyle() {
      return {
        height: "150px",
        backgroundImage: `url(${this.backgroundImageUrl})`,
        backgroundSize: 'cover'
      };
    }
  },
  methods: {
    toRoundInfoPage() {
      this.$router.push({
        name: "RoundInfo",
        params: {
          id: this.$route.params.id,
          round_id: this.round.round_id
        }
      })
    }
  }
}
</script>

<style scoped>
.details-size {
  font-size: 1.5rem;
}
.round-card {
  border-radius: 10px; /* Rounded corners */
  background-size: cover; /* Ensures the background image covers the entire card */
  color: #f7f7f7; /* Text color */
  width: 90%;
  display: flex;
  justify-content: space-between;
}

.round-info h2,
.round-info h3 {
  margin: 0;
}

/* Positioning the course name and round number */
.round-info h2 {
  align-self: start;
}

.round-info h3 {
  align-self: end;
}
</style>
