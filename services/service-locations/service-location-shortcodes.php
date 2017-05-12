<?php
  namespace KuntaAPI\Services\ServiceLocations;
  
  require_once( __DIR__ . '/../../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Services\ServiceLocations\ServiceLocationShortcodes' ) ) {
    
    class ServiceLocationShortcodes {
      
      public function __construct() {
        add_shortcode('kunta_api_location_channel_component', [$this, 'serviceLocationComponentShortcode']);
      }
      
      public function serviceLocationComponentShortcode($tagAttrs) {
        $attrs = shortcode_atts(array(
          'channel-id' => '-',
          'component' => '-',
          'lang' => 'fi'
        ), $tagAttrs);
        
        $serviceLocationChannelId = $attrs['channel-id'];
        $lang = $attrs['lang'];
        $serviceComponent = $attrs['component'];
        $serviceLocationChannel = \KuntaAPI\Services\Loader::findServiceLocationServiceChannel($serviceLocationChannelId);
        
        if (isset($serviceLocationChannel)) {
          $renderer = new ServiceLocationComponentRenderer();
          return $renderer->renderComponent($lang, $serviceLocationChannel, $serviceComponent);
        }
        
        return '';
      }
      
    }
  
  }
  
  add_action('init', function () {
    new ServiceLocationShortcodes();
  });
  
?>