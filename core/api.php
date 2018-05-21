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
       * @return \KuntaAPI\Api\AnnouncementsApi
       */
      public static function getAnnouncementsApi() {
        return new \KuntaAPI\Api\AnnouncementsApi(self::getClient());
      }
      
      /**
       * Returns new instance of BannersApi
       * 
       * @return \KuntaAPI\Api\BannersApi
       */
      public static function getBannersApi() {
        return new \KuntaAPI\Api\BannersApi(self::getClient());
      }
      
      /**
       * Returns new instance of ElectronicServiceChannelsApi
       * 
       * @return \KuntaAPI\Api\ElectronicServiceChannelsApi
       */
      public static function getElectronicServiceChannelsApi() {
      	return new \KuntaAPI\Api\ElectronicServiceChannelsApi(self::getClient());
      }
      
      /**
       * Returns new instance of EventsApi
       * 
       * @return \KuntaAPI\Api\EventsApi
       */
      public static function getEventsApi() {
        return new \KuntaAPI\Api\EventsApi(self::getClient());
      }
      
      /**
       * Returns new instance of FilesApi
       * 
       * @return \KuntaAPI\Api\FilesApi
       */
      public static function getFilesApi() {
        return new \KuntaAPI\Api\FilesApi(self::getClient());
      }
      
      /**
       * Returns new instance of JobsApi
       * 
       * @return \KuntaAPI\Api\JobsApi
       */
      public static function getJobsApi() {
        return new \KuntaAPI\Api\JobsApi(self::getClient());
      }
      
      /**
       * Returns new instance of MenusApi
       * 
       * @return \KuntaAPI\Api\MenusApi
       */
      public static function getMenusApi() {
        return new \KuntaAPI\Api\MenusApi(self::getClient());
      }
      
      /**
       * Returns new instance of NewsApi
       * 
       * @return \KuntaAPI\Api\NewsApi
       */
      public static function getNewsApi() {
        return new \KuntaAPI\Api\NewsApi(self::getClient());
      }
      
      /**
       * Returns new instance of OrganizationServicesApi
       * 
       * @return \KuntaAPI\Api\OrganizationServicesApi
       */
      public static function getOrganizationServicesApi() {
        return new \KuntaAPI\Api\OrganizationServicesApi(self::getClient());
      }
      
      /**
       * Returns new instance of OrganizationsApi
       * 
       * @return \KuntaAPI\Api\OrganizationsApi
       */
      public static function getOrganizationsApi() {
        return new \KuntaAPI\Api\OrganizationsApi(self::getClient());
      }
      
      /**
       * Returns new instance of PagesApi
       * 
       * @return \KuntaAPI\Api\PagesApi
       */
      public static function getPagesApi() {
        return new \KuntaAPI\Api\PagesApi(self::getClient());
      }
      
      /**
       * Returns new instance of PhoneServiceChannelsApi
       * 
       * @return \KuntaAPI\Api\PhoneServiceChannelsApi
       */
      public static function getPhoneServiceChannelsApi() {
        return new \KuntaAPI\Api\PhoneServiceChannelsApi(self::getClient());
      }

      /**
       * Returns new instance of PrintableFormServiceChannelsApi
       * 
       * @return \KuntaAPI\Api\PrintableFormServiceChannelsApi
       */
      public static function getPrintableFormServiceChannelsApi() {
        return new \KuntaAPI\Api\PrintableFormServiceChannelsApi(self::getClient());
      }
      
      /**
       * Returns new instance of ServiceCategoriesApi
       * 
       * @return \KuntaAPI\Api\ServiceCategoriesApi
       */
      public static function getServiceCategoriesApi() {
        return new \KuntaAPI\Api\ServiceCategoriesApi(self::getClient());
      }
  
      /**
       * Returns new instance of ServiceChannelsApi
       * 
       * @return \KuntaAPI\Api\ServiceChannelsApi
       */
      public static function getServiceChannelsApi() {
        return new \KuntaAPI\Api\ServiceChannelsApi(self::getClient());
      }
  
      /**
       * Returns new instance of ServiceDataApi
       * 
       * @return \KuntaAPI\Api\ServiceDataApi
       */
      public static function getServiceDataApi() {
        return new \KuntaAPI\Api\ServiceDataApi(self::getClient());
      }

      /**
       * Returns new instance of ServiceLocationServiceChannelsApi
       * 
       * @return \KuntaAPI\Api\ServiceLocationServiceChannelsApi ServiceLocationServiceChannelsApi
       */
      public static function getServiceLocationServiceChannelsApi() {
        return new \KuntaAPI\Api\ServiceLocationServiceChannelsApi(self::getClient());
      }

      /**
       * Returns new instance of ServicesApi
       * 
       * @return \KuntaAPI\Api\ServicesApi
       */
      public static function getServicesApi() {
        return new \KuntaAPI\Api\ServicesApi(self::getClient());
      }
  
      /**
       * Returns new instance of ServicesSourcesApi
       * 
       * @return \KuntaAPI\Api\ServicesSourcesApi
       */
      public static function getServicesSourcesApi() {
        return new \KuntaAPI\Api\ServicesSourcesApi(self::getClient());
      }
  
      /**
       * Returns new instance of SettingsApi
       * 
       * @return \KuntaAPI\Api\SettingsApi
       */
      public static function getSettingsApi() {
        return new \KuntaAPI\Api\SettingsApi(self::getClient());
      }
  
      /**
       * Returns new instance of SourcesApi
       * 
       * @return \KuntaAPI\Api\SourcesApi
       */
      public static function getSourcesApi() {
        return new \KuntaAPI\Api\SourcesApi(self::getClient());
      }
      
      /**
       * Returns new instance of TilesApi
       * 
       * @return \KuntaAPI\Api\TilesApi
       */
      public static function getTilesApi() {
        return new \KuntaAPI\Api\TilesApi(self::getClient());
      }
      
      /**
       * Returns new instance of WebPageServiceChannelsApi
       * 
       * @return \KuntaAPI\Api\WebPageServiceChannelsApi WebPageServiceChannelsApi
       */
      public static function getWebPageServiceChannelsApi() {
        return new \KuntaAPI\Api\WebPageServiceChannelsApi(self::getClient());
      }
      
      /**
       * Returns new instance of CodesApi
       * 
       * @return \KuntaAPI\Api\CodesApi CodesApi
       */
      public static function getCodesApi() {
        return new \KuntaAPI\Api\CodesApi(self::getClient());
      }
      
      private function getConfiguration() {
       $result = \KuntaAPI\Configuration::getDefaultConfiguration();
       $result->setHost(\KuntaAPI\Core\CoreSettings::getValue("apiUrl"));
       $result->setUsername(\KuntaAPI\Core\CoreSettings::getValue("apiUser"));
       $result->setPassword(\KuntaAPI\Core\CoreSettings::getValue("apiPassword"));
       return $result;
      }
      
      private function getClient() {
        return new \KuntaAPI\ApiClient(self::getConfiguration());
      }
      
    }
  }
  
?>