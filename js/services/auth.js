
(function (window) {
  "use strict";

  const STORAGE_KEY = "puskesmas_admin_session";

  function saveSession({ token, username, role }) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ token, username, role }));
  }

  function getSession() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  function getToken() {
    const session = getSession();
    return session ? session.token : null;
  }

  function clearSession() {
    sessionStorage.removeItem(STORAGE_KEY);
  }

  function isLoggedIn() {
    return Boolean(getToken());
  }

  function logout(redirectTo) {
    clearSession();
    window.location.href = redirectTo || "login.html";
  }


  function protect() {
    if (!isLoggedIn()) {
      const nextPage = encodeURIComponent(window.location.pathname.split("/").pop());
      window.location.href = `login.html?next=${nextPage}`;
    }
  }

  window.AdminAuth = { saveSession, getSession, getToken, clearSession, isLoggedIn, logout, protect };
})(window);
