<?php
  namespace KuntaAPI\Webhooks;
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Webhooks\WebhookHandler' ) ) {
    
    class WebhookHandler {
      
      private $baseUrl;
      
      public function __construct() {
        $apiUrl = dirname(\KuntaAPI\Core\CoreSettings::getValue('apiUrl'));
        $this->baseUrl = "$apiUrl/webhooks/management";
        add_action('edit_post', [$this, "onEditPost"]);
        add_action('edit_post_related', [$this, "onEditPostRelated"]);
        add_action('reorder_post', [$this, "onReorderPost"]);
      }

      /**
       * Action handler for reorder_post action
       * 
       * @param int $id post id
       * @param int $orderIndex new order index
       */
      public function onReorderPost($id) {
        $post = get_post($id);
        $status = $post->post_status;
        $type = $post->post_type;
        $this->doPostRequest("ID=$id&post_status=$status&post_type=$type&hook=edit_post");
      }
      
      public function onEditPost($id) {
        $post = get_post($id);
        $status = $post->post_status;
        $type = $post->post_type;
        
        if ("inherit" == $status) {
          return;
        }

        $orderIndex = $status === 'publish' ? $this->resolveOrderIndex($type, $id) : '';
        $this->doPostRequest("ID=$id&post_status=$status&post_type=$type&hook=edit_post&order_index=$orderIndex");
      }
      
      public function onEditPostRelated($id) {
        $post = get_post($id);
        $status = $post->post_status;
        $type = $post->post_type;
        
        if ("inherit" == $status) {
          return;
        }

        $orderIndex = $status === 'publish' ? $this->resolveOrderIndex($type, $id) : '';
        $this->doPostRequest("ID=$id&post_status=$status&post_type=$type&hook=edit_post&order_index=$orderIndex");
      }
      
      private function resolveOrderIndex($type, $id) {
        $page = 0;
        $perPage = 50;
        
        while ($page < 100) {
          $offset = $perPage * $page;
          
          $ids = get_posts([
            'fields' => 'ids',
            'post_type'        => $type,
            'posts_per_page'   => $perPage,
            'offset'           => $offset,
            'suppress_filters' => false
          ]);
          
          $index = array_search($id, $ids);
          if ($index !== false) {
            return $offset + $index;
          }
          
          $page++;
        }
      }
      
      private function doPostRequest($body) {
        foreach (\KuntaAPI\Core\CoreSettings::getOrganizationIdsWithWebhooks() as $organizationId) {
          $url = "$this->baseUrl?organizationId=$organizationId";
          $this->curlPost($url, $body);
        }
      }

      private function curlPost($url, $body) {
          $defaults = array(
              CURLOPT_POST => 1,
              CURLOPT_HEADER => 0,
              CURLOPT_URL => $url,
              CURLOPT_FRESH_CONNECT => 1,
              CURLOPT_RETURNTRANSFER => 1,
              CURLOPT_FORBID_REUSE => 1,
              CURLOPT_TIMEOUT => 3,
              CURLOPT_POSTFIELDS => $body
          );
          $ch = curl_init();
          curl_setopt_array($ch, ($defaults));
          curl_exec($ch);
          curl_close($ch);
      } 
      
    }
  
  }
  
  add_action('kunta_api_init', function () {  
    if (\KuntaAPI\Core\CoreSettings::getWebhooksEnabled()) {
      new WebhookHandler();
    }
  });
  
?>
