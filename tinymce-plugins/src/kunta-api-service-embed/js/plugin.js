/* jshint esversion: 6 */
/* global ajaxurl, tinymce, moment, Promise */
((tinymce, $) => {
  // TODO: Service:
  // Luokittelu ja asiasanat

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
    
    open() {
      const viewModel = getServiceMetaform();
      const formValues = {};
     
      this.supportedLocales.map((locale) => {
        formValues[locale] = this.serviceToForm(locale);
      });
     
      const dialog = this.openLocalizedMetaformDialog(viewModel, formValues, (newFormValues) => {
        dialog.dialog("widget").addClass('loading');
        
        const updatedService = this.translateServiceFromForm(newFormValues);
        const validationError = this.validate(updatedService);
        
        if (validationError !== null) {
          this.showError('Virheellinen syöte', validationError);
        } else {
          this.service = updatedService;
          
          this.saveService(this.service, (err) => {
            dialog.dialog("widget").removeClass('loading');
            if (err) {
              this.showError('Virhe tallentaessa', err);
            } else {
              dialog.dialog('close'); 
            }
          });
        }
      });
      
      $(dialog).on('click', '.edit-additional-details', this.onEditAdditionalDetailsClick.bind(this));
      $(dialog).on('click', '.edit-channels', this.onEditChannelsClick.bind(this));
    }
    
    openAdditionalDetailsEditDialog() {
      const viewModel = getServiceAdditionalDetailsMetaform();
      this.additionalDetailsToForm().then((formValues) => {
        const dialog = this.openMetaformDialog(this.prepareViewModel(viewModel), formValues, (newFormValues) => {
          this.additionalDetailsFromForm(newFormValues);
        });
        
        this.createLanguagesAutocomplete(dialog.find('*[data-name="languages"]'), formValues.languageCodes);
        this.createAreasAutocomplete(dialog.find('*[data-name="areas"]'), formValues.areaCodes);
        this.createServiceProducersAutocomplete(dialog.find('*[data-name="serviceProducersPurchaseServices"]'), formValues.serviceProducersPurchaseServiceItems);
        this.createServiceProducersAutocomplete(dialog.find('*[data-name="serviceProducersOthers"]'), formValues.serviceProducersOtherItems);
      });
      
    }
    
    validate(service) {
      return null;
    }
    
    serviceToForm(locale) {
      const type = this.service.type;
      const chargeType = this.service.chargeType;
      const fundingType = this.service.fundingType;
      const name = this.getTypedLocalizedValue(this.service.names, locale, 'Name');
      const alternateName = this.getTypedLocalizedValue(this.service.names, locale, 'AlternateName');
      const shortDescription = this.getTypedLocalizedValue(this.service.descriptions, locale, 'Summary');
      const description = this.getTypedLocalizedValue(this.service.descriptions, locale, 'Description');
      const chargeTypeAdditionalInfo = this.getTypedLocalizedValue(this.service.descriptions, locale, 'ChargeTypeAdditionalInfo');
      const userInstruction = this.getTypedLocalizedValue(this.service.descriptions, locale, 'ServiceUserInstruction');
      const deadLineAdditionalInfo = this.getTypedLocalizedValue(this.service.descriptions, locale, 'DeadLineAdditionalInfo');
      const processingTimeAdditionalInfo = this.getTypedLocalizedValue(this.service.descriptions, locale, 'ProcessingTimeAdditionalInfo');
      const validityTimeAdditionalInfo = this.getTypedLocalizedValue(this.service.descriptions, locale, 'ValidityTimeAdditionalInfo');
      const requirements = this.getLocalizedValue(this.service.requirements, locale);
      const vouchers = this.service.vouchers.filter((voucher) => {
        return voucher.value && voucher.language === locale;
      });
      
      const legislation = this.service.legislation
        .map((legistation) => {
          return {
            name: this.getLocalizedValue(legistation.names, locale),
            webPage: this.getLocalizedValue(legistation.webPages, locale, 'url')
          };
        })
        .filter((legistation) => {
          return legistation.name && legistation.webPage;
        });
      
      return {
        type: type,
        serviceChargeType: chargeType,
        fundingType: fundingType,
        name: name,
        alternateName: alternateName,
        shortDescription: shortDescription,
        description: description,
        chargeTypeAdditionalInfo: chargeTypeAdditionalInfo,
        userInstruction: userInstruction,
        deadLineAdditionalInfo: deadLineAdditionalInfo,
        processingTimeAdditionalInfo: processingTimeAdditionalInfo,
        validityTimeAdditionalInfo: validityTimeAdditionalInfo,
        requirements: requirements,
        serviceVouchersInUse: vouchers.length > 0 ? 'true' : 'false',
        serviceVouchers: vouchers,
        legislation: legislation
      };
    }
    
    /**
     * Creates autocomplete field for selecting service producers
     * 
     * @param {jQuery} element autocomplete element
     * @param {Array} organizationItems organizationItem to be loaded
     */
    createServiceProducersAutocomplete(element, organizationItems) {
      element
        .metaformMultivalueAutocomplete('val', organizationItems)
        .metaformMultivalueAutocomplete('option', 'customSource', (input, callback) => {
          const search = this.splitSearchTerms(input.term);
          if (!search) {
            callback([]);
            return;
          }
          
          this.searchOrganizations(search)
            .then((organizations) => {
              callback(organizations.map((organization) => {
                return {
                  value: organization.id,
                  label: this.getLocalizedValue(organization.names, 'fi')
                };
              }));
            })
            .catch((err) => {
              tinyMCE.activeEditor.windowManager.alert(err);
            });
        });
    }
    
    serviceProducersToForm(serviceOrganizations, provisionType) {
      const findPromises = (serviceOrganizations||[]).filter((serviceOrganization) => {
        return serviceOrganization.roleType === "Producer" && serviceOrganization.provisionType === provisionType;
      }).map((serviceOrganization) => {
        return this.findOrganization(serviceOrganization.organizationId);
      });
      
      return Promise.all(findPromises)
        .then((organizations) => {
          return organizations.map((organization) => {
            return {
              value: organization.id,
              label: this.getLocalizedValue(organization.names, 'fi')
            };
          });
        })
        .catch((err) => {
          tinyMCE.activeEditor.windowManager.alert(err);
        });
    }
    
    additionalDetailsToForm() {
      const formPromises = [
        this.languagesToForm(this.service.languages),
        this.serviceProducersToForm(this.service.organizations, 'PurchaseServices'),
        this.serviceProducersToForm(this.service.organizations, 'Other')
      ];
      
      return Promise.all(formPromises)
        .then((results) => {
          const languageCodes = results[0];
          const serviceProducersPurchaseServices = results[1];
          const serviceProducersOthers = results[2];
          
          return {
            languageCodes: languageCodes,
            areaCodes: this.areasToForm(this.service.areas),
            areaType: this.service.areaType,
            serviceProducersPurchaseServiceItems: serviceProducersPurchaseServices,
            serviceProducersOtherItems: serviceProducersOthers,
            serviceProducersSelfProduced: (this.service.organizations||[]).filter((serviceOrganization) => {
              return serviceOrganization.roleType === "Producer" && serviceOrganization.provisionType === 'SelfProduced';
            }).length > 0
          };
        });
    }
    
    translateServiceFromForm(formValues) {
      const result = JSON.parse(JSON.stringify(this.service));
      
      result.names = [];
      result.descriptions = [];
      result.vouchers = []; 
  
      // TODO: legislation
    
      this.supportedLocales.forEach((locale) => {
        const localeValues = formValues[locale];
        
        result.type = localeValues.type || result.type;
        result.chargeType = localeValues.serviceChargeType || result.chargeType;
        result.fundingType = localeValues.fundingType || result.fundingType;
        
        this.setTypedLocalizedValue(result, 'names', localeValues, 'name', locale, 'Name');
        this.setTypedLocalizedValue(result, 'names', localeValues, 'alternateName', locale, 'AlternativeName');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'shortDescription', locale, 'Summary');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'description', locale, 'Description');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'chargeTypeAdditionalInfo', locale, 'ChargeTypeAdditionalInfo');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'userInstruction', locale, 'ServiceUserInstruction');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'deadLineAdditionalInfo', locale, 'DeadLineAdditionalInfo');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'processingTimeAdditionalInfo', locale, 'ProcessingTimeAdditionalInfo');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'validityTimeAdditionalInfo', locale, 'ValidityTimeAdditionalInfo');
        
        this.setLocalizedValue(result, 'requirements', localeValues, 'requirements', locale);
        
        this.setLocalizedTableValues(result, 'vouchers', localeValues, 'serviceVouchers', locale, (voucher) => {
          return voucher.value && voucher.url;
        });

      });
      
      return result;
    }
    
    additionalDetailsFromForm(newFormValues) {
      this.service.areaType = newFormValues.areaType;
      this.service.languages = (newFormValues.languages||'').split(',');
      this.service.areas = this.areasFromForm(newFormValues.areaType, newFormValues.areas);
      this.service.organizations = this.service.organizations.filter((serviceOrganization) => {
        return serviceOrganization.roleType !== 'Producer';
      });
      
      const responsibleOrganizations = this.service.organizations.filter((serviceOrganization) => {
        return serviceOrganization.roleType === 'Responsible';
      });
      
      const formProducersPurchaseServices =  (newFormValues.serviceProducersPurchaseServices||'').split(',');
      const formProducersOthers =  (newFormValues.serviceProducersOthers||'').split(',');
      
      const serviceProducersPurchaseServices = formProducersPurchaseServices.forEach((organizationId) => {
        this.service.organizations.push({
          provisionType: 'PurchaseServices',
          roleType: 'Producer',
          organizationId: organizationId
        });
      });
      
      const serviceProducersPurchaseOthers = formProducersOthers.forEach((organizationId) => {
        this.service.organizations.push({
          provisionType: 'Other',
          roleType: 'Producer',
          organizationId: organizationId
        });
      });
      
      if (newFormValues.serviceProducersSelfProduced) {
        this.service.organizations.push({
          provisionType: 'SelfProduced',
          roleType: 'Producer',
          organizationId: responsibleOrganizations.length > 0 ? responsibleOrganizations[0].organizationId : null
        });
      }
    }
    
    onEditAdditionalDetailsClick() {
      this.openAdditionalDetailsEditDialog();
    }
    
    onEditChannelsClick() {
      const dialog = new ServiceChannelsDialog(this.editor, this.service);
      dialog.open();
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
      if (placeholderAttr && placeholderAttr.value === 'service') {
        const serviceId = element.attributes['data-service-id'].value;
        const component = element.attributes['data-component'].value;  
        
        this.editor.execCommand('kunta-api-service-edit', '', {
          serviceId: serviceId,
          component: component
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
      const overlay = $('<div>')
        .addClass('ui-widget-overlay')
        .css('z-index', 99999)
        .appendTo($('body'));

      this.findService(options.serviceId, (err, service) => {
        if (err) {
          tinyMCE.activeEditor.windowManager.alert(err);
        } else {
          const channelComponents = [
            'electronicServiceChannelIds', 
            'phoneServiceChannelIds', 
            'printableFormServiceChannelIds', 
            'serviceLocationServiceChannelIds',
            'webPageServiceChannelIds'];
          
          const dialog = channelComponents.indexOf(options.component) === -1 
            ? new ServiceDialog(this.editor, service) 
            : new ServiceChannelsDialog(this.editor, service);
            
          overlay.remove();
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