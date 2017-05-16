<?php
  namespace KuntaAPI\Core;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  use Sunra\PhpSimple\HtmlDomParser;
    
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Core\PageProcessor' ) ) {
    
    class PageProcessor {
      
      private $contentProcessors;
      
      public function __construct() {
        $this->contentProcessors = [];
        
        $useSidebar = \KuntaAPI\Core\CoreSettings::getBooleanValue('useSidebarPluginTinymce');
        $useEmbedder = \KuntaAPI\Core\CoreSettings::getBooleanValue('useServiceEmbedPluginTinymce');
        
        if (!$useSidebar && !$useEmbedder) {
          add_filter('the_content', array($this, 'processPageContent'));
          if (is_admin()) {
            add_filter('content_edit_pre', array($this, 'processPageEditContent'));
          }
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
              $contentProccessor->process($dom, 'view');
            }
            
            return $dom;
          }
        }
        
        return $content;
      }

      public function processPageEditContent($content) {
        if ($GLOBALS['post']->post_type == 'page') {
          return $this->processContent($content);
        }
        
        return $content;
      }
      
      private function processContent($content) {
        $dom = HtmlDomParser::str_get_html($content);
        
        if ($dom) {
          foreach ($this->contentProcessors as $contentProccessor) {
            $contentProccessor->process($dom, 'edit');
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