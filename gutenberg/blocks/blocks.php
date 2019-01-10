<?php
namespace KuntaAPI\Gutenberg\Blocks;

require_once (__DIR__ . "/../../core/locale-helper.php" );
require_once (__DIR__ . "/../../services/service-mapper.php");
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
      add_action('init', [$this, "onInit"]);
      add_action('save_post', [$this, "onSavePost"], 10, 3);
    }

    /**
     * Action executed on init
     */
    public function onInit() {
      wp_register_script('kunta-api-service-block', plugins_url( 'js/service-block.js', __FILE__ ), ['wp-blocks', 'wp-element', 'wp-i18n']);      
      wp_set_script_translations("kunta-api-service-block", "kunta_api_core", dirname(__FILE__) . '/lang/');

      wp_localize_script('kunta-api-service-block', 'kuntaApiBlocks', array(
        'metaformsUrl' => plugin_dir_url( __FILE__ ) . "metaforms",
      ));

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
          ],
          'serviceLocationPage' => [
            'type' => 'boolean'
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
     * Save post action handler
     * 
     * @param int $postId The post ID.
     * @param \WP_Post $post The post object.
     * @param bool $update Whether this is an existing post being updated or not.
     */
    public function onSavePost($pageId, $post, $update) {
      if (has_blocks($post->post_content)) {
        $pageChannelIds = [];
        $notPageChannelIds = [];
        $blocks = parse_blocks($post->post_content);
        $mapper = new \KuntaAPI\Services\Mapper();
        
        foreach ($blocks as $block) {
          if ($block["blockName"] == "kunta-api/service-location-service-channel") {
            $attrs = $block["attrs"];
            if (boolval($attrs["serviceLocationPage"])) {
              $pageChannelIds[] = $attrs["channelId"];
            } else {
              $notPageChannelIds[] = $attrs["channelId"];
            }
          }
        }

        foreach (array_unique($notPageChannelIds) as $notPageChannelId) {
          if ($mapper->getServiceLocationServiceChannelPageId($notPageChannelId) == $pageId) {
            $mapper->setLocationChannelPageId($notPageChannelId, null);
          }
        }

        foreach (array_unique($pageChannelIds) as $pageChannelId) {
          $mapper->setLocationChannelPageId($pageChannelId, $pageId);
        }
      }
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

      if (!$lang) {
        $lang = 'fi';
      }

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

new Blocks();

?>