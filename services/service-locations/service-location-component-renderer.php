<?php
  namespace KuntaAPI\Services\ServiceLocations;
  
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../../vendor/autoload.php');
  
  if (!class_exists( 'KuntaAPI\Services\ServiceLocations\ServiceLocationComponentRenderer' ) ) {
    
    class ServiceLocationComponentRenderer {
      
      public function __construct() { }
      
      public function renderComponent($lang, $serviceLocationChannel, $component, $mode = 'view') {
        $model = [
          'lang' => $lang,
          'serviceLocationChannel' => $serviceLocationChannel
        ];
        
        $content = \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-location-components/$component.twig", $model);
        
        if ($mode == 'edit' && empty($content)) {
          switch ($component) {
            case 'addresses':
            case 'adresses':
              $content = __( 'Placeholder for adresses (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'description':
              $content = __( 'Placeholder for description (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'email':
              $content = __( 'Placeholder for email (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'fax':
              $content = __( 'Placeholder for fax (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'name':
              $content = __( 'Placeholder for service location name (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'phone':
              $content = __( 'Placeholder for phonenumbers (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'phone-charge-info':
              $content = __( 'Placeholder for phone charge info (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'servicehours':
              $content = __( 'Placeholder for servicehours (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'webpages':
              $content = __( 'Placeholder for service location webpages (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            default:
              $content = "unknown component type";
            break;
          }
        }
        
        return $content;
      }
      
    }  
  }
?>