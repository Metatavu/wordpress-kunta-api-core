/* global _, CKEDITOR, ajaxurl */

(function () {
  'use strict';
  
  function setEditorContents(editorId, contents) {
    // TODO: Support TinyMCE
    
    var ckEditor = !_.isUndefined(window.CKEDITOR) ? CKEDITOR.instances[editorId] : null;
    
    if (ckEditor) {
      ckEditor.setData(contents);
    } else {
      $('#' + editorId).val(contents);
    }
  }
  
  function getPageTemplate(serviceId, serviceLocationServiceChannelId, callback) {
    var action = serviceId ? 'kunta_api_render_service_page_template' : 'kunta_api_render_service_location_service_channel_page_template';
    var id = serviceId ? serviceId : serviceLocationServiceChannelId;
            
    $.post(ajaxurl, {
      'action': action,
      'id': id
    }, function (response) {
      callback(null, response);
    })
    .fail(function(response) {
      callback(response.responseText || response.statusText);
    });
  }

  jQuery(document).ready(function($) {
    $('.regenerate-page').click(function (event) {
      var button = $(event.target);
      var serviceId = button.attr('data-service-id');
      var serviceLocationServiceChannelId = button.attr('data-service-location-service-channel-id');
      var locales = $.parseJSON(button.attr('data-locales'));
      
      var contents = $('<p>').css({
       'text-align': 'center'
      }).text(locales.dialogText);
      
      $('<div>').append(contents).dialog({
        'title': locales.dialogTitle,
        'dialogClass' : 'wp-dialog',           
        'modal' : true,
        'closeOnEscape': true,      
        'buttons' : [{
          text: locales.yesButton,
          click: function() {
            $(this).dialog("option", 'title', locales.dialogLoadingTitle);
            $(this).dialog("option", 'buttons', []);
            contents.html('<img src="/wp-admin/images/spinner.gif"/><br/>' + locales.dialogLoadingText);
            
            getPageTemplate(serviceId, serviceLocationServiceChannelId, $.proxy(function (err, content) {
              if (err) {
                alert(err); 
              } else {
                setEditorContents('content', content);
                $(this).dialog("close");
              }
            }, this));
          }
        }, {
          text: locales.cancelButton,
          click: function() {
            $(this).dialog("close");
          }
        }]
      });  
    });
    
  });

}).call(this);