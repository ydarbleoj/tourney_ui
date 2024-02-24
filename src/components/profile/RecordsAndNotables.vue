<template>
  <v-container class="alt-putting-bg rounded-border mt-5">
    <h3 class="mb-4">Tournament Records</h3>
    <div v-for="record in tournamentRecords" :key="record.id" class="record-item mb-2">
      <div class="pb-2"><strong>{{ record.name }}</strong></div>
      <v-divider></v-divider>
      <div class="pt-2 font-weight-regular default-color">
        {{ record.value }} - {{ record.description }}
        <span class="pl-2">
          <v-icon color="#666"> mdi-chevron-right </v-icon>
        </span>
      </div>
    </div>
    <div class="text-right pt-5">
      <router-link class="default-color" to="/tournament_records">
        More records <v-icon color="#666"> mdi-chevron-right </v-icon>
      </router-link>
    </div>

    <!-- <h3 class="mb-4">Course Records</h3>
    <div v-for="record in courseRecords" :key="record.id" class="record-item mb-2">
      <div><strong>Record:</strong> {{ record.name }}</div>
      <div><strong>Value:</strong> {{ record.value }}</div>
      <div><strong>Active Duration:</strong> {{ record.activeDuration }}</div>
      <div v-if="record.isBroken"><strong>Broken by:</strong> {{ record.brokenBy }} on {{ record.brokenDate }}</div>
    </div> -->
    <!-- <div class="records-link text-right">
      <router-link to="/">More records ></router-link>
    </div> -->
  </v-container>
</template>

<script>
export default {
  name: 'RecordsAndNotables',
  props: {
    tournamentRecords: Array,
    courseRecords: Array,
  },
};
</script>

<style scoped>
.records-container {
  background-color: #74c9d7;
  border-radius: 25px;
}

.record-item {
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow for each record */
}

.records-link {
  margin-top: 10px;
  font-size: 0.9em;
}
</style>
