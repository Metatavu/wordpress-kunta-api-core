<?php
  namespace KuntaAPI\Services\ServiceLocations;
  
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../../vendor/autoload.php');
  
  if (!class_exists( 'KuntaAPI\Services\ServiceLocations\ServiceLocationComponentRenderer' ) ) {
    
    class ServiceLocationComponentRenderer {
      
      public function __construct() { }

      public function renderShortCodeComponent($lang, $serviceLocationChannel, $component) {
        $model = [
          'lang' => $lang,
          'serviceLocationChannel' => $serviceLocationChannel
        ];
        
        return \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-location-components/$component.twig", $model);
      }
      
      public function renderComponent($lang, $service, $serviceLocationChannel, $component) {
        $model = [
          'lang' => $lang,
          'service' => $service,
          'serviceId' => $service->getId(),
          'serviceLocationChannel' => $serviceLocationChannel
        ];
        
        return \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-location-components/$component.twig", $model);
      }
      
    }  
  }
?>