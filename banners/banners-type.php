<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  add_action ('init', function () {
    register_post_type ( 'banner', array (
      'labels' => array (
        'name'               => __( 'Header Banners', KUNTA_API_CORE_I18N_DOMAIN),
        'singular_name'      => __( 'Header Banner', KUNTA_API_CORE_I18N_DOMAIN),
        'add_new'            => __( 'Add Banner', KUNTA_API_CORE_I18N_DOMAIN),
        'add_new_item'       => __( 'Add New Banner', KUNTA_API_CORE_I18N_DOMAIN),
        'edit_item'          => __( 'Edit Banner', KUNTA_API_CORE_I18N_DOMAIN),
        'new_item'           => __( 'New Banner', KUNTA_API_CORE_I18N_DOMAIN),
        'view_item'          => __( 'View Banner', KUNTA_API_CORE_I18N_DOMAIN),
        'search_items'       => __( 'Search Banners', KUNTA_API_CORE_I18N_DOMAIN),
        'not_found'          => __( 'No Banners found', KUNTA_API_CORE_I18N_DOMAIN),
        'not_found_in_trash' => __( 'No Banners in trash', KUNTA_API_CORE_I18N_DOMAIN),
        'menu_name'          => __( 'Banners', KUNTA_API_CORE_I18N_DOMAIN),
        'all_items'          => __( 'Banners', KUNTA_API_CORE_I18N_DOMAIN)
      ),
      'public' => true,
      'has_archive' => true,
      'show_in_rest' => true,
      'supports' => array (
        'title',
        'editor',
        'thumbnail'
      )
    ));
  });
  
  add_action('admin_menu', function () {
  	if (!\KuntaAPI\Core\CoreSettings::getBooleanValue('bannersEnabled')) {
  		remove_menu_page('edit.php?post_type=banner');
  	}
  });
  
?>