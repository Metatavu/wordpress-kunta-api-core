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
          }
          
          $serviceLocationChannel = \KuntaAPI\Services\Loader::findServiceLocationServiceChannel($serviceChannelId);
          if (isset($serviceLocationChannel)) {
            $article->innertext = $renderer->renderComponent($lang, $serviceLocationChannel, $component, $mode);
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