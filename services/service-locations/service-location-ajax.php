<?php
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../../vendor/autoload.php');
  require_once( __DIR__ . '/../service-loader.php');
  
  add_action( 'wp_ajax_kunta_api_search_service_location_channels', function () {
    try {
      $response = [];

      foreach (\KuntaAPI\Core\CoreSettings::getOrganizationIds() as $organizationId) {
        $serviceLocationChannels = \KuntaAPI\Core\Api::getServiceLocationServiceChannelsApi(false)->listServiceLocationServiceChannels($organizationId, $_POST['data']);
        foreach ($serviceLocationChannels as $serviceLocationChannel) {
          $response[] = $serviceLocationChannel -> __toString();
        }
      }

      echo '[';
      echo join(',', $response);
      echo ']';
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  } );
  
  add_action( 'wp_ajax_kunta_api_mark_page_as_location_page', function () {
    $mapper = new KuntaAPI\Services\Mapper();
    $mapper->setLocationChannelPageId($_POST['locationChannelId'], $_POST['pageId']);
    echo 'ok';
    wp_die();
  } );
  
  add_action( 'wp_ajax_kunta_api_render_service_location_component', function () {
    try {
      $renderer = new \KuntaAPI\Services\ServiceLocations\ServiceLocationComponentRenderer();
      $serviceLocationChannelId = $_POST['serviceChannelId'];
      $serviceLocationChannel = \KuntaAPI\Services\Loader::findServiceLocationServiceChannel($serviceLocationChannelId);
      $component = $_POST['component'];
      $lang = $_POST['lang'];
      if (empty($lang)) {
        $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
      }

      echo '<article data-type="kunta-api-service-location-component" data-component="' . $component . '" data-service-channel-id="' . $serviceLocationChannelId . '" data-lang="' . $lang . '">';
      echo $renderer->renderComponent($lang, $serviceLocationChannel, $component, 'edit');
      echo '</article>';
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  } );
  
  add_action( 'wp_ajax_kunta_api_load_service_location_service_channel', function () {
    try {
      $serviceLocationChannelId = $_POST['serviceLocationServiceChannelId'];
      $serviceLocationChannel = \KuntaAPI\Services\Loader::findServiceLocationServiceChannel($serviceLocationChannelId);
      $json = $serviceLocationChannel->__toString();
      echo $json;
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });
  
  add_action( 'wp_ajax_kunta_api_save_service_location_service_channel', function () {
    try {
      $data = stripslashes($_POST['serviceChannel']);
      $serviceLocationServiceChannel = new \KuntaAPI\Model\ServiceLocationServiceChannel(json_decode($data, true));
      $result = \KuntaAPI\Core\Api::getServiceLocationServiceChannelsApi(false)->updateServiceLocationServiceChannel($serviceLocationServiceChannel->getId(), $serviceLocationServiceChannel);
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