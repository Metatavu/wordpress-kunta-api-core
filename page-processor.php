<?php
  namespace KuntaAPI\Core;
  
  require_once( __DIR__ . '/vendor/autoload.php');
  
  use Sunra\PhpSimple\HtmlDomParser;
    
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Core\PageProcessor' ) ) {
    
    class PageProcessor {
      
      private $contentProcessors;
      
      public function __construct() {
        $this->contentProcessors = [];
        add_filter('the_content', array($this, 'processPageContent'));
        if (is_admin()) {
          add_filter('content_edit_pre', array($this, 'processPageEditContent'));
        }
      }
       
      public function registerContentProcessor($contentProcessor) {
        $this->contentProcessors[] = $contentProcessor;
      }
      
      public function processPageContent($content) {
        if ($GLOBALS['post']->post_type == 'page') {
          $dom = HtmlDomParser::str_get_html($content);
          if($dom) {
            foreach ($this->contentProcessors as $contentProccessor) {
              $contentProccessor->process(\KuntaAPI\Core\QTranslateHelper::getCurrentLanguage(), $dom, 'view');
            }
            
            return $dom;
          }
        }
        
        return $content;
      }

      public function processPageEditContent($content) {
        if ($GLOBALS['post']->post_type == 'page') {
          $localizedContents = \KuntaAPI\Core\QTranslateHelper::splitLocalizedString($content);
          if (count($localizedContents) > 0) {
            return $this->processLocalizedContents($localizedContents);
          } else {
            return $this->processContent($content);
          }
        }
        
        return $content;
      }
      
      private function processLocalizedContents($localizedContents) {
        $processed = [];
        $enabledLanguages = QTranslateHelper::getEnabledLanguages();
        
        foreach ($localizedContents as $lang => $localizedContent) {
          if (in_array($lang, $enabledLanguages)) {
            $processed[$lang] = $this->processContent($localizedContent);
          } else {
            $processed[$lang] = $localizedContent;
          }
        }
        
        return \KuntaAPI\Core\QTranslateHelper::mergeLocalizedArray($processed);
      }
      
      private function processContent($content) {
        $lang = \KuntaAPI\Core\QTranslateHelper::getCurrentLanguage();
        $dom = HtmlDomParser::str_get_html($content);
        
        if ($dom) {
          foreach ($this->contentProcessors as $contentProccessor) {
            $contentProccessor->process($lang, $dom, 'edit');
          }
        
          $this->processAsides($dom);
          
          return $dom;
        } else {
          return $content;
        }
      }
      
      private function processAsides($dom) {
        foreach ($dom->find('.kunta-api-aside') as $aside) {
          $aside->class .= ' mceNonEditable';
          $aside->contentEditable = 'false';
          $aside->readonly = 'true';
        }
        
        foreach ($dom->find('.kunta-api-aside-contents') as $content) {
          $content->class .= ' mceEditable';
          $content->contentEditable = 'true';
          $content->readonly = 'false';
        }
      }
      
    }
  }
  
  global $kuntaAPIPageProcessor;
  $kuntaAPIPageProcessor = new PageProcessor();
  
?>
