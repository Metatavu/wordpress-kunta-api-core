<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
    
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Pages\BannerImageLoader' ) ) {
    
    class BannerImageLoader {
       
      public static function getPageBannerImageId($pageId) {
      	$imageId = get_post_meta($pageId, 'kunta_api_banner_image', true);
      	if ($imageId && get_post($imageId)) {
      	  return $imageId;
      	}

      	return null;
      }
      
      public static function getParentBannerImageId($pageId) {
      	if (!$pageId) {
      	  return null;
      	}
      	
      	$page = get_post($pageId);
      	
      	if ($page) {
          $parentId = $page->post_parent;
      	  while ($parentId) {
      	    $page = get_post($parentId);
      	    $imageId = static::getPageBannerImageId($parentId);
      	    if ($imageId) {
      	      return $imageId;
      	    }
      		 
      	    $parentId = $page ? $page->post_parent : null;
      	  }
      	}
      	 
      	return null;
      }
    }
  
  }
  
?>