<?php
  namespace KuntaAPI\Incidents;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  add_action ('init', function () {
    register_post_type('incident', array (
      'labels' => array (
        'name'               => __( 'Header Incidents', KUNTA_API_CORE_I18N_DOMAIN),
        'singular_name'      => __( 'Header Incident', KUNTA_API_CORE_I18N_DOMAIN),
        'add_new'            => __( 'Add Incident', KUNTA_API_CORE_I18N_DOMAIN),
        'add_new_item'       => __( 'Add New Incident', KUNTA_API_CORE_I18N_DOMAIN),
        'edit_item'          => __( 'Edit Incident', KUNTA_API_CORE_I18N_DOMAIN),
        'new_item'           => __( 'New Incident', KUNTA_API_CORE_I18N_DOMAIN),
        'view_item'          => __( 'View Incident', KUNTA_API_CORE_I18N_DOMAIN),
        'search_items'       => __( 'Search Incidents', KUNTA_API_CORE_I18N_DOMAIN),
        'not_found'          => __( 'No Incidents found', KUNTA_API_CORE_I18N_DOMAIN),
        'not_found_in_trash' => __( 'No Incidents in trash', KUNTA_API_CORE_I18N_DOMAIN),
        'menu_name'          => __( 'Incidents', KUNTA_API_CORE_I18N_DOMAIN),
        'all_items'          => __( 'Incidents', KUNTA_API_CORE_I18N_DOMAIN)
      ),
      'menu_icon' => 'dashicons-megaphone',
      'public' => true,
      'has_archive' => true,
      'show_in_rest' => true,
      'supports' => [ 'title' ]
    ));
  });
  
  add_action('admin_menu', function () {
  	if (!\KuntaAPI\Core\CoreSettings::getBooleanValue('incidentsEnabled')) {
  		remove_menu_page('edit.php?post_type=incident');
  	}
  });
  
?>