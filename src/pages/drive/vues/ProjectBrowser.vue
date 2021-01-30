<template>
  <div class="container">
    <ProjectBrowserNav />
    <ProjectBrowserItems />
  </div>
</template>

<style scoped>
</style>

<script>
import ProjectBrowserNav from "./ProjectBrowserNav.vue";
import ProjectBrowserItems from "./ProjectBrowserItems.vue";

export default {
  name: "ProjectBrowser",
  components: { ProjectBrowserNav, ProjectBrowserItems },
  props: [],
  methods: {},
  data() {
    return {};
  },
  computed: {},
};
</script>
