<?php
/******************* mail.class ***************************************
  Pour envoyer un mail






 **********************************************************************/
//error_reporting(E_ALL);
include('mail.lib.inc');
class Mail {
	var $mailWebmaster = '';
	var $mailAsso = '';
	var $to = '';
	var $from = '';
	var $message = '';
	var $messageTXT = '';
	var $subject = '';
	var $headers = '';
	var $includeDir = '';


	function Mail () {
		global $config, $curPage;
		$this->mailWebmaster = $config['mailWebmaster'];
		$this->mailAsso = $config['mailAsso'];
		$this->includeDir = $curPage['relativePath'] . $config['includeDir'];

	}

	function send($from, $to, $message, $sujet, $template = false) {
		global $util;

		/*if(!$util->isUTF8($message)){
			$util->convertUTF8($message);
		}

		if(!$util->isUTF8($message)){
			$util->convertUTF8($message);
		}*/


		//On ajoute les entetes du mail
		if ($from == 'admin') {$from = 'Webmaster<' .$this->mailWebmaster . '>';}
		if ($to == 'admin')   {$to = 'Webmaster<' .$this->mailWebmaster . '>';}


		$this->to = $to;
		$this->from = $from;

		//Gestion du sujet
				$this->subject = '' . $sujet;


		if ($template) {
			//On récupère le message type
			$fcontents = join( '', file( $this->includeDir . '/mailtype.htm' ) );

			//On parse le fichier et on remplace ce qu'il faut : message
			$this->message = str_replace("[MSG]", $message, $fcontents);
		} else {
			$this->message = $message;
		}
		//$this->messageTXT = str_replace('<br />',"\n\r",str_replace('<br>',"\n\r",str_replace('<br/>',"\n\r",$this->message)));
$this->messageTXT = strip_tags($this->message);

		//Création des entetes
		$this->headers  = "MIME-Version: 1.0\n";
		$this->headers .= "From: ".$this->from."\n";
		$this->headers .= "X-Sender: ".$this->from."\n";
		$this->headers .= "X-Mailer: PHP: ".phpversion()."\n";
		$this->headers .= "X-Priority: 3\n";
		$this->headers .= "Return-Path: ".$this->from."\n";  // Re-chemin de retour pour les erreurs
		//specify MIME version 1.0
		$this->headers .= "MIME-Version: 1.0\r\n";

		//unique boundary
		$boundary = uniqid("HTMLMAIL");

		//tell e-mail client this e-mail contains//alternate versions
		$this->headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n";
		$body = '';
		//HTML version of message
		$body.= "--$boundary\r\n" .
			"Content-Type: text/html; charset=UTF-8\r\n" .
			"Content-Transfer-Encoding: base64\r\n\r\n";
		$body .= chunk_split(base64_encode($this->message));


		//plain text version of message
		$body .= "--$boundary\r\n" .
			"Content-Type: text/plain; charset=UTF-8\r\n" .
			"Content-Transfer-Encoding: base64\r\n\r\n";
		$body .= chunk_split(base64_encode($this->messageTXT));

				// et hop, à la poste

		//$this->to = 'chateaum@utt.fr';
		/*
		if ( mail($this->to, $this->subject,$body, $this->headers) ) {
			//if (true) {
			//    echo 'mail sent !';
			return true;
		} else {
			//    echo 'mail error ...';
			return false;
		}*/
		return mymail($this->to,$this->subject,$body,$this->headers);
//		return mymail("chateaum@utt.fr",$this->subject,$body,$this->headers);
		}

	}

	?>
