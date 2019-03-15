<?php
  defined ( 'ABSPATH' ) || die ( 'No script kiddies please!' );
  
  if (!defined('KUNTA_API_CORE_SETTINGS_OPTION')) {
    define('KUNTA_API_CORE_SETTINGS_OPTION', 'kunta_api_core_settings');
  }
  
  if (!defined('KUNTA_API_CORE_PLUGIN_VERSION_SETTING')) {
    define('KUNTA_API_CORE_PLUGIN_VERSION_SETTING', 'kunta_api_core_plugin_version');
  }
  
  function upgrade_060to070() {
    $options = get_option(KUNTA_API_CORE_SETTINGS_OPTION);
    
    if (isset($options)) {
      $organizationId = $options['organizationId'];
      $webhooksEnabled = $options['webhooksEnabled'];
      $synchronizeServicesAsPages = $options['synchronizeServicesAsPages'];
      $synchronizeServiceLocationChannelsAsPages = $options['synchronizeServiceLocationChannelsAsPages'];
      $locationChannelsPath = $options['locationChannelsPath'];
      
      if (isset($organizationId)) {
        $organizations = [
          [
            "name" => $organizationId,
            "organizationId" => $organizationId,
            "serviceLocationChannnelsPath" => $locationChannelsPath,
            "synchronizeServices" => $synchronizeServicesAsPages ? '1' : '0',
            "synchronizeServiceLocationServiceChannels" => $synchronizeServiceLocationChannelsAsPages ? '1' : '0',
            "webhooks" => $webhooksEnabled ? '1' : '0'
          ]
        ];
        
        unset($options['organizationId']);
        unset($options['webhooksEnabled']);
        unset($options['synchronizeServicesAsPages']);
        unset($options['synchronizeServiceLocationChannelsAsPages']);
        unset($options['locationChannelsPath']);

        $options['organizations'] = $organizations;
        update_option(KUNTA_API_CORE_SETTINGS_OPTION, $options);
      }
    }
    
    update_option(KUNTA_API_CORE_PLUGIN_VERSION_SETTING, '0.7.0');
  }
  
  add_action('init', function() {  
    $version = get_option(KUNTA_API_CORE_PLUGIN_VERSION_SETTING);
    if (empty($version)) {
      $version = '0.6.0';
    };
  
    if (KUNTA_API_CORE_PLUGIN_VERSION !== $version) {
      switch ($version) {
        case '0.6.0':
          upgrade_060to070();
        break;
      }
    }
  });
  
?>
