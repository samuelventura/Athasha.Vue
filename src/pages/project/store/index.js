import Vue from "vue"
import Vuex from "vuex"

import data from "./data"
import view from "./view"
import modbusChannel from "./items/modbus-channel"
import modbusTable from "./items/modbus-table"
import modbusGroup from "./items/modbus-group"
import userInterface from "./items/user-interface"
import tools from "@/common/tools"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: tools.isDebug(),
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    data,
    view,
    modbusChannel,
    modbusTable,
    modbusGroup,
    userInterface,
  }
})
