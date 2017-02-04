<?php
  namespace KuntaAPI\Services;
  
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once(__DIR__ . '/../vendor/autoload.php');
  require_once(__DIR__ . '/service-loader.php');
  require_once(__DIR__ . '/service-mapper.php');
  require_once(__DIR__ . '/page-renderer.php');
  
  if (!class_exists( 'KuntaAPI\Services\Updater' ) ) {
  	
    class Updater {
      
      private $renderer;
      private $mapper;
      private $serviceTrashBatch = 10;
      
      public function __construct() {
      	$this->renderer = new \KuntaAPI\Services\PageRenderer();
      	$this->mapper = new \KuntaAPI\Services\Mapper();
      	
      	add_action('kunta_api_service_updater_poll', array($this, 'poll'));
      	add_action('kunta_api_check_removed_services', array($this, 'checkRemovedServices'));
      }
      
      public function startPolling() {
      	if (! wp_next_scheduled ( 'kunta_api_service_updater_poll' )) {
          wp_schedule_event(time(), 'Minutely', 'kunta_api_service_updater_poll');
        }
        
        if (! wp_next_scheduled ( 'kunta_api_check_removed_services' )) {
        	wp_schedule_event(time(), 'Minutely', 'kunta_api_check_removed_services');
        }
      }
      
      public function poll() {
      	$locationChannelsPath = \KuntaAPI\Core\CoreSettings::getValue('locationChannelsPath');
      	
        $offset = get_option('kunta-api-sync-offset');
      	if (empty($offset)) {
          $offset = 0;
        }
        
      	$services = Loader::listOrganizationServices($offset, 10);
      	foreach ($services as $service) {
      	  if (!empty($locationChannelsPath)) {
      	    $locationChanneldParentPageId = $this->resolveLocationChannelParentPageId($locationChannelsPath);
      	  	$this->updateServiceLocationChannels($locationChanneldParentPageId, $service->getId());
      	  }
      	  
      	  $this->updateService($service);
      	}
      	
        if(count($services) == 0) {
          $offset = 0;
        } else {
          $offset += 10;
        }
        
        update_option('kunta-api-sync-offset', $offset);
      }
      
      public function checkRemovedServices() {
        $offset = get_option('kunta-api-service-trash-offset');
      	if (empty($offset)) {
          $offset = 0;
        }
        
        error_log("Checking removed services from $offset");
        
        $serviceMapping = array_slice($this->mapper->getServiceMapping(), $offset, $this->serviceTrashBatch, true);
        
        foreach ($serviceMapping as $serviceId => $pageId) {
          error_log("Checking $serviceId");
        	
          try {
            \KuntaAPI\Core\Api::getServicesApi()->findService($serviceId);
          } catch (\KuntaAPI\ApiException $e) {
          	if ($e->getCode() == 404) {
          	  wp_trash_post($pageId);
      	      $this->mapper->setServicePageId($serviceId, $pageId);
      	      error_log("Service $serviceId has been removed, trashed associated page $pageId");
      	    }
          }
        }
        
        if(count($serviceMapping) == 0) {
          $offset = 0;
        } else {
          $offset += $this->serviceTrashBatch;
        }
        
        update_option('kunta-api-service-trash-offset', $offset);
      }
      
      private function resolveLocationChannelParentPageId($path) {
      	$slugs = explode('/', $path);
      	$pageSlugs = [];
      	$parentId = 0;
      	
      	foreach ($slugs as $slug) {
      	  if (!empty($slug)) {
      		$pageSlugs[] = $slug;
      	    $pagePath = implode('/', $pageSlugs);
      	    $page = get_page_by_path($pagePath);
      	    if (!isset($page)) {
      	  	  $parentId = wp_insert_post(array(
      	  	    'post_type' => 'page',
      	  	  	'post_status' => 'publish',
      	  	    'post_title' => $slug,
      	  	    'post_parent' => $parentId
      	  	  ));
      	    } else {
      	  	  $parentId = $page->ID;
      	    }
      	  }
      	}
      	
      	return $parentId;
      }
      
      private function updateService($service) {
      	$serviceId = $service->getId();
      	$defaultPageId = $this->mapper->getServicePageId($serviceId);
      	if (!$defaultPageId) {
      	  $title = \KuntaAPI\Core\LocaleHelper::getDefaultValue($service->getNames());
      	  $content = $this->renderServicePage(\KuntaAPI\Core\LocaleHelper::getCurrentLanguage(), $service);
      	  $pageId = $this->createPage(0, $title, $content);
      	  $this->mapper->setServicePageId($serviceId, $pageId);
      	}
      }
      
      private function updateServiceLocationChannels($parentPageId, $serviceId) {
      	$serviceLocationChannels = Loader::listServiceLocationServiceChannels($serviceId);
      	foreach ($serviceLocationChannels as $serviceLocationChannel) {
      	  $this->updateServiceLocationChannel($parentPageId, $serviceId, $serviceLocationChannel);
        }
      }
      
      private function updateServiceLocationChannel($parentPageId, $serviceId, $serviceLocationChannel) {
      	$serviceLocationChannelId = $serviceLocationChannel->getId();
      	$defaultPageId = $this->mapper->getLocationChannelPageId($serviceId, $serviceLocationChannelId);
      	if (!$defaultPageId) {
      	  $title = \KuntaAPI\Core\LocaleHelper::getDefaultValue($serviceLocationChannel->getNames());
      	  $content = $this->renderServiceLocationChannelPage(\KuntaAPI\Core\LocaleHelper::getCurrentLanguage(), $serviceId, $serviceLocationChannel);
      	  $pageId = $this->createPage($parentPageId, $title, $content);
      	  $this->mapper->setLocationChannelPageId($serviceId, $serviceLocationChannelId, $pageId);
      	}
      }
      
      private function renderServicePage($lang, $service) {
      	return $this->renderer->renderServicePage($lang, $service);
      }
      
      private function renderServiceLocationChannelPage($lang, $serviceId, $serviceLocationChannel) {
      	return $this->renderer->renderLocationChannelPage($lang, $serviceId, $serviceLocationChannel);
      }
      
      private function createPage($parentPageId, $title, $content) {
        return wp_insert_post(array(
      	  'post_content' => $content,
      	  'post_title' => $title,
      	  'post_status' => 'draft',
      	  'post_type' => 'page',
          'post_parent' => $parentPageId	
      	));
      }

    }
    
  }
  
  $updater = new Updater();
  $updater->startPolling();
?>