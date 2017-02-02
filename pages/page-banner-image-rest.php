<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  require_once( __DIR__ . '/page-banner-image-loader.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Pages\BannerImageRest' ) ) {
    
    class BannerImageRest {
      
      public function __construct() {
      	register_rest_field('page', 'banner-image', array(
      	  'get_callback' => [$this, 'getBannerImage'],
      	  'update_callback' => null,
      	  'schema' => [
      	    'type' => 'integer',
            'format' => 'int64',
      		'description' => "Banner image"
      	  ]
      	));
      }
      
      public function getBannerImage($page) {
      	$imageId = BannerImageLoader::getPageBannerImageId($page['id']);
      	if (!$imageId) {
      	  $imageId = BannerImageLoader::getParentBannerImageId($page['id']);
      	}
      	
      	return (int) $imageId;
      }
    }
  
  }
  
  add_action('rest_api_init', function () {
  	new BannerImageRest();
  });
  
?>