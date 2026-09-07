
(function (window) {
  "use strict";


  window.SITE_CONTENT = {
    news: [],
    agenda: [],
    profile: {},
    layanan: {},
    programs: [],
  };

  const BASE_URL = window.APP_CONFIG.API_BASE_URL;

  window.SiteContentReady = fetch(`${BASE_URL}/content`, { headers: { Accept: "application/json" } })
    .then((res) => res.json())
    .then((body) => {
      const data = (body && body.data) || {};
      window.SITE_CONTENT = {
        news: Array.isArray(data.news) ? data.news : [],
        agenda: Array.isArray(data.agenda) ? data.agenda : [],
        profile: data.profile && typeof data.profile === "object" ? data.profile : {},
        layanan: data.layanan && typeof data.layanan === "object" ? data.layanan : {},
        programs: Array.isArray(data.programs) ? data.programs : [],
      };
    })
    .catch((err) => {

      console.error("Gagal memuat konten situs dari server:", err);

    });
})(window);
