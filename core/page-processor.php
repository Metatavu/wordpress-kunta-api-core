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
        
        if (\KuntaAPI\Core\CoreSettings::getBooleanValue('useContentProcessors')) {
          add_filter('the_content', array($this, 'processPageContent'));
          if (is_admin()) {
            add_filter('content_edit_pre', array($this, 'processPageEditContent'));
          }
        }
      }
       
      public function registerContentProcessor($contentProcessor) {
        $this->contentProcessors[] = $contentProcessor;
      }
      
      /**
       * Filters page content for viewing
       * 
       * Method renders Kunta API components and appends sidebar into the content
       * 
       * @param String $content content
       * @return String modified content
       */
      public function processPageContent($content) {
        $post = $GLOBALS['post'];
        
        if ($post->post_type == 'page') {
          $unmigratedSidebar = $this->hasUnmigratedSidebar($content);
          
          $dom = $this->parseHtml($unmigratedSidebar ? $content : $this->appendSidebar($content, $post));
          if($dom) {
            foreach ($this->contentProcessors as $contentProccessor) {
              $contentProccessor->process($dom, 'view');
            }
            
            if ($unmigratedSidebar) {
              $this->processUnmigratedSidebars($dom);
            }
            
            return $this->domToHtml($dom);
          }
        }
        
        return $content;
      }

      /**
       * Filters page content for editing.
       * 
       * Method renders Kunta API components and removes sidebar from the content
       * 
       * @param String $content content
       * @return String modified content
       */
      public function processPageEditContent($content) {
        $postType = $GLOBALS['post_type'];
        $post = $GLOBALS['post'];
        
        if (empty($postType) && isset($post)) {
          $postType = $post->post_type;
        }
        
        if ($postType == 'page') {
          $dom = $this->parseHtml($content);
          if (!$dom) {
            return $content;  
          }
          
          $this->processContent($dom);
          if ($post) {
            $this->migrateSidebars($post, $dom);
          }
          
          return $this->domToHtml($dom);
        }
        
        return $content;
      }
      
      /**
       * Returns whether content contains unmigrated sidebars
       * 
       * @param String $content content
       * @return bool whether content contains unmigrated sidebars
       */
      private function hasUnmigratedSidebar($content) {
        return strpos($content, "kunta-api-aside") !== false;
      }
      
      /**
       * Appends sidebar to a content if needed and returns modified content 
       * 
       * @param String $content content
       * @param \WP_Post $post post
       * @return String modified content
       */
      private function appendSidebar($content, $post) {
        $sidebar = get_post_meta($post->ID, "kunta_api_sidebar", true);
        if (!empty($sidebar)) {
          return sprintf('%s<aside class="kunta-api-aside"><div class="kunta-api-aside-contents">%s</div></aside>', $content, $sidebar);
        }
        
        return $content;
      }
      
      /**
       * Parses html string into dom
       * 
       * @param String $content html string
       * @param \simplehtmldom_1_5\simple_html_dom parsed dom
       */
      private function parseHtml($content) {
        return HtmlDomParser::str_get_html($content);
      }
      
      /**
       * Serializes dom into string
       * 
       * @param \simplehtmldom_1_5\simple_html_dom $dom dom
       * @return String html
       */
      private function domToHtml($dom) {
        return "" . $dom; 
      }
      
      /**
       * Renders Kunta API components
       * 
       * @param  \simplehtmldom_1_5\simple_html_dom $dom dom
       */
      private function processContent($dom) {
        foreach ($this->contentProcessors as $contentProccessor) {
          $contentProccessor->process($dom, 'edit');
        }
      }
      
      /**
       * Moves aside elements into meta fields
       * 
       * @param \WP_Post post object
       * @param \simplehtmldom_1_5\simple_html_dom $dom dom
       */
      private function migrateSidebars($post, $dom) {
        foreach ($dom->find('.kunta-api-aside-contents') as $content) {
          $content->outertext = $content->innertext; 
        }
        
        $sidebarContents = '';
        foreach ($dom->find('.kunta-api-aside') as $aside) {
          $sidebarContents .= $aside->innertext;
          $aside->outertext = '';
        }
        
        if (!empty($sidebarContents)) {
          update_post_meta($post->ID, "kunta_api_sidebar", $sidebarContents);
        }
      }
      
      /**
       * Processes unmigrated sidebars for viewing
       * 
       * @param \simplehtmldom_1_5\simple_html_dom $dom dom
       */
      private function processUnmigratedSidebars($dom) {
        foreach ($dom->find('.kunta-api-aside') as $aside) {
          $aside->contentEditable = null;
          $aside->contenteditable = null;
          $aside->readonly = null;
          $aside->class = 'kunta_api_sidebar';
        }
        
        foreach ($dom->find('.kunta-api-aside-contents') as $content) {
          $content->contentEditable = null;
          $content->contenteditable = null;
          $content->readonly = null;
          $content->class = 'kunta-api-aside-contents';
        }
      }
      
    }
  }
  
  global $kuntaAPIPageProcessor;
  $kuntaAPIPageProcessor = new PageProcessor();
  
?>