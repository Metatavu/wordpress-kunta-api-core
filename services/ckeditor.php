<?php
defined( 'ABSPATH' ) || die( 'No script kiddies please!' );

if (is_admin()) {
  add_action('init', function() {
    add_filter('ckeditor_external_plugins', function ($plugins) {
      $plugins['kunta-api-services'] = plugin_dir_url(dirname(__FILE__)) . 'ckeditor-plugins/kunta-api-services/plugin.js';
      $plugins['kunta-api-service-locations'] = plugin_dir_url(dirname(__FILE__)) . 'ckeditor-plugins/kunta-api-service-locations/plugin.js';
      return $plugins;
    });
  });
}
?>