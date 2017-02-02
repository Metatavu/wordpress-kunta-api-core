(function () {
  'use strict';

  jQuery(document).ready(function($) {
    if ($.fn.cs_wpColorPicker) {
      $('#banner-background-color').cs_wpColorPicker();
      $('#banner-text-color').cs_wpColorPicker();
    } else {
      $('#banner-background-color').wpColorPicker();
      $('#banner-text-color').wpColorPicker();
    }
  });

}).call(this);