<template>
  <nav class="bd-navbar navbar has-shadow is-spaced">
    <div class="navbar-brand">
      <div
        class="navbar-item"
        @drop="trashDrop($event)"
        @dragover.prevent
        @dragenter.prevent
      >
        <span class="icon-text" title="Drop unwanted files here">
          <span class="icon">
            <i class="fas fa-trash"></i>
          </span>
          <span>Trash Can</span>
        </span>
      </div>
      <a class="navbar-item" @click="onNewProject()">
        <span class="icon-text">
          <span class="icon">
            <i class="fas fa-file"></i>
          </span>
          <span>New Project</span>
        </span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
</style>

<script>
export default {
  name: "DriveBar",
  methods: {
    onNewProject() {
      console.log("onNewProject");
      this.$store.dispatch("newProject");
    },
  },
};
</script>
