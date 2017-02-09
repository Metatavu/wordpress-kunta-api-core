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

 	    $batchSize = 5;
 	    $offset = $_GET['offset'];
 	    if (empty($offset)) {
 	      $offset = 0;
 	    }
 	    
 	    error_log("Regenerating service pages from $offset");
 	    $serviceMapping = array_slice($mapper->getServicePageMapping(), $offset, $batchSize, true);
 	    
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

 	    if (count($serviceMapping) == 0) {
 	      return null;
 	    } else {
 	      return sprintf("admin-post.php?action=kunta_api_tool_action&kunta_api_tool_action=kunta_api_regenerate_service_pages&offset=%d", $offset + $batchSize);
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
 	    
 	    $batchSize = 5;
 	    $offset = $_GET['offset'];
 	    if (empty($offset)) {
 	      $offset = 0;
 	    }
 	    
 	    error_log("Regenerating service location pages from $offset");
 	    $serviceLocationMapping = array_slice($mapper->getLocationChannelPageMapping(), $offset, $batchSize, true);
 	    
 	    foreach ($serviceLocationMapping as $serviceLocationId => $pageId) {
 	      $serviceId = $mapper->getLocationChannnelServiceId($serviceLocationId);
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

 	    if (count($serviceLocationMapping) == 0) {
 	      return null;
 	    } else {
 	      return sprintf("admin-post.php?action=kunta_api_tool_action&kunta_api_tool_action=kunta_api_regenerate_service_location_pages&offset=%d", $offset + $batchSize);
 	    }
      }
 	];
  });
 
?>
