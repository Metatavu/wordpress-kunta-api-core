(function () {
  'use strict';

  jQuery(document).ready(function($) {
    $('#kunta_api_banner_image').on( 'click', '#set_kunta_api_banner', function (event) {
      event.preventDefault();
      
      if (!window._fileFrame) {
        window._fileFrame = wp.media.frames.file_frame = wp.media({
          title: $(this).attr('data-file-frame-title'),
          multiple: false
        });
  
        window._fileFrame.on( 'select', function() {
          var attachment = window._fileFrame.state().get('selection').first().toJSON();
          $('#upload_kunta_api_banner').val(attachment.id);
          $('#remove_kunta_api_banner').show();
          $('#set_kunta_api_banner').hide();
          $('#kunta_api_parent_banner_container').hide();
          $('#kunta_api_banner_container img').show();
          $('#kunta_api_banner_container img').attr({
            'src': attachment.url,
            'srcset': attachment.url
          });
        });
      }
      
      window._fileFrame.open();
    });

    $('#kunta_api_banner_image').on( 'click', '#remove_kunta_api_banner', function(event) {
      event.preventDefault();
      $('#upload_kunta_api_banner').val('');
      $('#kunta_api_banner_container img').hide();
      $('#set_kunta_api_banner').show();
      $('#remove_kunta_api_banner').hide();
      $('#kunta_api_parent_banner_container').show();
    });
    
  });

}).call(this);