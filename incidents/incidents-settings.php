<?php

  if (!defined('ABSPATH')) { 
    exit;
  }
 
  add_action('kunta_api_core_settings', function () {
 	  global $kuntaApiSettings;
 	  
    $kuntaApiSettings[] = [
 	    "group" => "types",
      "type" => "checkbox",
      "name" => "incidentsEnabled",
      "title" => __('Incidents enabled', 'kunta_api_core')
    ];
    
  });
 
?>
