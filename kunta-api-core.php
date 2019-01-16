<?php
/*
 * Created on Oct 21, 2016
 * Plugin Name: Kunta API Core
 * Description: Core functionalities for Kunta API integrations
 * Version: 0.9.0
 * Author: Metatavu Oy
 * Text Domain: kunta_api_core
 */

  defined ( 'ABSPATH' ) || die ( 'No script kiddies please!' );
  
  if (!defined('KUNTA_API_CORE_I18N_DOMAIN')) {
    define('KUNTA_API_CORE_I18N_DOMAIN', 'kunta_api_core');
  }
  
  if (!defined('KUNTA_API_CORE_PLUGIN_VERSION')) {
    define('KUNTA_API_CORE_PLUGIN_VERSION', '0.9.0');
  }
  
  require_once( __DIR__ . '/updates.php');
  require_once( __DIR__ . '/vendor/autoload.php');
  require_once( __DIR__ . '/twig/twig-loader.php');
  require_once( __DIR__ . '/core/schedules.php');
  require_once( __DIR__ . '/core/locale-helper.php');
  require_once( __DIR__ . '/core/settings.php');
  require_once( __DIR__ . '/core/api.php');
  require_once( __DIR__ . '/core/kses.php');
  require_once( __DIR__ . '/core/tinymce.php');
  require_once( __DIR__ . '/core/abstract-content-processor.php');
  require_once( __DIR__ . '/core/page-processor.php');
  require_once( __DIR__ . '/core/ajax.php');
  require_once( __DIR__ . '/services/services.php');
  require_once( __DIR__ . '/fragments/fragments.php');
  require_once( __DIR__ . '/announcements/announcements.php');
  require_once( __DIR__ . '/tiles/tiles.php');
  require_once( __DIR__ . '/menus/kunta-api-menus.php');
  require_once( __DIR__ . '/banners/banners.php');
  require_once( __DIR__ . '/shortlinks/shortlinks.php');
  require_once( __DIR__ . '/pages/pages.php');
  require_once( __DIR__ . '/id-mappings/pages/page-mappings-rest.php');
  require_once( __DIR__ . '/incidents/incidents.php');
  require_once( __DIR__ . '/contacts/contacts.php');
  require_once( __DIR__ . '/jobs/jobs.php');
  require_once( __DIR__ . '/patches/patches.php');
  require_once( __DIR__ . '/webhooks/webhooks.php');
  require_once( __DIR__ . '/reorder/reorder.php');
  require_once( __DIR__ . '/news/news.php');
  require_once( __DIR__ . '/gutenberg/gutenberg.php');

  add_action('init', function () {
    do_action('kunta_api_init');
  });

  add_action('plugins_loaded', function() {
    load_plugin_textdomain( KUNTA_API_CORE_I18N_DOMAIN, false, dirname( plugin_basename(__FILE__) ) . '/lang/' );
  });

?>
