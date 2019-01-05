<?php
namespace KuntaAPI\Gutenberg\Blocks;

require_once (__DIR__ . "/../../services/service-component-renderer.php" );

defined ( 'ABSPATH' ) || die ( 'No script kiddies please!' );

if (!class_exists( 'KuntaAPI\Gutenberg\Blocks' ) ) {

  /**
   * Class for handling Gutenberg blocks
   */
  class Blocks {
    
    /**
     * Constructor
     */
    public function __construct() {
      wp_register_script('kunta-api-service-block', plugins_url( 'js/service-block.js', __FILE__ ), ['wp-blocks', 'wp-element', 'wp-i18n']);      
      register_block_type( 'kunta-api/service', [
        'attributes' => [
          'serviceId' => [
            'type' => 'string'
          ],
          'component' => [
            'type' => 'string'
          ],
          'lang' => [
            'type' => 'string'
          ]
        ],
        'editor_script' => 'kunta-api-service-block',
        'render_callback' => [ $this, "renderServiceBlock" ]
      ]);
    }

    /**
     * Renders a service block
     */
    public function renderServiceBlock($attributes) {
      $serviceId = $attributes["serviceId"];
      $component = $attributes["component"];
      $lang = $attributes["lang"];
      $renderer = new \KuntaAPI\Services\ServiceComponentRenderer();
      $result = $renderer->renderComponent($serviceId, $component, $lang);
      if (empty($result)) {
        return $_GET["preview"] ? __("[Data not available for service]") : "";
      }

      return $result;
    }

  }

}

add_action('init', function () {
  new Blocks();
});

?>