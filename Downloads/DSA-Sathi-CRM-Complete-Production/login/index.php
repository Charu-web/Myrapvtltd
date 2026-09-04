<?php
// login/index.php
// Production bridge: serves login.html directly when /login or /login/ is visited
header('Content-Type: text/html; charset=UTF-8');
require_once __DIR__ . '/../login.html';
