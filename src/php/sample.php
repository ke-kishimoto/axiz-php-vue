<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:8080");
$num1 = (int)$_GET['num1'] ?? '';
$num2 = (int)$_GET['num2'] ?? '';
$result = $num1 + $num2;
$data = ['result' => $result];
echo json_encode($data);
