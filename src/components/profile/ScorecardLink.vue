<template>
  <v-row class="bx-shadow pa-3 mb-4" style="border-radius: 25px;background-color:#f7f7f7">
    <v-col cols="11">
      <v-row>
        <v-col cols="12 pa-0">
          <h2 class="font-weight-regular" style="color:#999;">
            {{ card.course_name }}
          </h2>
        </v-col>
        <v-col cols="12" class="pa-0 text-center">
          <h2 style="color:#999;font-size:39px;">
            <span style="padding-right:7px;color:#74c9d7">{{ card.total_net }}</span>
            <span>/</span>
            {{ card.total_score }}
          </h2>
        </v-col>
        <v-col cols="12 pa-0">
          <h3 class="font-weight-light" style="color: #999">
            Putts <span style="padding-right:5px;color:#f8c977">{{ card.total_putts }}</span>
          </h3>
          <h3 class="font-weight-light" style="color: #999">
            Handicap <span style="padding-right:5px;">{{ card.handicap }}</span>
          </h3>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="1" class="d-flex align-center justify-end">
      <v-icon color="#666">mdi-chevron-right</v-icon>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.bx-shadow {
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}

</style>
