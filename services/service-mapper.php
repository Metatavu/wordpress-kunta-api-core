<?php
  namespace KuntaAPI\Services;
  
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!class_exists( 'KuntaAPI\Services\Mapper' ) ) {
    class Mapper {
      
      public function __construct() {
      }
      
      public function getServicePageId($serviceId) {
      	$mapping = $this->getServiceMapping();
      	return $mapping[$serviceId];
      }
      
      public function setServicePageId($serviceId, $pageId) {
      	$mapping = $this->getServiceMapping();
      	$mapping[$serviceId] = $pageId;
      	$this->setServiceOptionValue($mapping);
      }
      
      public function getLocationChannelPageId($serviceId, $locationChannelId) {
      	$mapping = $this->getLocationChannelMapping();
      	return $mapping["$serviceId|$locationChannelId"];
      }
      
      public function setLocationChannelPageId($serviceId, $locationChannelId, $pageId) {
      	$mapping = $this->getLocationChannelMapping();
      	$mapping["$serviceId|$locationChannelId"] = $pageId;
      	$this->setLocationChannelOptionValue($mapping);
      }
      
      public function getServiceMapping() {
      	$value = $this->getServiceOptionValue();
      	return empty($value) ? [] : $value;
      }

      public function getLocationChannelMapping() {
      	$value = $this->getLocationChannelOptionValue();
      	return empty($value) ? [] : $value;
      }
      
      private function getServiceOptionValue() {
      	return get_option('kunta-api-service-pages');
      }
      
      private function setServiceOptionValue($value) {
      	update_option('kunta-api-service-pages', $value);
      }
      
      private function getLocationChannelOptionValue() {
      	return get_option('kunta-api-location-channel-pages');
      }
      
      private function setLocationChannelOptionValue($value) {
      	update_option('kunta-api-location-channel-pages', $value);
      }
      
    }  
  }
  

?>