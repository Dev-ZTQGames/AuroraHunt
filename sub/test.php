<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/includes/header.htm'; 

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:8080/executeFunction');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);


echo $output;
?>