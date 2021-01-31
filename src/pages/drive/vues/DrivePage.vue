<template>
  <div class="container">
    <NavBar userMenu="true" />
    <DriveBar />
    <DriveFiles />
  </div>
</template>

<style scoped>
</style>

<script>
import NavBar from "@/components/NavBar.vue";
import DriveBar from "./DriveBar.vue";
import DriveFiles from "./DriveFiles.vue";

export default {
  name: "DrivePage",
  components: { NavBar, DriveBar, DriveFiles },
  props: [],
  methods: {},
  data() {
    return {};
  },
  computed: {},
};
</script>
