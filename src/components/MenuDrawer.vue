<template>
  <v-navigation-drawer
    v-model="modelValue"
    temporary
  >
    <v-list>
      <v-list-item v-for="(item, index) in menuItems" :key="index">
        <div>
          <h3>{{ item.title }}</h3>
        </div>
        <v-icon class="pl-2">mdi-chevron-right</v-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "MenuDrawer",
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      menuItems: [
        {
          title: "Profile",
          route: "/profile"
        },
        {
          title: "Records",
          route: "/tournament_records"
        },
      ]
    }
  },
  methods: {
    // navigateTo(route) {
    //   console.log("MenuDrawer navigateTo", route);
    //   this.$router.push(route);
    //   this.$emit("update:modelValue", false); // Close drawer after navigation
    // },
    updateValue(value) {
      console.log("MenuDrawer updateValue", value);
      this.$emit("update:modelValue", true); // Emit an update event when the drawer's value changes
    }
  },
  mounted() {
    console.log("MenuDrawer mounted", this.modelValue);
  }
};
</script>

<style scoped>

</style>
