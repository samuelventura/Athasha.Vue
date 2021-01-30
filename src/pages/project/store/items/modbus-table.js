import modbus from "./modbus-tools"
import tools from "@/common/tools"

export const newModbusPoint = function () {
  return {
    slave: 1,
    read: 2,
    write: 0,
    address: 0,
    name: "",
  };
}

export const newModbusTable = function () {
  return {
    channel: "",
    points: [],
  }
}

const state = {};

const mutations = {
  setChannel(state, { table, channel }) {
    table.channel = channel;
  },
  setPoints(state, { table, points }) {
    table.points.splice(points.length);
    for (let i = table.points.length; i < points.length; i++) {
      table.points.push(points[i]);
    }
  },
  setPointProp(state, { table, index, name, value }) {
    const points = table.points;
    tools.assert(index >= 0 && index < points.length,
      `points invalid index ${index}`);
    let point = points[index];
    tools.assert(Object.prototype.hasOwnProperty.call(point, name),
      `points[${index}] has no property ${name}`);
    switch (name) {
      case "slave": modbus.checkSlaveID(value); break;
      case "read": modbus.checkFunctionCode(value); break;
      case "write": modbus.checkFunctionCode(value); break;
      case "address": modbus.checkAddress(value); break;
    }
    point[name] = value;
  },
};

const actions = {};

const getters = {
  digitalInputs(state, getters, rootState) {
    const tables = rootState.data.items.filter(i => i.type == "Modbus Table");
    const points = [];
    tables.forEach(t => {
      t.data.points.forEach((p, i) => {
        if (!p.read) return;
        const type = modbus.codeMap[p.read].type;
        //filter empty names
        if (p.name.trim().length > 0) {
          points.push({ $id: `${t.$id}/${type}/${i}`, name: p.name, table: t.$id, index: i, type });
        }
      });
    });
    return points;
  },
  digitalOutputs(state, getters, rootState) {
    const tables = rootState.data.items.filter(i => i.type == "Modbus Table");
    const points = [];
    tables.forEach(t => {
      t.data.points.forEach((p, i) => {
        if (!p.write) return;
        const type = modbus.codeMap[p.write].type;
        //filter empty names
        if (p.name.trim().length > 0) {
          points.push({ $id: `${t.$id}/${type}/${i}`, name: p.name, table: t.$id, index: i, type });
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
