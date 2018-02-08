/* global _, CKEDITOR, ajaxurl, ckeditorSettings */

(function ($) {
  'use strict';
  
  $(document).ready(function() {
   if (!_.isUndefined(window.CKEDITOR)) {
      CKEDITOR.on( 'instanceReady', function( ev ) {
        if (ev.editor.name === 'content') {
          CKEDITOR.replace('sidebar_editor', ckeditorSettings.configuration);
        }
      });
    }
  });

})(jQuery);