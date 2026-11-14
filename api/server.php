<?php
/**
 * BACKEND API PHP & SINKRONISASI DATABASE
 * SIA SEKOLAH - SDN KALIGANGSA WETAN 01
 * Opsi penanganan data pada hosting PHP/Apache (XAMPP / cPanel)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dbFile = __DIR__ . '/../database/default-data.json';

$action = $_GET['action'] ?? 'get_data';

switch ($action) {
    case 'get_data':
        if (file_exists($dbFile)) {
            echo file_get_contents($dbFile);
        } else {
            echo json_encode(["status" => "error", "message" => "Database JSON tidak ditemukan."]);
        }
        break;

    case 'save_data':
        $rawData = file_get_contents('php://input');
        if (!empty($rawData)) {
            $decoded = json_decode($rawData, true);
            if ($decoded !== null) {
                file_put_contents($dbFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
                echo json_encode(["status" => "success", "message" => "Data berhasil disimpan ke server."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Payload JSON tidak valid."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Data kosong."]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Aksi tidak dikenal."]);
        break;
}
