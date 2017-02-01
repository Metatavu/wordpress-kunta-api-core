<?php
defined ( 'ABSPATH' ) || die ( 'No script kiddies please!' );

add_action ('init', 'kuntaApiBannersCreatePostType' );
add_action ('add_meta_boxes', 'kuntaApiBannerMetaBox', 9999, 2 );
add_action ('save_post', 'kuntaApiBannerSaveLink');

function kuntaApiBannersCreatePostType() {

  register_post_type ( 'banner', array (
      'labels' => array (
          'name'               => __( 'Header Banners', 'kunta_api_core' ),
          'singular_name'      => __( 'Header Banner', 'kunta_api_core' ),
          'add_new'            => __( 'Add Banner', 'kunta_api_core' ),
          'add_new_item'       => __( 'Add New Banner', 'kunta_api_core' ),
          'edit_item'          => __( 'Edit Banner', 'kunta_api_core' ),
          'new_item'           => __( 'New Banner', 'kunta_api_core' ),
          'view_item'          => __( 'View Banner', 'kunta_api_core' ),
          'search_items'       => __( 'Search Banners', 'kunta_api_core' ),
          'not_found'          => __( 'No Banners found', 'kunta_api_core' ),
          'not_found_in_trash' => __( 'No Banners in trash', 'kunta_api_core' ),
          'menu_name'          => __( 'Banners', 'kunta_api_core' ),
          'all_items'          => __( 'Banners', 'kunta_api_core' )
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
function kuntaApiBannerRenderMetaBox($banner) {
  $link = get_post_meta($banner->ID, "banner-link", true);
  echo '<input name="banner-link" id="banner-link" type="url" style="width: 100%;" value="' . $link . '"></input>';
}
function kuntaApiBannerMetaBox() {
  add_meta_box(
      'banner-link-meta-box',
      __( 'Banner Link', 'kunta_api_core' ),
      'kuntaApiBannerRenderMetaBox',
      'banner',
      'side',
      'default'
      );
}
function kuntaApiBannerSaveLink($bannerId) {
  if (array_key_exists('banner-link', $_POST)) {
    update_post_meta($bannerId, 'banner-link', $_POST['banner-link']);
  }
}
function kuntaApiBannerRestGet( $object, $field_name, $request) {
  return get_post_meta( $object[ 'id' ], $field_name, true);
}

add_action('rest_api_init', function () {
  register_rest_field( 'banner', 'banner-link', array(
      'get_callback' => 'kuntaApiBannerRestGet',
      'update_callback' => null,
      'schema' => array (
          "type" => "string",
          "format" => "url",
          "description" => "Banner link"
      )
  ));
});

?>