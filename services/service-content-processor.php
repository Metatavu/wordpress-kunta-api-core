<?php
  namespace KuntaAPI\Services;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Services\ServiceContentProcessor' ) ) {
    
    class ServiceContentProcessor extends \KuntaAPI\Core\AbstractContentProcessor {
      
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
            $text = '';
            switch ($serviceComponent) {
              case 'description':
                $text = __( 'Placeholder for description (Currently empty, not visible on webpage)', 'kunta_api_core' );
              break;
              case 'userInstruction':
                $text = __( 'Placeholder for user instruction (Currently empty, not visible on webpage)', 'kunta_api_core' );
              break;
              case 'languages':
                $text = __( 'Placeholder for languages (Currently empty, not visible on webpage)', 'kunta_api_core' );
              break;
              case 'electronicServiceChannelIds':
                $text = __( 'Placeholder for electronic service channels (Currently empty, not visible on webpage)', 'kunta_api_core' );
              break;
              case 'phoneServiceChannelIds':
                $text = __( 'Placeholder for phone service channels (Currently empty, not visible on webpage)', 'kunta_api_core' );
              break;
              case 'printableFormServiceChannelIds':
                $text = __( 'Placeholder for printable form service channels (Currently empty, not visible on webpage)', 'kunta_api_core' );
              break;
              case 'serviceLocationServiceChannelIds':
                $text = __( 'Placeholder for service location channels (Currently empty, not visible on webpage)', 'kunta_api_core' );
              break;
              case 'webPageServiceChannelIds':
                $text = __( 'Placeholder for webpage service channels (Currently empty, not visible on webpage)', 'kunta_api_core' );
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
  
  add_action('init', function(){
    global $kuntaAPIPageProcessor;
    $kuntaAPIPageProcessor->registerContentProcessor(new ServiceContentProcessor());
  });
  
?>