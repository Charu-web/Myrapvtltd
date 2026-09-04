// seed.js
// One-time / re-runnable setup script that creates or updates a user
// account in data/users.json. Only a salt + scrypt hash are ever written
// to disk -- the plaintext password passed on the command line is never
// stored anywhere.
//
// Usage:
//   node seed.js <email> <password>

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const SCRYPT_KEYLEN = 64;

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, SCRYPT_KEYLEN).toString('hex');
  return { salt, hash };
}

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch (e) {
    return {};
  }
}

function saveUsers(users) {
  fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

function main() {
  const [, , email, password] = process.argv;
  if (!email || !password) {
    console.error('Usage: node seed.js <email> <password>');
    process.exit(1);
  }
  const normalizedEmail = email.trim().toLowerCase();
  const users = loadUsers();
  const { salt, hash } = hashPassword(password);
  users[normalizedEmail] = { salt, hash, createdAt: users[normalizedEmail]?.createdAt || new Date().toISOString() };
  saveUsers(users);
  console.log(`User "${normalizedEmail}" saved to ${USERS_FILE} (password hash only, no plaintext stored).`);
}

main();
