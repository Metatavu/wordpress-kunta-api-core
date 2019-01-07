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

      if (!$component) {
        $component = "description";
      }

      if ($_GET["displayName"]) {
        if (!$serviceId) {
          return __("No service selected", "kunta_api_core");
        }

        $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
        $service = \KuntaAPI\Services\Loader::findService($serviceId);
        if ($service) {
          return \KuntaAPI\Core\LocaleHelper::getLocalizedValue($service->getNames(), $lang, "Name");
        } else {
          return __("[Failed to load service]", "kunta_api_core");
        }
      }

      $renderer = new \KuntaAPI\Services\ServiceComponentRenderer();
      $result = $serviceId ? $renderer->renderComponent($serviceId, $component, $lang) : "";
      if (empty($result)) {
        return $_GET["preview"] ? __("[Service does not have data for given component]", "kunta_api_core") : "";
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
      $component = $attributes['component'];
      $result = '';

      if (!$component) {
        $component = "description";
      }

      $serviceLocationChannel = $serviceLocationChannelId ? \KuntaAPI\Services\Loader::findServiceLocationServiceChannel($serviceLocationChannelId) : null;
      if ($_GET["displayName"]) {
        if (!$serviceLocationChannel) {
          return __("No service location selected", "kunta_api_core");
        }

        $lang = \KuntaAPI\Core\LocaleHelper::getCurrentLanguage();
        return \KuntaAPI\Core\LocaleHelper::getLocalizedValue($serviceLocationChannel->getNames(), $lang, "Name");
      }

      $renderer = new \KuntaAPI\Services\ServiceLocations\ServiceLocationComponentRenderer();
      $result = $serviceLocationChannel ? $renderer->renderComponent($lang, $serviceLocationChannel, $component) : "";
    
      if (empty($result) && $_GET["preview"]) {
        return __("[Service location does not have data for given component]", "kunta_api_core");
      }

      return $result;

    }

  }

}

add_action('init', function () {
  new Blocks();
});

?>