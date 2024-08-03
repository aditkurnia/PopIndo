<?php
header("Content-Type: application/json");

// Koneksi ke database
$servername = "localhost";
$username = "root";  // username default aWebServer
$password = "";      // password default kosong
$dbname = "popindo_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Terima data dari client
$data = json_decode(file_get_contents('php://input'), true);
$province = $data['province'];
$score = $data['score'];

// Update skor di database
$sql = "INSERT INTO scores (province, score) VALUES (?, ?) ON DUPLICATE KEY UPDATE score = score + ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sii", $province, $score, $score);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Score updated"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error updating score: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>