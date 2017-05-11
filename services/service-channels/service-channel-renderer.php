<?php
  namespace KuntaAPI\Services\ServiceChannels;
		
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../../vendor/autoload.php');
  
  if (!class_exists( 'KuntaAPI\Services\ServiceChannelRenderer' ) ) {
    class ServiceChannelRenderer {
      
      public function __construct() { }
  
      public function renderElectronicChannels($serviceId, $electronicChannels, $lang) {
        return \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-components/electronic-service-channels.twig", [
          'serviceId' => $serviceId,
          'lang' => $lang,
          'electronicChannels' => $electronicChannels
        ]);
      }
      
      public function renderPhoneChannels($serviceId, $phoneChannels, $lang) {
        return \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-components/phone-service-channels.twig", [
          'serviceId' => $serviceId, 
          'phoneChannels' => $phoneChannels,
          'lang' =>	$lang
        ]);
      }
      
      public function renderPrintableFormChannels($serviceId, $printableFormChannels, $lang) {
      	return \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-components/printable-form-service-channels.twig", [
      	  'serviceId' => $serviceId,
      	  'lang' => $lang,
      	  'printableFormChannels' => $printableFormChannels
      	]);
      }
      
      public function renderServiceLocationChannels($serviceId, $serviceLocationChannels, $lang) {
      	return \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-components/service-location-service-channels.twig", [
      	  'serviceId' => $serviceId,
      	  'lang' => $lang,
      	  'serviceLocationChannels' => $serviceLocationChannels
      	]);
      }
      
      public function renderWebPageChannels($serviceId, $webPageChannels, $lang) {
      	return \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-components/webpage-service-channels.twig", [
      	  'serviceId' => $serviceId,
      	  'lang' => $lang,
      	  'webPageChannels' => $webPageChannels
      	]);
      }
      
    }  
  }
?>