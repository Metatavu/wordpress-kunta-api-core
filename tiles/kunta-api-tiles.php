<?php
defined ( 'ABSPATH' ) || die ( 'No script kiddies please!' );

add_action ('init', 'kuntaApiTilesCreatePostType' );
add_action ('add_meta_boxes', 'kuntaApiTileMetaBox', 9999, 2 );
add_action ('save_post', 'kuntaApiTileSaveLink');

function kuntaApiTilesCreatePostType() {
  register_post_type ( 'tile', array (
      'labels' => array (
          'name'               => __( 'Header Tiles', 'kunta_api_core' ),
          'singular_name'      => __( 'Header Tile', 'kunta_api_core' ),
          'add_new'            => __( 'Add Tile', 'kunta_api_core' ),
          'add_new_item'       => __( 'Add New Tile', 'kunta_api_core' ),
          'edit_item'          => __( 'Edit Tile', 'kunta_api_core' ),
          'new_item'           => __( 'New Tile', 'kunta_api_core' ),
          'view_item'          => __( 'View Tile', 'kunta_api_core' ),
          'search_items'       => __( 'Search Tiles', 'kunta_api_core' ),
          'not_found'          => __( 'No Tiles found', 'kunta_api_core' ),
          'not_found_in_trash' => __( 'No Tiles in trash', 'kunta_api_core' ),
          'menu_name'          => __( 'Tiles', 'kunta_api_core' ),
          'all_items'          => __( 'Tiles', 'kunta_api_core' )
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

}

function kuntaApiTileRenderMetaBox($tile) {
  $link = get_post_meta($tile->ID, "tile-link", true);
  echo '<input name="tile-link" id="tile-link" type="url" style="width: 100%;" value="' . $link . '"></input>';
}

function kuntaApiTileMetaBox() {
  add_meta_box(
      'tile-link-meta-box',
      __( 'Tile Link', 'kunta_api_core' ),
      'kuntaApiTileRenderMetaBox',
      'tile',
      'side',
      'default'
      );
}

function kuntaApiTileSaveLink($tileId) {
  if (array_key_exists('tile-link', $_POST)) {
    update_post_meta($tileId, 'tile-link', $_POST['tile-link']);
  }
}

function kuntaApiTileRestGet( $object, $field_name, $request) {
  return get_post_meta( $object[ 'id' ], $field_name, true);
}

add_action('rest_api_init', function () {
  register_rest_field( 'tile', 'tile-link', array(
      'get_callback' => 'kuntaApiTileRestGet',
      'update_callback' => null,
      'schema' => array (
          "type" => "string",
          "format" => "url",
          "description" => "Tile link"
      )
  ));

});
?>