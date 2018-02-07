<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Pages\Templates' ) ) {
    
    class Templates {
      
      public function __construct() {
        wp_enqueue_script('page-regenerate-template', plugin_dir_url(__FILE__) . 'page-regenerate-template.js', ['jquery-ui-dialog']);
      	add_action('media_buttons', [ $this, 'addMediaButton' ]);
        add_action('wp_ajax_kunta_api_render_service_page_template', [ $this, 'ajaxRenderServicePageTemplate']);
        add_action('wp_ajax_kunta_api_render_service_location_service_channel_page_template', [ $this, 'ajaxRenderServiceLocationServiceChannelPageTemplate']);
      }
      
      /**
       * Adds the template regenerate button into media buttons area
       * 
       * @param type $editorId editor id
       */
      public function addMediaButton($editorId) {
        if (!\KuntaAPI\Core\CoreSettings::getBooleanValue('usePageRegenerateTemplatePlugin')) {
          return;
        }
         
      	if ($editorId === 'content') {
          $post = get_post();
          $postType = $post ? $post->post_type : null;
          if ($postType !== null && $post->post_type !== 'page') {
            return;
          }
          
          $pageId = $post ? $post->ID : null;
          
          if (!$pageId && !empty( $GLOBALS['post_ID'] ) ) {
            $pageId = $GLOBALS['post_ID'];
          }
          
          $mapper = new \KuntaAPI\Services\Mapper();
          
          $serviceLocationServiceChannelId = null;
          $serviceId = $mapper->getPageServiceId($pageId);
          if (!$serviceId) {
            $serviceLocationServiceChannelId = $mapper->getPageServiceLocationServiceChannelId($pageId);
          }
          
          if ($serviceId || $serviceLocationServiceChannelId) {
            $locales = json_encode([
              yesButton => __('Yes', 'kunta_api_core'),
              cancelButton => __('Cancel', 'kunta_api_core'),
              dialogTitle => __('Are you sure?', 'kunta_api_core'),
              dialogText => __('Are you sure that you wish to replace page contents with contents from original template?', 'kunta_api_core'),
              dialogLoadingTitle => __('Loading...', 'kunta_api_core'),
              dialogLoadingText => __('Loading please wait...', 'kunta_api_core')
            ]);
            
            printf('<button type="button" class="button regenerate-page" data-service-id="%s" data-service-location-service-channel-id="%s" data-locales="%s">%s</button>', 
              $serviceId,
              $serviceLocationServiceChannelId,
              htmlspecialchars($locales),
              __( 'Regenerate from template', 'kunta_api_core' )
            );
          }
        }
      }
      
      /**
       * Ajax action for rendering template for a service page
       */
      public function ajaxRenderServicePageTemplate() {
        $id = $_POST['id'];
        $renderer = new \KuntaAPI\Services\PageRenderer();
        $service = \KuntaAPI\Services\Loader::findService($id);
        $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
        $GLOBALS['post_type'] = 'page';
        
        $template = apply_filters('content_edit_pre', $renderer->renderServicePage($lang, $service));
        $sidebar = $this->extractSidebarContents($template);
        $content = $this->removeSidebarContents($template);
        
        echo json_encode([
          "content" => $content,
          "sidebar" => $sidebar
        ]);
        
        wp_die();
      }
      
      /**
       * Ajax action for rendering template for a service location service channel page
       */
      public function ajaxRenderServiceLocationServiceChannelPageTemplate() {
        $id = $_POST['id'];
        $renderer = new \KuntaAPI\Services\PageRenderer();
        $channel = \KuntaAPI\Services\Loader::findServiceLocationServiceChannel($id);
        $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
        $GLOBALS['post_type'] = 'page';
        
        $template = apply_filters('content_edit_pre', $renderer->renderLocationChannelPage($lang, $channel));
        $sidebar = $this->extractSidebarContents($template);
        $content = $this->removeSidebarContents($template);
        
        echo json_encode([
          "content" => $content,
          "sidebar" => $sidebar
        ]);
        
        wp_die();
      }
      
      /**
       * Removes sidebar from the contents
       * 
       * @param String $content contents
       * @return String contents without sidebar
       */
      private function removeSidebarContents($content) {
        return preg_replace('/(<aside.*?>)(.*?)(<\/aside>)/is', '', $content);
      }
      
      /**
       * Extracts sidebar from the contents
       * 
       * @param String $content contents
       * @return String sidebar
       */
      private function extractSidebarContents($content) {
        $matches = [];
        preg_match_all('/(<aside.*?>)(.*?)(<\/aside>)/is', $content, $matches, PREG_SET_ORDER, 0);
        
        if (count($matches) === 1 && count($matches[0]) === 4) {
          return $this->removeSidebarInnerDiv($matches[0][2]);
        }
        
        return $content;
      }
      
      /**
       * Removes sidebar inner div from sidebar content
       * 
       * @param String $content contents
       * @return String sidebar without inner div
       */
      private function removeSidebarInnerDiv($content) {
        $result = preg_replace('/\<div.*kunta-api-aside-contents.*?\>/', '', $content);
        if ($result !== $content) {
          $lastDiv = strrpos($result, '</div>');
          if ($lastDiv) {
            return substr($result, 0, $lastDiv);
          }
        }
        
        return $result;
      }
    }
  
  }
  
  add_action('init', function () {
    new Templates();
  });
  
?>