<?php
	$animals = glob('../images/slider/animals/*.*');
	$events = glob('../images/slider/events/*.*');
	$returnedNames = "";
	$returnedEvents = "";
	$returnedEventDescriptions = "";
	$namesEventsAndDescriptions = "";

	foreach($animals as $animal) {
		$tmp = explode('/', $animal);
		$size = count($tmp);
		$name = $tmp[$size-1];
		$returnedNames .= $name . "-";
	}

	foreach($events as $event) {
		$tmp = explode('/', $event);
		$size = count($tmp);
		$eventName = $tmp[$size-1];
		$returnedEvents .= $eventName . "-";
	}

	$myDescriptionFile = fopen("../images/slider/description.txt", "r") or die("Unable to open file!");
	while(!feof($myDescriptionFile)) {
		$returnedEventDescriptions .= fgets($myDescriptionFile) . "-";
	}
	fclose($myDescriptionFile);

	$namesEventsAndDescriptions = $returnedNames . '/' . $returnedEvents . '/' . $returnedEventDescriptions;

	echo $namesEventsAndDescriptions;
?>
