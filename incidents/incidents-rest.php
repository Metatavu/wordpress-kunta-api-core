<?php
  namespace KuntaAPI\Incidents;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Incidents\IncidentsRest' ) ) {
    
    class IncidentsRest {
      
      public function __construct() {
        register_rest_field( 'incident', 'incident_type', [
          'get_callback' => [$this, 'getIncidentMeta'],
          'update_callback' => null,
          'schema' => [
            "type" => "string",
           	"description" => "Incident type"
          ]
        ]);
        
        register_rest_field( 'incident', 'description', [
          'get_callback' => [$this, 'getIncidentMeta'],
          'update_callback' => null,
          'schema' => [
            "type" => "string",
           	"description" => "Incident description"
          ]
        ]);
        
        register_rest_field( 'incident', 'details_link', [
          'get_callback' => [$this, 'getIncidentMeta'],
          'update_callback' => null,
          'schema' => [
            "type" => "string",
           	"description" => "Incident details link"
          ]
        ]);
        
        register_rest_field( 'incident', 'details_link_text', [
          'get_callback' => [$this, 'getIncidentMeta'],
          'update_callback' => null,
          'schema' => [
            "type" => "string",
           	"description" => "Incident details link text"
          ]
        ]);
        
        register_rest_field( 'incident', 'areas', [
          'get_callback' => [$this, 'getIncidentMetaTermArray'],
          'update_callback' => null,
        	'schema' => [
        	  "type" => "array",
            "items" => [
              "type" => "string"  
            ],
        		"description" => "Incident areas"
        	]
        ]);
        
        register_rest_field( 'incident', 'start_time', [
          'get_callback' => [$this, 'getIncidentMetaDateTime'],
          'update_callback' => null,
          'schema' => [
            "type" => "string",
            "format" => "date-time",
           	"description" => "Incident start time"
          ]
        ]);
        
        register_rest_field( 'incident', 'end_time', [
          'get_callback' => [$this, 'getIncidentMetaDateTime'],
          'update_callback' => null,
          'schema' => [
            "type" => "string",
            "format" => "date-time",
           	"description" => "Incident end time"
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
      
      public function getIncidentMetaTermArray($object, $field_name) {
        $result = [];
        
        $value = $this->getIncidentMeta($object, $field_name);
        if ($value) {
          if (!is_array($value)) {
            return $result;
          }
          
          foreach ($value as $termId) {
            $term = get_term(intval($termId));
            if ($term) {
              $result[] = $term->name;
            }
          }
        }
        
        return $result;
      }
      
      public function getIncidentMetaDateTime($object, $field_name) {
        $value = $this->getIncidentMeta($object, $field_name);
        if ($value) {
          return date("Y-m-d\TH:i:s", strtotime($value));
        }
        
        return null;
      }
      
      
    }
  
  }
  
  add_action('rest_api_init', function () {
    new IncidentsRest();
  });
  
?>