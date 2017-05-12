<?php
  namespace KuntaAPI\Services;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Services\ServiceComponentRenderer' ) ) {
    
    class ServiceComponentRenderer {
      
      public function __construct() {}
      
      public function renderComponent($serviceId, $serviceComponent, $lang, $mode = 'view') {
        
        if (empty($lang)) {
          $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
        }
        
        $content = '';
        switch ($serviceComponent) {
          case 'description':
          case 'userInstruction':
          case 'languages':
            $content = $this->renderServiceComponent($serviceId, $lang, $serviceComponent);
          break;
          case 'electronicServiceChannelIds':
            $content = $this->renderElectronicServiceChannelIds($serviceId, $lang);
          break;
          case 'phoneServiceChannelIds':
            $content = $this->renderPhoneServiceChannelIds($serviceId, $lang);
          break;
          case 'printableFormServiceChannelIds':
            $content = $this->renderPrintableFormServiceChannelIds($serviceId, $lang);
          break;
          case 'serviceLocationServiceChannelIds':
            $content = $this->renderLocationServiceChannelIds($serviceId, $lang);
          break;
          case 'webPageServiceChannelIds':
            $content = $this->renderWebPageServiceChannelIds($serviceId, $lang);
          break;
          default:
            error_log("unknown servicetype $serviceComponent");
          break;
        }
        
        if ($mode == 'edit' && empty($content)) {
          switch ($serviceComponent) {
            case 'description':
              $content = __( 'Placeholder for description (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'userInstruction':
              $content = __( 'Placeholder for user instruction (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'languages':
              $content = __( 'Placeholder for languages (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'electronicServiceChannelIds':
              $content = __( 'Placeholder for electronic service channels (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'phoneServiceChannelIds':
              $content = __( 'Placeholder for phone service channels (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'printableFormServiceChannelIds':
              $content = __( 'Placeholder for printable form service channels (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'serviceLocationServiceChannelIds':
              $content = __( 'Placeholder for service location channels (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            case 'webPageServiceChannelIds':
              $content = __( 'Placeholder for webpage service channels (Currently empty, not visible on webpage)', 'kunta_api_core' );
            break;
            default:
              $content = "unknown component type";
            break;
          }
        }
        
        return $content;
      }
      
      private function renderServiceComponent($serviceId, $lang, $type) {
        $service = \KuntaAPI\Services\Loader::findService($serviceId);
        if (isset($service)) {
          $model = [
            'lang' => $lang,
            'service' => $service
          ];

          switch ($type) {
            case 'description':
              return \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-components/service-description.twig", $model);
            case 'userInstruction':
              return \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-components/service-user-instructions.twig", $model);
            case 'languages':
              return \KuntaAPI\Twig\TwigLoader::getTwig()->render("service-components/service-languages.twig", $model);
            default:
              error_log("unknown servicetype $type");
              break;
          }
        }
        
        return '';
      }
      
      private function renderElectronicServiceChannelIds($serviceId, $lang) {
        $renderer = new \KuntaAPI\Services\ServiceChannels\ServiceChannelRenderer();
        $serviceChannels = \KuntaAPI\Services\Loader::listElectronicServiceChannels($serviceId);
        if (!empty($serviceChannels)) {
         return $renderer->renderElectronicChannels($serviceId, $serviceChannels, $lang);
        }
        
        return '';
      }

      private function renderPhoneServiceChannelIds($serviceId, $lang) {
        $renderer = new \KuntaAPI\Services\ServiceChannels\ServiceChannelRenderer();
        $serviceChannels = \KuntaAPI\Services\Loader::listPhoneServiceChannels($serviceId);
        if (!empty($serviceChannels)) {
          return $renderer->renderPhoneChannels($serviceId, $serviceChannels, $lang);
        }
        
        return '';
      }
      
      private function renderPrintableFormServiceChannelIds($serviceId, $lang) {
        $renderer = new \KuntaAPI\Services\ServiceChannels\ServiceChannelRenderer();
        $serviceChannels = \KuntaAPI\Services\Loader::listPrintableFormServiceChannels($serviceId);
        if (!empty($serviceChannels)) {
          return $renderer->renderPrintableFormChannels($serviceId, $serviceChannels, $lang);
        }
        
        return '';
      }
      
      private function renderLocationServiceChannelIds($serviceId, $lang) {
        $renderer = new \KuntaAPI\Services\ServiceChannels\ServiceChannelRenderer();
        $serviceChannels = \KuntaAPI\Services\Loader::listServiceLocationServiceChannels($serviceId);
        if (!empty($serviceChannels)) {
          return $renderer->renderServiceLocationChannels($serviceId, $serviceChannels, $lang);
        }
        
        return '';
      }
      
      private function renderWebPageServiceChannelIds($serviceId, $lang) {
        $renderer = new \KuntaAPI\Services\ServiceChannels\ServiceChannelRenderer();
        $serviceChannels = \KuntaAPI\Services\Loader::listWebPageServiceChannels($serviceId);
        if (!empty($serviceChannels)) {
          return $renderer->renderWebPageChannels($serviceId, $serviceChannels, $lang);
        }
        
        return '';
      }
      
    }
    
  }
?>