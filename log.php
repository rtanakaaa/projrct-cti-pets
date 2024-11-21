<?php
// Definir o caminho do arquivo de log
$logFile = 'log/lpalog.log';

// Função para escrever no arquivo de log
function writeLog($message) {
  global $logFile;
  $timestamp = date('Y-m-d H:i:s');
  $logMessage = "$timestamp - $message\n";
  file_put_contents($logFile, $logMessage, FILE_APPEND);
}

// Função para capturar erros
function errorHandler($errno, $errstr, $errfile, $errline) {
  writeLog("Erro $errno: $errstr em $errfile na linha $errline");
}

// Definir o erro handler
set_error_handler('errorHandler');

// Testar o erro handler
trigger_error('Erro de teste', E_USER_NOTICE);
?>