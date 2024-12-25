<?php
session_start();
if ($_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Koneksi ke database
    $conn = new mysqli('localhost', 'root', '', 'cloud_system');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Query untuk menambah user baru
    $sql = "INSERT INTO users (username, password, role) VALUES ('$username', '$password', '$role')";

    if ($conn->query($sql) === TRUE) {
        $success_message = "Pengguna berhasil ditambahkan!";
    } else {
        $error_message = "Gagal menambah pengguna: " . $conn->error;
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrasi Pengguna Baru</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    
</head>
<body class="bg-light">
    <div class="container mt-5">
        <h2 class="text-center">Registrasi Pengguna Baru</h2>
        <?php if(isset($success_message)): ?>
            <div class="alert alert-success"><?= $success_message ?></div>
        <?php endif; ?>
        <?php if(isset($error_message)): ?>
            <div class="alert alert-danger"><?= $error_message ?></div>
        <?php endif; ?>
        <form method="POST">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select class="form-control" id="role" name="role" required>
                    <option value="user">User</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary w-100">Tambah Pengguna</button>
        </form>
    </div>
    <div class="backlist">
        <button onclick="window.location.href='dashboard.php';" class="btn btn-back">Kembali ke Dashboard</button>
    </div>
</body>

<style>
    .backlist {
        padding: 20px;
        max-width: 400px;
        width: 100%;
        margin: auto;
        text-align: center;
    }

    .btn-back {
        background-color: #4CAF50;
        color: white;
        font-size: 16px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .btn-back:hover {
        background-color: #45a049;
    }

    .btn-back:active {
        background-color: #3e8e41;
    }
</style>
</html>
