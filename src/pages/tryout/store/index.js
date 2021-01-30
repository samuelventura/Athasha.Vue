import Vue from "vue"
import Vuex from "vuex"
import module from "./module"
import tools from "@/common/tools"

Vue.use(Vuex)

//__VUE_DEVTOOLS_GLOBAL_HOOK__.store
export default new Vuex.Store({
  strict: tools.isDebug(),
  state: {
    count: 0,
  },
  mutations: {
    increment(state, inc) {
      console.log("store:mutation:increment", this, state, inc);
      state.count += inc;
    },
    counter(state, value) {
      console.log("store:mutation:counter", this, state, value);
      state.count = value;
    }
  },
  actions: {
    increment(context, inc) {
      //context = { commit, state, dispatch, getters, rootGetters }
      console.log("store:action:increment", this, context, inc);
      this.commit("increment", inc);
    },
    counter(context, value) {
      //context = { commit, state, dispatch, getters, rootGetters }
      console.log("store:action:counter", this, context, value);
      this.commit("counter", value);
    },
  },
  getters: {
    counter: (state, getters, rootState, rootGetters) => {
      console.log("store:getter:counter", this, state, getters, rootState, rootGetters);
      return state.count;
    }
  },
  modules: {
    module,
  }
})
