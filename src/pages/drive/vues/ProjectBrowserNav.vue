<template>
  <nav class="bd-navbar navbar has-shadow is-spaced">
    <div class="navbar-brand">
      <BrandLogo />
      <div
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" @click="onNewProject()">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-file"></i>
            </span>
            <span>New Project</span>
          </span>
        </a>
        <div
          class="navbar-item"
          @drop="trashDrop($event)"
          @dragover.prevent
          @dragenter.prevent
        >
          <span class="icon-text" title="Drop unwanted items here">
            <span class="icon">
              <i class="fas fa-trash"></i>
            </span>
            <span>Trash Can</span>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>

<script>
import BrandLogo from "./BrandLogo.vue";

export default {
  name: "ProjectBrowserNav",
  components: {
    BrandLogo,
  },
  methods: {
    onNewProject() {
      console.log("onNewProject");
      this.$store.dispatch("newProject");
    },
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
