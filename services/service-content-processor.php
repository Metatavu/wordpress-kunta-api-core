<?php
  namespace KuntaAPI\Services;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Services\ServiceContentProcessor' ) ) {
    
    class ServiceContentProcessor extends \KuntaAPI\Core\AbstractContentProcessor {
      
     private static $EMPTY_COMPONENT_TEXTS = array(
        'fi' => array(
            'description' => '(TYHJÄ) Kuvaus tähän',
            'userInstruction' => '(TYHJÄ) Toimintaohjeet tähän',
            'languages'=> '(TYHJÄ) Kielet joilla palvelu on saatavilla',
            'electronicServiceChannelIds' => '(TYHJÄ) Elektroniset palvelukanavat listataan tähän',
            'phoneServiceChannelIds' => '(TYHJÄ) Puhelinpalvelukanavat listataan tähän',
            'printableFormServiceChannelIds' => '(TYHJÄ) Lomakkeet listataan tähän',
            'serviceLocationServiceChannelIds' => '(TYHJÄ) Palvelupisteet listataan tähän',
            'webPageServiceChannelIds' => '(TYHJÄ) Verkkosivut listataan tähän'
        )
      );
      
      public function process($dom, $mode) {
        
        foreach ($dom->find('*[data-type="kunta-api-service-component"]') as $article) {
          $serviceId = $article->{'data-service-id'};
          $serviceComponent = $article->{'data-component'};
          $lang = $article->{'data-lang'};

          if (empty($lang)) {
            $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
          }
          
          if ($mode == 'edit') {
            $article->class = 'mceNonEditable';
            $article->contentEditable = 'false';
            $article->readonly = 'true';
          } else {
            $article->removeAttribute('data-service-id');
            $article->removeAttribute('data-type');
            $article->removeAttribute('data-component');
            $article->removeAttribute('data-lang');
          }
          
          $renderer = new \KuntaAPI\Services\ServiceComponentRenderer();
          $content = $renderer->renderComponent($serviceId, $serviceComponent, $lang);
          if ($mode == 'edit' && empty($content)) {
            $article->innertext = "<p>". self::$EMPTY_COMPONENT_TEXTS[$lang][$serviceComponent] ."</p>";
          } else {
            $article->innertext = $content;
          }
          
        } 
      }
    }
  }
  
  add_action('init', function(){
    global $kuntaAPIPageProcessor;
    $kuntaAPIPageProcessor->registerContentProcessor(new ServiceContentProcessor());
  });
  
?>