<template>
  <nav class="panel">
    <div class="panel-heading">
      Project Items
      <span
        class="tag is-info"
        v-if="changeCount > 0"
        title="Number of unsaved changes"
        >{{ changeCount }}
      </span>
    </div>

    <div class="panel-block">
      <!-- Shouldn't be lazy -->
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Filter"
          v-model.trim="filter"
          @keydown.esc="clearFilter()"
        />
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
        <a
          id="clear-filter"
          :class="{ 'is-active': filter.length > 0 }"
          class="icon is-right"
          title="Clear filter"
          @click="clearFilter()"
        >
          <i class="fas fa-times" aria-hidden="true"></i>
        </a>
      </p>
    </div>

    <a
      class="panel-block"
      v-for="item in items"
      :class="{ 'is-active': item === selected }"
      @click="setSelectedItem(item)"
      :key="item.id"
      draggable
      @dragend="dragEnd($event)"
      @dragstart="itemDrag($event, item)"
      @drop="itemDrop($event, item)"
      @dragover.prevent
      @dragenter.prevent
    >
      <span class="panel-icon">
        <i class="fas fa-bars" aria-hidden="true"></i>
      </span>

      <!-- Replacing this by a name editor messes the detected width -->
      <p class="control" v-if="item === selected && editingItemName">
        <input
          v-focus
          v-model.trim.lazy="itemName"
          @blur="editItemName(false)"
          @keydown.enter="editItemName(false)"
          class="input"
          type="text"
          placeholder="Item Name"
          maxlength="32"
          :size="Math.max(32, item.name.length + 1)"
        />
      </p>

      <div v-else @dblclick="editItemName(true)">
        {{ item.name }}
      </div>
    </a>
  </nav>
</template>

<style scoped>
</style>

<script>
//[ ] Reactivate change count
export default {
  name: "ProjectEditorItems",
  components: {},
  methods: {
    dragEnd() {
      this.$store.commit("view/setTrashAction");
      this.itemDragged = null;
    },
    itemDrag(event, item) {
      event.dataTransfer.clearData();
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      this.itemDragged = item;
      const deleteItem = this.deleteItem;
      this.$store.commit("view/setTrashAction", function () {
        deleteItem(item);
      });
    },
    itemDrop(event, end) {
      if (this.itemDragged) {
        this.moveItem(this.itemDragged, end);
      }
    },
    editItemName(edit) {
      this.editingItemName = edit;
    },
    setSelectedItem(item) {
      if (item != this.selected) {
        this.selected = item;
      }
    },
    deleteItem(item) {
      this.$store.commit("data/deleteItem", { item });
      if (this.selected === item) {
        this.selected = {};
        if (this.items.length > 0) {
          this.selected = this.items[0];
        }
      }
    },
    moveItem(ini, end) {
      this.$store.commit("data/moveItem", { ini, end });
    },
    clearFilter() {
      this.$store.commit("view/setFilter", { filter: "" });
    },
  },
  data() {
    return {
      changeCount: 0,
      editingItemName: false,
      itemDragged: null,
    };
  },
  computed: {
    filter: {
      get: function () {
        return this.$store.state.view.filter;
      },
      set: function (value) {
        this.$store.commit("view/setFilter", { filter: value });
      },
    },
    itemName: {
      get: function () {
        return this.$store.state.view.selected.name;
      },
      set: function (value) {
        if (value.length == 0) return;
        this.$store.commit("view/setSelectedName", { name: value });
      },
    },
    selected: {
      get: function () {
        return this.$store.state.view.selected;
      },
      set: function (value) {
        this.$store.commit("view/setSelected", { selected: value });
      },
    },
    items() {
      return this.$store.getters["view/filteredItems"];
    },
  },
};
</script>
