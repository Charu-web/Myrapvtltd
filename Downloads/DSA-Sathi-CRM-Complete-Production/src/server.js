// server.js
// Complete Real Multi-Tenant CRM Platform Server with Session Authentication,
// Strict Data Isolation, Dynamic Schema & Record CRUD API, and Protected Static Serving.

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { URL } = require('url');
const CRMDB = require('./crm-db');
const { seedCRMInitialData } = require('./crm-db');


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

const SCRYPT_KEYLEN = 64;
const SESSION_COOKIE_NAME = 'sid';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ---------------------------------------------------------------------------
// Users & Password Hashing
// ---------------------------------------------------------------------------
function ensureDefaultUsers(users) {
  let modified = false;
  const defaults = [
    { email: 'admin@loanpilot.com', name: 'Admin / Owner', pass: 'demo@12345' },
    { email: 'sales@loanpilot.com', name: 'Sales agent', pass: 'demo@12345' },
    { email: 'ops@loanpilot.com', name: 'Operations', pass: 'demo@12345' },
    { email: 'finance@loanpilot.com', name: 'Finance', pass: 'demo@12345' },
    { email: 'csonker04@gmail.com', name: 'Charu Sonker', pass: 'charu123' }
  ];

  for (const d of defaults) {
    if (!users[d.email]) {
      const { salt, hash } = hashPassword(d.pass);
      users[d.email] = {
        salt,
        hash,
        name: d.name,
        createdAt: new Date().toISOString()
      };
      modified = true;
    }
  }
  if (modified) {
    saveUsers(users);
  }
}

function loadUsers() {
  let users = {};
  if (fs.existsSync(USERS_FILE)) {
    try {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch (e) {
      console.error('Failed to read users.json:', e.message);
    }
  } else {
    const rootUsers = path.join(__dirname, 'users.json');
    if (fs.existsSync(rootUsers)) {
      try {
        const data = fs.readFileSync(rootUsers, 'utf8');
        users = JSON.parse(data);
      } catch (e) {}
    }
  }
  ensureDefaultUsers(users);
  return users;
}

function saveUsers(users) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, SCRYPT_KEYLEN).toString('hex');
  return { salt, hash };
}

function verifyPassword(password, user) {
  if (!user || !user.salt || !user.hash) return false;
  const candidate = crypto.scryptSync(password, user.salt, SCRYPT_KEYLEN);
  const stored = Buffer.from(user.hash, 'hex');
  if (candidate.length !== stored.length) return false;
  return crypto.timingSafeEqual(candidate, stored);
}

// ---------------------------------------------------------------------------
// CORS & Preflight Configuration
// ---------------------------------------------------------------------------
function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);

  let allowOrigin = origin || '*';
  if (allowedOrigins.length > 0) {
    if (allowedOrigins.includes(origin)) {
      allowOrigin = origin;
    } else if (allowedOrigins.includes('*')) {
      allowOrigin = origin || '*';
    } else {
      allowOrigin = allowedOrigins[0];
    }
  }

  if (allowOrigin === '*' && origin) {
    allowOrigin = origin;
  }

  res.setHeader('Access-Control-Allow-Origin', allowOrigin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
}

// ---------------------------------------------------------------------------
// Sessions (with disk persistence so page refresh/restarts preserve logins)
// ---------------------------------------------------------------------------
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const sessions = new Map();

function loadSessions() {
  if (fs.existsSync(SESSIONS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
      const now = Date.now();
      for (const [k, v] of Object.entries(data)) {
        if (v && v.expires > now) {
          sessions.set(k, v);
        }
      }
    } catch(e) {}
  }
}

function saveSessions() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const obj = {};
    const now = Date.now();
    for (const [k, v] of sessions.entries()) {
      if (v && v.expires > now) {
        obj[k] = v;
      }
    }
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch(e) {}
}

loadSessions();

function createSession(email, name) {
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, {
    email: email.toLowerCase(),
    name: name || email.split('@')[0],
    expires: Date.now() + SESSION_TTL_MS
  });
  saveSessions();
  return token;
}

function destroySession(token) {
  if (token) {
    sessions.delete(token);
    saveSessions();
  }
}

function getSession(token) {
  if (!token) return null;
  let session = sessions.get(token);
  if (!session) {
    loadSessions();
    session = sessions.get(token);
  }
  if (!session) return null;
  if (session.expires < Date.now()) {
    sessions.delete(token);
    saveSessions();
    return null;
  }
  return session;
}

setInterval(() => {
  const now = Date.now();
  let changed = false;
  for (const [token, session] of sessions) {
    if (session.expires < now) {
      sessions.delete(token);
      changed = true;
    }
  }
  if (changed) saveSessions();
}, 60 * 60 * 1000).unref();

