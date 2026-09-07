
(function (window) {
  "use strict";


  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  window.APP_CONFIG = Object.freeze({
    // Base URL REST API backend.
    API_BASE_URL: isLocal ? `http://${window.location.hostname}:5000/api` : "/api",


    REQUEST_TIMEOUT: 15000,


    APP_NAME: "UPTD Puskesmas Kutawaluya",


    CURRENT_YEAR: new Date().getFullYear(),
  });


  window.resolveFileUrl = function (relativeUrl) {
    if (!relativeUrl) return relativeUrl;
    const base = window.APP_CONFIG.API_BASE_URL;
    const isAbsoluteBase = /^https?:\/\//i.test(base);
    if (!isAbsoluteBase) return relativeUrl;
    const origin = base.replace(/\/api\/?$/, "");
    return origin + relativeUrl;
  };
})(window);
