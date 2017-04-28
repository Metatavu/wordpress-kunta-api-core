<?php
  namespace KuntaAPI\Webhooks;
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Webhooks\WebhookHandler' ) ) {
    
    class WebhookHandler {
      
      private $baseUrl;
      
      public function __construct() {
        $organizationId = \KuntaAPI\Core\CoreSettings::getValue('organizationId');
        $apiUrl = dirname(\KuntaAPI\Core\CoreSettings::getValue('apiUrl'));
        $this->baseUrl = "$apiUrl/webhooks/management?organizationId=$organizationId";
        add_action('edit_post', [$this, "onEditPost"]);
        add_action('edit_post_related', [$this, "onEditPostRelated"]);
      }
      
      public function onEditPost($id) {
        $post = get_post($id);
        $status = $post->post_status;
        $type = $post->post_type;        
        $this->doPostRequest("ID=$id&post_status=$status&post_type=$type&hook=edit_post");
      }
      
      public function onEditPostRelated($id) {
        $post = get_post($id);
        $status = $post->post_status;
        $type = $post->post_type;        
        $this->doPostRequest("ID=$id&post_status=$status&post_type=$type&hook=edit_post");
      }
      
      private function doPostRequest($body) {
        $url = "$this->baseUrl";
        $bg = " > /dev/null 2>&1 &";
        $command = "curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' '$url' -d '$body'$bg"; 
        exec($command);
      }
      
    }
  
  }
  
  add_action('kunta_api_init', function () {  
    if (\KuntaAPI\Core\CoreSettings::getBooleanValue('webhooksEnabled')) {
      new WebhookHandler();
    }
  });
  
?>