<?php
    
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  add_action('kunta_api_core_setting_groups', function () {
 	  global $kuntaApiSettingGroups;
    
    $kuntaApiSettingGroups[] = [
      'name' => 'services',
      'title' => __('Service settings', KUNTA_API_CORE_I18N_DOMAIN)
    ];
  });
 
  add_action('kunta_api_core_settings', function () {
 	  global $kuntaApiSettings;
 	
 	  $kuntaApiSettings[] = [
 	    "group" => "services",
      "type" => "checkbox",
      "name" => "synchronizeServicesAsPages",
      "title" => __('Synchronize services as pages', 'kunta_api_core')
    ];
 	
 	  $kuntaApiSettings[] = [
 	    "group" => "services",
      "type" => "checkbox",
      "name" => "synchronizeServiceLocationChannelsAsPages",
      "title" => __('Synchronize service location channels as pages', 'kunta_api_core')
    ];
 	
 	  $kuntaApiSettings[] = [
 	    "group" => "services",
      "type" => "text",
      "name" => "locationChannelsPath",
      "title" => __('Location channels path', 'kunta_api_core')
    ];
  });
 
?>
