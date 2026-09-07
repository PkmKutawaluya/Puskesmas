
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/apiResponse");

function assertAuthConfigured() {
  const { JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD_HASH } = process.env;
  if (!JWT_SECRET || !ADMIN_USERNAME || !ADMIN_PASSWORD_HASH) {
    throw new ApiError(
      "Konfigurasi autentikasi admin belum lengkap di server. Hubungi administrator.",
      500
    );
  }
}

/**
 * 
 * @throws {ApiError} 
 */
async function login(username, password) {
  assertAuthConfigured();

  const { JWT_SECRET, JWT_EXPIRES_IN, ADMIN_USERNAME, ADMIN_PASSWORD_HASH } = process.env;


  const isUsernameValid = username === ADMIN_USERNAME;
  const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

  if (!isUsernameValid || !isPasswordValid) {
    throw new ApiError("Username atau password salah.", 401);
  }

  const token = jwt.sign({ sub: "admin", username: ADMIN_USERNAME, role: "admin" }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN || "8h",
  });

  return { token, username: ADMIN_USERNAME, role: "admin" };
}

/**
 * 
 * @throws {ApiError} 
 */
function verifyToken(token) {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    throw new ApiError("Konfigurasi autentikasi belum lengkap di server.", 500);
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError("Sesi login telah berakhir. Silakan login kembali.", 401);
    }
    throw new ApiError("Token autentikasi tidak valid.", 401);
  }
}

module.exports = { login, verifyToken };
