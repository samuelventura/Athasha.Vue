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

    <a class="navbar-item" v-if="editingProjectName">
      <p class="control">
        <input
          v-focus
          v-model.trim.lazy="projectName"
          @blur="editProjectName(false)"
          @keydown.enter="editProjectName(false)"
          class="input"
          type="text"
          placeholder="Project Name"
          maxlength="32"
          :size="Math.max(32, projectName.length + 1)"
        />
      </p>
    </a>

    <div class="navbar-item" v-else @dblclick="editProjectName(true)">
      {{ projectName }}
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" title="Select new project item">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-file"></i>
              </span>
              <span>Add New...</span>
            </span>
          </a>
          <div class="navbar-dropdown">
            <a
              class="navbar-item"
              v-for="type in itemTypes"
              :key="type.name"
              @click="newProjectItem(type)"
              :title="type.title"
            >
              <span>{{ type.name }}</span>
            </a>
          </div>
        </div>
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
  name: "ProjectEditorNav",
  components: {
    BrandLogo,
  },
  methods: {
    trashDrop(event) {
      const action = this.$store.state.view.trashAction;
      if (action) action(event);
    },
    newProjectItem(type) {
      this.$store.dispatch("view/newItemFromType", { type });
    },
    editProjectName(edit) {
      this.editingProjectName = edit;
    },
  },
  data() {
    return {
      editingProjectName: false,
    };
  },
  computed: {
    projectName: {
      get: function () {
        return this.$store.state.data.name;
      },
      set: function (value) {
        if (value.length == 0) return;
        this.$store.commit("data/setName", { name: value });
      },
    },
    itemTypes() {
      return this.$store.getters["view/wrappedTypes"];
    },
  },
};
</script>
