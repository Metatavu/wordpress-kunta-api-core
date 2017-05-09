<?php
  namespace KuntaAPI\Services\ServiceChannels;
		
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../../vendor/autoload.php');
  require_once( __DIR__ . '/../../core/twig-extension.php');
  
  if (!class_exists( 'KuntaAPI\Services\ServiceChannelRenderer' ) ) {
    class ServiceChannelRenderer {
      
      private $twig;
      
      public function __construct() {
        $this->twig = new \Twig_Environment(new \Twig_Loader_Filesystem( __DIR__ . '/../../templates'));
        $this->twig->addExtension(new \KuntaAPI\Services\TwigExtension());
      }
  
      public function renderElectronicChannels($serviceId, $electronicChannels, $lang) {
        return $this->twig->render("service-components/electronic-service-channels.twig", [
          'serviceId' => $serviceId,
          'lang' => $lang,
          'electronicChannels' => $electronicChannels
        ]);
      }
      
      public function renderPhoneChannels($serviceId, $phoneChannels, $lang) {
        return $this->twig->render("service-components/phone-service-channels.twig", [
          'serviceId' => $serviceId, 
          'phoneChannels' => $phoneChannels,
          'lang' =>	$lang
        ]);
      }
      
      public function renderPrintableFormChannels($serviceId, $printableFormChannels, $lang) {
      	return $this->twig->render("service-components/printable-form-service-channels.twig", [
      	  'serviceId' => $serviceId,
      	  'lang' => $lang,
      	  'printableFormChannels' => $printableFormChannels
      	]);
      }
      
      public function renderServiceLocationChannels($serviceId, $serviceLocationChannels, $lang) {
      	return $this->twig->render("service-components/service-location-service-channels.twig", [
      	  'serviceId' => $serviceId,
      	  'lang' => $lang,
      	  'serviceLocationChannels' => $serviceLocationChannels
      	]);
      }
      
      public function renderWebPageChannels($serviceId, $webPageChannels, $lang) {
      	return $this->twig->render("service-components/webpage-service-channels.twig", [
      	  'serviceId' => $serviceId,
      	  'lang' => $lang,
      	  'webPageChannels' => $webPageChannels
      	]);
      }
      
    }  
  }
?>