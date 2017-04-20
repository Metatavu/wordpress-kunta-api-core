<?php
    
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  add_action('kunta_api_core_setting_groups', function () {
 	  global $kuntaApiSettingGroups;
    
    $kuntaApiSettingGroups[] = [
      'name' => 'tinymce',
      'title' => __('Tinymce settings', KUNTA_API_CORE_I18N_DOMAIN)
    ];
  });

  add_action('kunta_api_core_settings', function () {
      global $kuntaApiSettings;

      $kuntaApiSettings[] = [
        "group" => "tinymce",
        "type" => "checkbox",
        "name" => "useSidebarPluginTinymce",
        "title" => __('Use sidebar plugin', 'kunta_api_core')
      ];

      $kuntaApiSettings[] = [
        "group" => "tinymce",
        "type" => "checkbox",
        "name" => "useServiceEmbedPluginTinymce",
        "title" => __('Use embed plugin', 'kunta_api_core')
      ];
  });

?>
