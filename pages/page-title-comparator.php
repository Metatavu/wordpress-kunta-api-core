<?php
  namespace KuntaAPI\Pages;
  	
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!class_exists( 'KuntaAPI\Pages\PageTitleComparator' ) ) {
    
    class PageTitleComparator {
      
      private $lang;
      private $sortDir;
      
      public function __construct($lang, $sortDir) {
        $this->lang = $lang;
        $this->sortDir = $sortDir;
      }
      
      public function compare($page1, $page2) {
        $value1 = \KuntaAPI\Core\LocaleHelper::getLocalizedValue($page1->getTitles(), $this->lang);
        $value2 = \KuntaAPI\Core\LocaleHelper::getLocalizedValue($page2->getTitles(), $this->lang);

        if ($this->sortDir == 'DESC') {
          return strcmp($value1, $value2);
        } else {
          return strcmp($value2, $value1);
        }
      }
      
    }
  }
?>