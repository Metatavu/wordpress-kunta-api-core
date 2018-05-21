<?php
  namespace KuntaAPI\Core;
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  require_once('core-setting.php');  
  
  define(KUNTA_API_CORE_SETTINGS, 'kunta_api_core');
  define(KUNTA_API_CORE_SETTINGS_GROUP, 'kunta_api_core');
  define(KUNTA_API_CORE_SETTINGS_PAGE, 'kunta_api_core_settings');
  define(KUNTA_API_CORE_SETTINGS_OPTION, 'kunta_api_core_settings');
      
  class CoreSettings {
    
    public static function getSettingGroups() {
      global $kuntaApiSettingGroups;
      
      $kuntaApiSettingGroups = [
        [
      	  'name' => 'api',
      	  'title' => __('API Settings', KUNTA_API_CORE_I18N_DOMAIN)
      	],
      	[
      	  'name' => 'types',
      	  'title' => __('Enabled types', KUNTA_API_CORE_I18N_DOMAIN)
      	]
      ];

      do_action('kunta_api_core_setting_groups');
      
      $kuntaApiSettingGroups[] = [
        'name' => 'hidden'
      ];
      
      return $kuntaApiSettingGroups;
    }
    
    public static function getSettings() {
      global $kuntaApiSettings;
      
      $kuntaApiSettings = [
        [
          "type" => "url",
          "name" => "apiUrl",
          "title" => __('URL', KUNTA_API_CORE_I18N_DOMAIN),
          "group" => "api"
        ], 
        [
          "type" => "text",
          "name" => "apiUser",
          "title" => __('Username', KUNTA_API_CORE_I18N_DOMAIN),
          "group" => "api"
        ], 
        [
          "type" => "password",
          "name" => "apiPassword",
          "title" => __('Password', KUNTA_API_CORE_I18N_DOMAIN),
          "group" => "api"
        ], 
        [
          "type" => "table",
          "name" => "organizations",
          "group" => "hidden",
          "title" => __( 'Organizations', KUNTA_API_CORE_I18N_DOMAIN),
          "fields" => [
            "name" => [
              "title" => __("Name", KUNTA_API_CORE_I18N_DOMAIN),
              "type" => "text"
            ],
            "organizationId" => [
              "title" => __("Id", KUNTA_API_CORE_I18N_DOMAIN),
              "type" => "text"
            ],
            "serviceLocationChannnelsPath" => [
              "title" => __("Location service channels path", KUNTA_API_CORE_I18N_DOMAIN),
              "type" => "text"
            ],
            "synchronizeServices" => [
              "title" => __("Synchronize services", KUNTA_API_CORE_I18N_DOMAIN),
              "type" => "checkbox"
            ],
            "synchronizeServiceLocationServiceChannels" => [
              "title" => __("Synchronize service locations", KUNTA_API_CORE_I18N_DOMAIN),
              "type" => "checkbox"
            ],
            "webhooks" => [
              "title" => __("Webhooks", KUNTA_API_CORE_I18N_DOMAIN),
              "type" => "checkbox"
            ]
          ]
        ]
      ];
      
      do_action('kunta_api_core_settings');
      
      return $kuntaApiSettings;
    }

    public static function getSetting($name) {
      foreach (CoreSettings::getSettings() as $setting) {
        if ($setting["name"] == $name) {
          return $setting;
        }
      }
      
      return null;
    }
    
    public static function getValue($name) {
      $options = get_option(KUNTA_API_CORE_SETTINGS_OPTION);
      if ($options) {
        return $options[$name];
      }
      
      return null;
    }
    
    public static function getBooleanValue($name) {
      return static::getValue($name) == '1';
    }
    
    public static function getOrganizationIds() {
      $result = [];
      
      $organizations = static::getOrganizations();

      foreach ($organizations as $organization) {
        $result[] = $organization['organizationId'];
      }

      return $result;
    }
    
    public static function getOrganizationIdsWithWebhooks() {
      $result = [];
      
      $organizations = static::getOrganizations();
      foreach ($organizations as $organization) {
        if ($organization['webhooks'] == '1') {
          $result[] = $organization['organizationId'];
        }
      }
      
      return $result;
    }
    
    public static function getWebhooksEnabled() {
      return count(static::getOrganizationIdsWithWebhooks()) > 0;
    }
    
    public static function getOrganizationIdsWithSynchronization() {
      $result = [];
      
      $organizations = static::getOrganizations();
      foreach ($organizations as $organization) {
        $synchronizeServices = $organization['synchronizeServices'] == '1';
        $synchronizeServiceLocationServiceChannels = $organization['synchronizeServiceLocationServiceChannels'] == '1';
        
        if ($synchronizeServices == true || $synchronizeServiceLocationServiceChannels == true) {
          $result[] = $organization['organizationId'];
        }
      }
        
      return $result;
    }
    
    public static function getOrganizationServiceLocationChannnelsPath($organizationId) {
      $result = [];
      
      $organizations = static::getOrganizations();
      foreach ($organizations as $organization) {
        if ($organization['organizationId'] == $organizationId) {
          return $organization['serviceLocationChannnelsPath'];
        }
      }
        
      return false;
    }
    
    public static function getOrganizationSynchronizeServices($organizationId) {
      $result = [];
      
      $organizations = static::getOrganizations();
      foreach ($organizations as $organization) {
        if ($organization['organizationId'] == $organizationId) {
          return $organization['synchronizeServices'] == '1';
        }
      }
        
      return false;
    }
    
    public static function getOrganizationSynchronizeServiceLocationServiceChannels($organizationId) {
      $result = [];
      
      $organizations = static::getOrganizations();
      foreach ($organizations as $organization) {
        if ($organization['organizationId'] == $organizationId) {
          return $organization['synchronizeServiceLocationServiceChannels'] == '1';
        }
      }
        
      return false;
    }
    
    private static function getOrganizations() {
      $result = static::getValue("organizations");
      if (is_array($result)) {
        return $result;
      }      
      
      return [];
    }
    
  }
  
  class CoreSettingsUI {
    
    public function __construct() {
      add_action('admin_init', array($this, 'adminInit'));
      add_action('admin_menu', array($this, 'adminMenu'));
    }
    
    public function adminMenu() {
      add_options_page (__( "Kunta API Settings", KUNTA_API_CORE_I18N_DOMAIN ), __( "Kunta API Settings", KUNTA_API_CORE_I18N_DOMAIN ), 'manage_options', 'kunta_api_core_settings', array($this, 'settingsPage'));
    }
    
    public function adminInit() {
      register_setting(KUNTA_API_CORE_SETTINGS_GROUP, KUNTA_API_CORE_SETTINGS_PAGE, [ $this, 'registerSettingSanitize']);
      
      foreach (CoreSettings::getSettingGroups() as $group) {
      	add_settings_section($group['name'], $group['title'], null, KUNTA_API_CORE_SETTINGS_PAGE);
      }

      foreach (CoreSettings::getSettings() as $setting) {
        $this->addOption($setting['group'], $setting['name'], $setting['title']);
      }
    }
    
    public function registerSettingSanitize($settings) {
      $result = [];
      
      foreach ($settings as $name => $value) {
        $setting = CoreSettings::getSetting($name);
        if (isset($setting)) {
          $settingType = $setting['type'];
          switch ($settingType) {
            case "table":
              $result[$name] = json_decode($value, true);
            break;
            default:
              $result[$name] = $value;
            break;
          }
        }
      }
      
      return $result;
    }
    
    private function addOption($group, $name, $title) {
      add_settings_field($name, $title, array($this, 'createFieldUI'), KUNTA_API_CORE_SETTINGS_PAGE, $group, $name);
    }
    
    public function createFieldUI($name) {
      $setting = CoreSettings::getSetting($name);
      
      $settingType = $setting['type'];
      $settingName = $setting['name'];
      
      switch ($settingType) {
        case 'checkbox':
        	$checked = CoreSettings::getBooleanValue($settingName) ? 'checked="checked"' : '';
        	echo "<input id='$settingName' name='" . KUNTA_API_CORE_SETTINGS_OPTION . "[$settingName]' size='42' type='$settingType' value='1' $checked/>";
        break;
        case 'table':
        	$optionValue = CoreSettings::getValue($settingName);
        	echo "<input id='$settingName' name='" . KUNTA_API_CORE_SETTINGS_OPTION . "[$settingName]' type='hidden' value='$optionValue' />";
        break;
        default:
        	$optionValue = CoreSettings::getValue($settingName);
        	echo "<input id='$settingName' name='" . KUNTA_API_CORE_SETTINGS_OPTION . "[$settingName]' size='42' type='$settingType' value='$optionValue' />";
        break;
      }
    }
    
    public function settingsPage() {
      if (!current_user_can('manage_options')) {
        wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
      }
      
      global $kuntaApiTools;
      $kuntaApiTools = [];
      
      echo '<div class="wrap">';
      echo "<h2>" . __( "Kunta API", KUNTA_API_CORE_I18N_DOMAIN) . "</h2>";
      echo '<form action="options.php" method="POST">';
      settings_fields(KUNTA_API_CORE_SETTINGS_GROUP);
      do_settings_sections(KUNTA_API_CORE_SETTINGS_PAGE);
      
      $tableNames = [];
      foreach (CoreSettings::getSettings() as $setting) {
        if ($setting["type"] === 'table') {
          $tableNames[] = $setting["name"];
        }
      }
      
      foreach ($tableNames as $tableName) {
        $tableSettings = CoreSettings::getSetting($tableName);
        $tableValues = CoreSettings::getValue($tableName);
        if (!isset($tableValues)) {
          $tableValues = [];
        }
        
        echo '<div class="wrap">';
        echo '<h1 class="wp-heading-inline">' . $tableSettings['title'] . '</h1>';
        echo '<a class="page-title-action add-settings-table-row" data-table-name="' . $tableName . '">' . __( 'Add new', KUNTA_API_CORE_I18N_DOMAIN) . '</a>';
        echo '<table class="wp-list-table widefat fixed striped settings-table" data-table-name="' . $tableName . '">';
        echo '<thead>';
        echo '<tr>';
        
        foreach ($tableSettings['fields'] as $fieldName => $fieldSettings) {
          echo '<th>' . $fieldSettings['title'] . '</th>';
        }
        
        echo '<th style="width:24px" /></tr>';
        echo '</thead>';        
        echo '<tbody>';
        
        foreach ($tableValues as $tableValue) {
          echo '<tr>';
          
          foreach ($tableSettings['fields'] as $fieldName => $fieldSettings) {
            $fieldValue = $tableValue[$fieldName];          
            echo '<td>';
            switch ($fieldSettings['type']) {
              case 'checkbox':
                echo '<input type="checkbox" data-column=' . $fieldName . ' value="1"' . ($fieldValue == '1' ? ' checked="checked"' : '') . '/>';
              break;
              default:
                echo '<input data-column=' . $fieldName . ' style="width: 100%" type="' . $fieldSettings['type'] . '" value="' . $fieldValue . '"/>';
              break;
            }
            
            echo '</td>';
          }
          
          echo '<td><a class="settings-table-delete-row dashicons-trash dashicons-before"/></td></tr>';
        }

        echo '</tbody>';
        echo '</table>';
        echo "</div>";

        submit_button();
        echo "</form>";
        echo "</div>";
      }

      echo '<div class="wrap">';
      echo "<h2>" . __( "Tools", KUNTA_API_CORE_I18N_DOMAIN) . "</h2>";
     
      do_action('kunta_api_core_tools');
      
      foreach ($kuntaApiTools as $kuntaApiTool) {
      	$name = $kuntaApiTool['name'];
      	$title = $kuntaApiTool['title'];
      	echo "<p><form action='admin-post.php' method='POST'>";
      	echo "<input name='action' type='hidden' value='kunta_api_tool_action'>";
      	echo "<input name='kunta_api_tool_action' type='hidden' value='$name'>";
      	echo "<input id='submit' class='button button-primary' name='submit' value='$title' type='submit'>";
      	echo "</form></p>";
      }
      
      echo "</div>";
    }
  }
  
  add_action('admin_post_kunta_api_tool_action', function () {
  	global $kuntaApiTools;
  	
  	do_action('kunta_api_core_tools');
  	
  	$toolName = $_POST['kunta_api_tool_action'];
  	if (empty($toolName)) {
  	  $toolName = $_GET['kunta_api_tool_action'];
  	}
  	 
  	foreach ($kuntaApiTools as $kuntaApiTool) {
  	  $name = $kuntaApiTool['name'];
  	  if ($toolName == $name) {
  	  	$redirect = $kuntaApiTool['action']();
  	  	if (empty($redirect)) {
  	  	  $redirect = admin_url('options-general.php?page=kunta_api_core_settings');
  	  	}
  	  	
  	  	wp_redirect($redirect);
  	  	break;
  	  }
  	}
  });
  
  add_action('admin_enqueue_scripts', function ($hook) {
    if ('settings_page_kunta_api_core_settings' == $hook) {
      wp_enqueue_script('kunta_api_core_settings_script', plugin_dir_url(dirname(__FILE__)) . 'scripts/core-settings.js' );  
    }
  });
  
  if (is_admin()) {
    $coreSettingsUI = new CoreSettingsUI();
  }

?>