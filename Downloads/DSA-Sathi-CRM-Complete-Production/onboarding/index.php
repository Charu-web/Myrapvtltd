<?php
// onboarding/index.php
// Production bridge: serves onboarding.html directly when /onboarding is visited
header('Content-Type: text/html; charset=UTF-8');
require_once __DIR__ . '/../onboarding.html';
