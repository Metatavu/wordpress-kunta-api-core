<?php

  namespace KuntaAPI\Core;
  require_once( __DIR__ . '/../vendor/autoload.php');
    
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  class LocaleHelper {
  	
  	public function __construct() {
  	}
  	
  	public static function getCurrentLanguage() {
  	  return "fi";
  	}

  	public static function getEnabledLanguages(){
  		return ["fi"];
  	}
    
    public static function getDefaultValue($localizedValues) {
      foreach ($localizedValues as $localizedValue) {
    	$language = $localizedValue->getLanguage();
    	$value = $localizedValue->getValue();
    	if (self::getCurrentLanguage() == $language) {
    	  return $value;
    	}
      }
    
      return null;
    }
    
    public static function getLocalizedValue($localizedItems, $lang, $type = null) {
      if (is_array($localizedItems)) {
        foreach ($localizedItems as $localizedItem) {
    	  if (($localizedItem->getLanguage() == $lang) && (!$type || ($type == $localizedItem->getType()))) {
    	    return $localizedItem->getValue();
    	  }
    	}
      }
    
      return '';
    }
  	
  }
  
?>