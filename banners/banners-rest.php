<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Banners\BannersRest' ) ) {
    
    class BannersRest {
      
      public function __construct() {
        register_rest_field( 'banner', 'banner-link', [
          'get_callback' => [$this, 'getBannerMeta'],
          'update_callback' => null,
          'schema' => [
            "type" => "string",
        	"format" => "url",
        	"description" => "Banner link"
          ]
        ]);
        
        register_rest_field( 'banner', 'banner-text-color', [
          'get_callback' => [$this, 'getBannerMeta'],
          'update_callback' => null,
          'schema' => [
        	"type" => "string",
        	"description" => "Banner text color"
          ] 
        ]);
        
        register_rest_field( 'banner', 'banner-background-color', [
          'get_callback' => [$this, 'getBannerMeta'],
          'update_callback' => null,
          'schema' => [
        	"type" => "string",
        	"description" => "Banner background color"
          ] 
        ]);
        
        register_rest_field( 'banner', 'banner-hide-title', [
          'get_callback' => [$this, 'getBannerMetaBoolean'],
          'update_callback' => null,
          'schema' => [
        	"type" => "boolean",
        	"description" => "Banner hide title"
          ] 
        ]);
      }

      public function getBannerMeta($object, $field_name) {
      	$value = get_post_meta($object[ 'id' ], $field_name, true);
      	if ($value) {
      	  return $value;
      	}
      	
      	return null;
      }

      public function getBannerMetaBoolean($object, $field_name) {
      	return "true" == $this->getBannerMeta($object, $field_name);
      }
      
    }
  
  }
  
  add_action('rest_api_init', function () {
    new BannersRest();
  });
  
?>