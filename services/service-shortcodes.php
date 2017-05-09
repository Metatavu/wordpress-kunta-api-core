<?php
  namespace KuntaAPI\Services;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Services\ServiceShortcodes' ) ) {
    
    class ServiceShortcodes {
      
      public function __construct() {
        add_shortcode('kunta_api_service_component', [$this, 'serviceComponentShortcode']);
      }
      
      public function serviceComponentShortcode($tagAttrs) {
        $attrs = shortcode_atts(array(
          'service-id' => '-',
          'component' => '-',
          'lang' => 'fi'
        ), $tagAttrs);
        
        $serviceId = $attrs['service-id'];
        $lang = $attrs['lang'];
        $serviceComponent = $attrs['component'];
        
        $renderer = new \KuntaAPI\Services\ServiceComponentRenderer();
        return $renderer->renderComponent($serviceId, $serviceComponent, $lang);
      }
      
    }
  
  }
  
  add_action('init', function () {
    new ServiceShortcodes();
  });
  
?>