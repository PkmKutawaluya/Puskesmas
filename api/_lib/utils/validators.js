

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{8,20}$/;


function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}


function isValidEmail(value) {
  return isNonEmptyString(value) && EMAIL_REGEX.test(value.trim());
}


function isValidPhone(value) {
  return isNonEmptyString(value) && PHONE_REGEX.test(value.trim());
}


function isLengthWithin(value, min, max) {
  if (typeof value !== "string") return false;
  const len = value.trim().length;
  return len >= min && len <= max;
}


function isNumberInRange(value, min, max) {
  const num = Number(value);
  return Number.isFinite(num) && num >= min && num <= max;
}


function sanitizeText(value) {
  if (value === null || value === undefined) return null;
  return String(value)
    .replace(/<[^>]*>/g, "")
    .trim();
}


class ValidationResult {
  constructor() {
    this.errors = [];
  }

  check(condition, message) {
    if (!condition) this.errors.push(message);
    return this;
  }

  get isValid() {
    return this.errors.length === 0;
  }

  get firstError() {
    return this.errors[0] || null;
  }
}

module.exports = {
  isNonEmptyString,
  isValidEmail,
  isValidPhone,
  isLengthWithin,
  isNumberInRange,
  sanitizeText,
  ValidationResult,
};
