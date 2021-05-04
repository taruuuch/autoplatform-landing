<?php
$to      = 'brontoandrej@gmail.com,skybronto@ukr.net';
$subject = 'Новая заявка с SbyBronto.com';
$message = 'Имя: ' . $_POST['name'] . "\r\n" . 'Телефон: ' . $_POST['phone'];

if ($_POST['description']) {
	$message .= "\r\n" . 'Сообщение: ' . $_POST['description'];
}

$headers = 'From: no-reply@skybronto.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);
?>
