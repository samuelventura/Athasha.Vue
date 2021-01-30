import { newModbusChannel } from "./items/modbus-channel"
import { newModbusTable } from "./items/modbus-table"
import { newModbusGroup } from "./items/modbus-group"
import { newUserInterface } from "./items/user-interface"
import tools from "@/common/tools"
import idgen from "../idgen"

const types = [
  {
    name: "Modbus Channel",
    title: "Add new modbus channel",
    data: newModbusChannel,
  },
  {
    name: "Modbus Table",
    title: "Add new modbus point table",
    data: newModbusTable,
  },
  {
    name: "Modbus Group",
    title: "Add new modbus point group",
    data: newModbusGroup,
  },
  {
    name: "User Interface",
    title: "Add new user interface",
    data: newUserInterface,
  },
  //State Machine
  //REST Publisher
  //DB Connector
  //EMail Notifier
  //SMS Notifier
  //WhatsApp Notifier
];

const typeMap = types.reduce(function (map, type) {
  map[type.name] = type;
  return map;
}, {});

const getCount = function (counts, type) {
  let count = counts[type] || 0;
  counts[type] = ++count;
  return count;
}

const state = () => ({
  trashAction: null,
  selected: {},
  filter: "",
  typeMap,
  types,
});

const mutations = {
  setFilter(state, { filter }) {
    state.filter = filter;
    state.selected = {};
  },
  setSelected(state, { selected }) {
    state.selected = selected;
  },
  setSelectedName(state, { name }) {
    tools.assert(name.length > 0,
      `setSelectedName error: Name length must be > 0`);
    state.selected.name = name;
  },
  setTrashAction(state, action) {
    state.trashAction = action;
  },
};

const actions = {
  newItemFromType({ commit, rootState }, { type, init }) {
    //FIXME non reactive data is modified outside a commit here
    const count = getCount(rootState.data.counts, type.name);
    const item = {
      $id: idgen.newId(),
      $type: type,
      type: type.name,
      name: `${type.name} ${count}`,
      data: type.data(),
    };
    if (init) init(item.data);
    commit("data/addItem", { item }, { root: true });
    commit("setFilter", { filter: "" });
    commit("setSelected", { selected: item });
  },
};

const getters = {
  wrappedTypes(state) {
    return idgen.addIds(state.types);
  },
  wrappedItems(state, getters, rootState) {
    const items = rootState.data.items;
    items.forEach(item => {
      //FIXME will be needed when restoring from persisted state
      item.$type = item.$type || state.typesMap[item.type];
    });
    return idgen.addIds(items);
  },
  filteredItems(state, getters) {
    const filter = state.filter.toLowerCase();
    return getters.wrappedItems.filter(function (item) {
      const name = item.name.toLowerCase();
      return (name.indexOf(filter) >= 0);
    });
  },
  channelOptions(state, getters, rootState) {
    return rootState.data.items.filter(i => i.type == "Modbus Channel");
  },
};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
}
