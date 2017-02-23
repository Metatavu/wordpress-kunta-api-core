<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  require_once( __DIR__ . '/page-component-renderer.php');
  require_once( __DIR__ . '/page-loader.php');
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Pages\PageChildrenContentProcessor' ) ) {
    
    class PageContentProcessor extends \KuntaAPI\Core\AbstractContentProcessor {

      public function process($dom, $mode) {
        $renderer = new PageComponentRenderer();
        
        foreach ($dom->find('*[data-type="kunta-api-page-children"]') as $article) {
          $pageId = $article->{'data-page-id'};
          $component = $article->{'data-component'};
          $lang = $article->{'data-lang'};
          
          if (empty($lang)) {
          	$lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
          }

          if($mode == 'edit') {
            $article->class = 'mceNonEditable';
            $article->contentEditable = 'false';
            $article->readonly = 'true';
          } else {
            $article->removeAttribute('data-page-id');
            $article->removeAttribute('data-type');
            $article->removeAttribute('data-component');
            $article->removeAttribute('data-lang');
          }
          
          $childPages = \KuntaAPI\Pages\Loader::listOrganizationChildPages($pageId);
          if (isset($childPages)) {          
            $article->innertext = $renderer->renderPageChildrenComponent($component, $lang, $childPages);
          }
        } 
      }
    }
  }
  
  add_action('init', function(){
    global $kuntaAPIPageProcessor;
    $kuntaAPIPageProcessor->registerContentProcessor(new PageContentProcessor());
  });
  
?>