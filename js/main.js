
(function (window, document) {
  "use strict";


  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  function formatDate(isoString) {
    if (!isoString) return "-";
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return isoString;
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return isoString;
    }
  }

  
  function markActiveNav() {
    const current = (document.body.dataset.page || "").toLowerCase();
    document.querySelectorAll(".nav-pill[data-page]").forEach((link) => {
      if (link.dataset.page.toLowerCase() === current) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /** Isi tahun berjalan pada elemen berid `footer-year`. */
  function fillFooterYear() {
    document.querySelectorAll("[data-footer-year]").forEach((el) => {
      el.textContent = window.APP_CONFIG.CURRENT_YEAR;
    });
  }

  /** Tampilkan state loading (skeleton) pada sebuah container. */
  function setLoading(container, message) {
    if (!container) return;
    container.innerHTML = `<div class="state-message">${escapeHtml(
      message || "Memuat data..."
    )}</div>`;
  }

  /** Tampilkan pesan error/empty state seragam pada sebuah container. */
  function setMessage(container, message, isError) {
    if (!container) return;
    container.innerHTML = `<div class="state-message${
      isError ? " is-error" : ""
    }">${escapeHtml(message)}</div>`;
  }

  document.addEventListener("DOMContentLoaded", function () {
    markActiveNav();
    fillFooterYear();
  });

  window.AppUtils = {
    escapeHtml,
    formatDate,
    setLoading,
    setMessage,
  };
})(window, document);
