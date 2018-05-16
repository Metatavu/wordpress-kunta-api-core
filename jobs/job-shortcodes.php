<?php
  namespace KuntaAPI\Jobs;
  
  require_once( __DIR__ . '/../vendor/autoload.php');
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  if (!class_exists( 'KuntaAPI\Jobs\JobShortcodes' ) ) {
    
    class JobShortcodes {
      
      public function __construct() {
        add_shortcode('kunta_api_job_list', [$this, 'jobListShortcode']);
      }
      
      /**
       * Renders a job list component
       * 
       * Following attributes can be used to control the component:
       * 
       * <li>
       *   <ul><b>limit:</b> if set maximum number of jobs are rendered</ul>
       *   <ul><b>sort-by:</b> Sort jobs by this</ul>
       *   <ul><b>sort-dir:</b> Sort direction</ul>
       * </li>
       * 
       * @param type $tagAttrs tag attributes
       * @return string replaced contents
       */
      public function jobListShortcode($tagAttrs) {
        $attrs = shortcode_atts([
          'limit' => 20,
          'sort-by' => 'PUBLICATION_END',
          'sort-dir' => 'ASCENDING'
        ], $tagAttrs);

        return '<div class="kunta-api-job-list" data-limit="'. $attrs['limit'] . '"  data-sort-by="'. $attrs['sort-by'] . '"  data-sort-dir="'. $attrs['sort-dir'] . '"/>';
      }
    }
  
  }
  
  add_action('init', function () {
    new JobShortcodes();
  });
  
?>