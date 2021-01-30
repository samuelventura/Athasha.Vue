<template>
  <div class="columns">
    <div class="column is-narrow">
      <UiToolboxColumn v-on:add-point="addPoint" />
    </div>
    <div class="column">
      <div class="tabs">
        <ul>
          <li
            v-for="(item, i) in tabs"
            :key="i"
            :class="{ 'is-active': i == tab }"
          >
            <a @click="setTab(i)">{{ item }}</a>
          </li>
        </ul>
      </div>
      <div class="ui-canvas" :class="layoutClass">
        <div
          class="ui-item"
          v-for="(item, i) in items"
          :key="item.$id"
          draggable
          @dragend="dragEnd($event)"
          @dragstart="itemDrag($event, item)"
          @drop="itemDrop($event, item)"
          @dragover.prevent
          @dragenter.prevent
        >
          <UiDigitalInputEditor v-if="item.type == 'di'" :index="i" />
          <UiDigitalOutputEditor v-if="item.type == 'do'" :index="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-canvas {
  display: grid;
  gap: 0.4em;
  padding: 0.4em;
  border-radius: 0.4em;
  background: #ededed;
}
.ui-item {
  background: #dddddd;
  border-radius: 0.2em;
}
.ui-1col {
  grid-template-columns: repeat(1, 1fr);
}
.ui-2col {
  grid-template-columns: repeat(2, 1fr);
}
.ui-3col {
  grid-template-columns: repeat(3, 1fr);
}
</style>

<script>
import UiToolboxColumn from "./UiToolboxColumn.vue";
import UiDigitalInputEditor from "./UiDigitalInputEditor.vue";
import UiDigitalOutputEditor from "./UiDigitalOutputEditor.vue";
import idgen from "../idgen";

export default {
  name: "UserInterfaceEditor",
  components: { UiToolboxColumn, UiDigitalInputEditor, UiDigitalOutputEditor },
  props: [],
  methods: {
    setTab(tab) {
      this.tab = tab;
    },
    addPoint(point) {
      this.$store.commit("userInterface/addItem", {
        ui: this.ui,
        item: {
          name: point.name,
          type: point.type,
          point,
        },
      });
    },
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
    moveItem(ini, end) {
      this.$store.commit("userInterface/moveItem", {
        ui: this.ui,
        ini,
        end,
      });
    },
    deleteItem(item) {
      this.$store.commit("userInterface/deleteItem", {
        ui: this.ui,
        item,
      });
    },
  },
  data() {
    return {
      tabs: ["Single Column", "Dual Column", "Triple Column"],
      itemDragged: null,
    };
  },
  computed: {
    ui() {
      return this.$store.state.view.selected.data;
    },
    tab: {
      get() {
        return this.ui.$design.tab;
      },
      set(value) {
        this.$store.commit("userInterface/setDesignProp", {
          design: this.ui.$design,
          name: "tab",
          value,
        });
      },
    },
    items() {
      return idgen.addIds(this.ui.items);
    },
    layoutClass() {
      return {
        "ui-1col": this.tab == 0,
        "ui-2col": this.tab == 1,
        "ui-3col": this.tab == 2,
      };
    },
  },
};
</script>
