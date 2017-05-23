<?php
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  require_once( __DIR__ . '/service-component-renderer.php');
  require_once( __DIR__ . '/service-loader.php');
  
  add_action( 'wp_ajax_kunta_api_search_services', function () {
    $responce = [];
    
    foreach (\KuntaAPI\Core\CoreSettings::getOrganizationIds() as $organizationId) {
      $services = \KuntaAPI\Core\Api::getServicesApi()->listServices($organizationId, $_POST['data']);
      foreach ($services as $service) {
        $responce[] = $service -> __toString();
      }
    }
    
    echo '[';
    echo join(',', $responce);
    echo ']';
    wp_die();
  } );
  
  
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



?>