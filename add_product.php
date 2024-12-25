<?php
$host = 'localhost';  // Ganti dengan host database Anda
$user = 'root';       // Ganti dengan username database Anda
$pass = '';           // Ganti dengan password database Anda
$dbname = 'cloud_system'; // Nama database

// Koneksi ke database
$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Cek jika ada data yang dikirim
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $stock = $_POST['stock'];
    
    // Upload gambar ke folder 'images/'
    $image = $_FILES['image']['name'];
    $target = 'images/' . basename($image); // Menyimpan gambar di folder 'images/'

    // Cek apakah gambar berhasil diupload
    if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
        // Menyimpan nama gambar dengan format yang benar ke dalam database
        $sql = "INSERT INTO products (name, price, stock, image) VALUES ('$name', '$price', '$stock', '$target')";
        
        if ($conn->query($sql) === TRUE) {
            echo 'Success';
        } else {
            echo 'Error: ' . $conn->error;
        }
    } else {
        echo 'Gagal mengupload gambar.';
    }
}

$conn->close();
?>
