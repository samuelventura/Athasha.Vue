import Vue from "vue"
import Vuex from "vuex"
import storage from "@/common/storage"
import tools from "@/common/tools"

const newId = (function () {
  return function (count) {
    //000000.456113
    const t = new Date().getTime();
    const r = Math.random() * 1000000;
    const n = String(Math.floor(r)).padStart(6, 0);
    const c = String(count).padStart(6, 0);
    return `${c}.${t}.${n}`;
  };
})();

Vue.use(Vuex)

export default new Vuex.Store({
  strict: tools.isDebug(),
  state: {
    items: storage.listProjects(),
    //view
    selected: {},
    filter: "",
  },
  mutations: {
    setFilter(state, { filter }) {
      state.filter = filter;
      state.selected = {};
    },
    addItem(state, { item }) {
      storage.saveProject(item);
      state.items.push(item);
    },
    setSelected(state, { selected }) {
      state.selected = selected;
    },
  },
  actions: {
    newProject({ commit }) {
      const seq = storage.nextProjectSeq();
      const item = {
        //non predictable (consecutive) id needed
        id: newId(seq),
        name: `Project ${seq}`,
        counts: {},
        items: [],
      };
      commit("setFilter", { filter: "" });
      commit("addItem", { item });
      commit("setSelected", { selected: item });
    },
  },
  getters: {
    filteredItems(state) {
      const filter = state.filter.toLowerCase();
      return state.items.filter(function (item) {
        const name = item.name.toLowerCase();
        return (name.indexOf(filter) >= 0);
      });
    },
  },
  modules: {
  }
})
