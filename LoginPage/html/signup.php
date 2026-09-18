<?php

$host = "localhost";
$user = "root";
$pass = "";
$db = "moorasa_db";

$koneksi = mysqli_connect($host, $user, $pass, $db);

if (!$koneksi) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}

if (isset($_POST['daftar'])) {

    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_pass'];


    // Cek password dan konfirmasi password
    if ($password != $confirm_password) {

        die("Konfirmasi password tidak sesuai.");

    }


    // Cek apakah email sudah terdaftar
    $query = "SELECT * FROM login WHERE email = ?";

    $stmt = mysqli_prepare($koneksi, $query);

    mysqli_stmt_bind_param($stmt, "s", $email);

    mysqli_stmt_execute($stmt);

    $hasil = mysqli_stmt_get_result($stmt);



    // Hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);


    // Masukkan data ke database
    $query = "INSERT INTO login (email, password, role)
              VALUES (?, ?, 'Pengguna')";

    $stmt = mysqli_prepare($koneksi, $query);

    mysqli_stmt_bind_param(
        $stmt,
        "ss",
        $email,
        $password_hash
    );

    header("Location:../../motivation page/html/popup.html");

}

?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moorasa - Sign Up</title>
    <link rel="stylesheet" href="../css/signup.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
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
            <img src="../img/logo.png" class="logo" alt="Moorasa Icon">
        </div>

        <span class="form-label-custom">Buat Akun Anda</span>

        <form action="signup.php" method="POST">
            <div class="input-wrapper">
                <label for="email">Masukkan Email Anda</label>
                <input type="email" name="email" class="form-control" placeholder="Email" >
            </div>

            <div class="input-wrapper">
                <label for="password">Buat Kata Sandi Anda</label>
                <input type="password" name="password" class="form-control" placeholder="Password" >
            </div>

            <div class="input-wrapper">
                <label for="password">Konfirmasi Kata Sandi Anda</label>
                <input type="password" name="confirm_pass" class="form-control" placeholder="Confirm Password" >
            </div>

            <button type="submit" name="daftar" class="btn-card btn-custom btn-signup"> Buat Akun</button>

        </form>


        <p class="footer-link">
            Sudah memiliki Akun? <a href="login.html">Masuk</a>
        </p>
    </div>

</body>
</html>