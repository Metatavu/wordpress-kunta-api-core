<?php
  namespace KuntaAPI\Services\ServiceLocations;
  
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../../vendor/autoload.php');
  require_once( __DIR__ . '/../../core/twig-extension.php');
  
  if (!class_exists( 'KuntaAPI\Services\ServiceLocations\ServiceLocationComponentRenderer' ) ) {
    
    class ServiceLocationComponentRenderer {
      
      private $twig;
      
      public function __construct() {
        $this->twig = new \Twig_Environment(new \Twig_Loader_Filesystem( __DIR__ . '/../../templates'));
        $this->twig->addExtension(new \KuntaAPI\Services\TwigExtension());
      }

      public function renderShortCodeComponent($lang, $serviceLocationChannel, $component) {
        $model = [
          'lang' => $lang,
          'serviceLocationChannel' => $serviceLocationChannel
        ];
        
        return $this->twig->render("service-location-components/$component.twig", $model);
      }
      
      public function renderComponent($lang, $service, $serviceLocationChannel, $component) {
        $model = [
          'lang' => $lang,
          'service' => $service,
          'serviceId' => $service->getId(),
          'serviceLocationChannel' => $serviceLocationChannel
        ];
        
        return $this->twig->render("service-location-components/$component.twig", $model);
      }
      
    }  
  }
?>