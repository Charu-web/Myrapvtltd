<?php
// api/index.php
// Production API for Apache / Hostinger / cPanel hosting.

error_reporting(0);
ini_set('display_errors', '0');

// CORS Headers
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

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
$path = parse_url($requestUri, PHP_URL_PATH);
$route = preg_replace('#^/api/?#', '', $path);
$route = trim($route, '/');

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
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    file_put_contents($sessionsFile, json_encode($sessions, JSON_PRETTY_PRINT));
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
    $ttl = 7 * 24 * 60 * 60;
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

// ROUTE: POST /api/login or /login
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

// ROUTE: GET /api/session
if ($method === 'GET' && $route === 'session') {
    $session = getRequestSession($sessionsFile);
    if (!$session) {
        sendJson(200, ['authenticated' => false]);
    }

    $activeCrmId = null;
    if (file_exists($crmDbFile)) {
        $db = json_decode(file_get_contents($crmDbFile), true);
        if (isset($db['crms']) && is_array($db['crms'])) {
            foreach ($db['crms'] as $crm) {
                if (strtolower($crm['ownerEmail'] ?? '') === strtolower($session['email'])) {
                    $activeCrmId = $crm['id'];
                    break;
                }
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

// ROUTE: POST /api/logout
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

// ROUTE: GET /api/crms
if ($method === 'GET' && $route === 'crms') {
    $session = getRequestSession($sessionsFile);
    if (!$session) sendJson(401, ['error' => 'Unauthorized']);

    $userCrms = [];
    if (file_exists($crmDbFile)) {
        $db = json_decode(file_get_contents($crmDbFile), true);
        if (isset($db['crms']) && is_array($db['crms'])) {
            foreach ($db['crms'] as $crm) {
                if (strtolower($crm['ownerEmail'] ?? '') === strtolower($session['email'])) {
                    $userCrms[] = $crm;
                }
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
        $db = file_exists($crmDbFile) ? json_decode(file_get_contents($crmDbFile), true) : ['crms' => []];
        $db['crms'][] = $defaultCrm;
        file_put_contents($crmDbFile, json_encode($db, JSON_PRETTY_PRINT));
    }
    sendJson(200, ['crms' => $userCrms]);
}

sendJson(404, ['error' => "API route not found: /api/" . $route]);