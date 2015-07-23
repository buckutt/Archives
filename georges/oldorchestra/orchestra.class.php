<?php
/*
 * Classe generale pour l'orchestration.
 * Les classes d'orchestration gerent chaqune un process metier precis
 * Les enfants de orchestra sont soient specifique a un WS auquels cas ils utilisent une classe fille specifique au WS
 * Sinon l'enfant est directement fils de orchestra
 */
class orchestra {

	protected $principalOrchestraWS;

	public function __construct(){


	}
}

?>
