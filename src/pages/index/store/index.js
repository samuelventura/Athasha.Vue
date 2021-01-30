import Vue from "vue"
import Vuex from "vuex"
import tools from "@/common/tools"
import user from "@/store/user"

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
    user,
  }
})
