import Vue from "vue"
import tools from "@/common/tools"
import idgen from "../idgen"

const state = () => ({
  name: `Project ${idgen.newId()}`,
  counts: {},
  items: [],
});

const mutations = {
  setName(state, { name }) {
    tools.assert(name.length > 0, `setName error: Name length must be > 0`);
    state.name = name;
  },
  addItem(state, { item }) {
    state.items.push(item);
  },
  deleteItem(state, { item }) {
    const index = state.items.indexOf(item);
    tools.assert(index >= 0, `deleteItem error for ${item.id}: Index must be >= 0`);
    state.items.splice(index, 1);
  },
  moveItem(state, args) {
    const ini = state.items.indexOf(args.ini);
    const end = state.items.indexOf(args.end);
    tools.assert(ini >= 0, `moveItem error for ${args.ini.id}: Ini index must be >= 0`);
    tools.assert(end >= 0, `moveItem error for ${args.end.id}: End index must be >= 0`);
    const count = Math.abs(end - ini);
    const inc = Math.sign(end - ini);
    const item = state.items[ini];
    for (let i = 0; i < count; i++) {
      const c = ini + i * inc;
      const n = ini + i * inc + inc;
      Vue.set(state.items, c, state.items[n]);
    }
    Vue.set(state.items, end, item);
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
