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