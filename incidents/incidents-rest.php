<?php
  namespace KuntaAPI\Incidents;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Incidents\IncidentsRest' ) ) {
    
    class IncidentsRest {
      
      public function __construct() {
        register_rest_field( 'incident', 'path', [
          'get_callback' => [$this, 'getIncidentMeta'],
          'update_callback' => null,
          'schema' => [
            "type" => "string",
           	"description" => "Incident path"
          ]
        ]);
        
        register_rest_field( 'incident', 'url', [
          'get_callback' => [$this, 'getIncidentMeta'],
          'update_callback' => null,
        	'schema' => [
        	  "type" => "string",
        		"format" => "url",
        		"description" => "Incident URL"
        	]
        ]);
      }

      public function getIncidentMeta($object, $field_name) {
      	$value = get_post_meta($object[ 'id' ], $field_name, true);
      	if ($value) {
      	  return $value;
      	}
      	
      	return null;
      }
      
    }
  
  }
  
  add_action('rest_api_init', function () {
    new IncidentsRest();
  });
  
?>