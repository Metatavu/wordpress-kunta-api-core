<?php
namespace KuntaAPI\Services;

defined( 'ABSPATH' ) || die( 'No script kiddies please!' );

require_once( __DIR__ . '/../vendor/autoload.php');

if (!class_exists( 'KuntaAPI\Services\TwigExtension' ) ) {
  class TwigExtension extends \Twig_Extension {
     
    private $dayMap;
    private $mapper;

    public function __construct() {
      $this->mapper = new \KuntaAPI\Services\Mapper();
      $this->dayMap = [
        '0' => 'Su',
        '1' => 'Ma',
        '2' => 'Ti',
        '3' => 'Ke',
        '4' => 'To',
        '5' => 'Pe',
        '6' => 'La'
      ];
    }
      
    public function getFilters() {
      return [
        new \Twig_SimpleFilter('localizedValue', array($this, 'localizedValueFilter')),
        new \Twig_SimpleFilter('shortDay', array($this, 'shortDayFilter')),
        new \Twig_SimpleFilter('serviceLocationPath', array($this, 'serviceLocationPathFilter')),
        new \Twig_SimpleFilter('pagePath', array($this, 'pagePathFilter')),
        new \Twig_SimpleFilter('formatServiceHour', array($this, 'formatServiceHourFilter')),
        new \Twig_SimpleFilter('formatWeekDays', array($this, 'formatWeekDaysFilter'))
      ];
    }
      
    public function localizedValueFilter($localizedItems, $lang, $type = null) {
      if (is_array($localizedItems)) {
        foreach ($localizedItems as $localizedItem) {
          if (($localizedItem->getLanguage() == $lang) && (!$type || ($type == $localizedItem->getType()))) {
            return $localizedItem->getValue();
          }
        }
      }
        
      return '';
    }

    public function formatWeekDaysFilter($days, $returnMondayFirst) {
      $sequences = [];
      $booleanDays = [false, false, false, false, false, false, false];
      
      if ($returnMondayFirst) {
        $days = $this->daysToMondayFirst($days);
      }
      
      foreach ($days as $day) {
        $booleanDays[$day] = true;
      }

      $i = 0;
      while ($i < 7) {
        if ($booleanDays[$i] === true) {
          if ($i < 6 && $booleanDays[$i] && $booleanDays[$i + 1]) {
            $start = $i;

            while ($i < 6 && $booleanDays[$i] && $booleanDays[$i + 1]) {
              $i++;
              $end = $i;
            }

            $sequences[] = [
              'type' => 'range',
              'from' => $returnMondayFirst ? $this->dayToSundayFirst($start) : $start,
              'to' => $returnMondayFirst ? $this->dayToSundayFirst($end) : $end
            ];

          } else {
            $sequences[] = [
              'type' => 'single',
              'index' => $returnMondayFirst ? $this->dayToSundayFirst($i) : $i
            ];
          }
        }

        $i++;
      }
      
      $result = [];
      
      foreach ($sequences as $sequence) {
        if ($sequence['type'] == 'single') {
          $result[] = $this->dayMap[$sequence['index']];
        } else {
          $result[] = $this->dayMap[$sequence['from']] . ' - ' . $this->dayMap[$sequence['to']];
        }
      }
      
      return implode(",", $result);
    }
          
    public function shortDayFilter($text) {
      return $this->dayMap[$text];
    }
    
    public function serviceLocationPathFilter($serviceLocationChannelId, $serviceId) {
      $pageId = $this->mapper->getLocationChannelPageId($serviceLocationChannelId);
      if (empty(!$pageId)) {
        return '/' . get_page_uri($pageId);
      }
      
      return 'about:blank';
    }
    
    public function pagePathFilter($page) {
      $path = [];
      
      $currentPage = $page;
      $i = 0;
      
      while ($i < 25) {
        if (empty($currentPage['parentId'])) {
          break;
        }
        
        $currentPage = \KuntaAPI\Pages\Loader::findOrganizationPage($currentPage['parentId']);
        array_unshift($path, $currentPage['slug']);
        
        $i++;
      }
      
      array_unshift($path, '');
      $path[] = $page['slug'];
        
      return implode("/", $path);
    }
    
    public function formatServiceHourFilter($time) {
      return implode(":", array_slice(explode(":", $time), 0, 2));
    }
    
    private function dayToSundayFirst($mondayFirstIndex) {
      return $mondayFirstIndex + 1 % 6;
    }
    
    private function daysToMondayFirst($sundayFirstRange) {
      $result = [];
      $addSunday = false;

      foreach ($sundayFirstRange as $sundayFirstIndex) {
        if ($sundayFirstIndex == 0) {
          $addSunday = true;
        } else {
          $result[] = $sundayFirstIndex - 1;
        }
      }

      if ($addSunday) {
        $result[] = 6;
      }

      return $result;
    }
  }
}
?>