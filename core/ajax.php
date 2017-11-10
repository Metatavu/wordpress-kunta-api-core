<?php
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  add_action( 'wp_ajax_kunta_api_search_codes', function () {
    try {
      error_log("Hurbadurba");
      
      $types = $_POST['types'];
      $search = $_POST['search'];
      $results = [];
      $codes = \KuntaAPI\Core\Api::getCodesApi()->listCodes($types, $search);
      
      foreach ($codes as $code) {
        $results[] = $code->__toString();
      }
      
      echo '[';
      echo join(',', $results);
      echo ']';
      
      wp_die();
    } catch (\KuntaAPI\ApiException $e) {
      $message = json_encode($e->getResponseBody());
      wp_die($message, null, [
        response => $e->getCode()
      ]);
    }
  });

?>