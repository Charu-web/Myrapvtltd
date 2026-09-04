<?php
// crm/index.php
// Production bridge: serves crm.html directly when /crm or /crm/ is visited
header('Content-Type: text/html; charset=UTF-8');
require_once __DIR__ . '/../crm.html';
