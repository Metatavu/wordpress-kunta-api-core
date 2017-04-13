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
                
        $service = \KuntaAPI\Services\Loader::findService($serviceId);
        if (isset($service)) {
          $renderer = new ServiceComponentRenderer();
          return $renderer->renderComponent($service, $lang, $serviceComponent);
        } 
        
        return '';
      }
    }
  
  }
  
  add_action('init', function () {
    new ServiceShortcodes();
  });
  
?>