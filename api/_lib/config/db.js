
const { createClient } = require("@libsql/client");

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!TURSO_DATABASE_URL) {
  // eslint-disable-next-line no-console
  console.error(
    "[FATAL] TURSO_DATABASE_URL wajib diisi di file .env. " +
      "Lihat .env.example untuk referensi."
  );
}

const db = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN || undefined,
});

module.exports = db;
