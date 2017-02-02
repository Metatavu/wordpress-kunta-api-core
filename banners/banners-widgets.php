<?php
  namespace KuntaAPI\Banners;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Banners\BannersWidgets' ) ) {
    
    class BannersWidgets {
      
      public function __construct() {
        add_action ('add_meta_boxes', [$this, 'addMetaBoxes'], 9999, 2 );
        add_action ('save_post', [$this, 'saveLink']);
      }
      
      public function addMetaBoxes() {
      	add_meta_box('banner-link-meta-box', __( 'Banner Link', 'kunta_api_core' ), [$this, 'bannerRenderMetaBox'], 'banner', 'side', 'default');
      }
      
      public function bannerRenderMetaBox($banner) {
        $link = get_post_meta($banner->ID, "banner-link", true);
        echo '<input name="banner-link" id="banner-link" type="url" style="width: 100%;" value="' . $link . '"></input>';
      }
  
      public function  saveLink($bannerId) {
        if (array_key_exists('banner-link', $_POST)) {
          update_post_meta($bannerId, 'banner-link', $_POST['banner-link']);
        }
      }
    }
  
  }
  
  add_action('init', function () {
    new BannersWidgets();
  });
  
?>