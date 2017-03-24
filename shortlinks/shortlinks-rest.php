<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Shortlinks\ShortlinksRest' ) ) {
    
    class ShortlinksRest {
      
      public function __construct() {
        register_rest_field( 'shortlink', 'path', [
          'get_callback' => [$this, 'getShortlinkMeta'],
          'update_callback' => null,
          'schema' => [
            "type" => "string",
           	"description" => "Shortlink path"
          ]
        ]);
        
        register_rest_field( 'shortlink', 'url', [
          'get_callback' => [$this, 'getShortlinkMeta'],
          'update_callback' => null,
        	'schema' => [
        	  "type" => "string",
        		"format" => "url",
        		"description" => "Shortlink URL"
        	]
        ]);
      }

      public function getShortlinkMeta($object, $field_name) {
      	$value = get_post_meta($object[ 'id' ], $field_name, true);
      	if ($value) {
      	  return $value;
      	}
      	
      	return null;
      }
      
    }
  
  }
  
  add_action('rest_api_init', function () {
    new ShortlinksRest();
  });
  
?>