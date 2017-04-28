<?php

  if (!defined('ABSPATH')) { 
    exit;
  }
 
  add_action('kunta_api_core_settings', function () {
 	  global $kuntaApiSettings;
 	  
    $kuntaApiSettings[] = [
 	    "group" => "api",
      "type" => "checkbox",
      "name" => "webhooksEnabled",
      "title" => __('Webhooks enabled', 'kunta_api_core')
    ];
    
  });
 
?>
