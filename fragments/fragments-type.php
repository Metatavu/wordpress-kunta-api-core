<?php
  defined ( 'ABSPATH' ) || die ( 'No script kiddies please!' );

  add_action ('init', function () {
	
  register_post_type ('fragment', [
    'labels' => [
      'name'               => __( 'Fragments', 'kunta_api_core' ),
      'singular_name'      => __( 'Fragment', 'kunta_api_core' ),
      'add_new'            => __( 'Add Fragment', 'kunta_api_core' ),
      'add_new_item'       => __( 'Add New Fragment', 'kunta_api_core' ),
      'edit_item'          => __( 'Edit Fragment', 'kunta_api_core' ),
      'new_item'           => __( 'New Fragment', 'kunta_api_core' ),
      'view_item'          => __( 'View Fragment', 'kunta_api_core' ),
      'search_items'       => __( 'Search Fragments', 'kunta_api_core' ),
      'not_found'          => __( 'No Fragments found', 'kunta_api_core' ),
      'not_found_in_trash' => __( 'No Fragments in trash', 'kunta_api_core' ),
      'menu_name'          => __( 'Fragments', 'kunta_api_core' ),
      'all_items'          => __( 'Fragments', 'kunta_api_core' )
    ],
    'public' => true,
    'has_archive' => true,
    'show_in_rest' => true,
    'supports' => [
      'title',
      'editor'
    ]
  ]);
  
  add_action('admin_menu', function () {
  	if (!\KuntaAPI\Core\CoreSettings::getBooleanValue('fragmentsEnabled')) {
  		remove_menu_page('edit.php?post_type=fragment');
  	}
  });
  
});
?>