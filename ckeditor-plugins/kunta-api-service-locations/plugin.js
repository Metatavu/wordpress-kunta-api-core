/* global CKEDITOR */

(function() {
  'use strict';

  CKEDITOR.plugins.add( 'kunta-api-service-locations', {
      icons: 'kunta-api-service-locations',
      init: function(editor) {
        editor.addContentsCss(this.path + 'contents.css');

        editor.ui.addButton('kunta-api-service-location-embed', {
          label: 'Upota palvelupisteen tietoja',
          command: 'kunta-api-service-location-embed',
          toolbar: 'insert',
          icon: this.path + 'icons/kunta-api-service-location-embed.png'
        });

        CKEDITOR.dialog.add('kunta-api-service-location-embed', this.path + 'dialogs/service-location-embed.js');
        editor.addCommand('kunta-api-service-location-embed', new CKEDITOR.dialogCommand('kunta-api-service-location-embed'));
      }
  });
})();