<?php
  namespace KuntaAPI\Pages;
  
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');

  if (!class_exists( 'KuntaAPI\Pages\Loader' ) ) {
  	
    class Loader {
      
      private static $pages = [];
    	 
      public static function listOrganizationChildPages($parentId) {
        $organizationId = \KuntaAPI\Core\CoreSettings::getValue('organizationId');
        return \KuntaAPI\Core\Api::getPagesApi()->listOrganizationPages($organizationId, $parentId);
      }
      
      public static function findOrganizationPage($pageId) {
      	if(!isset(static::$pages[$pageId])) {
      	  $organizationId = \KuntaAPI\Core\CoreSettings::getValue('organizationId');
      	  static::$pages[$pageId] = \KuntaAPI\Core\Api::getPagesApi()->findOrganizationPage($organizationId, $pageId);
      	}
      	return static::$pages[$pageId];
      }
  
    }
    
  }

?>