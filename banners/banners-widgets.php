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
        wp_enqueue_script('banners-widget', plugin_dir_url(__FILE__) . 'banners-widget.js', array( 'cs-wp-color-picker' ), false, true);
        wp_enqueue_style('wp-color-picker');
      }
      
      public function addMetaBoxes() {
      	add_meta_box('banner-properties-meta-box', __( 'Banner', 'kunta_api_core' ), [$this, 'renderBannerMetaBox'], 'banner', 'side', 'default');
      }
      
      public function renderBannerMetaBox($banner) {
      	$hideTitle = get_post_meta($banner->ID, "banner-hide-title", true) == "true";
      	$link = get_post_meta($banner->ID, "banner-link", true);
      	$textColor = get_post_meta($banner->ID, "banner-text-color", true);
      	$backgroundColor = get_post_meta($banner->ID, "banner-background-color", true);
      	 
      	$this->renderMetaBoxField(__( 'Hide Banner Title', KUNTA_API_CORE_I18N_DOMAIN ), "banner-hide-title", "checkbox", $hideTitle);
      	$this->renderMetaBoxField(__( 'Banner Link', KUNTA_API_CORE_I18N_DOMAIN ), "banner-link", "url", $link);
        $this->renderMetaBoxField(__( 'Banner Text Color', KUNTA_API_CORE_I18N_DOMAIN ), "banner-text-color", "text", $textColor);
        $this->renderMetaBoxField(__( 'Banner Background', KUNTA_API_CORE_I18N_DOMAIN ), "banner-background-color", "text", $backgroundColor);
      }
      
      private function renderMetaBoxField($title, $name, $type, $value) {
      	echo "<p>";
      	
      	switch ($type) {
      	  case 'checkbox':
      	  	echo sprintf('<input name="%s" id="%s" type="%s" value="true"%s/>&nbsp;', $name, $name, $type, $value ? ' checked="checked"' : '');
      	  	echo sprintf('<label for="%s">%s</label>',  $name, $title);
      	  break;
      	  default:
      	  	echo sprintf('<label for="%s">%s</label>',  $name, $title);
     	  	echo sprintf('<p><input name="%s" id="%s" type="%s" style="%s" value="%s"/></p>', $name, $name, $type, "width: 100%", $value);
      	  break;
      	}
      	
      	echo "</p>";
      }
      
      public function saveLink($bannerId) {
      	foreach (['banner-link', 'banner-text-color', 'banner-background-color', 'banner-hide-title'] as $key) {
      	  if (array_key_exists($key, $_POST)) {
      		update_post_meta($bannerId, $key, $_POST[$key]);
      	  } else {
      	  	delete_post_meta($bannerId, $key);
      	  }
        }
      }
    }
  
  }
  
  add_action('init', function () {
    new BannersWidgets();
  });
  
?>