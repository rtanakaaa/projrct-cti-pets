<?php
session_start();

require_once 'auth.php';

if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
  header('Location: login.php');
  exit;
}

// Conteúdo da página de admin
echo htmlspecialchars("Bem-vindo ao painel de admin!");
?>