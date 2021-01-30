export const newStateMachine = function () {
  return {
    model: {
    }
  }
}

const state = () => (newStateMachine());

const mutations = {
  setModel(state, { model }) {
    state.model = model;
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