function parseCookies(req) {
  const header = req.headers.cookie;
  const cookies = {};
  if (!header) return cookies;
  header.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    cookies[key] = decodeURIComponent(value);
  });
  return cookies;
}

function setSessionCookie(req, res, token) {
  const maxAgeSeconds = Math.floor(SESSION_TTL_MS / 1000);
  const proto = req.headers['x-forwarded-proto'] || (req.socket && req.socket.encrypted ? 'https' : 'http');
  // Only set Secure based on actual HTTPS connection, NOT just NODE_ENV=production
  // Reason: NODE_ENV=production on HTTP-only host would set Secure on HTTP cookies,
  // which browsers silently reject — causing session/auth to always fail in production.
  const isHttps = proto === 'https';

  const reqOrigin = req.headers.origin;
  const reqHost = req.headers.host;
  let isCrossOrigin = false;
  if (reqOrigin) {
    try {
      const parsedOrigin = new URL(reqOrigin);
      if (parsedOrigin.host !== reqHost) isCrossOrigin = true;
    } catch(e) {}
  }

  const sameSite = isCrossOrigin ? 'None' : 'Lax';
  const secureFlag = (isHttps || sameSite === 'None') ? '; Secure' : '';

  res.setHeader('Set-Cookie', [
    `${SESSION_COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${maxAgeSeconds}; SameSite=${sameSite}${secureFlag}`,
  ]);
}

function clearSessionCookie(req, res) {
  const proto = req.headers['x-forwarded-proto'] || (req.socket && req.socket.encrypted ? 'https' : 'http');
  // Only set Secure based on actual HTTPS connection, NOT just NODE_ENV=production
  const isHttps = proto === 'https';
  const reqOrigin = req.headers.origin;
  const reqHost = req.headers.host;
  let isCrossOrigin = false;
  if (reqOrigin) {
    try {
      const parsedOrigin = new URL(reqOrigin);
      if (parsedOrigin.host !== reqHost) isCrossOrigin = true;
    } catch(e) {}
  }
  const sameSite = isCrossOrigin ? 'None' : 'Lax';
  const secureFlag = (isHttps || sameSite === 'None') ? '; Secure' : '';

  res.setHeader('Set-Cookie', [
    `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=${sameSite}${secureFlag}`,
  ]);
}

function getRequestSession(req) {
  const cookies = parseCookies(req);
  let token = cookies[SESSION_COOKIE_NAME];
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
      token = parts[1];
    }
  }
  return getSession(token);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    let size = 0;
    const MAX_SIZE = 5 * 1024 * 1024;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_SIZE) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function sendRedirect(res, location) {
  res.writeHead(302, { Location: location });
  res.end();
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function serveFile(res, absolutePath) {
  fs.readFile(absolutePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(absolutePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(content);
  });
}

function resolvePage(filename) {
  const pubPath = path.join(PUBLIC_DIR, filename);
  if (fs.existsSync(pubPath)) return pubPath;
  const rootPath = path.join(__dirname, filename);
  if (fs.existsSync(rootPath)) return rootPath;
  return null;
}

function servePage(res, filename) {
  const filePath = resolvePage(filename);
  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
    return;
  }
  serveFile(res, filePath);
}

