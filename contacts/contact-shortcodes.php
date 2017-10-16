<?php
  namespace KuntaAPI\Contacts;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Contacts\ContactShortcodes' ) ) {
    
    class ContactShortcodes {
      
      public function __construct() {
        add_shortcode('kunta_api_contact_search', [$this, 'contactSearchShortcode']);
      }
      
      /**
       * Renders a contact search component.
       * 
       * Following attributes can be used to control the component:
       * 
       * <li>
       *   <ul><b>placeholder:</b> if set to true the component only renders a placeholder element for contact search</ul>
       * </li>
       * 
       * @param type $tagAttrs tag attributes
       * @return string replaced contents
       */
      public function contactSearchShortcode($tagAttrs) {
        $attrs = shortcode_atts([
          'placeholder' => 'true'
        ], $tagAttrs);
        
        $html = '';
        $placeholder = $attrs['placeholder'] === 'true'; 
        
        if ($placeholder) {
          $html = '<div class="kunta-api-contact-search"></div>';
        }
        
        return $html;
      }
      
    }
  
  }
  
  add_action('init', function () {
    new ContactShortcodes();
  });
  
?>