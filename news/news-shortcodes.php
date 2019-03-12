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
       *   <ul><b>tag:</b> news by this tag will be listed inside the div</ul>
       *   <ul><b>max-results:</b> maximum amount of news</ul>
       *   <ul><b>classes:</b> extra classes to be added into the list div</ul>
       * </li>
       * 
       * @param type $tagAttrs tag attributes
       * @return html element as string
       */
      public function newsListShortcode($tagAttrs) {
        $attrs = shortcode_atts([
          'tag' => '',
          'max-results' => '10',
          'classes' => ''
        ], $tagAttrs);
        
        $html = '';
        $tag = $attrs['tag'];
        $maxResults = $attrs['max-results'];
        $classes = 'kunta-api-news-list' . ($attrs['classes'] ? ' ' . $attrs['classes'] : '');
        
        $html = '<div class="' . $classes . '" data-tag="'.$tag.'" data-max-results="'.$maxResults.'"></div>';
        
        return $html;
      }
      
    }
  
  }
  
  add_action('init', function () {
    new NewsShortcodes();
  });
  
?>
