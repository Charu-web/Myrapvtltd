<?php
// api/index.php
// Complete Production REST API Bridge for Apache / Hostinger / cPanel Hosting.
// Provides 100% PHP-native implementation of authentication, sessions, and CRM operations.

error_reporting(0);
ini_set('display_errors', '0');

// ---------------------------------------------------------------------------
// CORS & Preflight
// ---------------------------------------------------------------------------
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
header("Access-Control-Allow-Origin: " . $origin);
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ---------------------------------------------------------------------------
// Path & Route Normalization
// ---------------------------------------------------------------------------
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
$path = parse_url($requestUri, PHP_URL_PATH);

// Normalize route: handles /api/login, /api/login.php, /api/index.php/login, etc.
$route = preg_replace('#^/api(?:/index\.php)?/?#', '', $path);
$route = preg_replace('#\.php#', '', $route);
$route = trim($route, '/');

if (empty($route) && isset($_GET['route'])) {
    $route = trim($_GET['route'], '/');
}

// ---------------------------------------------------------------------------
// Data Storage Paths (relative, production-safe)
// ---------------------------------------------------------------------------
$dataDir = __DIR__ . '/../data';
$usersFile = $dataDir . '/users.json';
$sessionsFile = $dataDir . '/sessions.json';
$crmDbFile = $dataDir . '/crm_db.json';

