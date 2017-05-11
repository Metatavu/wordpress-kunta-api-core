<?php
  namespace KuntaAPI\Twig;
  	
  defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  require_once( __DIR__ . '/twig-extension.php');
  
  if (!class_exists( 'KuntaAPI\Twig\TwigLoader' ) ) {
    class TwigLoader {
      
      private static $twig;
      
      public static function getTwig() {
        if (!isset(static::$twig)) {
          global $kuntaApiTemplateFolders;
                  
          $kuntaApiTemplateFolders = [];
          do_action('kunta_api_register_templates');
          $kuntaApiTemplateFolders[] = __DIR__ . '/../templates';
          
          static::$twig = new \Twig_Environment(new \Twig_Loader_Filesystem($kuntaApiTemplateFolders));
          static::$twig->addExtension(new \KuntaAPI\Services\TwigExtension());
        }
        
        return static::$twig;
      }
      
    }
  }
  ?>