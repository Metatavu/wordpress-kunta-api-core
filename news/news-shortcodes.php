<?php
  namespace KuntaAPI\News;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\News\NewsShortcodes' ) ) {
    
    class NewsShortcodes {
      
      /**
       *  Constructor
       */
      public function __construct() {
        add_shortcode('kunta_api_news_list', [$this, 'newsListShortcode']);
      }
      
      /**
       * Renders a div element.
       * 
       * Following attributes can be used to control the component:
       * 
       * <li>
       *   <ul><b>category:</b> news by this category will be listed inside the div</ul>
       *   <ul><b>max-results:</b> maximum amount of news</ul>
       * </li>
       * 
       * @param type $tagAttrs tag attributes
       * @return html element as string
       */
      public function newsListShortcode($tagAttrs) {
        $attrs = shortcode_atts([
          'category' => '',
          'max-results' => ''
        ], $tagAttrs);
        
        $html = '';
        $category = $attrs['category'];
        $maxResults = $attrs['max-results'];
        
        $html = '<div class="kunta-api-news-by-category" data-category="'.$category.'" data-max-results="'.$maxResults.'"><div class="row"></div></div>';
        
        return $html;
      }
      
    }
  
  }
  
  add_action('init', function () {
    new NewsShortcodes();
  });
  
?>
