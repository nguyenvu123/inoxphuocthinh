<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="initial-scale=1.0,width=device-width,height=device-height,shrink-to-fit=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="google" content="notranslate">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?= get_bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<!-- favicon -->
    <link rel="apple-touch-icon" sizes="114x114" href="<?= ASSETS_PATH ?>images/favicon/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="<?= ASSETS_PATH ?>images/favicon/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="<?= ASSETS_PATH ?>images/favicon/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="<?= ASSETS_PATH ?>images/favicon/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?= ASSETS_PATH ?>images/favicon/apple-touch-icon-180x180.png">
    <link rel="apple-touch-icon" sizes="57x57" href="<?= ASSETS_PATH ?>images/favicon/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="<?= ASSETS_PATH ?>images/favicon/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="<?= ASSETS_PATH ?>images/favicon/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="<?= ASSETS_PATH ?>images/favicon/apple-touch-icon-76x76.png">
    <link rel="apple-touch-startup-image" href="<?= ASSETS_PATH ?>images/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= ASSETS_PATH ?>images/favicon/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="228x228" href="<?= ASSETS_PATH ?>images/favicon/coast-228x228.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= ASSETS_PATH ?>images/favicon/favicon-32x32.png">
    <link rel="manifest" href="<?= ASSETS_PATH ?>images/favicon/manifest.json">
    <link rel="shortcut icon" href="<?= ASSETS_PATH ?>images/favicon/favicon.ico">
    <link rel="yandex-tableau-widget" href="<?= ASSETS_PATH ?>images/favicon/yandex-browser-manifest.json">
    <meta name="msapplication-TileImage" content="<?= ASSETS_PATH ?>images/favicon/mstile-144x144.png">
    <meta name="msapplication-config" content="<?= ASSETS_PATH ?>images/favicon/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="apple-mobile-web-app-title" content="<?= get_bloginfo( 'name' ) ?>">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="application-name" content="<?= get_bloginfo( 'name' ) ?>">
    <!-- end favicon -->
    <script>var gulp_timer = Date.now();</script>
	<?php wp_head(); ?>

</head>
<body <?php body_class(); ?>>