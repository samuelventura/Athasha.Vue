<template>
  <nav class="navbar bd-navbar navbar has-shadow is-spaced">
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
      <div class="navbar-item">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true">
              <span>New...</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a class="dropdown-item">
                <span class="icon-text">
                  <span class="icon">
                    <i class="fas fa-folder"></i>
                  </span>
                  <span>Folder</span>
                </span>
              </a>
              <a class="dropdown-item">
                <span class="icon-text">
                  <span class="icon">
                    <i class="fas fa-file"></i>
                  </span>
                  <span>Text File</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>

<script>
export default {
  name: "DriveBar",
  methods: {
    onNewFolder() {
      console.log("onNewFolder");
      //this.$store.dispatch("newProject");
    },
  },
};
</script>
