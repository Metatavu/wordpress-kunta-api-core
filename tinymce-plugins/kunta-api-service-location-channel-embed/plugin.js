/* global ajaxurl, tinymce */

(function(tinymce, $) {
  'use strict';

  var LOCALE = 'fi';
  var searching = false;
  var pending = false;

  function markAsServiceLocationPage(serviceLocationChannelId, pageId) {
    $.post( ajaxurl, {
      'action': 'kunta_api_mark_page_as_location_page',
      'pageId': pageId,
      'locationChannelId': serviceLocationChannelId
    }, function(response) {
    });
  }

  function searchServiceLocationChannels(query, callback) {
    $('.mce-kunta-api-search-results').empty();
    $('.mce-kunta-api-search-results').append($('<div>').addClass('mce-kunta-api-search-results-loader'));
    $('.mce-kunta-api-search-info').text('Ladataan...');
    $.post( ajaxurl, {
      'action': 'kunta_api_search_service_location_channels',
      'data': query
    }, function(response){
      $('.mce-kunta-api-search-results-loader').remove();
      callback(JSON.parse(response));
    });
  }
  
  function getLocalizedValueAndType(values, locale, type) {
    for(var i = 0; i < values.length; i++) {
      if(locale == values[i].language && type == values[i].type) {
        return values[i].value;
      }
    }
    return null;
  }
  
  function appendResult(result) {
    var resultContainer = $('<div>').addClass('mce-kunta-api-search-result-row');
    var name = getLocalizedValueAndType(result.names, LOCALE, 'Name');
    
    resultContainer.append(
      $('<p>')
        .addClass('mce-kunta-api-search-result-title')
        .text(name)
    );
    
    resultContainer.append(
      $('<p>')
        .append($('<input>')
        .addClass('service-component-embed-input')
        .attr({
          'type':'checkbox',
          'data-service-location-channel-name': name,
          'data-component-type': 'name',
          'data-service-location-channel-id': result.id
        }))
        .append(
          $('<span>')
            .text('Palvelupisteen nimi'))
    );
    
    resultContainer.append(
      $('<p>')
        .append($('<input>')
        .addClass('service-component-embed-input')
        .attr({
          'type':'checkbox',
          'data-service-location-channel-name': name,
          'data-component-type': 'description',
          'data-service-location-channel-id': result.id
        }))
        .append(
          $('<span>')
            .text('Palvelupisteen kuvaus'))
    );
    
    resultContainer.append(
      $('<p>')
        .append($('<input>')
        .addClass('service-component-embed-input')
        .attr({
          'type':'checkbox',
          'data-service-location-channel-name': name,
          'data-component-type': 'addresses',
          'data-service-location-channel-id': result.id
        }))
        .append(
          $('<span>')
            .text('Palvelupisteen osoitetiedot'))
    );
    
    resultContainer.append(
      $('<p>')
        .append($('<input>')
        .addClass('service-component-embed-input')
        .attr({
          'type':'checkbox',
          'data-service-location-channel-name': name,
          'data-component-type': 'email',
          'data-service-location-channel-id': result.id
        }))
        .append(
          $('<span>')
            .text('Palvelupisteen sähköpostiosoitteet'))
    );
    
    resultContainer.append(
      $('<p>')
        .append($('<input>')
        .addClass('service-component-embed-input')
        .attr({
          'type':'checkbox',
          'data-service-location-channel-name': name,
          'data-component-type': 'fax',
          'data-service-location-channel-id': result.id
        }))
        .append(
          $('<span>')
            .text('Palvelupisteen faksi'))
    );
    
    resultContainer.append(
      $('<p>')
        .append($('<input>')
        .addClass('service-component-embed-input')
        .attr({
          'type':'checkbox',
          'data-service-location-channel-name': name,
          'data-component-type': 'phone',
          'data-service-location-channel-id': result.id
        }))
        .append(
          $('<span>')
            .text('Palvelupisteen puhelinnumerot'))
    );
    
    resultContainer.append(
      $('<p>')
        .append($('<input>')
        .addClass('service-component-embed-input')
        .attr({
          'type':'checkbox',
          'data-service-location-channel-name': name,
          'data-component-type': 'phone-charge-info',
          'data-service-location-channel-id': result.id
        }))
        .append(
          $('<span>')
            .text('Puheluiden maksutiedot'))
    );
    
    resultContainer.append(
      $('<p>')
        .append($('<input>')
        .addClass('service-component-embed-input')
        .attr({
          'type':'checkbox',
          'data-service-location-channel-name': name,
          'data-component-type': 'servicehours',
          'data-service-location-channel-id': result.id
        }))
        .append(
          $('<span>')
            .text('Palvelupisteen aukioloajat'))
    );
    
    resultContainer.append(
      $('<p>')
        .append($('<input>')
        .addClass('service-component-embed-input')
        .attr({
          'type':'checkbox',
          'data-service-location-channel-name': name,
          'data-component-type': 'webpages',
          'data-service-location-channel-id': result.id
        }))
        .append(
          $('<span>')
            .text('Palvelupisteen verkkosivustot'))
    );

    $('.mce-kunta-api-search-results').append(resultContainer);
  }
  
  function handleResponse(response) {
    $('.mce-kunta-api-search-results').empty();
    
    if (response.length === 0) {
      $('.mce-kunta-api-search-info').text('Hakusanalla ei löytynyt yhtään palvelua');
    } else {
      $('.mce-kunta-api-search-info').text('Kirjoita hakusana yllä olevaan hakukenttään');
    }
    
    for(var i = 0; i < response.length; i++) {
      appendResult(response[i]);
    }
    
    
  }

  tinymce.PluginManager.add('kunta_api_service_location_embed', function(editor, url) {

    editor.addButton('kunta_api_service_location_embed', {
      title: 'Search Kunta API service location channels',
      onclick: function() {
        editor.windowManager.open({
          title: 'Search Kunta API service location channels',
          width: 768,
          height: 500,
          body: [
            {type: 'textbox', name: 'kunta-api-service-query', label: 'Query', onKeyUp: function(e) {     
              if(!searching) {
                searching = true;
                searchServiceLocationChannels(e.target.value, function(res){
                  searching = false;
                  if (pending) {
                    searchServiceLocationChannels(e.target.value, handleResponse);
                  } else {
                    handleResponse(res);
                  }
                });
              } else {
                pending = true;
              }
            }},
            {type: 'label', classes: 'kunta-api-search-info', text: "Kirjoita hakusana yllä olevaan hakukenttään"},
            {type: 'container', classes: 'kunta-api-search-results', minHeight: 400}
          ],
          onsubmit: function(e) {
            var componentsToEmbed = $('.service-component-embed-input:checked');
            var responseHtml = '';
            var firstServiceLocationChannelId = componentsToEmbed.first().attr('data-service-location-channel-id');
            var serviceLocationChannelName = componentsToEmbed.first().attr('data-service-location-channel-name');
            var allEmbedsFromSameChannel = true;
            componentsToEmbed.each(function(){
              var component = $(this).attr('data-component-type');
              var serviceLocationChannelId = $(this).attr('data-service-location-channel-id');
              responseHtml += '[kunta_api_location_channel_component channel-id="'+ serviceLocationChannelId +'" component="'+ component +'"]';
              if (serviceLocationChannelId !== firstServiceLocationChannelId) {
                allEmbedsFromSameChannel = false;
              }
            });
            
            if (allEmbedsFromSameChannel) {
              editor.windowManager.confirm("Merkitäänkö sivu palvelukanavan: "+ serviceLocationChannelName + " sivuksi?", function(confirmed) {
                if (confirmed) {
                  var pageId = $('#post_ID').val();
                  markAsServiceLocationPage(firstServiceLocationChannelId, pageId);
                }
              });
            }
            
            editor.insertContent(responseHtml);
          }
        });
      }
    });
  });
})(tinymce, jQuery);
