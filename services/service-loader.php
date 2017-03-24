<?php
  namespace KuntaAPI\Services;
  
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');

  if (!class_exists( 'KuntaAPI\Services\Loader' ) ) {
  	
    class Loader {
      
      private static $services = [];
      private static $electronicChannels = [];
      private static $phoneChannels = [];
      private static $printableFormChannels = [];
      private static $serviceLocationChannels = [];
      private static $webPageChannels = [];
      
      public static function listOrganizationServices($firstResult, $maxResults) {
        $organizationId = \KuntaAPI\Core\CoreSettings::getValue('organizationId');
        $organizationServices = [];
        try {
          $organizationServices = \KuntaAPI\Core\Api::getOrganizationServicesApi()->listOrganizationOrganizationServices($organizationId, $firstResult, $maxResults);
        } catch (\KuntaAPI\ApiException $e) {
          error_log("Organization services listing failed with following message: " . $e->getMessage());
        }
        
        $serviceList = [];
        foreach ($organizationServices as $organizationService) {
          $serviceId = $organizationService->getServiceId();
          if (!in_array($serviceId, $serviceList)) {
            $serviceList[] = $serviceId;
          }
        }
        $services = [];
        foreach ($serviceList as $id) {
          $service = static::findService($id);
          if (isset($service)) {
            $services[] = $service;
          }
        }
        return $services;
      }
      
      public static function findElectronicServiceChannel($serviceId, $id) {
        if(!isset(static::$electronicChannels[$id])) {
          try {
            static::$electronicChannels[$id] = \KuntaAPI\Core\Api::getElectronicServiceChannelsApi()->findElectronicServiceChannel($id);
          } catch (\KuntaAPI\ApiException $e) {
            error_log("findElectronicServiceChannel failed with following message: " . $e->getMessage());
          }
        }
        
        return static::$electronicChannels[$id];
      }
      
      public static function findPhoneServiceChannel($serviceId, $id) {
        if(!isset(static::$phoneChannels[$id])) {
          try {
            static::$phoneChannels[$id] = \KuntaAPI\Core\Api::getPhoneServiceChannelsApi()->findPhoneServiceChannel($id);
          } catch (\KuntaAPI\ApiException $e) {
        	error_log("findPhoneServiceChannel failed with following message: " . $e->getMessage());
          }
        }
        return static::$phoneChannels[$id];
      }
      
      public static function findPrintableFormServiceChannel($serviceId, $id) {
        if(!isset(static::$printableFormChannels[$id])) {
          try {
            static::$printableFormChannels[$id] = \KuntaAPI\Core\Api::getPrintableFormServiceChannelsApi()->findPrintableFormServiceChannel($id);
          } catch (\KuntaAPI\ApiException $e) {
            error_log("findPrintableFormServiceChannel failed with following message: " . $e->getMessage());
          }	
        }
        
        return static::$printableFormChannels[$id];
      }
      
      public static function findServiceLocationServiceChannel($serviceId, $id) {
        if(!isset(static::$serviceLocationChannels[$id])) {
          try {
            static::$serviceLocationChannels[$id] = \KuntaAPI\Core\Api::getServiceLocationServiceChannelsApi()->findServiceLocationServiceChannel($id);
          } catch (\KuntaAPI\ApiException $e) {
        	error_log("findServiceLocationServiceChannel failed with following message: " . $e->getMessage());
          }
        }
        
        return static::$serviceLocationChannels[$id];
      }
      
      public static function listServiceLocationServiceChannels($serviceId) {
      	try {
          $service = \KuntaAPI\Core\Api::getServicesApi()->findService($serviceId);
          $result = [];
          
          if (!empty($service)) {
            foreach ($service->getServiceLocationServiceChannelIds() as $channelId) {
              $result[] = static::findServiceLocationServiceChannel($serviceId, $channelId);
            }
          }
          
          return $result;
        } catch (\KuntaAPI\ApiException $e) {
          error_log("listServiceLocationServiceChannels failed with following message: " . $e->getMessage());
        }
        
        return [];
      }
      
      public static function listElectronicServiceChannels($serviceId) {
      	try {
          $service = \KuntaAPI\Core\Api::getServicesApi()->findService($serviceId);
          $result = [];
          
          if (!empty($service)) {
            foreach ($service->getElectronicServiceChannelIds() as $channelId) {
              $result[] = static::findElectronicServiceChannel($serviceId, $channelId);
            }
          }
          
          return $result;
        } catch (\KuntaAPI\ApiException $e) {
          error_log("listElectronicServiceChannels failed with following message: " . $e->getMessage());
        }
        
        return [];
      }
      
      public static function listPhoneServiceChannels($serviceId) {
      	try {
          $service = \KuntaAPI\Core\Api::getServicesApi()->findService($serviceId);
          $result = [];
          
          if (!empty($service)) {
            foreach ($service->getPhoneServiceChannelIds() as $channelId) {
              $result[] = static::findPhoneServiceChannel($serviceId, $channelId);
            }
          }
          
          return $result;
        } catch (\KuntaAPI\ApiException $e) {
          error_log("listPhoneServiceChannels failed with following message: " . $e->getMessage());
        }
        
        return [];
      }
      
      public static function listPrintableFormServiceChannels($serviceId) {
      	try {
          $service = \KuntaAPI\Core\Api::getServicesApi()->findService($serviceId);
          $result = [];
          
          if (!empty($service)) {
            foreach ($service->getPrintableFormServiceChannelIds() as $channelId) {
              $result[] = static::findPrintableFormServiceChannel($serviceId, $channelId);
            }
          }
          
          return $result;
        } catch (\KuntaAPI\ApiException $e) {
          error_log("listPrintableFormServiceChannels failed with following message: " . $e->getMessage());
        }
        
        return [];
      }
      
      public static function listWebPageServiceChannels($serviceId) {
      	try {
          $service = \KuntaAPI\Core\Api::getServicesApi()->findService($serviceId);
          $result = [];
          
          if (!empty($service)) {
            foreach ($service->getWebPageServiceChannelIds() as $channelId) {
              $result[] = static::findWebPageServiceChannel($serviceId, $channelId);
            }
          }
          
          return $result;
        } catch (\KuntaAPI\ApiException $e) {
          error_log("listWebPageServiceChannels failed with following message: " . $e->getMessage());
        }
        
        return [];
      }
    
      public static function findWebPageServiceChannel($serviceId, $id) {
        if(!isset(static::$webPageChannels[$id])) {
          try {
            static::$webPageChannels[$id] = \KuntaAPI\Core\Api::getWebPageServiceChannelsApi()->findWebPageServiceChannel($id);
          } catch (\KuntaAPI\ApiException $e) {
        	error_log("findWebPageServiceChannel failed with following message: " . $e->getMessage());
          }
        }
        
        return static::$webPageChannels[$id];
      }
      
      public static function findService($id) {
        if(!isset(static::$services[$id])) {
          try {
            static::$services[$id] = \KuntaAPI\Core\Api::getServicesApi()->findService($id);
            static::$services[$id]['electronicChannels'] = [];
            static::$services[$id]['phoneChannels'] = [];
            static::$services[$id]['printableFormChannels'] = [];
            static::$services[$id]['serviceLocationChannels'] = [];
            static::$services[$id]['webPageChannels'] = [];
            
            try {
              static::$services[$id]['electronicChannels'] = static::listElectronicServiceChannels($id);
            } catch (\KuntaAPI\ApiException $e) {
        	  error_log("listServiceElectronicChannels failed with following message: " . $e->getMessage());
            }
            
            try {
              static::$services[$id]['phoneChannels'] = static::listPhoneServiceChannels($id);
            } catch (\KuntaAPI\ApiException $e) {
              error_log("listServicePhoneChannels failed with following message: " . $e->getMessage());
            }
            
            try {
              static::$services[$id]['printableFormChannels'] = static::listPrintableFormServiceChannels($id);
            } catch (\KuntaAPI\ApiException $e) {
              error_log("listServicePrintableFormChannels failed with following message: " . $e->getMessage());
            }
            
            try {
              static::$services[$id]['serviceLocationChannels'] = static::listServiceLocationServiceChannels($id);
            } catch (\KuntaAPI\ApiException $e) {
              error_log("listServiceServiceLocationChannels failed with following message: " . $e->getMessage());
            }
            
            try {
              static::$services[$id]['webPageChannels'] = static::listWebPageServiceChannels($id);
            } catch (\KuntaAPI\ApiException $e) {
              error_log("listServiceWebPageChannels failed with following message: " . $e->getMessage());
            }
            
            static::cacheServiceChannelsFromService(static::$services[$id]);
          } catch (\KuntaAPI\ApiException $e) {
        	error_log("findService failed with following message: " . $e->getMessage());
          }
        }
        return static::$services[$id];
      }

      private static function cacheServiceChannelsFromService($service) {
        foreach ($service['electronicChannels'] as $electronicChannel) {
          static::$electronicChannels[$electronicChannel->getId()] = $electronicChannel;
        }
        foreach ($service['phoneChannels'] as $phoneChannel) {
          static::$phoneChannels[$phoneChannel->getId()] = $phoneChannel;
        }
        foreach ($service['printableFormChannels'] as $printableFormChannel) {
          static::$printableFormChannels[$printableFormChannel->getId()] = $printableFormChannel;
        }
        foreach ($service['serviceLocationChannels'] as $serviceLocationChannel) {
          static::$serviceLocationChannels[$serviceLocationChannel->getId()] = $serviceLocationChannel;
        }
        foreach ($service['webPageChannels'] as $webPageChannel) {
          static::$webPageChannels[$webPageChannel->getId()] = $webPageChannel;
        }
      }
    }
    
  }

?>