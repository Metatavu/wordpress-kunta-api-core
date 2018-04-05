<?php
  namespace KuntaAPI\Reorder;
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Reorder\Reorder' ) ) {
    
    /**
     * Class for handling reorder related functions
     */
    class Reorder {

      private $pendingIds = [];
      
      /**
       * Constructor
       */
      public function __construct() {
        add_filter('post-types-order_save-ajax-order', [ $this, 'saveAjaxOrderFilter' ], 10, 3);
        add_action('PTO/order_update_complete', [ $this, 'orderUpdateCompleteAction' ]);
      }

      /**
       * Filter that is used to collect changed post ids
       * 
       * @param Object $data contains reorder data
       * @param String $key key
       * @param int $postId post id 
       */
      public function saveAjaxOrderFilter($data, $key, $postId) {
        $post = get_post($postId);
        if ($post) {
          $newOrder = $data["menu_order"];
          if ($newOrder !== $post->menu_order) {
            $this->pendingIds[] = $postId;
          }
        }

        return $data;
      }
      
      /**
       * Action that is triggered when reordering is complete.
       * 
       * Action triggers reoder_post action for all changed posts
       * 
       * @param $data action data
       */
      public function orderUpdateCompleteAction($data) {
        foreach ($this->pendingIds as $pendingId) {
          do_action("reorder_post", $pendingId);
        }

        $this->pendingIds = [];
      }

    }
  
  }

  new Reorder();
  
?>