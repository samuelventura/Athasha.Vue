<template>
  <nav class="panel">
    <div class="panel-heading">Projects</div>
    <div class="panel-block">
      <!-- Shouldn't be lazy -->
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Filter"
          v-model.trim="filter"
          @keydown.esc="filter = ''"
        />
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
        <a
          id="clear-filter"
          :class="{ 'is-active': filter.length > 0 }"
          class="icon is-right"
          title="Clear filter"
          @click="filter = ''"
        >
          <i class="fas fa-times" aria-hidden="true"></i>
        </a>
      </p>
    </div>

    <a
      class="panel-block"
      v-for="item in items"
      :class="{ 'is-active': item === selected }"
      @click="setSelected(item)"
      @dblclick="openEditor(item)"
      :key="item.id"
    >
      <span class="panel-icon">
        <i class="fas fa-bars" aria-hidden="true"></i>
      </span>
      {{ item.name }}
    </a>
  </nav>
</template>

<style scoped>
</style>

<script>
export default {
  name: "ProjectBrowserItems",
  components: {},
  props: [],
  methods: {
    setSelected(item) {
      if (item != this.selected) {
        this.selected = item;
      }
    },
    openEditor(item) {
      //FIXME add explicit URL base
      window.open(`/project/${item.id}`, "_blank").focus();
    },
  },
  data() {
    return {
      //FIXME add sorter
    };
  },
  computed: {
    filter: {
      get: function () {
        return this.$store.state.filter;
      },
      set: function (value) {
        this.$store.commit("setFilter", { filter: value });
      },
    },
    items() {
      return this.$store.getters["filteredItems"];
    },
    selected: {
      get: function () {
        return this.$store.state.selected;
      },
      set: function (value) {
        this.$store.commit("setSelected", { selected: value });
      },
    },
  },
};
</script>
