<?php
  namespace KuntaAPI\IdMappings\Pages;
  
  require_once( __DIR__ . '/../../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\IdMappings\PageMappingsRest' ) ) {
    
    class PageMappingsRest {

      public function __construct() {
        register_rest_route('kunta-api', '/pagemappings', array(
          array(
              'methods'  => \WP_REST_Server::READABLE,
              'callback' => array($this, 'getPageMappings')
          ),
          'schema' => array($this, 'getPageMappingSchema')
        ));
      }
      
      public function getPageMappings() {
      	$option = get_option('kunta-api-id-mappings-pages');
      	if (empty($option)) {
      	  return null;	
      	}
      	
        return json_decode($option);
      }

      public function getPageMappingSchema() {
        return array(
          "title" => "pagemappings",
          "properties" => array(
            "pagePath" => array (
                "type" => "string"
            ),
            "parentPath" => array (
                "type" => "string"
            )
          )
        );
      }
    }
  
  }
  
  add_action('rest_api_init', function () {
  	new PageMappingsRest();
  });
  
?>