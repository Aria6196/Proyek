<?php
session_start();
if (isset($_SESSION['username'])) {
    header("Location: dashboard.php"); // Redirect ke halaman dashboard jika sudah login
    exit();
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Koneksi ke database
    $conn = new mysqli('localhost', 'root', '', 'cloud_system');
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Query untuk mengecek username dan password
    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $_SESSION['username'] = $username;
        $_SESSION['role'] = $user['role'];
        
        // Redirect berdasarkan role
        if ($user['role'] == 'admin') {
            header("Location: dashboard.php"); // Halaman untuk admin
        } else {
            header("Location: pos.php"); // Halaman untuk user
        }
        exit();
    } else {
        $error_message = "Username atau Password salah!";
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="manifest" href="/Proyek_Web/manifest.json">
    <meta name="theme-color" content="#333" />
</head>
<body class="bg-light">
    <div class="container mt-5">
        <h2 class="text-center">Login</h2>
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
            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
    </div>

    <script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/Proyek_Web/sw.js')
                .then(reg => console.log('Service Worker registered: ', reg))
                .catch(err => console.error('Service Worker registration failed: ', err));
        }
    </script>
</body>
</html>
