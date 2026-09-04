<?php
header('Content-Type: application/json; charset=UTF-8');
echo json_encode(['success' => true, 'php' => true, 'time' => time()]);
