/* global _, CKEDITOR, ajaxurl, ckeditorSettings */

(function ($) {
  'use strict';
  
  $(document).ready(function() {
    CKEDITOR.on( 'instanceReady', function( ev ) {
      if (ev.editor.name === 'content') {
        CKEDITOR.replace('sidebar_editor', ckeditorSettings.configuration);
      }
    });
  });

})(jQuery);