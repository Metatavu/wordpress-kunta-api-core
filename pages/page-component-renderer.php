<?php
  namespace KuntaAPI\Pages;
  	
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  require_once( __DIR__ . '/../core/twig-extension.php');
  
  if (!class_exists( 'KuntaAPI\Pages\PageComponentRenderer' ) ) {
    class PageComponentRenderer {
      
      private $twig;
      
      public function __construct() {
        $this->twig = new \Twig_Environment(new \Twig_Loader_Filesystem( __DIR__ . '/../templates'));
        $this->twig->addExtension(new \KuntaAPI\Services\TwigExtension());
      }
      
      public function renderPageChildrenComponent($component, $lang, $childPages) {
        $model = [
          'lang' => $lang,
          'childPages' => $childPages
        ];
        
        switch ($component) {
          case 'page-list':
            return $this->twig->render("page-children-components/page-list.twig", $model);
          default:
            error_log("unknown component $component");
            break;
        }
      }
      
    }  
  }
?>