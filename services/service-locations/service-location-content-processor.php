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

      private static $EMPTY_COMPONENT_TEXTS = array(
        'fi' => array(
            'adresses' => '(TYHJÄ) Osoite tähän',
            'description' => '(TYHJÄ) Kuvaus tähän',
            'email'=> '(TYHJÄ) Sähköpostiosoite tähän',
            'fax' => '(TYHJÄ) Faksi tähän',
            'name' => '(TYHJÄ) Palvelupisteen nimi tähän',
            'phone' => '(TYHJÄ) Puhelin numerot tähän',
            'phone-charge-info' => '(TYHJÄ) Puhelimen maksullisuustiedot tähän',
            'servicehours' => '(TYHJÄ) Palveluajat tähän',
            'webpages' => '(TYHJÄ) Verkkosivut tähän'
        )
      );
      
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
                $article->innertext = "<p>". self::$EMPTY_COMPONENT_TEXTS[$lang][$component] ."</p>";
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