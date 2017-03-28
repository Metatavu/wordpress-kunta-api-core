<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  add_action ('init', function () {
    register_post_type('shortlink', array (
      'labels' => array (
        'name'               => __( 'Header Shortlinks', KUNTA_API_CORE_I18N_DOMAIN),
        'singular_name'      => __( 'Header Shortlink', KUNTA_API_CORE_I18N_DOMAIN),
        'add_new'            => __( 'Add Shortlink', KUNTA_API_CORE_I18N_DOMAIN),
        'add_new_item'       => __( 'Add New Shortlink', KUNTA_API_CORE_I18N_DOMAIN),
        'edit_item'          => __( 'Edit Shortlink', KUNTA_API_CORE_I18N_DOMAIN),
        'new_item'           => __( 'New Shortlink', KUNTA_API_CORE_I18N_DOMAIN),
        'view_item'          => __( 'View Shortlink', KUNTA_API_CORE_I18N_DOMAIN),
        'search_items'       => __( 'Search Shortlinks', KUNTA_API_CORE_I18N_DOMAIN),
        'not_found'          => __( 'No Shortlinks found', KUNTA_API_CORE_I18N_DOMAIN),
        'not_found_in_trash' => __( 'No Shortlinks in trash', KUNTA_API_CORE_I18N_DOMAIN),
        'menu_name'          => __( 'Shortlinks', KUNTA_API_CORE_I18N_DOMAIN),
        'all_items'          => __( 'Shortlinks', KUNTA_API_CORE_I18N_DOMAIN)
      ),
      'menu_icon' => 'dashicons-admin-links',
      'public' => true,
      'has_archive' => true,
      'show_in_rest' => true,
      'supports' => ['title']
    ));
  });
  
  add_action('admin_menu', function () {
  	if (!\KuntaAPI\Core\CoreSettings::getBooleanValue('shortlinksEnabled')) {
  		remove_menu_page('edit.php?post_type=shortlink');
  	}
  });
  
?>