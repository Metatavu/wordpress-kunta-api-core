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
      
      public function getLocationChannelPageId($locationChannelId) {
      	$mapping = $this->getLocationChannelMapping();
      	return $mapping[$locationChannelId];
      }
      
      public function setLocationChannelPageId($locationChannelId, $pageId) {
      	$mapping = $this->getLocationChannelMapping();
      	$mapping[$locationChannelId] = $pageId;
      	$this->setLocationChannelOptionValue($mapping);
      }
      
      private function getServiceMapping() {
      	$value = $this->getServiceOptionValue();
      	return empty($value) ? [] : $value;
      }
      
      private function getServiceOptionValue() {
      	return get_option('kunta-api-service-pages');
      }
      
      private function setServiceOptionValue($value) {
      	update_option('kunta-api-service-pages', $value);
      }

      private function getLocationChannelMapping() {
      	$value = $this->getLocationChannelOptionValue();
      	return empty($value) ? [] : $value;
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