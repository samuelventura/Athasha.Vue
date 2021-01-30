import Vue from "vue"
import tools from "@/common/tools"

export const newUserInterface = function () {
  return {
    items: [],
    $design: {
      tab: 0,
      filter: "",
    },
  }
}

const state = {};

const mutations = {
  addItem(state, { ui, item }) {
    ui.items.push(item);
  },
  deleteItem(state, { ui, item }) {
    const index = ui.items.indexOf(item);
    tools.assert(index >= 0, `deleteItem error for ${item.id}: Index must be >= 0`);
    ui.items.splice(index, 1);
  },
  moveItem(state, args) {
    const ui = args.ui;
    const ini = ui.items.indexOf(args.ini);
    const end = ui.items.indexOf(args.end);
    tools.assert(ini >= 0, `moveItem error for ${args.ini.id}: Ini index must be >= 0`);
    tools.assert(end >= 0, `moveItem error for ${args.end.id}: End index must be >= 0`);
    const count = Math.abs(end - ini);
    const inc = Math.sign(end - ini);
    const item = ui.items[ini];
    for (let i = 0; i < count; i++) {
      const c = ini + i * inc;
      const n = ini + i * inc + inc;
      Vue.set(ui.items, c, ui.items[n]);
    }
    Vue.set(ui.items, end, item);
  },
  setDesignProp(state, { design, name, value }) {
    tools.assert(Object.prototype.hasOwnProperty.call(design, name),
      `design has no property ${name}`);
    design[name] = value;
  },
};

const actions = {};

const getters = {};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
}
