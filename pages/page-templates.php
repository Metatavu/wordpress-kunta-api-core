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
        add_action('kunta_api_core_setting_groups', [ $this, 'kuntaApiCoreSettingGroups']);        
        add_action('kunta_api_core_settings', [ $this, 'kuntaApiCoreSettings']);   
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
        echo apply_filters('content_edit_pre', $renderer->renderServicePage($lang, $service));
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
        echo apply_filters('content_edit_pre', $renderer->renderLocationChannelPage($lang, $channel));
        wp_die();
      }
      
      /**
       * Action for altering kunta api setting groups
       */
      public function kuntaApiCoreSettingGroups() {
        global $kuntaApiSettingGroups;
    
        $kuntaApiSettingGroups[] = [
          'name' => 'pages',
          'title' => __('Page settings', 'kunta_api_core')
        ];
      }
      
      /**
       * Action for altering kunta api settings
       */
      public function kuntaApiCoreSettings() {
        global $kuntaApiSettings;

        $kuntaApiSettings[] = [
          "group" => "pages",
          "type" => "checkbox",
          "name" => "usePageRegenerateTemplatePlugin",
          "title" => __('Use page regenerate from template plugin (CKEditor only)', 'kunta_api_core')
        ];
      }
      
    }
  
  }
  
  add_action('init', function () {
    new Templates();
  });
  
?>