const state = () => ({
  current: {
    valid: false,
    email: "", //user email
    name: "", //user full name
    avatar: "", //url to avatar image
  },
});

const mutations = {
  setCurrent(state, { valid, email, name, avatar }) {
    state.current.name = name || "";
    state.current.email = email || "";
    state.current.avatar = avatar || "";
    state.current.valid = valid || false;
  }
};

const actions = {
};

const getters = {
  current: (state) => {
    return state.current;
  }
};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
}
