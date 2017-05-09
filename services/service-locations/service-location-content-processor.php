<?php
  namespace KuntaAPI\Services\ServiceLocations;
  
  require_once( __DIR__ . '/../../vendor/autoload.php');
  require_once( __DIR__ . '/service-location-component-renderer.php');
  require_once( __DIR__ . '/../service-loader.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Services\ServiceLocations\ServiceLocationContentProcessor' ) ) {
    
    class ServiceLocationContentProcessor extends \KuntaAPI\Core\AbstractContentProcessor {
      
      public function process($dom, $mode) {
        $renderer = new ServiceLocationComponentRenderer();
        
        foreach ($dom->find('*[data-type="kunta-api-service-location-component"]') as $article) {
          $serviceId = $article->{'data-service-id'};
          $component = $article->{'data-component'};
          $lang = $article->{'data-lang'};
          $serviceChannelId = $article->{'data-service-channel-id'};
          
          if (empty($lang)) {
            $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
          }

          if($mode == 'edit') {
            $article->class = 'mceNonEditable';
            $article->contentEditable = 'false';
            $article->readonly = 'true';
          } else {
            $article->removeAttribute('data-service-id');
            $article->removeAttribute('data-type');
            $article->removeAttribute('data-component');
            $article->removeAttribute('data-lang');
            $article->removeAttribute('data-service-channel-id');
          }

          $service = \KuntaAPI\Services\Loader::findService($serviceId);
          if (isset($service)) {          
            $serviceLocationChannel = \KuntaAPI\Services\Loader::findServiceLocationServiceChannel($serviceChannelId);
            if (isset($serviceLocationChannel)) {
              $content = $renderer->renderComponent($lang, $service, $serviceLocationChannel, $component);
              if ($mode == 'edit' && empty($content)) {
                
                $text = '';
                switch ($component) {
                  case 'adresses':
                    $text = __( 'Placeholder for adresses (Currently empty, not visible on webpage)', 'kunta_api_core' );
                  break;
                  case 'description':
                    $text = __( 'Placeholder for description (Currently empty, not visible on webpage)', 'kunta_api_core' );
                  break;
                  case 'email':
                    $text = __( 'Placeholder for email (Currently empty, not visible on webpage)', 'kunta_api_core' );
                  break;
                  case 'fax':
                    $text = __( 'Placeholder for fax (Currently empty, not visible on webpage)', 'kunta_api_core' );
                  break;
                  case 'name':
                    $text = __( 'Placeholder for service location name (Currently empty, not visible on webpage)', 'kunta_api_core' );
                  break;
                  case 'phone':
                    $text = __( 'Placeholder for phonenumbers (Currently empty, not visible on webpage)', 'kunta_api_core' );
                  break;
                  case 'phone-charge-info':
                    $text = __( 'Placeholder for phone charge info (Currently empty, not visible on webpage)', 'kunta_api_core' );
                  break;
                  case 'servicehours':
                    $text = __( 'Placeholder for servicehours (Currently empty, not visible on webpage)', 'kunta_api_core' );
                  break;
                  case 'webpages':
                    $text = __( 'Placeholder for service location webpages (Currently empty, not visible on webpage)', 'kunta_api_core' );
                  break;
                  default:
                    $text = "unknown component type";
                  break;
                }
                
                $article->innertext = "<p>". $text ."</p>";
              } else {
                $article->innertext = $content;
              }
            }
          }
        } 
      }
    }
  }
  
  add_action('init', function(){
    global $kuntaAPIPageProcessor;
    $kuntaAPIPageProcessor->registerContentProcessor(new ServiceLocationContentProcessor());
  });
  
?>