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
      
      public function renderPageList($lang, $childPages, $sortBy, $sortDir) {
        switch ($sortBy||'') {
          case 'title':
            $childPages = $this->sortPagesByTitle($childPages, $lang, $sortDir);
          break;
          default:
            if ($sortDir == 'DESC') {
              $childPages = array_reverse($childPages);
            }
          break;
        }
        
        $model = [
          'lang' => $lang,
          'childPages' => $childPages
        ];
        
        return $this->twig->render("page-children-components/page-list.twig", $model);
      }
      
      private function sortPagesByTitle($pages, $lang, $sortDir) {
      	usort($pages, array(new PageTitleComparator($lang, $sortDir), "compare"));
        return $pages;
      }
      
    }  
  }
?>