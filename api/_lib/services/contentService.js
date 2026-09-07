
const db = require("../config/db");
const { ApiError } = require("../utils/apiResponse");
const crypto = require("node:crypto");

const TABLE = "site_content";

const VALID_SECTIONS = ["news", "agenda", "profile", "layanan", "programs"];


const EMPTY_DEFAULTS = {
  news: [],
  agenda: [],
  profile: {
    deskripsi: "", highlights: [], visi: "", misi: [],
    tata_nilai_judul: "", tata_nilai: [], akreditasi: [],
  },
  layanan: {
    services: [], clusters: [], alur_umum: [], persyaratan_umum: [], schedule: [],
  },
  programs: [],
};

function assertValidSection(section) {
  if (!VALID_SECTIONS.includes(section)) {
    throw new ApiError(
      `Bagian konten tidak valid. Pilihan yang tersedia: ${VALID_SECTIONS.join(", ")}.`,
      400
    );
  }
}


async function getAllContent() {
  let result;
  try {
    result = await db.execute(`SELECT section_key, content_json FROM ${TABLE}`);
  } catch (error) {
    throw new ApiError("Gagal mengambil konten situs.", 500, error.message);
  }

  const combined = { ...EMPTY_DEFAULTS };
  result.rows.forEach((row) => {
    try {
      combined[row.section_key] = JSON.parse(row.content_json);
    } catch (err) {

    }
  });
  return combined;
}


async function getSection(section) {
  assertValidSection(section);

  let result;
  try {
    result = await db.execute({
      sql: `SELECT content_json FROM ${TABLE} WHERE section_key = ?`,
      args: [section],
    });
  } catch (error) {
    throw new ApiError("Gagal mengambil bagian konten.", 500, error.message);
  }

  if (!result.rows.length) {
    return EMPTY_DEFAULTS[section];
  }
  try {
    return JSON.parse(result.rows[0].content_json);
  } catch (err) {
    throw new ApiError("Data konten tersimpan dalam format yang rusak.", 500);
  }
}


async function setSection(section, content) {
  assertValidSection(section);

  const json = JSON.stringify(content);

  try {
    await db.execute({
      sql: `INSERT INTO ${TABLE} (section_key, content_json, updated_at)
            VALUES (?, ?, datetime('now'))
            ON CONFLICT(section_key) DO UPDATE SET
              content_json = excluded.content_json,
              updated_at = excluded.updated_at`,
      args: [section, json],
    });
  } catch (error) {
    throw new ApiError("Gagal menyimpan konten.", 500, error.message);
  }

  return { section, saved: true };
}


async function saveContentFile(buffer, originalName, mimeType) {
  const id = crypto.randomUUID();
  try {
    await db.execute({
      sql: `INSERT INTO content_files (id, original_name, mime_type, file_data) VALUES (?, ?, ?, ?)`,
      args: [id, originalName, mimeType, buffer],
    });
  } catch (error) {
    throw new ApiError("Gagal menyimpan file.", 500, error.message);
  }
  return { id };
}


async function getContentFile(id) {
  let result;
  try {
    result = await db.execute({
      sql: `SELECT original_name, mime_type, file_data FROM content_files WHERE id = ?`,
      args: [id],
    });
  } catch (error) {
    throw new ApiError("Gagal mengambil file.", 500, error.message);
  }

  if (!result.rows.length) {
    throw new ApiError("File tidak ditemukan.", 404);
  }

  const row = result.rows[0];
  return {
    originalName: row.original_name,
    mimeType: row.mime_type,
    data: row.file_data,
  };
}

module.exports = {
  getAllContent,
  getSection,
  setSection,
  saveContentFile,
  getContentFile,
  VALID_SECTIONS,
};
