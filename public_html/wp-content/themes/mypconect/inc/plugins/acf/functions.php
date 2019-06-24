<?php
/**
 * Created by PhpStorm.
 * User: ADMIN
 * Date: 10/15/2018
 * Time: 11:53 AM
 */

/**
 * ACF Functions
 **/
//Create option page
if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array(
        'page_title' 	=> __('General Settings', DOMAIN),
        'menu_title'	=> __('Theme options', DOMAIN),
        'menu_slug' 	=> 'athena-theme-settings',
        'capability'	=> 'manage_options',
        'redirect'		=> false
    ));

    acf_add_options_sub_page(array(
        'page_title'    => __('Blocks', DOMAIN),
        'menu_title'    => __('Blocks', DOMAIN),
        'parent_slug'   => 'athena-theme-settings',
    ));

}

//load_json
add_filter('acf/settings/load_json', 'my_acf_json_load_point');
function my_acf_json_load_point( $paths ) {

	// remove original path (optional)
	unset($paths[0]);

	// append path
	$paths[] = get_stylesheet_directory() . '/acf-json';

	// return
	return $paths;

}