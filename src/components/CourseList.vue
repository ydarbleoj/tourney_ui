<template>
  <v-layout row>
    <v-flex xs12 sm12 offset-sm3>
      <v-card>
        <h2>Courses</h2>
        <v-list >
          <v-list-tile v-for="course in courses" v-bind:key="course.name">
            <v-list-tile-content>
              <v-list-tile-title v-html="course.name"></v-list-tile-title>
              <v-divider></v-divider>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CourseList',
  computed: mapState([
    'courses'
  ])
}
</script>