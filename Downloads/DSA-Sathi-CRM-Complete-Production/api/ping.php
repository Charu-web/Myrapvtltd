<?php
http_response_code(200);
header('Content-Type: application/json; charset=UTF-8');
echo json_encode([
    'success' => true,
    'php' => true,
    'version' => PHP_VERSION,
    'server' => isset($_SERVER['SERVER_SOFTWARE']) ? $_SERVER['SERVER_SOFTWARE'] : 'Unknown',
    'time' => time()
]);
exit;
