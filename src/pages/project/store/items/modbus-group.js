import Vue from "vue"
import modbus from "./modbus-tools"
import tools from "@/common/tools"

export const newModbusGroup = function () {
  return {
    channel: "",
    slave: 1,
    read: 2,
    write: 0,
    address: 0,
    names: [],
  }
}

const state = {};

const mutations = {
  setProp(state, { group, name, value }) {
    tools.assert(Object.prototype.hasOwnProperty.call(group, name),
      `group has no property ${name}`);
    switch (name) {
      case "slave": modbus.checkSlaveID(value); break;
      case "read": modbus.checkFunctionCode(value); break;
      case "write": modbus.checkFunctionCode(value); break;
      case "address": modbus.checkAddress(value); break;
      case "names": throw "Unable to set names";
    }
    group[name] = value;
  },
  setNames(state, { group, names }) {
    group.names.splice(names.length);
    for (let i = group.names.length; i < names.length; i++) {
      group.names.push(names[i]);
    }
  },
  setName(state, { group, index, value }) {
    tools.assert(index >= 0 && index < group.names.length,
      `names invalid index ${index}`);
    Vue.set(group.names, index, value);
  },
};

const actions = {};

const getters = {
  digitalInputs(state, getters, rootState) {
    const groups = rootState.data.items.filter(i => i.type == "Modbus Group");
    const points = [];
    groups.forEach(g => {
      if (!g.data.read) return;
      const type = modbus.codeMap[g.data.read].type;
      g.data.names.forEach((n, i) => {
        //filter empty names
        if (n.trim().length > 0) {
          points.push({ $id: `${g.$id}/${type}/${i}`, name: n, group: g.$id, index: i, type });
        }
      });
    });
    return points;
  },
  digitalOutputs(state, getters, rootState) {
    const groups = rootState.data.items.filter(i => i.type == "Modbus Group");
    const points = [];
    groups.forEach(g => {
      if (!g.data.write) return;
      const type = modbus.codeMap[g.data.write].type;
      g.data.names.forEach((n, i) => {
        //filter empty names
        if (n.trim().length > 0) {
          points.push({ $id: `${g.$id}/${type}/${i}`, name: n, group: g.$id, index: i, type });
        }
      });
    });
    return points;
  },
};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
}
