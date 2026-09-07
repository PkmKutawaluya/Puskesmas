
require("dotenv").config();

const app = require("./api/_lib/app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] Backend UPTD Puskesmas Kutawaluya berjalan di port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`[server] Mode: ${process.env.NODE_ENV || "development"}`);
  // eslint-disable-next-line no-console
  console.log(`[server] Frontend statis: buka file index.html langsung, atau pakai Live Server.`);
});

/** Penanganan graceful shutdown & error tak terduga di level proses. */
process.on("unhandledRejection", (reason) => {
  // eslint-disable-next-line no-console
  console.error("[unhandledRejection]", reason);
});

process.on("SIGTERM", () => {
  // eslint-disable-next-line no-console
  console.log("[server] SIGTERM diterima, menutup server...");
  server.close(() => process.exit(0));
});

module.exports = server;
