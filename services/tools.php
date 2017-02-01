<?php
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once(__DIR__ . '/service-mapper.php');
  require_once(__DIR__ . '/page-renderer.php');
  
  add_action('kunta_api_core_tools', function () {
    global $kuntaApiTools;
    
 	$kuntaApiTools[] = [
      "name" => "kunta_api_regenerate_service_pages",
      "title" => __('Regenerate service pages', KUNTA_API_CORE_I18N_DOMAIN),
 	  "action" => function () {
 	    $mapper = new \KuntaAPI\Services\Mapper();
 	    $renderer = new \KuntaAPI\Services\PageRenderer();
 	    $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
 	    $serviceMapping = $mapper->getServiceMapping();
 	    
 	    foreach ($serviceMapping as $serviceId => $pageId) {
 	      $service = \KuntaAPI\Services\Loader::findService($serviceId);
 	      if (!isset($service)) {
 	      	error_log("Service $serviceId from page $pageId could not be loaded");
 	      } else {
 	      	$title = \KuntaAPI\Core\LocaleHelper::getDefaultValue($service->getNames());
 	      	$content = $renderer->renderServicePage($lang, $service);
 	      	$result = wp_update_post([
 	      	  'ID' => $pageId,
 	      	  'post_title' => $title,
 	      	  'post_content' => $content
 	      	]);
 	  		
 	  		if ($result) {
 	  		  error_log("Service $serviceId page $pageId regenerated succesfully");
 	  		} else {
 	  		  error_log("Service $serviceId page $pageId regeneration failed");
 	  		}
 	      }
 	    }
 	  }
    ];
 	
 	$kuntaApiTools[] = [
 	  "name" => "kunta_api_regenerate_service_location_pages",
 	  "title" => __('Regenerate service location pages', KUNTA_API_CORE_I18N_DOMAIN),
 	  "action" => function () {
        $mapper = new \KuntaAPI\Services\Mapper();
 	    $renderer = new \KuntaAPI\Services\PageRenderer();
 	    $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
 	    $serviceLocationMapping = $mapper->getLocationChannelMapping();
 	  
 	    foreach ($serviceLocationMapping as $id => $pageId) {
 	      $idParts = explode('|', $id);
 	      $serviceId = $idParts[0];
 	      $serviceLocationId = $idParts[1];
 	      
 	      $serviceLocationChannel = \KuntaAPI\Services\Loader::findServiceLocationServiceChannel($serviceId, $serviceLocationId);
 	  	  if (!isset($serviceLocationChannel)) {
 	  		error_log("Service $serviceId location $serviceLocationId from page $pageId could not be loaded");
 	  	  } else {
 	  		$title = \KuntaAPI\Core\LocaleHelper::getDefaultValue($serviceLocationChannel->getNames());
 	  		$content = $renderer->renderLocationChannelPage($lang, $serviceId, $serviceLocationChannel);
 	  		$result = wp_update_post([
 	  		  'ID' => $pageId,
 	  	      'post_title' => $title,
 	  	      'post_content' => $content
 	  		]);
 	  		
 	  		if ($result) {
 	  		  error_log("Service location channel $serviceId / $serviceLocationId page $pageId regenerated succesfully");
 	  		} else {
 	  		  error_log("Service location channel $serviceId / $serviceLocationId page $pageId regeneration failed");
 	  		}
 	  	  }
 	    }
      }
 	];
  });
 
?>
