/* global ajaxurl, tinymce */
((tinymce, $) => {
  
  const SUPPORTED_COMPONENTS = {
    'name': {
      'title': 'Palvelupisteen nimi'
    },
    'description': {
      'title': 'Palvelupisteen kuvaus'
    },
    'email': {
      'title': 'Palvelupisteen sähköpostiosoitteet'
    },
    'addresses': {
      'title': 'Palvelupisteen osoitetiedot'
    },
    'fax': {
      'title': 'Palvelupisteen faksi'
    },
    'phone': {
      'title': 'Palvelupisteen puhelinnumerot'
    },
    'servicehours': {
      'title': 'Palvelupisteen aukioloajat'
    },
    'webpages': {
      'title': 'Palvelupisteen verkkosivustot'
    }
  };
  
  class AbstractEditor {
    
    constructor(dialog, tab) {
      this.dialog = dialog;
      this.tab = tab;
    }
    
    getLocalizedValue(localized, locale) {
      for (let i = 0; i < localized.length; i++) {
        if (localized[i].language === locale) {
          return localized[i].value;
        } 
      }
      
      return null;
    }
    
    commitValue(locale, values) {
    }
    
  }
  
  class LocalizedValueEditor extends AbstractEditor {
    
    constructor(dialog, tab, locale, name, title, multiline) {
      super(dialog, tab);
      this.locale = locale;
      this.name = name;
      this.title = title;
      this.multiline = multiline;
    }
    
    getEditorFields(values) {
      const value = this.getLocalizedValue(values, this.locale);
      return [{
        name: `${this.name}.${this.locale}`,
        label: `${this.title} (${this.locale})`,
        type: 'textbox',
        multiline: this.multiline,
        value: value
      }];
    }
    
    commitLocalizedValue(targetList, values, name, type) {
      const newValue = values[`${name}.${this.locale}`];
      let valueUpdated = false;

      targetList.forEach((targetItem, index) => {
        if (targetItem.language === this.locale && (!type || type === targetItem.type)) {
          if (newValue) {
            targetItem.value = newValue;
          } else {
            targetList.splice(index, 1); 
          }
          
          valueUpdated = true;
        }
      });
      
      if (newValue && !valueUpdated) {
        const newItem = {
          value: newValue,
          language: this.locale
        };
        
        if (type) {
          newItem.type = type;
        }
        
        targetList.push(newItem);
      }
    }
    
  };
  
  class ServiceLocationServiceChannelNameEditor extends LocalizedValueEditor {
    
    constructor(dialog, tab, locale, serviceLocationServiceChannel) {
      super(dialog, tab, locale, 'name', 'Nimi', false);
      this.serviceLocationServiceChannel = serviceLocationServiceChannel;
    }
    
    getEditorFields() {
      return super.getEditorFields(this.serviceLocationServiceChannel.names);
    }
    
    commitValue(values) {
      super.commitLocalizedValue(this.serviceLocationServiceChannel.names, values, 'name');
    }
    
  };
  
  class AbstractServiceLocationServiceChannelDescriptionEditor extends LocalizedValueEditor {
    
    constructor(dialog, tab, locale, name, title, descriptionType, serviceLocationServiceChannel) {
      super(dialog, tab, locale, name, title, true);
      this.serviceLocationServiceChannel = serviceLocationServiceChannel;
      this.descriptionType = descriptionType;
    }
    
    getEditorFields() {
      return super.getEditorFields(this.serviceLocationServiceChannel.descriptions.filter((description) => {
        return description.type === this.descriptionType;
      }));
    }
    
  };
  
  class ServiceLocationServiceChannelShortDescriptionEditor extends AbstractServiceLocationServiceChannelDescriptionEditor {

     constructor(dialog, tab, locale, serviceLocationServiceChannel) {
      super(dialog, tab, locale, 'short-description', 'Tiivistelmä', 'ShortDescription');
      this.serviceLocationServiceChannel = serviceLocationServiceChannel;
    }
    
    commitValue(values) {
      super.commitLocalizedValue(this.serviceLocationServiceChannel.descriptions, values, 'short-description', 'ShortDescription');
    }
    
  };
  
  class ServiceLocationServiceChannelDescriptionEditor extends AbstractServiceLocationServiceChannelDescriptionEditor {
    
    constructor(dialog, tab, locale, serviceLocationServiceChannel) {
    super(dialog, tab, locale, 'description', 'Kuvaus', 'Description');
      this.serviceLocationServiceChannel = serviceLocationServiceChannel;
    }
    
    commitValue(values) {
      super.commitLocalizedValue(this.serviceLocationServiceChannel.descriptions, values, 'description', 'Description');
    }
    
  };
  
  class ServiceLocationServiceChannelAbstractMultivalueEditor extends AbstractEditor {
    
    constructor(dialog, tab, supportedLocales, serviceLocationServiceChannel, options) {
      super(dialog, tab);
      this.options = options;
      this.index = -1;
      this.serviceLocationServiceChannel = serviceLocationServiceChannel;
      this.supportedLocales = supportedLocales;
      this.dialog.on('open', this.onDialogOpen.bind(this));
    }
    
    getValues() {
      return [];  
    }
    
    getEditorFields() {
      return [
        this.createFieldList(this.createFieldSets()),
        this.createAddButton()
      ];
    }
    
    createFieldList(items) {
      return {
        label: '',
        type: 'container',
        layout: 'grid',
        id: `${this.options.baseName}-list`,
        name: `${this.options.baseName}-list`,
        columns: 1,
        items: items
      };
    }
    
    createFieldSets() {
      return this.getValues().map((value) => {
        return this.createFieldSet(value);
      });
    }
    
    createAddButton() {
      return {
        id: `${this.options.baseName}-add`,
        classes: `${this.options.baseName}-add`,
        name: `${this.options.baseName}-add`,
        type: 'button',
        text: this.options.addButtonText
      };
    }
    
    commitLocalizedValue(targetList, values, name, locale) {
      const newValue = values[name];
      let valueUpdated = false;
      
      targetList.forEach((targetItem, index) => {
        if (targetItem.language === locale) {
          if (newValue) {
            targetItem.value = newValue;
          } else {
            targetList.splice(index, 1); 
          }
          
          valueUpdated = true;
        }
      });
      
      if (newValue && !valueUpdated) {
        targetList.push({
          value: newValue,
          language: locale
        });
      }
    }
    
    onDialogOpen() {
      this.dialog.window.find(`#${this.options.baseName}-add`).on('click', this.onAddAddressClick.bind(this));
    }
    
    onAddAddressClick(event) {
      this.dialog.addChildItems(`#${this.options.baseName}-list`, this.createFieldSet());
    }
    
  };
  
  class ServiceLocationServiceChannelAddressEditor extends ServiceLocationServiceChannelAbstractMultivalueEditor {
    
    constructor(dialog, tab, supportedLocales, serviceLocationServiceChannel) {
      super(dialog, tab, supportedLocales, serviceLocationServiceChannel, {
        baseName: 'address',
        addButtonText: 'Lisää osoite'
      });
    }
    
    getValues() {
      return this.serviceLocationServiceChannel.addresses;
    }
    
    createFieldSet(value) {
      return {
        label: 'Osoite',
        type: 'fieldset',
        border: 'none',
        layout: 'grid',
        name: "address",
        columns: 2,
        items: this.createAddressFields(value)
      };
    }
    
    createAddressFields(address) {
      const additionalInformation = null;
      const streetNumber = address ? address.streetNumber : null;
      const postalCode = address ? address.postalCode : null;
      this.index++;
      
      const result = [];
      
      this.supportedLocales.forEach((locale) => {
        result.push({
          'name': this.getStreetAddressFieldName(locale, this.index),
          'type': 'textbox',
          'label': `Kadunnimi (${locale})`,
          'value': address ? this.getLocalizedValue(address.streetAddress, locale) : null
        });
        
        result.push({
          'name': this.getAdditionalInformationFieldName(locale, this.index),
          'type': 'textbox',
          'label': `Osoitteen lisätieto (${locale})`,
          'value': additionalInformation ? additionalInformation.value : ''
        });
      });
      
      result.push({
        'name': this.getStreetNumberFieldName(this.index),
        'type': 'textbox',
        'label': 'Osoitenumero',
        'value': streetNumber
      });
      
      result.push({
        'name': this.getPostalCodeFieldName(this.index),
        'type': 'textbox',
        'label': 'Postinumero',
        'value': postalCode
      });
      
      return result; 
    }
    
    commitValue(values) {
      for (let index = 0; index < this.index + 1; index++) {
        let address = this.serviceLocationServiceChannel.addresses[index];
        if (!address) {
          address = {};
          this.serviceLocationServiceChannel.addresses.push(address);
        }
        
        if (!address.streetAddress) {
          address.streetAddress = [];
        }
        
        if (!address.additionalInformations) {
          address.additionalInformations = [];
        }
        
        this.supportedLocales.forEach((locale) => {
          this.commitLocalizedValue(address.streetAddress, values, this.getStreetAddressFieldName(locale, index), locale);
          this.commitLocalizedValue(address.additionalInformations, values, this.getAdditionalInformationFieldName(locale, index), locale);
        });
        
        address.streetNumber = values[this.getStreetNumberFieldName(index)];
        address.postalCode = values[this.getPostalCodeFieldName(index)];
      }
    }
    
    getStreetAddressFieldName(locale, index) {
      return `address-street-address-${locale}-${index}`;
    }
    
    getStreetNumberFieldName(index) {
      return `address-street-number-${index}`;
    }
    
    getPostalCodeFieldName(index) {
      return `address-postal-code-${index}`;
    }
    
    getAdditionalInformationFieldName(locale, index) {
      return `address-additional-information-${locale}-${index}`;
    }
    
  };
  
  class ServiceLocationServiceChannelDialog {
    
    constructor(editor, serviceLocationServiceChannel) {
      this.serviceLocationServiceChannel = serviceLocationServiceChannel;
      this.dialogTitle = 'Palvelupiste';
      this.supportedLocales = ['fi', 'en', 'sv'];
      this.editor = editor;
      this.listeners = [];
      this.editors = [];
   
      this.supportedLocales.forEach((locale) => {
        this.editors.push(new ServiceLocationServiceChannelNameEditor(this, `basic-${locale}`, locale, serviceLocationServiceChannel));
        this.editors.push(new ServiceLocationServiceChannelShortDescriptionEditor(this, `basic-${locale}`, locale, serviceLocationServiceChannel));
        this.editors.push(new ServiceLocationServiceChannelDescriptionEditor(this, `basic-${locale}`, locale, serviceLocationServiceChannel));
      });

      this.editors.push(new ServiceLocationServiceChannelAddressEditor(this, 'addresses', this.supportedLocales, serviceLocationServiceChannel));

      // TODO: Kielet, joilla palvelupisteessä palvellaan
    }
    
    addChildItems(selector, items) {
      const container = this.window.find(selector)[0];
      container.append(container.create(items)); 
    }
    
    getLocaleName(locale) {
      switch (locale) {
        case 'fi':
          return 'Suomi';
        case 'en':
          return 'Englanti';
        case 'sv':
          return 'Ruotsi';
      }
    }
    
    createTab(name, title, items) {
      const tabEditors = this.editors.filter((editor) => {
        return editor.tab === name;
      });

      let tabItems = [];
      
      if (items) {
        tabItems = items;
      } else {
        tabEditors.forEach((editor) => {
          tabItems = tabItems.concat(editor.getEditorFields());
        });
      }
      
      return {
        type: 'fieldset',
        name: name,
        title: title,
        items: tabItems
      };
    }
    
    saveServiceLocationServiceChannel(serviceLocationServiceChannel, callback) {
      $.post(ajaxurl, {
        'action': 'kunta_api_save_service_location_service_channel',
        'serviceLocationServiceChannel': JSON.stringify(this.serviceLocationServiceChannel)
      }, (response) => {
        callback();
      })
      .fail((response) => {
        callback(response.responseText || response.statusText);
      });
    }
    
    open() {
      let tabs = [];
      const contactSubtabs = [];
 
      contactSubtabs.push(this.createTab('emails', 'Sähköpostit'));
      contactSubtabs.push(this.createTab('fax', 'Faksit'));
      contactSubtabs.push(this.createTab('phone', 'Puhelimet'));
      contactSubtabs.push(this.createTab('web', 'Verkkosivut'));
      
      tabs.push(this.createTab('common', 'Yleiset'));
      
      this.supportedLocales.forEach((locale) => {
        tabs.push(this.createTab(`basic-${locale}`, `Perustiedot (${locale})`));
      });
      
      tabs.push(this.createTab('addresses', 'Osoitteet'));
      tabs.push(this.createTab('times', 'Palveluajat'));
      tabs.push(this.createTab('contacts', 'Yhteystiedot', contactSubtabs));
      
      this.window = this.editor.windowManager.open({
        title: this.dialogTitle,
        body: [{
          id: 'dialog-form',
          type: 'form',
          items: [{
            name: 'locales',
            type: 'tabpanel',
            layout: 'fit',
            items: tabs
          }]
        }],
        width: 1000,
        height: 700,
        buttons: [{
          text: 'Tallenna',
          subtype: 'save',
          onclick: (event) => {
            const dialogForm = this.window.find('form').filter((form) => {
              return form.settings.id === 'dialog-form';
            })[0];
            
            const values = dialogForm.toJSON();
            this.editors.forEach((editor) => {
              editor.commitValue(values);
            });
            
            this.saveServiceLocationServiceChannel(this.serviceLocationServiceChannel, (err) => {
              if (err) {
                tinyMCE.activeEditor.windowManager.alert(err);
              }
            });
          }
        }, {
          text: 'Peruuta', 
          onclick: () => {
            this.window.close();
          }
        }]
      });
      
      this.trigger('open');
    }
    
    trigger (event, data) {
      this.listeners.forEach((listener) => {
        if (listener.event === event) {
          listener.callable(data||{});
        }
      });
    }
    
    on (event, callable) {
      this.listeners.push({
        event: event,
        callable: callable
      });
    }
    
  }
  
  class ServiceLocationServiceChannelEditor {
    
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
      this.editor.addCommand('kunta-api-service-location-channel-edit', this.onServiceLocationChannelEdit.bind(this));
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
      return content.replace(/(\[kunta_api_location_channel_component)([a-zA-Z0-9 -=]*)(\])/g, (all, tag, attributesText, end) => {
        const attributes = this.parseAttributes(attributesText);
        const placeholder = $('<input>')
          .attr({
           'type': 'button',
           'data-kunta-api-placeholder': 'location_channel_component'
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
        
        if (input.attr('data-kunta-api-placeholder') === 'location_channel_component') {
          const shortcodeAttributes = [];
          const attributeNames = ['channel-id', 'component'];
          
          for (let i = 0; i < attributeNames.length; i++) {
            const attributeName = attributeNames[i];
            const attributeValue = input.attr('data-' + attributeName);
            shortcodeAttributes.push([attributeName, '"' + attributeValue + '"'].join('='));
          }
          
          return '[kunta_api_location_channel_component ' + shortcodeAttributes.join(' ') + ']';
        }
        
        return match;
      });
    }
    
    openElementEditor(element) {
      const placeholderAttr = element.attributes['data-kunta-api-placeholder'];
      if (placeholderAttr) {
        const serviceLocationServiceChannelId = element.attributes['data-channel-id'].value;
        this.editor.execCommand('kunta-api-service-location-channel-edit', '', {
          serviceLocationServiceChannelId: serviceLocationServiceChannelId
        });
      }
    }
    
    findServiceLocationServiceChannel(id, callback) {
      $.post(ajaxurl, {
        'action': 'kunta_api_load_service_location_service_channel',
        'serviceLocationServiceChannelId': id
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

    onServiceLocationChannelEdit(ui, options) {
      this.findServiceLocationServiceChannel(options.serviceLocationServiceChannelId, (err, serviceLocationServiceChannel) => {
        console.log(err, serviceLocationServiceChannel);
        
        if (err) {
          tinyMCE.activeEditor.windowManager.alert(err);
        } else {
          const dialog = new ServiceLocationServiceChannelDialog(this.editor, serviceLocationServiceChannel);
          dialog.open();
        }
      });
    } 
    
  }
  
  class ServiceLocationServiceChannelEmbed {
    
    constructor (editor) {
      this.editor = editor;
      this.displayLocale = 'fi';
      this.searching = false;
      this.pending = false;
      this.addButton();
    }
    
    addButton () {
      this.editor.addButton('kunta_api_service_location_embed', {
        title: 'Search Kunta API service location channels',
        onclick: () => {
          this.editor.windowManager.open({
            title: 'Search Kunta API service location channels',
            width: 768,
            height: 500,
            body: [
              { type: 'textbox', name: 'kunta-api-service-query', label: 'Query', onKeyUp: (e) => {     
                if (!this.searching) {
                  this.searching = true;
                  this.searchServiceLocationChannels(e.target.value, (response) => {
                    this.searching = false;
                    if (this.pending) {
                      this.searchServiceLocationChannels(e.target.value, (innerResponse) => {
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
              const firstServiceLocationChannelId = componentsToEmbed.first().attr('data-service-location-channel-id');
              const serviceLocationChannelName = componentsToEmbed.first().attr('data-service-location-channel-name');
              
              componentsToEmbed.each(function () {
                var component = $(this).attr('data-component-type');
                var serviceLocationChannelId = $(this).attr('data-service-location-channel-id');
                responseHtml += '[kunta_api_location_channel_component channel-id="'+ serviceLocationChannelId +'" component="'+ component +'"]';
                if (serviceLocationChannelId !== firstServiceLocationChannelId) {
                  allEmbedsFromSameChannel = false;
                }
              });

              if (allEmbedsFromSameChannel) {
                this.editor.windowManager.confirm("Merkitäänkö sivu palvelukanavan: "+ serviceLocationChannelName + " sivuksi?", function(confirmed) {
                  if (confirmed) {
                    const pageId = $('#post_ID').val();
                    this.markAsServiceLocationPage(firstServiceLocationChannelId, pageId);
                  }
                });
              }

              this.editor.insertContent(responseHtml);
            }
          });
        }
      });
    }
    
    markAsServiceLocationPage(serviceLocationChannelId, pageId) {
      $.post( ajaxurl, {
        'action': 'kunta_api_mark_page_as_location_page',
        'pageId': pageId,
        'locationChannelId': serviceLocationChannelId
      }, (response) => {
      });
    }
    
    searchServiceLocationChannels(query, callback) {
      $('.mce-kunta-api-search-results').empty();
      $('.mce-kunta-api-search-results').append($('<div>').addClass('mce-kunta-api-search-results-loader'));
      $('.mce-kunta-api-search-info').text('Ladataan...');
      $.post(ajaxurl, {
        'action': 'kunta_api_search_service_location_channels',
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
              'data-service-location-channel-name': name,
              'data-component-type': component,
              'data-service-location-channel-id': result.id
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
  
  tinymce.PluginManager.add('kunta_api_service_location_embed', (editor, url) => {
    new ServiceLocationServiceChannelEmbed(editor);
    new ServiceLocationServiceChannelEditor(editor);
  });
  
})(tinymce, jQuery);