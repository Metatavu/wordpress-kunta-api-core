/* jshint esversion: 6 */
/* global ajaxurl, tinymce, moment, Promise */
((tinymce, $) => {
  
  const SUPPORTED_COMPONENTS = {
    'description': {
      'title': 'Palvelun kuvaus'
    },
    'userInstruction': {
      'title': 'Palvelun toimintaohjeet'
    },
    'languages': {
      'title': 'Palvelun kielet'
    },
    'electronicServiceChannelIds': {
      'title': 'Palvelun sähköiset palvelukanavat'
    },
    'phoneServiceChannelIds': {
      'title': 'Palvelun puhelinpalvelukanavat'
    },
    'printableFormServiceChannelIds': {
      'title': 'Palveluun liittyvät lomakkeet'
    },
    'serviceLocationServiceChannelIds': {
      'title': 'Palvelun toimipisteet'
    },
    'webPageServiceChannelIds': {
      'title': 'Palvelun hyödylliset linkit'
    }
  };
  
  class ServiceDialog extends window.KuntaApiAbstractEditDialog {
    
    /**
     * Constructs edit dialog
     * 
     * @param {type} editor TinyMCE editor instance
     * @param {type} service
     */
    constructor(editor, service) {
      super(editor);
      this.service = service;
    }
    
    saveService(service, callback) {
      $.post(ajaxurl, {
        'action': 'kunta_api_save_service',
        'service': JSON.stringify(this.service)
      }, (response) => {
        callback();
      })
      .fail((response) => {
        callback(response.responseText || response.statusText || "Unknown error occurred");
      });
    }
    
    open() {
      
    }
    
    validate(serviceLocationServiceChannel) {
      return null;
    }
    
  }
  
  class ServiceEditor {
    
    constructor (editor) {
      this.buttonStyle = {
        'color': '#555',
        'width': '100%',
        'border': '1px solid #ccc',
        'background': '#f7f7f7',
        'display': 'block',
        'padding': '5px',
        'margin-top': '5px',
        'margin-bottom': '5px',
        'cursor': 'pointer'
      };
      
      this.editor = editor;
      
      this.editor.on('BeforeSetcontent', this.onBeforeSetcontent.bind(this));
      this.editor.on('GetContent', this.onGetContent.bind(this));
      this.editor.on('DblClick', this.onDblClick.bind(this));
      this.editor.addCommand('kunta-api-service-edit', this.onServiceEdit.bind(this));
    }
    
    parseAttributes (string) {
      const result = [];
      const re = /([a-zA-Z-_]*)(\=\")([a-zA-Z0-9-]*)(\")/g;
      let match = null;
      
      do {
        match = re.exec(string);
        if (match && match.length > 3) {
          result.push({
            name: match[1],
            value: match[3] 
          });
        }
      } while (match);

      return result;
    }
    
    getComponentTitle (name) {
      return SUPPORTED_COMPONENTS[name].title;
    }
    
    replaceShortcodes(content) {
      return content.replace(/(\[kunta_api_service_component)([a-zA-Z0-9 -=]*)(\])/g, (all, tag, attributesText, end) => {
        const attributes = this.parseAttributes(attributesText);
        const placeholder = $('<input>')
          .attr({
           'type': 'button',
           'data-kunta-api-placeholder': 'service'
          })
          .css(this.buttonStyle);
          
        for (let i = 0; i < attributes.length; i++) {
          const attribute = attributes[i];
          placeholder.attr('data-' + attribute.name, attribute.value);
        }
        
        const component = placeholder.attr('data-component');
        if (!SUPPORTED_COMPONENTS[component]) {
          return all;
        }
        
        placeholder.attr('value', this.getComponentTitle(component));
        return $('<div>').append(placeholder).html();
      });
      
    }
    
    restoreShortcodes(content) {
      return content.replace(/<input [^>]+>/g, (match) => {
        const input = $(match);
        
        if (input.attr('data-kunta-api-placeholder') === 'service') {
          const shortcodeAttributes = [];
          const attributeNames = ['service-id', 'component'];
          
          for (let i = 0; i < attributeNames.length; i++) {
            const attributeName = attributeNames[i];
            const attributeValue = input.attr('data-' + attributeName);
            shortcodeAttributes.push([attributeName, '"' + attributeValue + '"'].join('='));
          }
          
          return '[kunta_api_service_component ' + shortcodeAttributes.join(' ') + ']';
        }
        
        return match;
      });
    }
    
    openElementEditor(element) {
      const placeholderAttr = element.attributes['data-kunta-api-placeholder'];
      if (placeholderAttr) {
        const serviceId = element.attributes['data-service-id'].value;
        this.editor.execCommand('kunta-api-service-edit', '', {
          serviceId: serviceId
        });
      }
    }
    
    findService(id, callback) {
      $.post(ajaxurl, {
        'action': 'kunta_api_load_service',
        'serviceId': id
      }, (response) => {
        callback(null, JSON.parse(response));
      })
      .fail((response) => {
        callback(response.responseText || response.statusText);
      });
    }
    
    onBeforeSetcontent(event) {
      event.content = this.replaceShortcodes(event.content);
    }
    
    onGetContent(event) {
      event.content = this.restoreShortcodes(event.content);
    }
    
    onDblClick(event) {
      const element = event.target;
      this.openElementEditor(element);
    }

    onServiceEdit(ui, options) {
      this.findService(options.serviceId, (err, service) => {
        if (err) {
          tinyMCE.activeEditor.windowManager.alert(err);
        } else {
          const dialog = new ServiceDialog(this.editor, service);
          dialog.open();
        }
      });
    } 
    
  }
  
  class ServiceEmbed {
    
    constructor (editor) {
      this.editor = editor;
      this.displayLocale = 'fi';
      this.searching = false;
      this.pending = false;
      this.addButton();
    }
    
    addButton () {
      this.editor.addButton('kunta_api_service_embed', {
        title: 'Search Kunta API services',
        onclick: () => {
          this.editor.windowManager.open({
            title: 'Search Kunta API services',
            width: 768,
            height: 500,
            body: [
              { type: 'textbox', name: 'kunta-api-service-query', label: 'Query', onKeyUp: (e) => {     
                if (!this.searching) {
                  this.searching = true;
                  this.searchServices(e.target.value, (response) => {
                    this.searching = false;
                    if (this.pending) {
                      this.searchServices(e.target.value, (innerResponse) => {
                        this.handleResponse(innerResponse);
                      });
                    } else {
                      this.handleResponse(response);
                    }
                  });
                } else {
                  this.pending = true;
                }
              }},
              {type: 'label', classes: 'kunta-api-search-info', text: "Kirjoita hakusana yllä olevaan hakukenttään"},
              {type: 'container', classes: 'kunta-api-search-results', minHeight: 400}
            ],
            onsubmit: (e) => {
              let responseHtml = '';
              let allEmbedsFromSameChannel = true;              
              const componentsToEmbed = $('.service-component-embed-input:checked');
              
              componentsToEmbed.each(function () {
                var component = $(this).attr('data-component-type');
                var serviceId = $(this).attr('data-service-id');
                responseHtml += '[kunta_api_service_component service-id="'+ serviceId +'" component="'+ component +'"]';
              });

              this.editor.insertContent(responseHtml);
            }
          });
        }
      });
    }
    
    searchServices(query, callback) {
      $('.mce-kunta-api-search-results').empty();
      $('.mce-kunta-api-search-results').append($('<div>').addClass('mce-kunta-api-search-results-loader'));
      $('.mce-kunta-api-search-info').text('Ladataan...');
      $.post(ajaxurl, {
        'action': 'kunta_api_search_services',
        'data': query
      }, (response) => {
        $('.mce-kunta-api-search-results-loader').remove();
        callback(JSON.parse(response));
      });
    }
    
    getLocalizedValueAndType(values, locale, type) {
      for (let i = 0; i < values.length; i++) {
        if (locale === values[i].language && type === values[i].type) {
          return values[i].value;
        }
      }
      
      return null;
    }
    
    appendResult(result) {
      const resultContainer = $('<div>').addClass('mce-kunta-api-search-result-row');
      const name = this.getLocalizedValueAndType(result.names, this.displayLocale, 'Name');

      resultContainer.append(
        $('<p>')
          .addClass('mce-kunta-api-search-result-title')
          .text(name)
      );
      
      Object.keys(SUPPORTED_COMPONENTS).forEach((component) => {
        const options = SUPPORTED_COMPONENTS[component]; 
        resultContainer.append(
          $('<p>')
            .append($('<input>')
            .addClass('service-component-embed-input')
            .attr({
              'type':'checkbox',
              'data-component-type': component,
              'data-service-id': result.id
            }))
            .append($('<span>').text(options.title))
        );
      });
      
      $('.mce-kunta-api-search-results').append(resultContainer);
    }
    
    handleResponse(response) {
      $('.mce-kunta-api-search-results').empty();

      if (response.length === 0) {
        $('.mce-kunta-api-search-info').text('Hakusanalla ei löytynyt yhtään palvelua');
      } else {
        $('.mce-kunta-api-search-info').text('Kirjoita hakusana yllä olevaan hakukenttään');
      }

      for (let i = 0; i < response.length; i++) {
        this.appendResult(response[i]);
      }

    }
    
  }
  
  tinymce.PluginManager.add('kunta_api_service_embed', (editor, url) => {
    new ServiceEmbed(editor);
    new ServiceEditor(editor);
  });
  
})(tinymce, jQuery);