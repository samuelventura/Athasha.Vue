const state = () => ({
  count: 0,
});

const mutations = {
  increment(state, inc) {
    console.log("module:mutation:increment", this, state, inc);
    state.count += inc;
  },
  counter(state, value) {
    console.log("module:mutation:counter", this, state, value);
    state.count = value;
  }
};

const actions = {
  increment(context, inc) {
    //context = { commit, state, dispatch, getters, rootGetters }
    console.log("module:action:increment", this, context, inc);
    //setting { root: false } calls store, module/ prefix needed anyway
    this.commit("module/increment", inc);
  },
  counter(context, value) {
    //context = { commit, state, dispatch, getters, rootGetters }
    console.log("module:action:counter", this, context, value);
    //setting { root: false } calls store, module/ prefix needed anyway
    this.commit("module/counter", value);
  },
};

const getters = {
  counter: (state, getters, rootState, rootGetters) => {
    console.log("module:getter:counter", this, state, getters, rootState, rootGetters);
    return state.count;
  }
};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
}
