<template>
  <div class="hello text-xs-center">
    <h1>{{ msg }}</h1>
    <v-btn outline color="orange" :to="'login'">LOGIN</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Tourney'
    }
  },

  created () {
    console.log('this user', this.$auth.user())
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
