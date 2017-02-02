<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
    
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Pages\BannerImageWidget' ) ) {
    
    class BannerImageWidget {
       
      public function __construct() {
      	wp_enqueue_script('page-banner-image', plugin_dir_url(__FILE__) . 'page-banner-image-widget.js');
      	add_action('add_meta_boxes', [$this, 'addMetaBoxes']);
      	add_action('save_post', [$this, 'save'], 10, 1 );
      }

      public function save($post_id) {
      	if (isset( $_POST['kunta_api_banner_image'] ) ) {
      		$imageId = (int) $_POST['kunta_api_banner_image'];
      		update_post_meta($post_id, 'kunta_api_banner_image', $imageId );
      	}
      }
      
      public function addMetaBoxes() {
      	add_meta_box('kunta_api_banner_image', __( 'Banner Image', KUNTA_API_CORE_I18N_DOMAIN ), [$this, 'renderMetaBox'], 'page', 'side', 'low');
      }
      
      public function renderMetaBox($post) {
      	$imageId = get_post_meta( $post->ID, 'kunta_api_banner_image', true);
      	$hasImage = $imageId && get_post($imageId);
      	$content = $this->renderMetaBoxImage($hasImage, $imageId);
      	$content .= $this->renderRemoveLink($hasImage);
      	$content .= $this->renderSetLink($hasImage);
      	$content .= $this->renderInput($hasImage, $imageId);
      	echo $content;
      }
      
      private function renderMetaBoxImage($hasImage, $imageId) {
      	if ($hasImage) {
      	  return wp_get_attachment_image($imageId); 
      	}
      	
      	return '<img style="max-width: 150px; border:0;display:none;" />';
      }
      
      private function renderRemoveLink($hasImage) {
        $link = sprintf('<a href="#" id="remove_kunta_api_banner" style="%s">%s</a>', $hasImage ? '' : 'display: none', esc_html__( 'Remove Banner Image', KUNTA_API_CORE_I18N_DOMAIN ));
      	return sprintf('<p class="hide-if-no-js">%s</p>', $link);
      }
      
      private function renderSetLink($hasImage) {
        $link = sprintf('<a href="#" id="set_kunta_api_banner" style="%s" data-file-frame-title="%s">%s</a>', $hasImage ? 'display: none' : '', esc_attr__( 'Choose an Banner Image', KUNTA_API_CORE_I18N_DOMAIN ), esc_html__( 'Set Banner Image', KUNTA_API_CORE_I18N_DOMAIN ));
      	return sprintf('<p class="hide-if-no-js">%s</p>', $link);
      }
      
      private function renderInput($hasImage, $imageId) {
      	return sprintf('<input type="hidden" id="upload_kunta_api_banner" name="kunta_api_banner_image" value="%s"/>', $hasImage ? $imageId : '');
      }
      
    }
  
  }
  
  if (is_admin()) {
  	add_action('init', function(){
  	  new BannerImageWidget(); 
  	});
  }
?>