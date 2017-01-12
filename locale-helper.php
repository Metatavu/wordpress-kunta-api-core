<?php

  namespace KuntaAPI\Core;
  require_once( __DIR__ . '/vendor/autoload.php');
    
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  class LocaleHelper {
  	
  	public function __construct() {
  	}
  	
  	public static function getCurrentLanguage() {
  	  return "fi";
  	}
    
    public static function getDefaultValue($localizedValues) {
      foreach ($localizedValues as $localizedValue) {
    	$language = $localizedValue->getLanguage();
    	$value = $localizedValue->getValue();
    	if (this::getCurrentLanguage() == $language) {
    	  return $value;
    	}
      }
    
      return null;
    }
  	
  }
  
?>