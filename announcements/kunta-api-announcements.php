<?php
defined ( 'ABSPATH' ) || die ( 'No script kiddies please!' );

add_action ('init', function () {
  register_post_type ( 'announcement', array (
      'labels' => array (
          'name'               => __( 'Header Announcements', 'kunta_api_core' ),
          'singular_name'      => __( 'Header Announcement', 'kunta_api_core' ),
          'add_new'            => __( 'Add Announcement', 'kunta_api_core' ),
          'add_new_item'       => __( 'Add New Announcement', 'kunta_api_core' ),
          'edit_item'          => __( 'Edit Announcement', 'kunta_api_core' ),
          'new_item'           => __( 'New Announcement', 'kunta_api_core' ),
          'view_item'          => __( 'View Announcement', 'kunta_api_core' ),
          'search_items'       => __( 'Search Announcements', 'kunta_api_core' ),
          'not_found'          => __( 'No Announcements found', 'kunta_api_core' ),
          'not_found_in_trash' => __( 'No Announcements in trash', 'kunta_api_core' ),
          'menu_name'          => __( 'Announcements', 'kunta_api_core' ),
          'all_items'          => __( 'Announcements', 'kunta_api_core' )
      ),
      'public' => true,
      'has_archive' => true,
      'show_in_rest' => true,
      'supports' => array (
          'title',
          'editor'
      )
  ));
});

?>