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
      
      public function __construct() {
      	$this->renderer = new \KuntaAPI\Services\PageRenderer();
      	$this->mapper = new \KuntaAPI\Services\Mapper();
        $this->offsets = [];
      	
      	add_action('kunta_api_synchronization', array($this, 'synchronize'));
      }

      private function getOffset($organizationId) {
        if (!array_key_exists($organizationId, $this->offsets)) {
          $offsetOption = 'kunta-api-sync-offset-services-' . $organizationId;
          $this->offsets[$organizationId] = get_option($offsetOption);
        }

        $offset = $this->offsets[$organizationId];
        if (empty($offset)) {
          $offset = 0;
        }

        return $offset;
      }

      private function setOffset($organizationId, $offset) {
        $offsetOption = 'kunta-api-sync-offset-services-' . $organizationId;
        update_option($offsetOption, $offset, false);
        $this->offsets[$organizationId] = $offset;
      }
      
      public function startPolling() {
      	if (! wp_next_scheduled ( 'kunta_api_synchronization' )) {
          wp_schedule_event(time(), 'Minutely', 'kunta_api_synchronization');
        }
      }
      
      public function synchronize() {
        foreach (\KuntaAPI\Core\CoreSettings::getOrganizationIdsWithSynchronization() as $organizationId) {
          $this->synchronizeOrganization($organizationId); 
        }
      }
      
      private function synchronizeOrganization($organizationId) {
        error_log("synchronizeOrganization $organizationId start");
          
        $locationChannelsPath = \KuntaAPI\Core\CoreSettings::getOrganizationServiceLocationChannnelsPath($organizationId);
        $locationChanneldParentPageId = $this->resolveLocationChannelParentPageId($locationChannelsPath);
        $synchronizeServices = \KuntaAPI\Core\CoreSettings::getOrganizationSynchronizeServices($organizationId);
        $synchronizeServiceLocations = \KuntaAPI\Core\CoreSettings::getOrganizationSynchronizeServiceLocationServiceChannels($organizationId);

        $offset = $this->getOffset($organizationId);
        
        error_log("synchronizeOrganization from offset $offset");

        $services = Loader::listOrganizationServices($organizationId, $offset, 10);
        foreach ($services as $service) {
          $this->synchronizeService($synchronizeServiceLocations, $synchronizeServices, $locationChanneldParentPageId, $service);
        }

        if(count($services) == 0) {
          $offset = 0;
        } else {
          $offset += 10;
        }

        error_log("synchronizeOrganization setting next offset to $offset");
        
        $this->setOffset($organizationId, $offset);

        error_log("synchronizeOrganization $organizationId end");
      }
      
      private function synchronizeService($synchronizeServiceLocations, $synchronizeServices, $locationChanneldParentPageId, $service) {
        if ($synchronizeServices) {
          $this->updateService($service);
        }

        if ($synchronizeServiceLocations) {
          $this->updateServiceLocationChannels($locationChanneldParentPageId, $service->getId());
        } else {
          error_log("Location channel path not defined, skipped service location channel synchronization");
        }
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
      	  	  $parentId = $this->createPage($parentId, $slug, '', 'publish');
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
      	  $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
      	  $title = \KuntaAPI\Core\LocaleHelper::getLocalizedValue($service["names"], $lang, "Name");
      	  $content = $this->renderServicePage($lang, $service);
      	  $pageId = $this->createPage(0, $title, $content);
      	  $this->mapper->setServicePageId($serviceId, $pageId);
      	}
      }
      
      private function updateServiceLocationChannels($parentPageId, $serviceId) {
      	error_log("Checking service location channels for service $serviceId");
      	
      	$serviceLocationChannels = Loader::listServiceLocationServiceChannels($serviceId);
      	foreach ($serviceLocationChannels as $serviceLocationChannel) {
      	  $this->updateServiceLocationChannel($parentPageId, $serviceId, $serviceLocationChannel);
        }
      }
      
      private function updateServiceLocationChannel($parentPageId, $serviceId, $serviceLocationChannel) {
      	$serviceLocationChannelId = $serviceLocationChannel->getId();
      	$defaultPageId = $this->mapper->getLocationChannelPageId($serviceLocationChannelId);
      	$this->mapper->addLocationChannelServiceId($serviceLocationChannelId, $serviceId);
      	
      	if (!$defaultPageId) {
      	  $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
      	  $title = \KuntaAPI\Core\LocaleHelper::getLocalizedValue($serviceLocationChannel["names"], $lang, "Name");
      	  $content = $this->renderServiceLocationChannelPage($lang, $serviceLocationChannel);
      	  $pageId = $this->createPage($parentPageId, $title, $content);
      	  $this->mapper->setLocationChannelPageId($serviceLocationChannelId, $pageId);
      	}
      }
      
      private function renderServicePage($lang, $service) {
      	return $this->renderer->renderServicePage($lang, $service);
      }
      
      private function renderServiceLocationChannelPage($lang, $serviceLocationChannel) {
      	return $this->renderer->renderLocationChannelPage($lang, $serviceLocationChannel);
      }
      
      private function createPage($parentPageId, $title, $content, $status = 'draft') {
        return wp_insert_post(array(
      	  'post_content' => $content,
      	  'post_title' => $title,
      	  'post_status' => $status,
      	  'post_type' => 'page',
          'post_parent' => $parentPageId	
      	));
      }

    }
    
  }
  
  $updater = new Updater();
  $updater->startPolling();
?>