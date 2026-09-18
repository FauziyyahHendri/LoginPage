<?php

session_start();

$host = "localhost";
$user = "root";
$pass = "";
$db = "moorasa_db";

$koneksi = mysqli_connect($host, $user, $pass, $db);

if (!$koneksi) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}

if (isset($_POST['login'])) {

    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Cari user berdasarkan email DAN role
    $query = "SELECT * FROM users WHERE email = ? AND role = ?";

    $stmt = mysqli_prepare($koneksi, $query);

    mysqli_stmt_bind_param($stmt, "ss", $email, $role);

    mysqli_stmt_execute($stmt);

    $hasil = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($hasil) == 1) {

        $user = mysqli_fetch_assoc($hasil);

        // Cek password
        if (password_verify($password, $user['password'])) {

            // Login berhasil
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['nama'] = $user['nama'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];

            header("Location: anggota.php");
            exit();

        } else {

            echo "Password salah.";

        }

    } else {

        echo "Email atau role tidak sesuai.";

    }
}
?>




<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moorasa - Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../css/login.css">
    <!--link font judul-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">
    <!--link font body-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">

</head>
<body>

<div class="phone-canvas">
    <h1 class="logo-text">MooRasa</h1>

    <div class="">
        <img src="../img/logo.png" alt="illustration" class="logo">
    </div>

    <span class="form-label-custom">Masuk Ke Akun Anda</span>

    <form action="../../motivation page/html/popup.html" method="$_POST">

        <input type="hidden" name="role" id="role">

        <div class="input-wrapper">
            <label for="email">Masukkan Email Anda</label>
            <input type="email" id="email" name="email" class="form-control" placeholder="Email" required>
        </div>

        <div class="input-wrapper">
            <label for="password">Masukkan Kata Sandi Anda</label>
            <input type="password" id="password" name="password" class="form-control" placeholder="Kata Sandi" required>
        </div>

        <button type="submit" name="login" class="btn-card btn-custom btn-login">
            Masuk
        </button>

        <div class="footer-link">
        Tidak memiliki akun? <a href="signup.html">Buat Akun</a>
        </div>
    </div>
    </form>

 

<script>
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');

    document.getElementById('role').value = role;
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>