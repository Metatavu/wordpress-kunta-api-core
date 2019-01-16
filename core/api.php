<?php
  namespace KuntaAPI\Core;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
    
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Core\Api' ) ) {
    
    /**
     * Kunta API client
     * 
     * @author Antti Leppä
     */  
    class Api {
      
      /**
       * Returns new instance of AnnouncementsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\AnnouncementsApi
       */
      public static function getAnnouncementsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\AnnouncementsApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of BannersApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\BannersApi
       */
      public static function getBannersApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\BannersApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of ElectronicServiceChannelsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\ElectronicServiceChannelsApi
       */
      public static function getElectronicServiceChannelsApi($ptv7Compatibility = true) {
      	return new \KuntaAPI\Api\ElectronicServiceChannelsApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of EventsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\EventsApi
       */
      public static function getEventsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\EventsApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of FilesApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\FilesApi
       */
      public static function getFilesApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\FilesApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of JobsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\JobsApi
       */
      public static function getJobsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\JobsApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of MenusApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\MenusApi
       */
      public static function getMenusApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\MenusApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of NewsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\NewsApi
       */
      public static function getNewsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\NewsApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of OrganizationServicesApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\OrganizationServicesApi
       */
      public static function getOrganizationServicesApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\OrganizationServicesApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of OrganizationsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\OrganizationsApi
       */
      public static function getOrganizationsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\OrganizationsApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of PagesApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\PagesApi
       */
      public static function getPagesApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\PagesApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of PhoneServiceChannelsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\PhoneServiceChannelsApi
       */
      public static function getPhoneServiceChannelsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\PhoneServiceChannelsApi(self::getClient($ptv7Compatibility));
      }

      /**
       * Returns new instance of PrintableFormServiceChannelsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\PrintableFormServiceChannelsApi
       */
      public static function getPrintableFormServiceChannelsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\PrintableFormServiceChannelsApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of ServiceCategoriesApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\ServiceCategoriesApi
       */
      public static function getServiceCategoriesApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\ServiceCategoriesApi(self::getClient($ptv7Compatibility));
      }
  
      /**
       * Returns new instance of ServiceChannelsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\ServiceChannelsApi
       */
      public static function getServiceChannelsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\ServiceChannelsApi(self::getClient($ptv7Compatibility));
      }
  
      /**
       * Returns new instance of ServiceDataApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\ServiceDataApi
       */
      public static function getServiceDataApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\ServiceDataApi(self::getClient($ptv7Compatibility));
      }

      /**
       * Returns new instance of ServiceLocationServiceChannelsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\ServiceLocationServiceChannelsApi ServiceLocationServiceChannelsApi
       */
      public static function getServiceLocationServiceChannelsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\ServiceLocationServiceChannelsApi(self::getClient($ptv7Compatibility));
      }

      /**
       * Returns new instance of ServicesApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\ServicesApi
       */
      public static function getServicesApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\ServicesApi(self::getClient($ptv7Compatibility));
      }
  
      /**
       * Returns new instance of ServicesSourcesApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\ServicesSourcesApi
       */
      public static function getServicesSourcesApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\ServicesSourcesApi(self::getClient($ptv7Compatibility));
      }
  
      /**
       * Returns new instance of SettingsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\SettingsApi
       */
      public static function getSettingsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\SettingsApi(self::getClient($ptv7Compatibility));
      }
  
      /**
       * Returns new instance of SourcesApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\SourcesApi
       */
      public static function getSourcesApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\SourcesApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of TilesApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\TilesApi
       */
      public static function getTilesApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\TilesApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of WebPageServiceChannelsApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\WebPageServiceChannelsApi WebPageServiceChannelsApi
       */
      public static function getWebPageServiceChannelsApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\WebPageServiceChannelsApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns new instance of CodesApi
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Api\CodesApi CodesApi
       */
      public static function getCodesApi($ptv7Compatibility = true) {
        return new \KuntaAPI\Api\CodesApi(self::getClient($ptv7Compatibility));
      }
      
      /**
       * Returns configuration
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\Configuration configuration
       */
      private function getConfiguration($ptv7Compatibility) {
        $result = \KuntaAPI\Configuration::getDefaultConfiguration();
        $result->setHost(\KuntaAPI\Core\CoreSettings::getValue("apiUrl"));
        $result->setUsername(\KuntaAPI\Core\CoreSettings::getValue("apiUser"));
        $result->setPassword(\KuntaAPI\Core\CoreSettings::getValue("apiPassword"));

        if (!$ptv7Compatibility) {
          $result->addDefaultHeader("Kunta-API-PTV7-Compatibility", "false");
        }

        return $result;
      }
      
      /**
       * Returns new client
       * 
       * @param boolean $ptv7Compatibility whether to use PTV 7 compatibility mode
       * @return \KuntaAPI\ApiClient API client
       */
      private function getClient($ptv7Compatibility) {
        return new \KuntaAPI\ApiClient(self::getConfiguration($ptv7Compatibility));
      }
      
    }
  }
  
?>