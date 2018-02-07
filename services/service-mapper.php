<?php
  namespace KuntaAPI\Services;
  
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!class_exists( 'KuntaAPI\Services\Mapper' ) ) {
    
    class Mapper {
      
      public function __construct() {
      }
      
      /**
       * Returns related page for service id
       * 
       * @param String $serviceId service id
       * @return int related page id
       */
      public function getServicePageId($serviceId) {
      	$mapping = $this->getServicePageMapping();
      	return $mapping[$serviceId];
      }
      
      /**
       * Returns service id for page id
       * 
       * @param int $pageId page id
       * @return String service id
       */
      public function getPageServiceId($pageId) {
      	$mapping = $this->getServicePageMapping();
        
      	foreach ($mapping as $serviceId => $servicePageId) {
          if ($pageId === $servicePageId) {
            return $serviceId;
          }
        }
        
        return null;
      }
      
      /**
       * Returns service location service channel page id.
       * 
       * @param String $serviceLocationServiceChannelId service location service channel id
       * @return int page id
       */
      public function getServiceLocationServiceChannelPageId($serviceLocationServiceChannelId) {
      	$mapping = $this->getLocationChannelPageMapping();
      	return $mapping[$serviceLocationServiceChannelId];
      }
      
      /**
       * Returns service location service channel id for page id
       * 
       * @param int $pageId pageId
       * @return String service location service channel id
       */
      public function getPageServiceLocationServiceChannelId($pageId) {
      	$mapping = $this->getLocationChannelPageMapping();
        
      	foreach ($mapping as $serviceLocationServiceChannelId => $channelPageId) {
          if ($pageId === $channelPageId) {
            return $serviceLocationServiceChannelId;
          }
        }
        
        return null;
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
      
      /**
       * Returns service location service channel page id. Deprecated use getServiceLocationServiceChannelPageId instead
       * 
       * @deprecated
       * @param String $locationChannelId service location service channel id
       * @return int page id
       */
      public function getLocationChannelPageId($locationChannelId) {
      	return $this->getServiceLocationServiceChannelPageId($locationChannelId);
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
      	$result = $mapping[$locationChannelId];
      	return empty($result) ? [] : $result;
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