<?php
$to = 'skybronto@gmail.com';
if (filter_var($to, FILTER_VALIDATE_EMAIL)) {
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$message = $_POST['message'];

	$subject = "Новая заявка с сайта";
	$message = "Имя: " . $name . "\n\nТелефон: " . $phone . "\n\nСообщение: " . $message;

	require_once "SendMailSmtpClass.php";

	$mailSMTP = new SendMailSmtpClass("skybronto", "Pogrib150896", "ssl://smtp.gmail.com", "no-reply@skybronto.com", 465);

	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8\r\n";
	$headers .= "From: Новая заявка с сайта\r\n";
	$headers .= "To: " . $to . "\r\n";

	$result = $mailSMTP->send($to, $subject, $message, $headers);

	echo 'ok';
} else {
	echo 'Bad email.';
}
?>
