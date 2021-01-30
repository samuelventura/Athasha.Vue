<template>
  <aside class="menu">
    <div>
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
    <ul class="menu-list">
      <li v-for="point in diFiltered" :key="point.$id">
        <a @click="onClick(point)" title="Click to add point to screen">
          <i class="fas fa-eye" aria-hidden="true"></i>
          {{ point.name }}</a
        >
      </li>
      <li v-for="point in doFiltered" :key="point.$id">
        <a @click="onClick(point)" title="Click to add point to screen">
          <i class="fas fa-edit" aria-hidden="true"></i>
          {{ point.name }}</a
        >
      </li>
    </ul>
  </aside>
</template>

<style scoped>
</style>

<script>
export default {
  name: "UiToolboxColumn",
  components: {},
  props: [],
  methods: {
    onClick(point) {
      this.$emit("add-point", point);
    },
  },
  data() {
    return {};
  },
  computed: {
    ui() {
      return this.$store.state.view.selected.data;
    },
    filter: {
      get() {
        return this.ui.$design.filter;
      },
      set(value) {
        this.$store.commit("userInterface/setDesignProp", {
          design: this.ui.$design,
          name: "filter",
          value,
        });
      },
    },
    diOptions() {
      const gpoints = this.$store.getters["modbusGroup/digitalInputs"];
      const tpoints = this.$store.getters["modbusTable/digitalInputs"];
      return [...gpoints].concat(tpoints);
    },
    doOptions() {
      const gpoints = this.$store.getters["modbusGroup/digitalOutputs"];
      const tpoints = this.$store.getters["modbusTable/digitalOutputs"];
      return [...gpoints].concat(tpoints);
    },
    diFiltered() {
      const filter = this.filter.toLowerCase();
      return this.diOptions.filter(function (point) {
        const name = point.name.toLowerCase();
        return name.indexOf(filter) >= 0;
      });
    },
    doFiltered() {
      const filter = this.filter.toLowerCase();
      return this.doOptions.filter(function (point) {
        const name = point.name.toLowerCase();
        return name.indexOf(filter) >= 0;
      });
    },
  },
};
</script>
