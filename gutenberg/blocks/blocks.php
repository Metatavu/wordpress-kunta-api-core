<?php
namespace KuntaAPI\Gutenberg\Blocks;

require_once (__DIR__ . "/../../core/locale-helper.php" );
require_once (__DIR__ . "/../../services/service-component-renderer.php");
require_once (__DIR__ . "/../../services/service-locations/service-location-component-renderer.php" );


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
      wp_set_script_translations("kunta-api-service-block", "kunta_api_core", dirname(__FILE__) . '/lang/');

      register_block_type( 'kunta-api/service-location-service-channel', [
        'attributes' => [    
          'channelId' => [
            'type' => 'string'
          ],
          'component' => [
            'type' => 'string'
          ],
          'lang' => [
            'type' => 'string'
          ]      
        ],
        'render_callback' => [ $this, "renderServiceLocationServiceChannelBlock" ]
      ]);

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
     * 
     * @param {array} $attributes block attributes
     * @return {string} rendered block
     */
    public function renderServiceBlock($attributes) {
      $serviceId = $attributes["serviceId"];
      $component = $attributes["component"];
      $lang = $attributes["lang"];

      if ($_GET["displayName"]) {
        $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
        $service = \KuntaAPI\Services\Loader::findService($serviceId);
        if ($service) {
          return \KuntaAPI\Core\LocaleHelper::getLocalizedValue($service->getNames(), $lang, "Name");
        } else {
          return __("[Failed to load service]", "kunta_api_core");
        }
      }

      $renderer = new \KuntaAPI\Services\ServiceComponentRenderer();
      $result = $renderer->renderComponent($serviceId, $component, $lang);
      if (empty($result)) {
        return $_GET["preview"] ? __("[Data not available for service]", "kunta_api_core") : "";
      }

      return $result;
    }

    /**
     * Renders a service location service channel block
     * 
     * @param {array} $attributes block attributes
     * @return {string} rendered block
     */
    public function renderServiceLocationServiceChannelBlock($attributes) {
      $serviceLocationChannelId = $attributes['channelId'];
      $lang = $attributes['lang'];
      $serviceComponent = $attributes['component'];
      $result = '';

      $serviceLocationChannel = \KuntaAPI\Services\Loader::findServiceLocationServiceChannel($serviceLocationChannelId);
      if (!$serviceLocationChannel) {
        return __("[Failed to load service location service channel]", "kunta_api_core");
      }

      if ($_GET["displayName"]) {
        $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
        return \KuntaAPI\Core\LocaleHelper::getLocalizedValue($serviceLocationChannel->getNames(), $lang, "Name");
      }

      $renderer = new \KuntaAPI\Services\ServiceLocations\ServiceLocationComponentRenderer();
      $result = $renderer->renderComponent($lang, $serviceLocationChannel, $serviceComponent);
    
      if (empty($result)) {
        return $_GET["preview"] ? __("[Data not available for service location service channel]", "kunta_api_core") : "";
      }

      return $result;

    }

  }

}

add_action('init', function () {
  new Blocks();
});

?>