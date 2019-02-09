<?php
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  if (is_admin()) {
  	add_action('init', function() {
      $metaformUrl = '//cdn.metatavu.io/libs/metaform-fields/0.7.0';
      
      add_filter('mce_external_plugins', function($plugins) {
        $plugins['noneditable'] = '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.10/plugins/noneditable/plugin.min.js';
        $plugins['magicline'] = '//cdn.metatavu.io/libs/tinymce-plugins/magicline/1.2.3/plugin.min.js';
        return $plugins;
      });

      add_filter( 'tiny_mce_before_init', function ($settings) {
        $settings['magicline_targetedItems'] = "['DIV','IMG','INPUT']";
        return $settings;
      });
      
      wp_enqueue_style('font_awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' );
      add_editor_style(plugin_dir_url(dirname(__FILE__)) . 'tinymce-plugins/tinymce-styles.css');

      wp_register_script('moment', "//cdn.metatavu.io/libs/moment/2.17.1/moment-with-locales.js");
      wp_register_script('metaform-form', "$metaformUrl/js/form.js");
      wp_register_script('metaform-utils', "$metaformUrl/js/form-utils.js");
      wp_register_script('metaform-modernizr', "$metaformUrl/js/modernizr.js");
      wp_register_script('metaform-client', "$metaformUrl/js/metaform-client.min.js", ['jquery', 'jquery-ui-dialog', 'jquery-ui-tabs', 'metaform-form', 'metaform-utils', 'metaform-modernizr']);
      
      wp_register_style('jquery-ui', '//cdn.metatavu.io/libs/jquery-ui/1.12.1/jquery-ui.min.css');
      wp_register_style('metaform', '//cdn.metatavu.io/libs/metaform-fields/0.6.6/css/form.min.css');
      wp_register_style('flatpickr', '//cdn.metatavu.io/libs/flatpickr/4.0.6/flatpickr.min.css');
      wp_register_script('flatpickr', '//cdn.metatavu.io/libs/flatpickr/4.0.6/flatpickr.min.js');
      wp_register_script('flatpickr-fi', '//cdn.metatavu.io/libs/flatpickr/4.0.6/l10n/fi.js');
      
      wp_register_script('kunta-api-abstract-edit-plugin-dialog', plugin_dir_url(dirname(__FILE__)) . 'tinymce-plugins/kunta-api-abstract-edit-plugin-dialog/abstract-edit-dialog.js', ['jquery', 'jquery-ui-dialog', 'jquery-ui-tabs', 'metaform-form', 'metaform-utils', 'metaform-modernizr']);
      wp_register_script('kunta-api-abstract-channel-edit-plugin-dialog', plugin_dir_url(dirname(__FILE__)) . 'tinymce-plugins/kunta-api-abstract-edit-plugin-dialog/abstract-channel-edit-dialog.js', ['kunta-api-abstract-edit-plugin-dialog']);

      wp_enqueue_script('flatpickr');
      wp_enqueue_script('flatpickr-fi');
      wp_enqueue_style('flatpickr');
        
      wp_enqueue_style('jquery-ui');
      wp_enqueue_style('metaform');
      wp_enqueue_script('moment');
      wp_enqueue_script('metaform-client');
      wp_enqueue_script('kunta-api-abstract-channel-edit-plugin-dialog');
    });
  }
?>