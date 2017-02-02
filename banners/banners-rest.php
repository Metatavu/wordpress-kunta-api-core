<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Banners\BannersRest' ) ) {
    
    class BannersRest {
      
      public function __construct() {
        register_rest_field( 'banner', 'banner-link', array(
          'get_callback' => 'getBannerField',
          'update_callback' => null,
          'schema' => array (
            "type" => "string",
        	"format" => "url",
        	"description" => "Banner link"
          )
        ));
      }
      
      public function getBannerField($object, $field_name) {
      	return get_post_meta($object[ 'id' ], $field_name, true);
      }
    }
  
  }
  
  add_action('rest_api_init', function () {
    new BannersRest();
  });
  
?>