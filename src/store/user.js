const state = () => ({
  current: {
    email: "", //user email
    name: "", //user full name
    avatar: "", //url to avatar image
  },
});

const mutations = {
  setCurrent(state, { email, name, avatar }) {
    state.current.name = name || "";
    state.current.email = email || "";
    state.current.avatar = avatar || "";
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
