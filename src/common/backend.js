
const setUser = function (user) {
  localStorage.setItem("athasha/be/user", JSON.stringify(user));
}

const getUser = function () {
  return JSON.parse(localStorage.getItem("athasha/be/user") || "{}");
}

export default {
  getUser,
  setUser,
}
