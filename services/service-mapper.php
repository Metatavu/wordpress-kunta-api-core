<?php
  namespace KuntaAPI\Services;
  
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!class_exists( 'KuntaAPI\Services\Mapper' ) ) {
    class Mapper {
      
      public function __construct() {
      }
      
      public function getServicePageId($serviceId) {
      	$mapping = $this->getServicePageMapping();
      	return $mapping[$serviceId];
      }
      
      public function setServicePageId($serviceId, $pageId) {
      	$mapping = $this->getServicePageMapping();
      	if ($pageId) {
      	  $mapping[$serviceId] = $pageId;
        } else {
          unset($mapping[$serviceId]);
        }
      	
      	$this->setServicePagesOptionValue($mapping);
      }
      
      public function getLocationChannelPageId($locationChannelId) {
      	$mapping = $this->getLocationChannelPageMapping();
      	return $mapping[$locationChannelId];
      }
      
      public function setLocationChannelPageId($locationChannelId, $pageId) {
      	$mapping = $this->getLocationChannelPageMapping();
      	$key = $locationChannelId;
      	if ($pageId) {
          $mapping[$key] = $pageId;
      	} else {
      	  unset($mapping[$key]);
      	}
      	
      	$this->setLocationChannelPagesOptionValue($mapping);
      }
      
      public function getLocationChannelServiceIds($locationChannelId) {
      	$mapping = $this->getLocationChannelServiceMapping();
      	return $mapping[$locationChannelId];
      }
      
      public function getLocationChannnelServiceId($locationChannelId) {
      	$serviceIds = $this->getLocationChannelServiceIds($locationChannelId);
      	if (count($serviceIds) > 0) {
      	  return $serviceIds[0];
      	}
      	
      	return null;
      }
      
      public function addLocationChannelServiceId($locationChannelId, $serviceId) {
      	$mapping = $this->getLocationChannelServiceMapping();
      	
      	if (!isset($mapping[$locationChannelId])) {
      	  $mapping[$locationChannelId] = [ $serviceId ];
      	} else {
      	  if (!in_array($serviceId, $mapping[$locationChannelId])) {
      	  	$mapping[$locationChannelId][] = $serviceId;
      	  }
      	}
      	 
      	$this->setLocationChannelServicesOptionValue($mapping);
      }
      
      public function removeLocationChannelServiceId($locationChannelId, $serviceId) {
      	$mapping = $this->getLocationChannelServiceMapping();
      	
      	if (isset($mapping[$locationChannelId])) {
  		    $mapping[$locationChannelId] = array_diff($mapping[$locationChannelId], [$serviceId]);
      	}
      	 
      	$this->setLocationChannelServicesOptionValue($mapping);
      }
      
      public function getServicePageMapping() {
      	$value = $this->getServicePagesOptionValue();
      	return empty($value) ? [] : $value;
      }

      public function getLocationChannelPageMapping() {
      	$value = $this->getLocationChannelPagesOptionValue();
      	return empty($value) ? [] : $value;
      }

      public function getLocationChannelServiceMapping() {
      	$value = $this->getLocationChannelServicesOptionValue();
      	return empty($value) ? [] : $value;
      }
      
      private function getServicePagesOptionValue() {
      	return get_option('kunta-api-service-pages');
      }
      
      private function setServicePagesOptionValue($value) {
      	update_option('kunta-api-service-pages', $value);
      }
      
      private function getLocationChannelPagesOptionValue() {
      	return get_option('kunta-api-location-channel-pages');
      }
      
      private function setLocationChannelPagesOptionValue($value) {
      	update_option('kunta-api-location-channel-pages', $value);
      }
      
      private function getLocationChannelServicesOptionValue() {
      	return get_option('kunta-api-location-channel-services');
      }
      
      private function setLocationChannelServicesOptionValue($value) {
      	update_option('kunta-api-location-channel-services', $value);
      }
      
    }  
  }
  

?>