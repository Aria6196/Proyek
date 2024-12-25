<?php
session_start();
if ($_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    
</head>
<body class="bg-light">
    <div class="container mt-5">
        <h2 class="text-center">Admin Dashboard</h2>
        <div class="text-center">
            <a href="form.html" class="btn btn-success w-100 mb-3">Form Penambahan Produk</a>
            <a href="register_user.php" class="btn btn-info w-100 mb-3">Registrasi Pengguna Baru</a>
            <a href="logout.php" class="btn btn-danger w-100">Logout</a>
        </div>
    </div>
</body>
</html>
