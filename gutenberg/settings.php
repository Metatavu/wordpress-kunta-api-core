<?php
    
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  add_action('kunta_api_core_setting_groups', function () {
    global $kuntaApiSettingGroups;
    
    $kuntaApiSettingGroups[] = [
      'name' => 'gutenberg',
      'title' => __('Gutenberg settings', KUNTA_API_CORE_I18N_DOMAIN)
    ];
  });

  add_action('kunta_api_core_settings', function () {
    global $kuntaApiSettings;

    $kuntaApiSettings[] = [
      "group" => "gutenberg",
      "type" => "checkbox",
      "name" => "gutenbergUsePlugin",
      "title" => __('Use embed plugin', 'kunta_api_core')
    ];

    $kuntaApiSettings[] = [
      "group" => "gutenberg",
      "type" => "checkbox",
      "name" => "gutenbergAllowEdit",
      "title" => __('Allow service and service channel edit', 'kunta_api_core')
    ];

  });

?>
