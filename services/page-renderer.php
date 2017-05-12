<?php
  namespace KuntaAPI\Services;
    
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!class_exists( 'KuntaAPI\Services\PageRenderer' ) ) {
    class PageRenderer {
      
      public function __construct() { }
      
      public function renderServicePage($lang, $service) {
        $serviceId = $service->getId();
        return \KuntaAPI\Twig\TwigLoader::getTwig()->render("pages/service.twig", [
          'lang' => $lang,
          'serviceId' => $serviceId,
          'service' => $service,
          'electronicChannels' => $service['electronicChannels'],
          'phoneChannels' => $service['phoneChannels'],
          'printableFormChannels' => $service['printableFormChannels'],
          'serviceLocationChannels' => $service['serviceLocationChannels'],
          'webPageChannels' => $service['webPageChannels']
        ]);
      }

      public function renderLocationChannelPage($lang, $serviceLocationChannel) {
      	return \KuntaAPI\Twig\TwigLoader::getTwig()->render('pages/service-location-channel.twig', [
      	  'serviceLocationChannel' => $serviceLocationChannel,
      	  'lang' => $lang
      	]);
      }
      
    }  
  }
?>