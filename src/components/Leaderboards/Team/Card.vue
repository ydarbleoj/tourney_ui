<template>
  <v-card>

  </v-card>
</template>
<script>

export default {
  name: 'Card',
  props: ['scores'],

  data () {
    return {

    }
  },
  created () {
    console.log('card ', this.scores)
  }
}
</script>