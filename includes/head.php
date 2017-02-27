<?php
 /*------------------------------------------------------------------------
# author    Gonzalo Suez
# Copyright © 2013 gsuez.cl. All rights reserved.
# @license  http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Website   http://www.gsuez.cl
# Modified: Arca Noé Córdoba Team
-------------------------------------------------------------------------*/// no direct access
defined('_JEXEC') or die;
JHtml::_('bootstrap.framework');
?>
<head>
	<jdoc:include type="head" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<link rel="apple-touch-icon-precomposed" href="<?php  echo $tpath; ?>/images/apple-touch-icon-57x57-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php  echo $tpath; ?>/images/apple-touch-icon-72x72-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php  echo $tpath; ?>/images/apple-touch-icon-114x114-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php  echo $tpath; ?>/images/apple-touch-icon-144x144-precomposed.png">

	<!-- Latest compiled and minified CSS bootstrap library -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

	<!-- Latest compiled and minified JavaScript bootstrap library -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

	<!-- Latest compiled and minified JavaScript jQuery library -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>

  <!-- Latest compiled and minified JavaScript jQuery-ui library -->
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

  <!-- A modern approach to copy text to clipboard -->
  <script src="https://cdn.jsdelivr.net/clipboard.js/1.6.0/clipboard.min.js"></script>

	<!-- Latest compiled and minified CSS Flickity library -->
	<link rel="stylesheet" href="https://npmcdn.com/flickity@1.2/dist/flickity.min.css">

	<!-- Latest compiled and minified Javascript Flikity library -->
	<script src="https://npmcdn.com/flickity@1.2/dist/flickity.pkgd.min.js"></script>

	<!-- Latest javascript font-awesome library -->
  <script src="https://use.fontawesome.com/1563b86c35.js"></script>

  <!-- Add the video library -->
  <script src="/templates/masterbootstrap/js/jquery.vide.min.js"></script>

	<!-- Gidole font -->
	<link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/gidole-regular" type="text/css"/>

	<!-- Custom javascript -->
	<script src="/templates/masterbootstrap/js/custom.js"></script>

	<!-- Librerías para investigar
	https://daneden.github.io/animate.css/
	<link rel="stylesheet" href="http://designmodo.github.io/Flat-UI/dist/css/flat-ui.min.css">
	http://designmodo.github.io/Flat-UI/
	<link rel="stylesheet" href="https://daneden.github.io/animate.css/animate.min.css"> -->

	<!--[if lte IE 8]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<?php  if ($pie == 1) : ?>
			<style>
				{behavior:url(<?php  echo $tpath; ?>/js/PIE.htc);}
			</style>
		<?php  endif; ?>
	<![endif]-->
</head>
