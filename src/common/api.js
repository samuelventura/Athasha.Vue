import backend from "./backend"

//FIXME should receive idCode as parameter
const loginGoogle = function () {
  return new Promise((resolve) => {
    const user = window.gapi.auth2.getAuthInstance().currentUser.get();
    window.setTimeout(() => {
      backend.setUser({
        valid: true,
        email: user.getBasicProfile().getEmail(),
        name: user.getBasicProfile().getName(),
        avatar: user.getBasicProfile().getImageUrl(),
      });
      resolve(backend.getUser());
    }, 0);
  });
}

const login = function ({ provider, data }) {
  if (provider == "google") return loginGoogle(data);
  throw `Unsupported auth provider ${provider}`;
}

const logout = function () {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      backend.setUser({});
      resolve();
    }, 0);
  });
}

//FIXME should receive a page argument
const fetchInitialData = function () {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({ user: backend.getUser() });
    }, 0);
  });
}

const redirectToReferrer = function () {
  if (!document.referrer) window.location.href = "/";
  else if (document.referrer == window.location.href) window.location.href = "/";
  else window.location.href = document.referrer;
}

const redirectToIndex = function () {
  window.location.href = "/";
}

const redirectToAuth = function () {
  window.location.href = "/auth";
}

const acceptedCookies = function () {
  return JSON.parse(localStorage.getItem("athasha/fe/cookies") || "false");
}

const acceptCookies = function () {
  localStorage.setItem("athasha/fe/cookies", "true");
}

export default {
  login,
  logout,
  redirectToIndex,
  redirectToReferrer,
  redirectToAuth,
  fetchInitialData,
  acceptedCookies,
  acceptCookies,
}
