<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Pages\Settings' ) ) {
    
    class Settings {
      
      public function __construct() {
        add_action('kunta_api_core_setting_groups', [ $this, 'kuntaApiCoreSettingGroups']);        
        add_action('kunta_api_core_settings', [ $this, 'kuntaApiCoreSettings']);   
      }
      
      /**
       * Action for altering kunta api setting groups
       */
      public function kuntaApiCoreSettingGroups() {
        global $kuntaApiSettingGroups;
    
        $kuntaApiSettingGroups[] = [
          'name' => 'pages',
          'title' => __('Page settings', 'kunta_api_core')
        ];
      }
      
      /**
       * Action for altering kunta api settings
       */
      public function kuntaApiCoreSettings() {
        global $kuntaApiSettings;

        $kuntaApiSettings[] = [
          "group" => "pages",
          "type" => "checkbox",
          "name" => "usePageRegenerateTemplatePlugin",
          "title" => __('Use page regenerate from template plugin (CKEditor only)', 'kunta_api_core')
        ];
      }
      
    }
  
  }
  
  add_action('init', function () {
    new Settings();
  });
  
?>