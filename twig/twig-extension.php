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
        '0' => 'su',
        '1' => 'ma',
        '2' => 'ti',
        '3' => 'ke',
        '4' => 'to',
        '5' => 'pe',
        '6' => 'la'
      ];
    }
      
    public function getFilters() {
      return [
        new \Twig_SimpleFilter('localizedValue', array($this, 'localizedValueFilter')),
        new \Twig_SimpleFilter('localizedValues', array($this, 'localizedValuesFilter')),
        new \Twig_SimpleFilter('shortDay', array($this, 'shortDayFilter')),
        new \Twig_SimpleFilter('serviceLocationPath', array($this, 'serviceLocationPathFilter')),
        new \Twig_SimpleFilter('pagePath', array($this, 'pagePathFilter')),
        new \Twig_SimpleFilter('formatServiceHour', array($this, 'formatServiceHourFilter')),
        new \Twig_SimpleFilter('formatWeekDays', array($this, 'formatWeekDaysFilter')),
        new \Twig_SimpleFilter('phoneNumber', array($this, 'phoneNumberFilter')),
        new \Twig_SimpleFilter('dateTimeFormat', array($this, 'dateTimeFormatFilter')),
        new \Twig_SimpleFilter('openingHoursFormat', array($this, 'openingHoursFormatFilter')),
        new \Twig_SimpleFilter('serviceHourSort', array($this, 'serviceHourSortFilter')),
        new \Twig_SimpleFilter('nl2p', array($this, 'nl2p')),
        new \Twig_SimpleFilter('mergeOpeningHours', array($this, 'mergeOpeningHoursFilter'))
      ];
    }

    public function nl2p($text) {
      $paragraphs = '';
      
      if (isset($text)) {
        foreach (explode("\n", $text) as $line) {
          if (trim($line)) {
            $paragraphs .= '<p>' . $line . '</p>';
          }
        } 
      }

      return $paragraphs;
    }
    
    public function serviceHourSortFilter($serviceHours) {
      usort($serviceHours, function($a, $b) {
        if (!$a['validFrom']) {
          return -1;
        }

        if (!$b['validFrom']) {
          return 1;
        }

        return $a['validFrom'] < $b['validFrom'] ? -1 : 1;
      });

      usort($serviceHours, function($a, $b) { 
        /**
        if ($a['serviceHourType'] == 'Standard' && $b['serviceHourType'] == 'Special') {
          return -1;
        } else if ($a['serviceHourType'] == 'Special' && $b['serviceHourType'] == 'Exception') {
          return -1;
        }  else if ($a['serviceHourType'] == 'Standard' && $b['serviceHourType'] == 'Exception') {
          return -1;
        } else if ($a['serviceHourType'] == 'Standard' && $a['serviceHourType'] == 'Standard') {
          if (!empty($a['additionalInformation']) && empty($b['additionalInformation'])) {
            return 1;
          } else if(empty($a['additionalInformation']) && !empty($b['additionalInformation'])) {
            return -1;
          } else {
            return 0;
          }
        } else {
          return 1;
        }
         */
        return 0;
      });
      
      return $serviceHours;
    }
    
    /**
     * Merge opening hours from continuous days with same times
     * 
     * @param \KuntaAPI\Model\DailyOpeningTime[] $openingHours
     * @return array 
     */
    public function mergeOpeningHoursFilter($openingHours) {
      $result = [];
      
      // Clone the original input
      foreach ($openingHours as $openingHour) {
        $stringified = $openingHour->__toString();
        $data = json_decode($stringified, true);
        $result[] = new \KuntaAPI\Model\DailyOpeningTime($data);
      }
      
      for ($i = sizeof($result) - 1; $i >= 0; $i--) {
        $openingHour = $result[$i];
          
        if ($openingHour == null) {
          error_log("Opening hour $i is null");
          continue;
        }
        
        for ($j = $i - 1; $j >= 0; $j--) {
          $mergeOpeningHour = $openingHours[$j];
          
          if ($mergeOpeningHour == null) {
            error_log("Merge opening hour $j is null");
            continue;
          }
          
          if ($this->areOpeningHoursMergeable($openingHour, $mergeOpeningHour)) {
            if (is_null($openingHour->getDayTo())) {
              $openingHour->setDayTo($openingHour->getDayFrom());
            }

            $openingHour->setDayFrom($mergeOpeningHour->getDayFrom());
            array_splice($result, $j, 1);
            $i--;
          }
        }
      }

      return $result;
    }
    
    /**
     * Formats daily opening time object.
     * 
     * @param type $dailyOpeningTime opening time to be formatted
     * @param type $table whether to render output as table row
     * @return string formatted time
     */
    public function openingHoursFormatFilter($dailyOpeningTime, $table = false, $exception = false) {
      $days = isset($dailyOpeningTime['dayFrom']) ? $this->dayMap[$dailyOpeningTime['dayFrom']] : '';
      $from = "";
      $to = "";
      
      if (isset($dailyOpeningTime['dayTo'])) {
        $days .= ' - ' . $this->dayMap[$dailyOpeningTime['dayTo']];
      }
      
      if (isset($dailyOpeningTime['from'])) {
        $from = implode('.', array_slice(explode(':', $dailyOpeningTime['from']), 0, 2));
      }
      
      if (isset($dailyOpeningTime['to'])) {
        $to = implode('.', array_slice(explode(':', $dailyOpeningTime['to']), 0, 2));
      }
      
      if ($table) {
        return "<tr><td>${days}</td><td>${from}</td><td>${to}</td>";
      } else {
        if ($exception) {
          $days = "";
        }

        if (!empty($from) || !empty($to)) {
          return "${days} ${from} - ${to}";
        } else {
          return "${days} ${from}";
        }
      }
    }
    
    public function dateTimeFormatFilter($datetime) {
      if ($datetime) {
        $datetime->setTimezone(new \DateTimeZone('Europe/Helsinki')); //TODO: create setting
        return $datetime->format('d.m.Y');
      } 
     
      return null;
    }
    
    /**
     * Formats a phone number. 
     * 
     * @param \KuntaAPI\Model\Phone $phone
     * @param boolean $stripFinnishPrefix strips finnish prefix number (+358) when present
     * @return string formatted phone number
     */
    public function phoneNumberFilter($phone, $stripFinnishPrefix = false) {
      $hasPrefix = false;
      
      $phonePrefix = $phone->getPrefixNumber();
      $result = '';
      if (isset($phonePrefix)) {
        if (!($phonePrefix === "+358" && $stripFinnishPrefix)) {
          $result .= "$phonePrefix ";
          $hasPrefix = true;
        }
      }
      
      $phoneNumber = $phone->getNumber();
      $hasLeadingZero = substr($phoneNumber, 0 , 1) === "0";
      if ($hasPrefix) {
        if ($hasLeadingZero) {
          // If number has a prefix number and the number part starts with a leading zero, we need to strip it out
          $phoneNumber = substr($phoneNumber, 1);
        }
      } else {
        // If number does not have a prefix number but also lacks the leading zero we need to prepend one
        if (!$hasLeadingZero) {
          $phoneNumber = "0${phoneNumber}";
        }
      }
      
      if (isset($phoneNumber)) {
        $result = $result . $phoneNumber;
      }
      
      return $result;
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

    /**
     * Returns values from localized array matching lang and optionally type if given
     * 
     * @param Array $localizedItems localized values
     * @param string $lang language
     * @param string $type (optional) filter by type
     * @return Array array of matching values 
     */
    public function localizedValuesFilter($localizedItems, $lang, $type = null) {
      $result = [];

      if (is_array($localizedItems)) {
        foreach ($localizedItems as $localizedItem) {
          if (($localizedItem->getLanguage() == $lang) && (!$type || ($type == $localizedItem->getType()))) {
            $result[] = $localizedItem->getValue();
          }
        }
      }
        
      return $result;
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
    
    public function pagePathFilter($page, $organizationId) {
      $path = [];
      
      $currentPage = $page;
      $i = 0;
      
      while ($i < 25) {
        if (empty($currentPage['parentId'])) {
          break;
        }
        
        $currentPage = \KuntaAPI\Pages\Loader::findOrganizationPage($organizationId, $currentPage['parentId']);
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
    
    /**
     * Returns whether two opening hours can be merged
     * 
     * @param \KuntaAPI\Model\DailyOpeningTime $openingHour target opening hour
     * @param \KuntaAPI\Model\DailyOpeningTime $mergeOpeningHour opening hour to be merged
     * @return boolean
     */
    private function areOpeningHoursMergeable($openingHour, $mergeOpeningHour) {
      if ($openingHour == null || $mergeOpeningHour == null) {
        return false;
      }
      
      if ($openingHour->getIsExtra() !== $mergeOpeningHour->getIsExtra()) {
        return false;
      }
      
      if ($openingHour->getFrom() !== $mergeOpeningHour->getFrom()) {
        return false;
      }
      
      if ($openingHour->getTo() !== $mergeOpeningHour->getTo()) {
        return false;
      }
      
      return (($mergeOpeningHour->getDayFrom() + 1) % 7) === $openingHour->getDayFrom();
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