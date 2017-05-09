<?php
  namespace KuntaAPI\Services;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Services\ServiceComponentRenderer' ) ) {
    
    class ServiceComponentRenderer {
      
      private $twig;
      
      public function __construct() {
        $this->twig = new \Twig_Environment(new \Twig_Loader_Filesystem( __DIR__ . '/../templates'));
        $this->twig->addExtension(new \KuntaAPI\Services\TwigExtension());
      }
      
      public function renderComponent($serviceId, $serviceComponent, $lang) {
        
        if (empty($lang)) {
          $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
        }
        
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
      
      private function renderServiceComponent($serviceId, $lang, $type) {
        $service = \KuntaAPI\Services\Loader::findService($serviceId);
        if (isset($service)) {
          $model = [
            'lang' => $lang,
            'service' => $service
          ];

          switch ($type) {
            case 'description':
              return $this->twig->render("service-components/service-description.twig", $model);
            case 'userInstruction':
              return $this->twig->render("service-components/service-user-instructions.twig", $model);
            case 'languages':
              return $this->twig->render("service-components/service-languages.twig", $model);
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