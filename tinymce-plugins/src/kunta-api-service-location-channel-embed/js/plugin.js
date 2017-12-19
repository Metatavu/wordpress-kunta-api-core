/* jshint esversion: 6 */
/* global ajaxurl, tinymce, moment, Promise */
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
  
  class ServiceLocationServiceChannelDialog extends window.AbstractServiceChannelEditorDialog {
    
    /**
     * Constructs service location service channel dialog
     * 
     * @param {Object} editor TinyMCE editor instance
     * @param {Object} serviceChannel service channel
     */
    constructor(editor, serviceChannel) {
      super(editor, serviceChannel, 'kunta_api_save_service_location_service_channel');
      
      this.on("afterDialogOpen", this.onAfterDialogOpen.bind(this));
    }
    
    /**
     * Returns main form for service channel
     * 
     * @returns {Object} metaform
     */
    getServiceChannelFormViewModel() {
      return getServiceLocationServiceChannelMetaform();
    }
    
    openAdditionalDetailsEditDialog() {
      const viewModel = getServiceLocationChannelAdditionalDetailsMetaform();
      this.additionalDetailsToForm(this.serviceChannel).then((formValues) => {
        const dialog = this.openMetaformDialog(this.prepareViewModel(viewModel), formValues, (newFormValues) => {
          this.additionalDetailsFromForm(newFormValues);
        });
        
        this.createLanguagesAutocomplete(dialog.find('*[data-name="languages"]'), formValues.languageCodes);
        this.createAreasAutocomplete(dialog.find('*[data-name="areas"]'), formValues.areaCodes);
      });
      
    }
    
    validate(serviceLocationServiceChannel) {
      const addressSubtypes = [];
      
      for (let j = 0; j < serviceLocationServiceChannel.addresses.length; j++) {
        const address = serviceLocationServiceChannel.addresses[j];
        if (address.subtype === "Abroad" || address.subtype === "Single") {
          for (let i = 0; i < addressSubtypes.length; i++) {
            if (addressSubtypes[i] !== address.subtype) {
              return "Toimipisteellä ei voi olla yhtäaikaa kotimaista ja ulkomaista osoitetta"; 
            }
          }
        }
        
        addressSubtypes.push(address.subtype);
      }
      
      return null;
    }
    
    serviceChannelFromForm(existingLocationServiceChannel, formValues) {
      const serviceLocationServiceChannel = JSON.parse(JSON.stringify(existingLocationServiceChannel));
      serviceLocationServiceChannel.addresses = [];
      serviceLocationServiceChannel.descriptions = [];
      serviceLocationServiceChannel.emails = [];
      serviceLocationServiceChannel.phoneNumbers = [];
      
      this.supportedLocales.forEach((locale) => {
        const localeValues = formValues[locale];
        
        const localeAddresses = JSON.parse(localeValues.addresses).filter((address) => {
          return !!address.street && !!address.street.trim();
        });
        
        localeAddresses.forEach((localeAddress, addressIndex) => {
          let address;
          if (serviceLocationServiceChannel.addresses.length - 1 < addressIndex) {
            address = {
              additionalInformations: [],
              streetAddress: [],
              subtype: 'Single',
              type: 'Location',
              country: 'FI'
            };
            
            serviceLocationServiceChannel.addresses.push(address);
          } else {
            address = serviceLocationServiceChannel.addresses[addressIndex];
          }
          
          if (localeAddress.additionalInformation) {
            localeAddress.additionalInformation = localeAddress.additionalInformation.trim();
          }
          
          if (localeAddress.additionalInformation) {
            address.additionalInformations.push({
              "language": locale,
              "value": localeAddress.additionalInformation
            });
          }
        
          address.streetAddress.push({
            "language": locale,
            "value": localeAddress.street
          });
          
          address.postalCode = localeAddress.postOfficeCode;
          address.streetNumber = localeAddress.streetNumber;
        });
        
        const foreignAddresses = JSON.parse(localeValues.foreignAddresses).filter((address) => {
          return !!address.foreign;
        });
        
        foreignAddresses.forEach((foreignAddress, foreignAddressIndex) => {
          const addressIndex = localeAddresses.length + foreignAddressIndex;
          
          let address;
          if (serviceLocationServiceChannel.addresses.length - 1 < addressIndex) {
            address = {
              subtype: 'Abroad',
              type: 'Location',
              locationAbroad: []
            };            
            serviceLocationServiceChannel.addresses.push(address);
          } else {
            address = serviceLocationServiceChannel.addresses[addressIndex];
          }
          
          address.locationAbroad.push({
            "language": locale,
            "value": foreignAddress.foreign
          });
        });
        
        serviceLocationServiceChannel.emails = serviceLocationServiceChannel.emails.concat(
          JSON.parse(localeValues.emails)
            .filter((email) => {
              return !!email.email;
            })
            .map((email) => {
              return {
                "language": locale,
                "value": email.email
              };
            })
        );

        serviceLocationServiceChannel.phoneNumbers = serviceLocationServiceChannel.phoneNumbers.concat(
          JSON.parse(localeValues.phoneNumbers)
            .filter((phoneNumber) => {
              return !!phoneNumber.prefixNumber && !!phoneNumber.number;
            })
            .map((phoneNumber) => {
              return Object.assign(phoneNumber, {
                "type": "Phone",
                "language": locale,
                "isFinnishServiceNumber": phoneNumber.isFinnishServiceNumber === "true"
              });
            })
        );

        serviceLocationServiceChannel.phoneNumbers = serviceLocationServiceChannel.phoneNumbers.concat(
          JSON.parse(localeValues.faxes)
            .filter((fax) => {
              return !!fax.prefixNumber && !!fax.number;
            })
            .map((fax) => {
              return {
                "type": "Fax",
                "language": locale,
                "number": fax.number,
                "prefixNumber": fax.prefixNumber,
                "isFinnishServiceNumber": false
              };
            })
        );

        serviceLocationServiceChannel.webPages = serviceLocationServiceChannel.webPages.concat(
          JSON.parse(localeValues.webPages)
            .filter((webPage) => {
              return !!webPage.url;
            })
            .map((webPage) => {
              return Object.assign(webPage, {
                "language": locale
              });
            })
        );
        
        if (localeValues.description) {
          localeValues.description = localeValues.description.trim();
        }
        
        if (localeValues.description) {
          serviceLocationServiceChannel.descriptions.push({
            "language": locale,
            "value": localeValues.description,
            "type": "Description"
          });
        }
        
        if (localeValues.shortDescription) {
          localeValues.shortDescription = localeValues.shortDescription.trim();
        }
      
        if (localeValues.shortDescription) {
          serviceLocationServiceChannel.descriptions.push({
            "language": locale,
            "value": localeValues.shortDescription,
            "type": "ShortDescription"
          });
        }
      });
      
      return serviceLocationServiceChannel;
    }
    
    additionalDetailsToForm(serviceLocationServiceChannel) {
      return this.languagesToForm(serviceLocationServiceChannel.languages)
        .then((languageCodes) => {
          return {
            languageCodes: languageCodes,
            areaCodes: this.areasToForm(serviceLocationServiceChannel.areas),
            areaType: serviceLocationServiceChannel.areaType
          };
        });
    }
    
    additionalDetailsFromForm(newFormValues) {
      this.serviceChannel.areaType = newFormValues.areaType;
      this.serviceChannel.languages = (newFormValues.languages||'').split(',');
      this.serviceChannel.areas = this.areasFromForm(newFormValues.areaType, newFormValues.areas);
    }
   
    serviceChannelToForm(locale) {
      const name = this.getTypedLocalizedValue(this.serviceChannel.names, locale, 'Name');
      const shortDescription = this.getTypedLocalizedValue(this.serviceChannel.descriptions, locale, 'ShortDescription');
      const description = this.getTypedLocalizedValue(this.serviceChannel.descriptions, locale, 'Description');
      const visitAddresses = this.serviceChannel.addresses.filter((address) => {
        return address.subtype !== 'Abroad';
      });
      
      const foreignAddresses = this.serviceChannel.addresses.filter((address) => {
        return address.subtype === 'Abroad';
      });
      
      const emails = this.serviceChannel.emails.filter((email) => {
        return locale === email.language;
      });
      
      const faxes = this.serviceChannel.phoneNumbers.filter((phoneNumber) => {
        return phoneNumber.type === 'Fax' && locale === phoneNumber.language;
      });
      
      const phoneNumbers = this.serviceChannel.phoneNumbers.filter((phoneNumber) => {
        return phoneNumber.type === 'Phone' && locale === phoneNumber.language;
      });
      
      const webPages = this.getLocalizedWebPages(this.serviceChannel.webPages, locale);
      
      const addresses = visitAddresses.map((address) => {
        return {
          street: this.getLocalizedValue(address.streetAddress, locale),
          streetNumber: address.streetNumber,
          postOfficeCode: address.postalCode,
          additionalInformation: this.getLocalizedValue(address.additionalInformations, locale) 
        };
      });
      
      return {
        name: name,
        description: description,
        shortDescription: shortDescription,
        addresses: addresses,
        emails: emails.map((email) => {
          return {
            email: email.value
          };
        }),
        phoneNumbers: phoneNumbers.map((phoneNumber) => {
          return Object.assign(phoneNumber, {
            isFinnishServiceNumber: phoneNumber.isFinnishServiceNumber ? 'true' : 'false'
          });
        }),
        faxes: faxes,
        foreignAddresses: foreignAddresses.map((foreignAddress) => {
          return {
            foreign: this.getLocalizedValue(foreignAddress.locationAbroad, locale)
          };
        }),
        webPages: webPages
      };
    }
    
    /**
     * Method invoked after dialog open
     * 
     * @param {Object} data event data
     */
    onAfterDialogOpen(data) {
      const dialog = data.dialog;
      
      $(dialog).on('click', '.add-service-hour', this.onAddServiceHourClick.bind(this));
      $(dialog).on('click', '.edit-service-hour', this.onEditServiceHourClick.bind(this));
      $(dialog).on('click', '.remove-service-hour', this.onRemoveServiceHourClick.bind(this));
      $(dialog).on('click', '.edit-additional-details', this.onEditAdditionalDetailsClick.bind(this));
      
      this.redrawServiceHours();
    }
    
    onAddServiceHourClick(event) {
      this.openServiceHourEditDialog(null, (createdServiceHour) => {
        this.serviceChannel.serviceHours.push(createdServiceHour);
        this.redrawServiceHours();
      });
    }
    
    onEditAdditionalDetailsClick() {
      this.openAdditionalDetailsEditDialog(this.serviceChannel);
    }
    
    onEditServiceHourClick(event) {
      const row = $(event.target).closest('tr');
      const index = row.index();
      const serviceHour = this.serviceChannel.serviceHours[index];
      
      this.openServiceHourEditDialog(serviceHour, (updatedServiceHour) => {
        this.serviceChannel.serviceHours.splice(index, 1, updatedServiceHour);
        this.redrawServiceHours();
      });
    }
    
    onRemoveServiceHourClick(event) {
      const row = $(event.target).closest('tr');
      const index = row.index();
      this.serviceChannel.serviceHours.splice(index, 1);
      this.redrawServiceHours();
    }
    
    onEditAdditionalDetailsClick() {
      this.openAdditionalDetailsEditDialog(this.serviceChannel);
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
      if (placeholderAttr && placeholderAttr.value === 'location_channel_component') {
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