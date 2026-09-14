<?php
// Empire CRM Multi-Tenant SaaS Self-Healing PHP Reverse Proxy Gateway
ini_set('display_errors', 0);
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

$port = 5000;
$host = '127.0.0.1';

function isPortOpen($host, $port) {
    $fp = @fsockopen($host, $port, $errno, $errstr, 1);
    if (is_resource($fp)) {
        fclose($fp);
        return true;
    }
    return false;
}

function bootNodeBackend($port) {
    $dir = __DIR__;
    $cmd = "export PATH=\$PATH:/opt/alt/alt-nodejs22/root/usr/bin; export USE_LOCAL_DB=true; export DATABASE_URL='file:./prisma/dev.db'; cd " . escapeshellarg($dir) . " && nohup node dist/server.js > /dev/null 2>&1 &";
    exec($cmd);
    
    // Wait up to 3 seconds for Node server to start
    for ($i = 0; $i < 6; $i++) {
        usleep(500000); // 500ms
        if (isPortOpen('127.0.0.1', $port)) {
            return true;
        }
    }
    return false;
}

// Ensure Node backend is running
if (!isPortOpen($host, $port)) {
    bootNodeBackend($port);
}

$uri = $_SERVER['REQUEST_URI'] ?? '/';

// Clean subpath prefixes if hosted in subdirectory
if (strpos($uri, '/dsacrm') === 0) {
    $uri = substr($uri, 7);
    if (empty($uri)) $uri = '/';
} else if (strpos($uri, '/bussniescrm') === 0) {
    $uri = substr($uri, 12);
    if (empty($uri)) $uri = '/';
} else if (strpos($uri, '/crmbusiness') === 0) {
    $uri = substr($uri, 12);
    if (empty($uri)) $uri = '/';
} else if (strpos($uri, '/businesscrm') === 0) {
    $uri = substr($uri, 12);
    if (empty($uri)) $uri = '/';
} else if (strpos($uri, '/crm') === 0) {
    $uri = substr($uri, 4);
    if (empty($uri)) $uri = '/';
}

// Route core CRM endpoints to v1 endpoints if requested without /v1/ prefix
if (preg_match('#^/api/(leads|customers|projects|services|campaigns|pipelines|automations|custom-fields|modules|records|views)(/.*|\?.*|$)$#', $uri, $matches)) {
    $uri = '/api/v1/' . $matches[1] . ($matches[2] ?? '');
}

$targetUrl = 'http://' . $host . ':' . $port . $uri;
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$headers = function_exists('getallheaders') ? getallheaders() : [];
$req_headers = [];

foreach ($headers as $k => $v) {
    if (strtolower($k) !== 'host' && strtolower($k) !== 'content-length') {
        $req_headers[] = $k . ': ' . $v;
    }
}

// Forward Authorization header if Apache stripped it from getallheaders()
if (!isset($headers['Authorization']) && !isset($headers['authorization'])) {
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        $req_headers[] = 'Authorization: ' . $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $req_headers[] = 'Authorization: ' . $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
}

$req_headers[] = 'Host: ' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
$req_headers[] = 'X-Forwarded-For: ' . ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1');
$req_headers[] = 'X-Forwarded-Proto: ' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http');
// Crucial: Disable Expect: 100-continue in cURL when forwarding to Node.js
$req_headers[] = 'Expect:';

$inputBody = ($method === 'POST' || $method === 'PUT' || $method === 'PATCH' || $method === 'DELETE') ? file_get_contents('php://input') : null;

function executeProxyRequest($targetUrl, $method, $req_headers, $body = null) {
    $ch = curl_init($targetUrl);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $req_headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);

    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    }

    $response = curl_exec($ch);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [$response, $header_size, $http_code];
}

list($response, $header_size, $http_code) = executeProxyRequest($targetUrl, $method, $req_headers, $inputBody);

// Retry once if connection failed
if ($response === false) {
    bootNodeBackend($port);
    list($response, $header_size, $http_code) = executeProxyRequest($targetUrl, $method, $req_headers, $inputBody);
}

if ($response === false) {
    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => '502 Bad Gateway: Empire CRM Node.js backend server is starting up on port ' . $port,
    ]);
    exit;
}

$res_header = substr($response, 0, $header_size);
$res_body = substr($response, $header_size);

http_response_code($http_code);

foreach (explode("\r\n", $res_header) as $line) {
    if (!empty($line) && !preg_match('/^Transfer-Encoding:/i', $line) && !preg_match('/^HTTP\//i', $line)) {
        header($line, false);
    }
}

echo $res_body;

