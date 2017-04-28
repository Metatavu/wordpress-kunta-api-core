<?php
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  if (is_admin()) {
    add_action('init', function() {
 
      add_filter('mce_external_plugins', function($plugins) {
        $useSidebar = \KuntaAPI\Core\CoreSettings::getBooleanValue('useSidebarPluginTinymce');
        $useEmbedder = \KuntaAPI\Core\CoreSettings::getBooleanValue('useServiceEmbedPluginTinymce');
        
        if ($useEmbedder) {
          $plugins['kunta_api_service_embed'] = plugin_dir_url(dirname(__FILE__)) . 'tinymce-plugins/kunta-api-service-embed/plugin.js';
          $plugins['kunta_api_service_location_embed'] = plugin_dir_url(dirname(__FILE__)) . 'tinymce-plugins/kunta-api-service-location-channel-embed/plugin.js';
        }
  	
        if ($useSidebar) {
          $plugins['kunta_api_sidebar'] = plugin_dir_url(dirname(__FILE__)) . 'tinymce-plugins/kunta-api-sidebar/plugin.js';
        }
        
        return $plugins;
      });
      
      add_filter('mce_buttons', function($buttons) {
        $useSidebar = \KuntaAPI\Core\CoreSettings::getBooleanValue('useSidebarPluginTinymce');
        $useEmbedder = \KuntaAPI\Core\CoreSettings::getBooleanValue('useServiceEmbedPluginTinymce');
        
        if ($useEmbedder) {
          array_push($buttons, '|', 'kunta_api_service_embed');
          array_push($buttons, '|', 'kunta_api_service_location_embed');
        }
        
        if ($useSidebar) {
          array_push($buttons, '|', 'kunta_api_sidebar');
        }
        
        return $buttons;
      });
      
      add_editor_style(plugin_dir_url(dirname(__FILE__)) . 'tinymce-plugins/kunta-api-sidebar/editor.css');
      
      wp_enqueue_style('kunta_api_service_embed', plugin_dir_url(dirname(__FILE__)) . 'tinymce-plugins/kunta-api-service-embed/plugin.css' );
      wp_enqueue_style('kunta_api_service_location_embed', plugin_dir_url(dirname(__FILE__)) . 'tinymce-plugins/kunta-api-service-location-channel-embed/plugin.css' );
      wp_enqueue_style('kunta_api_sidebar', plugin_dir_url(dirname(__FILE__)) . 'tinymce-plugins/kunta-api-sidebar/plugin.css' );
    });
  }
?>