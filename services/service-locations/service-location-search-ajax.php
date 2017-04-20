<?php
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../../vendor/autoload.php');
  require_once( __DIR__ . '/../service-loader.php');
  
  add_action( 'wp_ajax_kunta_api_search_service_location_channels', function () {
    $organizationId = \KuntaAPI\Core\CoreSettings::getValue('organizationId');
    $serviceLocationChannels = \KuntaAPI\Core\Api::getServiceLocationServiceChannelsApi()->listServiceLocationServiceChannels($organizationId, $_POST['data']);
    $response = [];
    foreach ($serviceLocationChannels as $serviceLocationChannel) {
      $response[] = $serviceLocationChannel -> __toString();
    }
    echo '[';
    echo join(',', $response);
    echo ']';
    wp_die();
  } );
  
  add_action( 'wp_ajax_kunta_api_mark_page_as_location_page', function () {
    $mapper = new KuntaAPI\Services\Mapper();
    $mapper->setLocationChannelPageId($_POST['locationChannelId'], $_POST['pageId']);
    echo 'ok';
    wp_die();
  } );
  
  add_action( 'wp_ajax_kunta_api_render_service_location_component', function () {
    $renderer = new \KuntaAPI\Services\ServiceLocations\ServiceLocationComponentRenderer();
    $service = \KuntaAPI\Services\Loader::findService($_POST['serviceId']);
    $serviceLocationChannel = \KuntaAPI\Services\Loader::findServiceLocationServiceChannel($_POST['serviceLocationChannelId']);
    echo $renderer->renderComponentParent($_POST['lang'], $service, $serviceLocationChannel, $_POST['component']);
    wp_die();
  } );



?>