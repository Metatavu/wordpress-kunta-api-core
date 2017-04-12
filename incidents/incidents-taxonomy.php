<?php
  namespace KuntaAPI\Incidents;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  add_action('init', function () {
  	register_taxonomy('incident-areas', 'incident', [
  	  'label' => __( 'Incident Areas', KUNTA_API_CORE_I18N_DOMAIN),
  	  'rewrite' => array( 'slug' => 'incident-areas' ),
  	  'show_ui' => true,
  	  'show_in_menu' => true,
  	  'show_in_nav_menus' => false,
  	  'show_in_rest' => true,
  	  'show_in_quick_edit' => false,
  	  'meta_box_cb' => false
  	]);
  	
  });
  
?>
