<?php
// Define the path to the log file
$logFile = 'log/lpalog.log';

// Function to write to the log file
function writeLog($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "$timestamp - $message\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
}

// Function to handle errors
function errorHandler($errno, $errstr, $errfile, $errline) {
    writeLog("Error $errno: $errstr in $errfile on line $errline");
}

// Set the custom error handler
set_error_handler('errorHandler');

// Test the error handler
trigger_error('Test error', E_USER_NOTICE);
?>