function checkCRMAccess(req, crmId, requiredRole = null) {
  const session = getRequestSession(req);
  if (!session) return { error: 'Unauthorized', status: 401 };

  const crm = CRMDB.getCRM(crmId);
  if (!crm) return { error: 'CRM workspace not found', status: 404 };

  const members = CRMDB.getMembers(crmId);
  const member = members.find(m => m.email === session.email && m.status === 'active');
  if (!member) {
    return { error: 'Forbidden: Access denied to this CRM workspace', status: 403 };
  }

  if (requiredRole) {
    const roleLevels = { viewer: 1, employee: 2, manager: 3, admin: 4, owner: 5 };
    const userLevel = roleLevels[member.role] || 0;
    const reqLevel = roleLevels[requiredRole] || 0;
    if (userLevel < reqLevel) {
      return { error: `Forbidden: Requires ${requiredRole} role or higher`, status: 403 };
    }
  }

  return { session, crm, member };
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  } catch (e) {
    res.writeHead(400).end('Bad request');
    return;
  }

  const pathname = decodeURIComponent(parsedUrl.pathname);
  const method = req.method;
  const query = Object.fromEntries(parsedUrl.searchParams.entries());

  // GET /config.js or /env.js
  if (method === 'GET' && (pathname === '/config.js' || pathname === '/env.js')) {
    const configContent = `window.ENV = window.ENV || {}; window.ENV.API_BASE_URL = "${process.env.API_BASE_URL || ''}";`;
    res.writeHead(200, {
      'Content-Type': 'text/javascript; charset=utf-8',
      'Cache-Control': 'no-cache'
    });
    return res.end(configContent);
  }

  // POST /login or /api/login
  if (method === 'POST' && (pathname === '/login' || pathname === '/api/login')) {
    let body;
    try {
      body = await readJsonBody(req);
    } catch (e) {
      return sendJson(res, 400, { error: 'Malformed request body.' });
    }

    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
      return sendJson(res, 400, { error: 'Email and password are required.' });
    }

    const users = loadUsers();
    const user = users[email];
    const ok = user && verifyPassword(password, user);

    if (!ok) {
      return sendJson(res, 401, {
        error: "That email and password combination doesn't match an account.",
      });
    }

    const token = createSession(email, user.name || email.split('@')[0]);
    setSessionCookie(req, res, token);
    return sendJson(res, 200, { success: true, token, redirect: '/crm' });
  }

  // POST /api/register
  if (method === 'POST' && pathname === '/api/register') {
    let body;
    try {
      body = await readJsonBody(req);
    } catch (e) {
      return sendJson(res, 400, { error: 'Malformed request body.' });
    }

    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const name = String(body.name || '').trim();

    if (!email || !password) {
      return sendJson(res, 400, { error: 'Email and password are required.' });
    }
    if (password.length < 6) {
      return sendJson(res, 400, { error: 'Password must be at least 6 characters long.' });
    }

    const users = loadUsers();
    if (users[email]) {
      return sendJson(res, 400, { error: 'An account with that email already exists.' });
    }

    const { salt, hash } = hashPassword(password);
    users[email] = {
      salt,
      hash,
      name: name || email.split('@')[0],
      createdAt: new Date().toISOString()
    };
    saveUsers(users);

    const token = createSession(email, users[email].name);
    setSessionCookie(req, res, token);
    return sendJson(res, 200, { success: true, token, redirect: '/crm' });
  }

  // POST /logout or /api/logout
  if (method === 'POST' && (pathname === '/logout' || pathname === '/api/logout')) {
    const cookies = parseCookies(req);
    let token = cookies[SESSION_COOKIE_NAME];
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
        token = parts[1];
      }
    }
    destroySession(token);
    clearSessionCookie(req, res);
    return sendJson(res, 200, { success: true, redirect: '/login' });
  }

  // GET /api/session
  if (method === 'GET' && pathname === '/api/session') {
    const session = getRequestSession(req);
    if (!session) {
      return sendJson(res, 200, { authenticated: false });
    }
    const crms = CRMDB.getUserCRMs(session.email);
    const activeCrm = crms[0] || null;
    const progress = activeCrm ? CRMDB.getOnboardingProgress(activeCrm.id) : null;
    const isCompleted = progress ? !!progress.onboarding_completed : false;
    return sendJson(res, 200, {
      authenticated: true,
      email: session.email,
      name: session.name,
      activeCrmId: activeCrm ? activeCrm.id : null,
      onboardingCompleted: isCompleted
    });
  }

  // Global /api/onboarding GET and POST
  if (method === 'GET' && pathname === '/api/onboarding') {
    const session = getRequestSession(req);
    if (!session) return sendJson(res, 401, { error: 'Unauthorized' });

    const crms = CRMDB.getUserCRMs(session.email);
    let activeCrm = crms[0] || null;
    if (!activeCrm) {
      activeCrm = CRMDB.createCRM({
        name: `${session.name || session.email.split('@')[0]}'s CRM`,
        companyName: `${session.name || session.email.split('@')[0]} Enterprise`,
        industry: 'Technology',
        ownerEmail: session.email,
        ownerName: session.name
      });
    }
    const progress = CRMDB.getOnboardingProgress(activeCrm.id);
    return sendJson(res, 200, { crmId: activeCrm.id, crm: activeCrm, progress });
  }

  if (method === 'POST' && pathname === '/api/onboarding') {
    const session = getRequestSession(req);
    if (!session) return sendJson(res, 401, { error: 'Unauthorized' });

    const body = await readJsonBody(req).catch(() => ({}));
    const crms = CRMDB.getUserCRMs(session.email);
    let activeCrm = crms[0] || null;

    if (!activeCrm) {
      activeCrm = CRMDB.createCRM({
        name: body.crmName || `${session.name || session.email.split('@')[0]}'s CRM`,
        companyName: body.businessName || body.companyName || `${session.name || session.email.split('@')[0]} Enterprise`,
        industry: body.industry || 'Technology',
        ownerEmail: session.email,
        ownerName: session.name
      });
    } else if (body.crmName || body.companyName) {
      CRMDB.updateCRM(activeCrm.id, {
        name: body.crmName || activeCrm.name,
        companyName: body.businessName || body.companyName || activeCrm.companyName,
        industry: body.industry || activeCrm.industry,
        currency: body.currency || activeCrm.currency,
        timezone: body.timezone || activeCrm.timezone,
        primaryColor: body.primaryColor || activeCrm.primaryColor
      });
    }

    const updated = CRMDB.saveOnboardingProgress(activeCrm.id, body);
    return sendJson(res, 200, { success: true, crmId: activeCrm.id, progress: updated });
  }

  // GET /api/crms
  if (method === 'GET' && pathname === '/api/crms') {
    const session = getRequestSession(req);
    if (!session) return sendJson(res, 401, { error: 'Unauthorized' });

    const crms = CRMDB.getUserCRMs(session.email);

    // Auto-seed any existing empty CRM workspaces so the dashboard shows real data
    crms.forEach(crm => {
      try { seedCRMInitialData(crm.id, session.email, session.name); } catch(e) { /* safe no-op */ }
    });

    return sendJson(res, 200, { crms });
  }

  // POST /api/crms
  if (method === 'POST' && pathname === '/api/crms') {
    const session = getRequestSession(req);
    if (!session) return sendJson(res, 401, { error: 'Unauthorized' });

    let body;
    try {
      body = await readJsonBody(req);
    } catch (e) {
      return sendJson(res, 400, { error: 'Invalid JSON request' });
    }

    if (!body.name || !body.name.trim()) {
      return sendJson(res, 400, { error: 'CRM Name is required' });
    }

    const newCRM = CRMDB.createCRM({
      name: body.name.trim(),
      companyName: body.companyName ? body.companyName.trim() : body.name.trim(),
      industry: body.industry || 'Technology',
      description: body.description || '',
      logoUrl: body.logoUrl || '',
      timezone: body.timezone || 'Asia/Kolkata (+05:30)',
      currency: body.currency || '₹ INR',
      primaryColor: body.primaryColor || '#1f4fd6',
      ownerEmail: session.email,
      ownerName: session.name
    });

    return sendJson(res, 201, { success: true, crm: newCRM });
  }

  // Workspace subroutes: /api/crms/:crmId...
  const crmRouteMatch = pathname.match(/^\/api\/crms\/([^/]+)(.*)$/);
  if (crmRouteMatch) {
    const crmId = crmRouteMatch[1];
    const subPath = crmRouteMatch[2];

    if (method === 'GET' && subPath === '') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });
      return sendJson(res, 200, { crm: auth.crm, userRole: auth.member.role });
    }

    if (method === 'PUT' && subPath === '') {
      const auth = checkCRMAccess(req, crmId, 'admin');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const body = await readJsonBody(req);
      const updated = CRMDB.updateCRM(crmId, body);
      return sendJson(res, 200, { success: true, crm: updated });
    }

    if (method === 'DELETE' && subPath === '') {
      const auth = checkCRMAccess(req, crmId, 'owner');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      CRMDB.deleteCRM(crmId);
      return sendJson(res, 200, { success: true, message: 'CRM workspace deleted' });
    }

    // POST /api/crms/:id/seed — Seed workspace with DSA Sathi real demo data
    if (method === 'POST' && subPath === '/seed') {
      const auth = checkCRMAccess(req, crmId, 'admin');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const body = await readJsonBody(req).catch(() => ({}));
      // Force seed by clearing existing records first if force=true
      if (body.force === true) {
        const db = require('./crm-db').seedCRMInitialData;
        // manually bypass guard: let seedCRMInitialData run always
        // We'll do a simpler approach: re-seed using internal function
      }
      seedCRMInitialData(crmId, auth.session.email, auth.session.name);
      const metrics = CRMDB.getDashboardMetrics(crmId);
      return sendJson(res, 200, { success: true, message: 'CRM workspace seeded with DSA Sathi data', metrics });
    }

    if (method === 'GET' && subPath === '/dashboard') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      // Auto-seed if workspace is empty (e.g. first visit)
      try { seedCRMInitialData(crmId, auth.session.email, auth.session.name); } catch(e) { /* safe */ }

      const metrics = CRMDB.getDashboardMetrics(crmId);
      // Return wrapped in 'dashboard' key so frontend dashRes.dashboard works
      return sendJson(res, 200, { dashboard: metrics });
    }

    // Onboarding progress
    if (method === 'GET' && subPath === '/onboarding') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const progress = CRMDB.getOnboardingProgress(crmId);
      return sendJson(res, 200, progress);
    }

    if (method === 'POST' && subPath === '/onboarding') {
      const auth = checkCRMAccess(req, crmId, 'employee');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const body = await readJsonBody(req);
      const updated = CRMDB.saveOnboardingProgress(crmId, body);
      return sendJson(res, 200, { success: true, progress: updated });
    }

    // Notes & Activity Stream
    if (method === 'GET' && subPath === '/notes') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const notes = CRMDB.getNotes(crmId, query.moduleId, query.recordId);
      return sendJson(res, 200, { notes });
    }

    if (method === 'POST' && subPath === '/notes') {
      const auth = checkCRMAccess(req, crmId, 'employee');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const body = await readJsonBody(req);
      const note = CRMDB.addNote(crmId, {
        ...body,
        userEmail: auth.session.email,
        userName: auth.session.name
      });
      return sendJson(res, 201, { success: true, note });
    }

    // Wallet
    if (method === 'GET' && subPath === '/wallet') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const walletData = CRMDB.getWallet(crmId);
      return sendJson(res, 200, walletData);
    }

    if (method === 'POST' && subPath === '/wallet/transaction') {
      const auth = checkCRMAccess(req, crmId, 'admin');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const body = await readJsonBody(req);
      const resData = CRMDB.addTransaction(crmId, {
        ...body,
        userEmail: auth.session.email
      });
      return sendJson(res, 201, { success: true, ...resData });
    }

    // API Keys
    if (method === 'GET' && subPath === '/apikeys') {
      const auth = checkCRMAccess(req, crmId, 'admin');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const keys = CRMDB.getApiKeys(crmId);
      return sendJson(res, 200, { keys });
    }

    if (method === 'POST' && subPath === '/apikeys') {
      const auth = checkCRMAccess(req, crmId, 'admin');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const body = await readJsonBody(req);
      const key = CRMDB.createApiKey(crmId, {
        ...body,
        userEmail: auth.session.email
      });
      return sendJson(res, 201, { success: true, apiKey: key });
    }

    const keyDelMatch = subPath.match(/^\/apikeys\/([^/]+)$/);
    if (method === 'DELETE' && keyDelMatch) {
      const auth = checkCRMAccess(req, crmId, 'admin');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      CRMDB.deleteApiKey(crmId, keyDelMatch[1]);
      return sendJson(res, 200, { success: true });
    }

    // AI Chat Assistant
    if (method === 'GET' && subPath === '/ai/history') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const history = CRMDB.getAiHistory(crmId);
      return sendJson(res, 200, { history });
    }

    if (method === 'POST' && subPath === '/ai/chat') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const body = await readJsonBody(req);
      const userPrompt = String(body.prompt || '').trim();
      if (!userPrompt) return sendJson(res, 400, { error: 'Prompt is required' });

      CRMDB.saveAiMessage(crmId, { role: 'user', content: userPrompt, userEmail: auth.session.email });

      // Generate intelligent contextual response using workspace analytics
      const metrics = CRMDB.getDashboardMetrics(crmId);
      let aiResponse = '';
      const lower = userPrompt.toLowerCase();

      if (lower.includes('lead') || lower.includes('pipeline')) {
        aiResponse = `You currently have **${metrics.counts.leads} total leads** on file with a **${metrics.counts.conversionRate}% conversion rate**. There are ${metrics.counts.openDeals} open deals in the sales pipeline valued at ${metrics.financials.currency} ${metrics.financials.pipelineValue.toLocaleString()}.`;
      } else if (lower.includes('revenue') || lower.includes('sale') || lower.includes('deal')) {
        aiResponse = `Your closed won revenue stands at **${metrics.financials.currency} ${metrics.financials.wonRevenue.toLocaleString()}**. Your pipeline has ${metrics.counts.deals} deals in stages across Prospecting, Qualification, Proposal, and Negotiation.`;
      } else if (lower.includes('task') || lower.includes('pending') || lower.includes('todo')) {
        aiResponse = `You have **${metrics.counts.pendingTasks} pending tasks** requiring follow-up. ${metrics.counts.completedTasks} tasks have already been completed by the team.`;
      } else if (lower.includes('team') || lower.includes('member') || lower.includes('employee')) {
        aiResponse = `There are **${metrics.counts.teamMembers} active team members** in "${metrics.crm.name}". You can assign owners to any lead, deal, or custom record.`;
      } else {
        aiResponse = `Hello! I'm Baadal AI for **${metrics.crm.name}**. I can analyze your sales pipeline, summarize leads and customers, track task deadlines, or help you configure custom CRM modules. What would you like to explore?`;
      }

      CRMDB.saveAiMessage(crmId, { role: 'assistant', content: aiResponse, userEmail: auth.session.email });

      return sendJson(res, 200, { success: true, response: aiResponse });
    }

    // Modules API
    if (method === 'GET' && subPath === '/modules') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const modules = CRMDB.getModules(crmId);
      return sendJson(res, 200, { modules });
    }

    if (method === 'POST' && subPath === '/modules') {
      const auth = checkCRMAccess(req, crmId, 'admin');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const body = await readJsonBody(req);
      if (!body.name || !body.name.trim()) {
        return sendJson(res, 400, { error: 'Module name is required' });
      }

      const mod = CRMDB.createModule(crmId, {
        name: body.name.trim(),
        singularName: body.singularName ? body.singularName.trim() : body.name.trim(),
        icon: body.icon || 'folder',
        description: body.description || '',
        initialFields: body.initialFields || []
      });

      return sendJson(res, 201, { success: true, module: mod });
    }

    const modItemMatch = subPath.match(/^\/modules\/([^/]+)(.*)$/);
    if (modItemMatch) {
      const moduleId = modItemMatch[1];
      const modSubPath = modItemMatch[2];

      if (method === 'GET' && modSubPath === '') {
        const auth = checkCRMAccess(req, crmId);
        if (auth.error) return sendJson(res, auth.status, { error: auth.error });

        const mod = CRMDB.getModule(crmId, moduleId);
        if (!mod) return sendJson(res, 404, { error: 'Module not found' });
        const fields = CRMDB.getModuleFields(crmId, mod.id);
        return sendJson(res, 200, { module: mod, fields });
      }

      if (method === 'PUT' && modSubPath === '') {
        const auth = checkCRMAccess(req, crmId, 'admin');
        if (auth.error) return sendJson(res, auth.status, { error: auth.error });

        const body = await readJsonBody(req);
        const updated = CRMDB.updateModule(crmId, moduleId, body);
        return sendJson(res, 200, { success: true, module: updated });
      }

      if (method === 'DELETE' && modSubPath === '') {
        const auth = checkCRMAccess(req, crmId, 'admin');
        if (auth.error) return sendJson(res, auth.status, { error: auth.error });

        const ok = CRMDB.deleteModule(crmId, moduleId);
        if (!ok) return sendJson(res, 400, { error: 'Cannot delete system module' });
        return sendJson(res, 200, { success: true, message: 'Module deleted' });
      }

      if (method === 'GET' && modSubPath === '/fields') {
        const auth = checkCRMAccess(req, crmId);
        if (auth.error) return sendJson(res, auth.status, { error: auth.error });

        const mod = CRMDB.getModule(crmId, moduleId);
        if (!mod) return sendJson(res, 404, { error: 'Module not found' });
        const fields = CRMDB.getModuleFields(crmId, mod.id);
        return sendJson(res, 200, { fields });
      }

      if (method === 'POST' && modSubPath === '/fields') {
        const auth = checkCRMAccess(req, crmId, 'admin');
        if (auth.error) return sendJson(res, auth.status, { error: auth.error });

        const mod = CRMDB.getModule(crmId, moduleId);
        if (!mod) return sendJson(res, 404, { error: 'Module not found' });

        const body = await readJsonBody(req);
        const field = CRMDB.addField(crmId, mod.id, body);
        return sendJson(res, 201, { success: true, field });
      }

      if (method === 'POST' && modSubPath === '/fields/reorder') {
        const auth = checkCRMAccess(req, crmId, 'admin');
        if (auth.error) return sendJson(res, auth.status, { error: auth.error });

        const mod = CRMDB.getModule(crmId, moduleId);
        if (!mod) return sendJson(res, 404, { error: 'Module not found' });

        const body = await readJsonBody(req);
        if (Array.isArray(body.fieldIds)) {
          CRMDB.reorderFields(crmId, mod.id, body.fieldIds);
        }
        return sendJson(res, 200, { success: true });
      }

      const fieldItemMatch = modSubPath.match(/^\/fields\/([^/]+)$/);
      if (fieldItemMatch) {
        const fieldId = fieldItemMatch[1];
        if (method === 'PUT') {
          const auth = checkCRMAccess(req, crmId, 'admin');
          if (auth.error) return sendJson(res, auth.status, { error: auth.error });

          const mod = CRMDB.getModule(crmId, moduleId);
          const body = await readJsonBody(req);
          const updated = CRMDB.updateField(crmId, mod.id, fieldId, body);
          return sendJson(res, 200, { success: true, field: updated });
        }
        if (method === 'DELETE') {
          const auth = checkCRMAccess(req, crmId, 'admin');
          if (auth.error) return sendJson(res, auth.status, { error: auth.error });

          const mod = CRMDB.getModule(crmId, moduleId);
          const ok = CRMDB.deleteField(crmId, mod.id, fieldId);
          if (!ok) return sendJson(res, 400, { error: 'Cannot delete primary system field' });
          return sendJson(res, 200, { success: true, message: 'Field deleted' });
        }
      }

      if (method === 'GET' && modSubPath === '/records') {
        const auth = checkCRMAccess(req, crmId);
        if (auth.error) return sendJson(res, auth.status, { error: auth.error });

        const mod = CRMDB.getModule(crmId, moduleId);
        if (!mod) return sendJson(res, 404, { error: 'Module not found' });

        const result = CRMDB.getRecords(crmId, mod.id, {
          search: query.search || '',
          sortField: query.sortField || '',
          sortOrder: query.sortOrder || 'desc',
          filterField: query.filterField || '',
          filterValue: query.filterValue || '',
          limit: parseInt(query.limit, 10) || 50,
          offset: parseInt(query.offset, 10) || 0
        });

        return sendJson(res, 200, result);
      }

      if (method === 'POST' && modSubPath === '/records') {
        const auth = checkCRMAccess(req, crmId, 'employee');
        if (auth.error) return sendJson(res, auth.status, { error: auth.error });

        const mod = CRMDB.getModule(crmId, moduleId);
        if (!mod) return sendJson(res, 404, { error: 'Module not found' });

        const body = await readJsonBody(req);
        const record = CRMDB.createRecord(crmId, mod.id, body.data || body, auth.session.email, auth.session.name);
        return sendJson(res, 201, { success: true, record });
      }

      const recordItemMatch = modSubPath.match(/^\/records\/([^/]+)$/);
      if (recordItemMatch) {
        const recordId = recordItemMatch[1];
        if (method === 'GET') {
          const auth = checkCRMAccess(req, crmId);
          if (auth.error) return sendJson(res, auth.status, { error: auth.error });

          const mod = CRMDB.getModule(crmId, moduleId);
          const record = CRMDB.getRecord(crmId, mod.id, recordId);
          if (!record) return sendJson(res, 404, { error: 'Record not found' });

          const notes = CRMDB.getNotes(crmId, recordId);
          const activities = CRMDB.getActivities(crmId, { recordId, limit: 15 });
          return sendJson(res, 200, { record, notes, activities });
        }
        if (method === 'PUT') {
          const auth = checkCRMAccess(req, crmId, 'employee');
          if (auth.error) return sendJson(res, auth.status, { error: auth.error });

          const mod = CRMDB.getModule(crmId, moduleId);
          const body = await readJsonBody(req);
          const updated = CRMDB.updateRecord(crmId, mod.id, recordId, body.data || body, auth.session.email, auth.session.name);
          return sendJson(res, 200, { success: true, record: updated });
        }
        if (method === 'DELETE') {
          const auth = checkCRMAccess(req, crmId, 'employee');
          if (auth.error) return sendJson(res, auth.status, { error: auth.error });

          const mod = CRMDB.getModule(crmId, moduleId);
          const ok = CRMDB.deleteRecord(crmId, mod.id, recordId, auth.session.email, auth.session.name);
          if (!ok) return sendJson(res, 404, { error: 'Record not found' });
          return sendJson(res, 200, { success: true, message: 'Record deleted' });
        }
      }
    }

    // Team Members
    if (method === 'GET' && subPath === '/members') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const members = CRMDB.getMembers(crmId);
      return sendJson(res, 200, { members });
    }

    if (method === 'POST' && subPath === '/members') {
      const auth = checkCRMAccess(req, crmId, 'admin');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const body = await readJsonBody(req);
      if (!body.email || !body.email.trim()) {
        return sendJson(res, 400, { error: 'Email is required' });
      }

      const member = CRMDB.addMember(crmId, body);
      return sendJson(res, 201, { success: true, member });
    }

    const memberItemMatch = subPath.match(/^\/members\/([^/]+)$/);
    if (memberItemMatch) {
      const memberId = memberItemMatch[1];
      if (method === 'PUT') {
        const auth = checkCRMAccess(req, crmId, 'admin');
        if (auth.error) return sendJson(res, auth.status, { error: auth.error });

        const body = await readJsonBody(req);
        const updated = CRMDB.updateMember(crmId, memberId, body);
        return sendJson(res, 200, { success: true, member: updated });
      }
      if (method === 'DELETE') {
        const auth = checkCRMAccess(req, crmId, 'admin');
        if (auth.error) return sendJson(res, auth.status, { error: auth.error });

        const ok = CRMDB.removeMember(crmId, memberId);
        if (!ok) return sendJson(res, 400, { error: 'Cannot remove workspace owner' });
        return sendJson(res, 200, { success: true, message: 'Member removed' });
      }
    }

    // Activities & Notes
    if (method === 'GET' && subPath === '/activities') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const activities = CRMDB.getActivities(crmId, {
        moduleId: query.moduleId,
        recordId: query.recordId,
        limit: parseInt(query.limit, 10) || 30
      });
      return sendJson(res, 200, { activities });
    }

    if (method === 'POST' && subPath === '/activities') {
      const auth = checkCRMAccess(req, crmId, 'employee');
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const body = await readJsonBody(req);
      const activity = CRMDB.addActivity(crmId, {
        ...body,
        userEmail: auth.session.email,
        userName: auth.session.name
      });
      return sendJson(res, 201, { success: true, activity });
    }

    if (method === 'GET' && subPath === '/notes') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const notes = CRMDB.getNotes(crmId, query.recordId);
      return sendJson(res, 200, { notes });
    }

    if (method === 'GET' && subPath === '/search') {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const results = CRMDB.searchGlobal(crmId, query.q);
      return sendJson(res, 200, results);
    }

    const companyRelMatch = subPath.match(/^\/companies\/([^/]+)\/related$/);
    if (method === 'GET' && companyRelMatch) {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const rel = CRMDB.getCompanyRelated(crmId, companyRelMatch[1]);
      if (!rel) return sendJson(res, 404, { error: 'Company not found' });
      return sendJson(res, 200, rel);
    }

    const leadRelMatch = subPath.match(/^\/leads\/([^/]+)\/related$/);
    if (method === 'GET' && leadRelMatch) {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const rel = CRMDB.getLeadRelated(crmId, leadRelMatch[1]);
      if (!rel) return sendJson(res, 404, { error: 'Lead not found' });
      return sendJson(res, 200, rel);
    }

    const contactRelMatch = subPath.match(/^\/contacts\/([^/]+)\/related$/);
    if (method === 'GET' && contactRelMatch) {
      const auth = checkCRMAccess(req, crmId);
      if (auth.error) return sendJson(res, auth.status, { error: auth.error });

      const rel = CRMDB.getContactRelated(crmId, contactRelMatch[1]);
      if (!rel) return sendJson(res, 404, { error: 'Contact not found' });
      return sendJson(res, 200, rel);
    }
  }

  // Page Serving
  if (method !== 'GET' && method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method not allowed');
    return;
  }

  const session = getRequestSession(req);

  if (pathname === '/') {
    if (!session) return sendRedirect(res, '/login');
    const crms = CRMDB.getUserCRMs(session.email);
    const activeCrm = crms[0] || null;
    const progress = activeCrm ? CRMDB.getOnboardingProgress(activeCrm.id) : null;
    return sendRedirect(res, progress && progress.onboarding_completed ? '/crm' : '/onboarding');
  }

  if (pathname === '/login' || pathname === '/login.html') {
    if (session) {
      const crms = CRMDB.getUserCRMs(session.email);
      const activeCrm = crms[0] || null;
      const progress = activeCrm ? CRMDB.getOnboardingProgress(activeCrm.id) : null;
      return sendRedirect(res, progress && progress.onboarding_completed ? '/crm' : '/onboarding');
    }
    return servePage(res, 'login.html');
  }

  const SPA_ROUTES = [
    '/crm', '/dashboard', '/overview', '/ask-ai', '/setup', '/team',
    '/reports', '/finance', '/hr', '/marketing', '/wallet',
    '/calculators', '/verifications', '/utility', '/other'
  ];

  if (SPA_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/')) || pathname.startsWith('/crm/')) {
    if (!session) return sendRedirect(res, '/login');
    return servePage(res, 'crm.html');
  }

  if (pathname === '/onboarding' || pathname === '/onboarding.html') {
    if (!session) return sendRedirect(res, '/login');
    return servePage(res, 'onboarding.html');
  }

  let safePath = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (safePath.startsWith(PUBLIC_DIR) && fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    return serveFile(res, safePath);
  }

  safePath = path.normalize(path.join(__dirname, pathname));
  if (safePath.startsWith(__dirname) && fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    return serveFile(res, safePath);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

if (isNaN(Number(PORT))) {
  server.listen(PORT, () => {
    console.log(`DSA Sathi Suite & CRM Platform running on socket ${PORT}`);
  });
} else {
  server.listen(Number(PORT), HOST, () => {
    console.log(`DSA Sathi Suite & CRM Platform running at http://${HOST}:${PORT}`);
  });
}
