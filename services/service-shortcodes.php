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
  
        switch ($serviceComponent) {
          case 'description':
          case 'userInstruction':
          case 'languages':
            return $this->renderServiceComponent($serviceId, $lang, $serviceComponent);
          case 'electronicServiceChannelIds':
            return $this->renderElectronicServiceChannelIds($serviceId, $lang);
          case 'phoneServiceChannelIds':
            return $this->renderPhoneServiceChannelIds($serviceId, $lang);
          case 'printableFormServiceChannelIds':
            return $this->renderPrintableFormServiceChannelIds($serviceId, $lang);
          case 'serviceLocationServiceChannelIds':
            return $this->renderLocationServiceChannelIds($serviceId, $lang);
          case 'webPageServiceChannelIds':
            return $this->renderWebPageServiceChannelIds($serviceId, $lang);
          default:
            error_log("unknown servicetype $serviceComponent");
            break;
        }
        
        return '';
      }
      
      private function renderServiceComponent($serviceId, $lang, $serviceComponent) {
        $service = \KuntaAPI\Services\Loader::findService($serviceId);
        if (isset($service)) {
          $renderer = new \KuntaAPI\Services\ServiceComponentRenderer();
          return $renderer->renderComponentParent($service, $lang, $serviceComponent);
        }
        
        return '';
      }
      
      private function renderElectronicServiceChannelIds($serviceId, $lang) {
        $renderer = new \KuntaAPI\Services\ServiceChannels\ServiceChannelRenderer();
        $serviceChannels = \KuntaAPI\Services\Loader::listElectronicServiceChannels($serviceId);
        if (!empty($serviceChannels)) {
          $result = '';
          foreach ($serviceChannels as $serviceChannel) {
            $result = $result . $renderer->renderElectronicChannel($serviceId, $serviceChannel, $lang);
          }
        }
        
        return $result;
      }

      private function renderPhoneServiceChannelIds($serviceId, $lang) {
        $renderer = new \KuntaAPI\Services\ServiceChannels\ServiceChannelRenderer();
        $serviceChannels = \KuntaAPI\Services\Loader::listPhoneServiceChannels($serviceId);
        $result = '';
        if (!empty($serviceChannels)) {
          foreach ($serviceChannels as $serviceChannel) {
            $result = $result . $renderer->renderPhoneChannel($serviceId, $serviceChannel, $lang);
          }
        }
        
        return $result;
      }
      
      private function renderPrintableFormServiceChannelIds($serviceId, $lang) {
        $renderer = new \KuntaAPI\Services\ServiceChannels\ServiceChannelRenderer();
        $serviceChannels = \KuntaAPI\Services\Loader::listPrintableFormServiceChannels($serviceId);
        if (!empty($serviceChannels)) {
          $result = '';
          foreach ($serviceChannels as $serviceChannel) {
            $result = $result . $renderer->renderPrintableFormChannel($serviceId, $serviceChannel, $lang);
          }
        }
        
        return $result;
      }
      
      private function renderLocationServiceChannelIds($serviceId, $lang) {
        $renderer = new \KuntaAPI\Services\ServiceChannels\ServiceChannelRenderer();
        $serviceChannels = \KuntaAPI\Services\Loader::listServiceLocationServiceChannels($serviceId);
        if (!empty($serviceChannels)) {
          $result = '';
          foreach ($serviceChannels as $serviceChannel) {
            $result = $result . $renderer->renderServiceLocationChannel($serviceId, $serviceChannel, $lang);
          }
        }
        
        return $result;
      }
      
      private function renderWebPageServiceChannelIds($serviceId, $lang) {
        $renderer = new \KuntaAPI\Services\ServiceChannels\ServiceChannelRenderer();
        $serviceChannels = \KuntaAPI\Services\Loader::listWebPageServiceChannels($serviceId);
        if (!empty($serviceChannels)) {
          $result = '';
          foreach ($serviceChannels as $serviceChannel) {
            $result = $result . $renderer->renderWebPageChannel($serviceId, $serviceChannel, $lang);
          }
        }
        
        return $result;
      }
      
    }
  
  }
  
  add_action('init', function () {
    new ServiceShortcodes();
  });
  
?>