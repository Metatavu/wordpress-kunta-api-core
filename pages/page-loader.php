<?php
  namespace KuntaAPI\Pages;
  
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');

  if (!class_exists( 'KuntaAPI\Pages\Loader' ) ) {
  	
    class Loader {
      
      private static $pages = [];
    	 
      public static function listOrganizationChildPages($organizationId, $parentId) {
        return \KuntaAPI\Core\Api::getPagesApi(true)->listOrganizationPages($organizationId, $parentId);
      }
      
      public static function findOrganizationPage($organizationId, $pageId) {
      	if (!isset(static::$pages[$pageId])) {
      	  static::$pages[$pageId] = \KuntaAPI\Core\Api::getPagesApi(true)->findOrganizationPage($organizationId, $pageId);
      	}
        
      	return static::$pages[$pageId];
      }
  
    }
    
  }

?>