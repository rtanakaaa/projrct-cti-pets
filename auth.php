<?php
require_once 'config.php';


function autenticar($username, $password) {
  $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
  if (!$conn) {
    die("Erro ao conectar ao banco de dados: " . mysqli_connect_error());
  }

  $query = "SELECT * FROM usuarios WHERE username = '$username' AND password = '$password'";
  $result = mysqli_query($conn, $query);

  if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);
    if ($row['username'] == ADMIN_USERNAME && $row['password'] == ADMIN_PASSWORD) {
      return true;
    }
  }

  return false;
}

function login($username, $password) {
  if (autenticar($username, $password)) {
    $_SESSION['logged_in'] = true;
    header('Location: admin.php');
    exit;
  } else {
    header('Location: login.php?error=1');
    exit;
  }
}
?>