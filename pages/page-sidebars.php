<?php
  namespace KuntaAPI\Pages;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Pages\Sidebars' ) ) {
    
    class Sidebars {
      
      public function __construct() {
        if (\KuntaAPI\Core\CoreSettings::getBooleanValue('usePageSidebarPlugin')) {
          wp_enqueue_script('page-sidebars', plugin_dir_url(__FILE__) . 'page-sidebars.js');
          add_action('add_meta_boxes', [$this, 'addMetaBoxes'], 0, 2 );
          add_action('save_post', [$this, 'savePost']);
        }
      }
      
      /**
       * Adds metaboxes into page edit view
       */
      public function addMetaBoxes() {
        add_meta_box('kunta_api_sidebar', __('Sidebar', 'kunta_api_core'), [$this, 'addSidebarMetabox'], 'page', 'advanced', 'high');
      }
      
      /**
       * Adds sidebar metabox into page edit view
       * 
       * @param \WP_Post $post post object
       */
      public function addSidebarMetabox($post) {
        $content = get_post_meta($post->ID, "kunta_api_sidebar", true);
        echo '<textarea name="sidebar_editor" id="sidebar_editor">' . htmlspecialchars($content) . '</textarea>';
      }
      
      /**
       * Action on save post
       * 
       * @param int $postId post id
       */
      public function savePost($postId) {
        if (!current_user_can( 'edit_post', $postId)) {
          return;  
        }
        
        $post = get_post($postId);
        
        if (!$post || $post->post_type !== 'page') {
          return;
        }
        
        if (isset($_POST['sidebar_editor'])) {
          update_post_meta($postId, 'kunta_api_sidebar', stripslashes($_POST['sidebar_editor']));
        }
      }
      
    }
  
  }
  
  add_action('init', function () {
    new Sidebars();
  });
  
?>