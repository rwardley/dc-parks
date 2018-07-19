<?php
include '/Users/rosemarywardley/Documents/code/php/cartoDBProxy.php';
//			^CHANGE THIS TO THE PATH TO YOUR cartodbProxy.php
$queryURL = $_POST['qurl'];
$return = goProxy($queryURL);
echo $return;
?>