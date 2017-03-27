<?php
    
 if (!defined('ABSPATH')) { 
   exit;
 }
 
 add_action('kunta_api_core_settings', function () {
 	global $kuntaApiSettings;
 	$kuntaApiSettings[] = [
 	  "group" => "types",
      "type" => "checkbox",
      "name" => "fragmentsEnabled",
      "title" => __('Fragments enabled', 'kunta_api_core')
    ];
 });
 
?>