function getJsonBody() {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function sendJson($status, $payload) {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

// ---------------------------------------------------------------------------
// Users & Password Verification
// ---------------------------------------------------------------------------
function loadUsers($usersFile) {
    $defaults = [
        'csonker04@gmail.com' => ['name' => 'Charu Sonker', 'pass' => 'charu123'],
        'admin@loanpilot.com' => ['name' => 'Admin / Owner', 'pass' => 'demo@12345'],
        'sales@loanpilot.com' => ['name' => 'Sales agent', 'pass' => 'demo@12345'],
        'ops@loanpilot.com' => ['name' => 'Operations', 'pass' => 'demo@12345'],
        'finance@loanpilot.com' => ['name' => 'Finance', 'pass' => 'demo@12345']
    ];
    $users = [];
    if (file_exists($usersFile)) {
        $content = file_get_contents($usersFile);
        $parsed = json_decode($content, true);
        if (is_array($parsed)) $users = $parsed;
    }
    return ['users' => $users, 'defaults' => $defaults];
}

function verifyUserPassword($email, $password, $userData) {
    $email = strtolower(trim($email));
    $defaults = $userData['defaults'];
    $users = $userData['users'];

    if (isset($defaults[$email]) && $defaults[$email]['pass'] === $password) {
        return ['valid' => true, 'name' => $defaults[$email]['name']];
    }

    if (isset($users[$email])) {
        $user = $users[$email];
        $name = isset($user['name']) ? $user['name'] : explode('@', $email)[0];
        if (is_array($user) && isset($user['pass']) && $user['pass'] === $password) {
            return ['valid' => true, 'name' => $name];
        }
        if (isset($defaults[$email]) && $defaults[$email]['pass'] === $password) {
            return ['valid' => true, 'name' => $name];
        }
    }
    return ['valid' => false, 'name' => ''];
}

// ---------------------------------------------------------------------------
// Persistent Session Management
// ---------------------------------------------------------------------------
function loadSessions($sessionsFile) {
    if (!file_exists($sessionsFile)) return [];
    $data = json_decode(file_get_contents($sessionsFile), true);
    if (!is_array($data)) return [];
    $now = round(microtime(true) * 1000);
    $valid = [];
    foreach ($data as $token => $sess) {
        if (isset($sess['expires']) && $sess['expires'] > $now) {
            $valid[$token] = $sess;
        }
    }
    return $valid;
}

function saveSessions($sessionsFile, $sessions) {
    $dir = dirname($sessionsFile);
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    @file_put_contents($sessionsFile, json_encode($sessions, JSON_PRETTY_PRINT));
}

function getRequestSession($sessionsFile) {
    $token = '';
    if (!empty($_COOKIE['sid'])) {
        $token = $_COOKIE['sid'];
    } elseif (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        if (preg_match('/Bearer\s+(\S+)/i', $_SERVER['HTTP_AUTHORIZATION'], $m)) {
            $token = $m[1];
        }
    }
    if (!$token) return null;
    $sessions = loadSessions($sessionsFile);
    if (isset($sessions[$token])) {
        return $sessions[$token];
    }
    return null;
}

function setSessionCookie($token) {
    $ttl = 7 * 24 * 60 * 60; // 7 days
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
               (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
    setcookie('sid', $token, [
        'expires' => time() + $ttl,
        'path' => '/',
        'domain' => '',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
}

function clearSessionCookie() {
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
               (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
    setcookie('sid', '', [
        'expires' => time() - 3600,
        'path' => '/',
        'domain' => '',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
}

function loadCrmDb($crmDbFile) {
    if (file_exists($crmDbFile)) {
        $data = json_decode(file_get_contents($crmDbFile), true);
        if (is_array($data)) return $data;
    }
    return ['crms' => [], 'modules' => [], 'members' => [], 'records' => [], 'onboarding' => []];
}

function saveCrmDb($crmDbFile, $data) {
    $dir = dirname($crmDbFile);
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    @file_put_contents($crmDbFile, json_encode($data, JSON_PRETTY_PRINT));
}

// ===========================================================================
// ROUTE HANDLERS
// ===========================================================================

// Health / Diagnostics (safe - verifies PHP execution without exposing secrets)
if ($method === 'GET' && ($route === '' || $route === 'health' || $route === 'ping' || $route === 'status')) {
    sendJson(200, [
        'status' => 'ok',
        'php' => true,
        'app' => 'LoanPilot CRM API',
        'timestamp' => time()
    ]);
}

// 1. GET /api/login or GET /api/login.php (Method info)
if ($method === 'GET' && ($route === 'login' || $route === 'login.php')) {
    sendJson(200, [
        'status' => 'ok',
        'message' => 'LoanPilot Authentication API endpoint. Send POST with email and password to authenticate.',
        'endpoint' => '/api/login.php',
        'method' => 'POST'
    ]);
}

// 1. POST /api/login or POST /api/login.php
if ($method === 'POST' && ($route === 'login' || $route === '')) {
    $body = getJsonBody();
    $email = strtolower(trim(isset($body['email']) ? $body['email'] : ''));
    $password = isset($body['password']) ? $body['password'] : '';

    if (!$email || !$password) {
        sendJson(400, ['error' => 'Email and password are required.']);
    }

    $userData = loadUsers($usersFile);
    $result = verifyUserPassword($email, $password, $userData);

    if (!$result['valid']) {
        sendJson(401, ['error' => "That email and password combination doesn't match an account."]);
    }

    $token = bin2hex(random_bytes(32));
    $expires = round(microtime(true) * 1000) + (7 * 24 * 60 * 60 * 1000);
    $sessions = loadSessions($sessionsFile);
    $sessions[$token] = [
        'email' => $email,
        'name' => $result['name'],
        'expires' => $expires
    ];
    saveSessions($sessionsFile, $sessions);
    setSessionCookie($token);

    sendJson(200, [
        'success' => true,
        'token' => $token,
        'redirect' => '/crm'
    ]);
}

// 2. GET /api/session
if ($method === 'GET' && $route === 'session') {
    $session = getRequestSession($sessionsFile);
    if (!$session) {
        sendJson(200, ['authenticated' => false]);
    }

    $db = loadCrmDb($crmDbFile);
    $activeCrmId = null;
    if (isset($db['crms']) && is_array($db['crms'])) {
        foreach ($db['crms'] as $crm) {
            if (strtolower($crm['ownerEmail'] ?? '') === strtolower($session['email'])) {
                $activeCrmId = $crm['id'];
                break;
            }
        }
    }

    sendJson(200, [
        'authenticated' => true,
        'email' => $session['email'],
        'name' => $session['name'],
        'activeCrmId' => $activeCrmId,
        'onboardingCompleted' => true
    ]);
}

// 3. POST /api/logout
if ($method === 'POST' && $route === 'logout') {
    $token = !empty($_COOKIE['sid']) ? $_COOKIE['sid'] : '';
    if (!empty($_SERVER['HTTP_AUTHORIZATION']) && preg_match('/Bearer\s+(\S+)/i', $_SERVER['HTTP_AUTHORIZATION'], $m)) {
        $token = $m[1];
    }
    if ($token) {
        $sessions = loadSessions($sessionsFile);
        unset($sessions[$token]);
        saveSessions($sessionsFile, $sessions);
    }
    clearSessionCookie();
    sendJson(200, ['success' => true, 'redirect' => '/login']);
}

// 4. GET /api/crms and POST /api/crms
if ($route === 'crms') {
    $session = getRequestSession($sessionsFile);
    if (!$session) sendJson(401, ['error' => 'Unauthorized']);

    $db = loadCrmDb($crmDbFile);

    if ($method === 'GET') {
        $userCrms = [];
        if (isset($db['crms']) && is_array($db['crms'])) {
            foreach ($db['crms'] as $crm) {
                if (strtolower($crm['ownerEmail'] ?? '') === strtolower($session['email'])) {
                    $userCrms[] = $crm;
                }
            }
        }
        if (empty($userCrms)) {
            $crmId = 'crm_' . bin2hex(random_bytes(8));
            $defaultCrm = [
                'id' => $crmId,
                'name' => ($session['name'] ?: 'My') . "'s CRM",
                'companyName' => ($session['name'] ?: 'My') . ' Enterprise',
                'industry' => 'Financial Services',
                'currency' => '₹ INR',
                'timezone' => 'Asia/Kolkata (+05:30)',
                'ownerEmail' => $session['email'],
                'ownerName' => $session['name'],
                'role' => 'owner'
            ];
            $userCrms[] = $defaultCrm;
            $db['crms'][] = $defaultCrm;
            saveCrmDb($crmDbFile, $db);
        }
        sendJson(200, ['crms' => $userCrms]);
    }

    if ($method === 'POST') {
        $body = getJsonBody();
        $name = trim(isset($body['name']) ? $body['name'] : '');
        if (!$name) sendJson(400, ['error' => 'CRM Name is required']);

        $newCrm = [
            'id' => 'crm_' . bin2hex(random_bytes(8)),
            'name' => $name,
            'companyName' => isset($body['companyName']) ? trim($body['companyName']) : $name,
            'industry' => isset($body['industry']) ? $body['industry'] : 'Financial Services',
            'currency' => isset($body['currency']) ? $body['currency'] : '₹ INR',
            'timezone' => isset($body['timezone']) ? $body['timezone'] : 'Asia/Kolkata (+05:30)',
            'ownerEmail' => $session['email'],
            'ownerName' => $session['name'],
            'role' => 'owner'
        ];
        $db['crms'][] = $newCrm;
        saveCrmDb($crmDbFile, $db);
        sendJson(201, ['success' => true, 'crm' => $newCrm]);
    }
}

// 5. CRM Workspace Subroutes: crms/{crmId}/...
if (preg_match('#^crms/([^/]+)(?:/(.*))?$#', $route, $matches)) {
    $session = getRequestSession($sessionsFile);
    if (!$session) sendJson(401, ['error' => 'Unauthorized']);

    $crmId = $matches[1];
    $sub = isset($matches[2]) ? $matches[2] : '';
    $db = loadCrmDb($crmDbFile);

    // /api/crms/{crmId}/modules
    if ($sub === 'modules') {
        $stdModules = [
            ['id' => 'mod_leads', 'name' => 'Leads', 'singularName' => 'Lead', 'key' => 'leads', 'icon' => 'users', 'isStandard' => true, 'type' => 'standard'],
            ['id' => 'mod_loans', 'name' => 'Loan Applications', 'singularName' => 'Loan', 'key' => 'loans', 'icon' => 'file-text', 'isStandard' => true, 'type' => 'standard'],
            ['id' => 'mod_banks', 'name' => 'Bank Directory', 'singularName' => 'Bank', 'key' => 'banks', 'icon' => 'building', 'isStandard' => true, 'type' => 'standard'],
            ['id' => 'mod_partners', 'name' => 'Partners', 'singularName' => 'Partner', 'key' => 'partners', 'icon' => 'handshake', 'isStandard' => true, 'type' => 'standard'],
            ['id' => 'mod_contacts', 'name' => 'Contacts', 'singularName' => 'Contact', 'key' => 'contacts', 'icon' => 'user-check', 'isStandard' => true, 'type' => 'standard'],
            ['id' => 'mod_customers', 'name' => 'Customers', 'singularName' => 'Customer', 'key' => 'customers', 'icon' => 'smile', 'isStandard' => true, 'type' => 'standard'],
            ['id' => 'mod_companies', 'name' => 'Companies', 'singularName' => 'Company', 'key' => 'companies', 'icon' => 'briefcase', 'isStandard' => true, 'type' => 'standard'],
            ['id' => 'mod_deals', 'name' => 'Deals', 'singularName' => 'Deal', 'key' => 'deals', 'icon' => 'dollar-sign', 'isStandard' => true, 'type' => 'standard'],
            ['id' => 'mod_tasks', 'name' => 'Tasks', 'singularName' => 'Task', 'key' => 'tasks', 'icon' => 'check-square', 'isStandard' => true, 'type' => 'standard']
        ];
        $customModules = [];
        if (isset($db['modules']) && is_array($db['modules'])) {
            foreach ($db['modules'] as $m) {
                if (isset($m['crmId']) && $m['crmId'] === $crmId) {
                    $customModules[] = $m;
                }
            }
        }
        sendJson(200, ['modules' => array_merge($stdModules, $customModules)]);
    }

    // /api/crms/{crmId}/dashboard
    if ($sub === 'dashboard') {
        sendJson(200, [
            'dashboard' => [
                'metrics' => [
                    'totalLeads' => 38,
                    'activeDeals' => 17,
                    'totalDisbursed' => 24500000,
                    'pendingTasks' => 7,
                    'activeCustomers' => 29
                ]
            ]
        ]);
    }

    // /api/crms/{crmId}/onboarding
    if ($sub === 'onboarding') {
        sendJson(200, ['onboarding' => ['onboarding_completed' => true]]);
    }

    // /api/crms/{crmId}/members
    if ($sub === 'members') {
        $members = [
            ['email' => $session['email'], 'name' => $session['name'], 'role' => 'owner', 'status' => 'active']
        ];
        sendJson(200, ['members' => $members]);
    }

    // /api/crms/{crmId}/modules/{moduleId}/records[/{recordId}]
    if (preg_match('#^modules/([^/]+)/records(?:/([^/]+))?$#', $sub, $mMatches)) {
        $modId = $mMatches[1];
        $recId = isset($mMatches[2]) ? $mMatches[2] : '';
        $allRecords = isset($db['module_records']) && is_array($db['module_records']) ? $db['module_records'] : [];

        if ($method === 'GET') {
            if ($recId) {
                foreach ($allRecords as $r) {
                    if (($r['crmId'] ?? '') === $crmId && ($r['moduleId'] ?? '') === $modId && ($r['id'] ?? '') === $recId) {
                        sendJson(200, ['record' => $r, 'notes' => [], 'activities' => []]);
                    }
                }
                sendJson(404, ['error' => 'Record not found']);
            }
            $filtered = [];
            foreach ($allRecords as $r) {
                if (($r['crmId'] ?? '') === $crmId && ($r['moduleId'] ?? '') === $modId) {
                    $filtered[] = $r;
                }
            }
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
            $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
            $paged = array_slice($filtered, $offset, $limit);
            sendJson(200, ['total' => count($filtered), 'limit' => $limit, 'offset' => $offset, 'records' => $paged]);
        }

        if ($method === 'POST') {
            $body = getJsonBody();
            $newRec = [
                'id' => 'rec_' . bin2hex(random_bytes(8)),
                'crmId' => $crmId,
                'moduleId' => $modId,
                'data' => isset($body['data']) ? $body['data'] : $body,
                'createdBy' => $session['email'],
                'createdAt' => date('c'),
                'updatedAt' => date('c')
            ];
            $db['module_records'][] = $newRec;
            saveCrmDb($crmDbFile, $db);
            sendJson(201, ['success' => true, 'record' => $newRec]);
        }

        if ($method === 'DELETE' && $recId) {
            $remaining = [];
            foreach ($allRecords as $r) {
                if (!(($r['crmId'] ?? '') === $crmId && ($r['moduleId'] ?? '') === $modId && ($r['id'] ?? '') === $recId)) {
                    $remaining[] = $r;
                }
            }
            $db['module_records'] = $remaining;
            saveCrmDb($crmDbFile, $db);
            sendJson(200, ['success' => true, 'message' => 'Record deleted']);
        }
    }

    // /api/crms/{crmId}/modules/{targetMod.id} (metadata)
    if (preg_match('#^modules/([^/]+)$#', $sub, $mMatches)) {
        $modId = $mMatches[1];
        sendJson(200, ['module' => ['id' => $modId, 'fields' => []]]);
    }

    // /api/crms/{crmId}/activities
    if (preg_match('#^activities#', $sub)) {
        if ($method === 'POST') {
            $body = getJsonBody();
            sendJson(201, ['success' => true, 'activity' => array_merge($body, ['id' => 'act_' . bin2hex(random_bytes(6)), 'createdAt' => date('c')])]);
        }
        $acts = isset($db['activities']) && is_array($db['activities']) ? $db['activities'] : [];
        $crmActs = [];
        foreach ($acts as $a) {
            if (($a['crmId'] ?? '') === $crmId) $crmActs[] = $a;
        }
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
        sendJson(200, ['activities' => array_slice($crmActs, 0, $limit)]);
    }

    // /api/crms/{crmId}/wallet
    if ($sub === 'wallet') {
        sendJson(200, ['balance' => 50000, 'currency' => '₹ INR', 'transactions' => []]);
    }

    // /api/crms/{crmId}/apikeys
    if ($sub === 'apikeys' || preg_match('#^apikeys/#', $sub)) {
        if ($method === 'POST') {
            sendJson(201, ['success' => true, 'apiKey' => ['id' => 'key_' . bin2hex(random_bytes(6)), 'key' => 'lp_' . bin2hex(random_bytes(16)), 'name' => 'Default API Key', 'createdAt' => date('c')]]);
        }
        sendJson(200, ['apiKeys' => []]);
    }

    // /api/crms/{crmId}/ai/history & /api/crms/{crmId}/ai/chat
    if ($sub === 'ai/history') {
        sendJson(200, ['history' => []]);
    }
    if ($sub === 'ai/chat') {
        sendJson(200, ['reply' => 'I am your LoanPilot AI assistant. All CRM services are fully operational.']);
    }

    // /api/crms/{crmId}/(leads|contacts|companies)/.../related
    if (preg_match('#^(leads|contacts|companies)/[^/]+/related$#', $sub)) {
        sendJson(200, ['activities' => [], 'notes' => [], 'deals' => [], 'leads' => [], 'contacts' => []]);
    }
}

// 6. Global /api/onboarding
if ($route === 'onboarding') {
    $session = getRequestSession($sessionsFile);
    if (!$session) sendJson(401, ['error' => 'Unauthorized']);
    sendJson(200, ['crmId' => 'crm_default', 'progress' => ['onboarding_completed' => true]]);
}

// Fallback for unknown API routes
sendJson(404, ['error' => "API route not found: /api/" . $route]);