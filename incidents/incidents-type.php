<?php
  namespace KuntaAPI\Incidents;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  add_action ('init', function () {
    register_post_type('incident', array (
      'labels' => array (
        'name'               => __( 'Incidents', KUNTA_API_CORE_I18N_DOMAIN),
        'singular_name'      => __( 'Incident', KUNTA_API_CORE_I18N_DOMAIN),
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
      'supports' => [ 'title' ],
      'capability_type' => 'incident',
      'capabilities' => [
        'publish_posts' => 'publish_incidents',
        'edit_posts' => 'edit_incidents',
        'edit_others_posts' => 'edit_others_incidents',
        'delete_posts' => 'delete_incidents',
        'delete_others_posts' => 'delete_others_incidents',
        'read_private_posts' => 'read_private_incidents',
        'edit_post' => 'edit_incident',
        'delete_post' => 'delete_incident',
        'read_post' => 'read_incident',
      ]
    ));
  });
  
  add_action('admin_menu', function () {
    if (!\KuntaAPI\Core\CoreSettings::getBooleanValue('incidentsEnabled')) {
      remove_menu_page('edit.php?post_type=incident');
    }
  });
  
  add_filter( 'map_meta_cap', function ($capabilities, $capability, $user_id, $args) {
   if ('edit_incident' == $capability || 'delete_incident' == $capability || 'read_incident' == $capability) {
      $capabilities = [];
      $post = get_post($args[0]);
      $post_type = get_post_type_object($post->post_type);
      
	    if ('edit_incident' == $capability) {
	      if ($user_id == $post->post_author) {
  	      $capabilities[] = $post_type->cap->edit_posts;
	      } else {
	        $capabilities[] = $post_type->cap->edit_others_posts;
	      }
	    } elseif ( 'delete_incident' == $capability) {
	      if ($user_id == $post->post_author) {
	        $capabilities[] = $post_type->cap->delete_posts;
	      } else { 
	      	$capabilities[] = $post_type->cap->delete_others_posts;
	      }
	    } elseif ('read_incident' == $capability) {
	      if ('private' != $post->post_status) {
	        $capabilities[] = 'read';
        } elseif ($user_id == $post->post_author) {
          $capabilities[] = 'read';
        } else {
	        $capabilities[] = $post_type->cap->read_private_posts;
        }
	    }
    }
    
	  return $capabilities;
  }, 10, 10);

?>