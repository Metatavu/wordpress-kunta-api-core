<?php
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  require_once( __DIR__ . '/service-component-renderer.php');
  require_once( __DIR__ . '/service-loader.php');
  
  add_action( 'wp_ajax_kunta_api_search_services', function () {
    $responce = [];
    
    foreach (\KuntaAPI\Core\CoreSettings::getOrganizationIds() as $organizationId) {
      $services = \KuntaAPI\Core\Api::getServicesApi(false)->listServices($organizationId, $_POST['data']);
      foreach ($services as $service) {
        $responce[] = $service -> __toString();
      }
    }
    
    echo '[';
    echo join(',', $responce);
    echo ']';
    wp_die();
  } );
  
  add_action( 'wp_ajax_kunta_api_load_service', function () {
    try {
      $serviceId = $_POST['serviceId'];
      $service = \KuntaAPI\Services\Loader::findService($serviceId);
      $json = $service->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_render_service_component', function () {
    $renderer = new \KuntaAPI\Services\ServiceComponentRenderer();
    $serviceId = $_POST['serviceId'];
    $lang = $_POST['lang'];
    $serviceComponent = $_POST['component'];
    
    if (empty($lang)) {
      $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
    }

    echo '<article data-lang="' . $lang . '" data-type="kunta-api-service-component" data-component="' . $serviceComponent . '" data-service-id="' . $serviceId . '">';
    echo $renderer->renderComponent($serviceId, $serviceComponent, $lang, "edit");
    echo '</article>';
    wp_die();
  } );
  
  add_action( 'wp_ajax_kunta_api_save_service', function () {
    try {
      $data = stripslashes($_POST['service']);
      $service = new \KuntaAPI\Model\Service(json_decode($data, true));
      $result = \KuntaAPI\Core\Api::getServicesApi(false)->updateService($service->getId(), $service);
      $json = $result->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_load_electronic_service_channel', function () {
    try {
      $id = $_POST['id'];
      $channel = \KuntaAPI\Core\Api::getElectronicServiceChannelsApi(false)->findElectronicServiceChannel($id);
      $json = $channel->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_load_webpage_service_channel', function () {
    try {
      $id = $_POST['id'];
      $channel = \KuntaAPI\Core\Api::getWebPageServiceChannelsApi(false)->findWebPageServiceChannel($id);
      $json = $channel->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_load_printable_form_service_channel', function () {
    try {
      $id = $_POST['id'];
      $channel = \KuntaAPI\Core\Api::getPrintableFormServiceChannelsApi(false)->findPrintableFormServiceChannel($id);
      $json = $channel->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_load_phone_service_channel', function () {
    try {
      $id = $_POST['id'];
      $channel = \KuntaAPI\Core\Api::getPhoneServiceChannelsApi(false)->findPhoneServiceChannel($id);
      $json = $channel->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_load_service_location_service_channel', function () {
    try {
      $id = $_POST['id'];
      $channel = \KuntaAPI\Core\Api::getServiceLocationServiceChannelsApi(false)->findServiceLocationServiceChannel($id);
      $json = $channel->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_search_electronic_service_channels', function () {
    try {
      $search = $_POST['search'];
      $organizationId = $_POST['organizationId'];
      $results = [];
      $organizations = \KuntaAPI\Core\Api::getElectronicServiceChannelsApi(false)->listElectronicServiceChannels($organizationId, $search, null, null, null, 10);
      
      foreach ($organizations as $organization) {
        $results[] = $organization->__toString();
      }
      
      echo '[';
      echo join(',', $results);
      echo ']';
      
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_search_phone_service_channels', function () {
    try {
      $search = $_POST['search'];
      $organizationId = $_POST['organizationId'];
      $results = [];
      $items = \KuntaAPI\Core\Api::getPhoneServiceChannelsApi(false)->listPhoneServiceChannels($organizationId, $search, null, null, null, 10);
      
      foreach ($items as $item) {
        $results[] = $item->__toString();
      }
      
      echo '[';
      echo join(',', $results);
      echo ']';
      
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_search_printable_form_service_channels', function () {
    try {
      $search = $_POST['search'];
      $organizationId = $_POST['organizationId'];
      $results = [];
      $items = \KuntaAPI\Core\Api::getPrintableFormServiceChannelsApi(false)->listPrintableFormServiceChannels($organizationId, $search, null, null, null, 10);
      
      foreach ($items as $item) {
        $results[] = $item->__toString();
      }
      
      echo '[';
      echo join(',', $results);
      echo ']';
      
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_search_web_page_service_channels', function () {
    try {
      $search = $_POST['search'];
      $organizationId = $_POST['organizationId'];
      $results = [];
      $items = \KuntaAPI\Core\Api::getWebPageServiceChannelsApi(false)->listWebPageServiceChannels($organizationId, $search, null, null, null, 10);
      
      foreach ($items as $item) {
        $results[] = $item->__toString();
      }
      
      echo '[';
      echo join(',', $results);
      echo ']';
      
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_save_electronic_service_channel', function () {
    try {
      $data = stripslashes($_POST['serviceChannel']);
      $serviceChannel = new \KuntaAPI\Model\ElectronicServiceChannel(json_decode($data, true));
      $result = \KuntaAPI\Core\Api::getElectronicServiceChannelsApi(false)->updateElectronicServiceChannel($serviceChannel->getId(), $serviceChannel);
      $json = $result->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_save_phone_service_channel', function () {
    try {
      $data = stripslashes($_POST['serviceChannel']);
      $serviceChannel = new \KuntaAPI\Model\PhoneServiceChannel(json_decode($data, true));
      $result = \KuntaAPI\Core\Api::getPhoneServiceChannelsApi(false)->updatePhoneServiceChannel ($serviceChannel->getId(), $serviceChannel);
      $json = $result->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_save_printable_form_service_channel', function () {
    try {
      $data = stripslashes($_POST['serviceChannel']);
      $serviceChannel = new \KuntaAPI\Model\PrintableFormServiceChannel(json_decode($data, true));
      $result = \KuntaAPI\Core\Api::getPrintableFormServiceChannelsApi(false)->updatePrintableFormServiceChannel ($serviceChannel->getId(), $serviceChannel);
      $json = $result->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_save_webpage_service_channel', function () {
    try {
      $data = stripslashes($_POST['serviceChannel']);
      $serviceChannel = new \KuntaAPI\Model\WebPageServiceChannel(json_decode($data, true));
      $result = \KuntaAPI\Core\Api::getWebPageServiceChannelsApi(false)->updateWebPageServiceChannel ($serviceChannel->getId(), $serviceChannel);
      $json = $result->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
?>