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
  
  class ServiceLocationServiceChannelDialog extends window.KuntaApiAbstractEditDialog {
    
    /**
     * Constructs service location service channel dialog
     * 
     * @param {type} editor TinyMCE editor instance
     * @param {type} serviceLocationServiceChannel
     */
    constructor(editor, serviceLocationServiceChannel) {
      super(editor);
      this.serviceLocationServiceChannel = serviceLocationServiceChannel;
    }
    
    saveServiceLocationServiceChannel(serviceLocationServiceChannel, callback) {
      $.post(ajaxurl, {
        'action': 'kunta_api_save_service_location_service_channel',
        'serviceLocationServiceChannel': JSON.stringify(this.serviceLocationServiceChannel)
      }, (response) => {
        callback();
      })
      .fail((response) => {
        callback(response.responseText || response.statusText || "Unknown error occurred");
      });
    }
    
    open() {
      const viewModel = getServiceLocationServiceChannelMetaform();
      const formValues = {};
      this.supportedLocales.map((locale) => {
        formValues[locale] = this.serviceLocationServiceChannelToForm(locale, this.serviceLocationServiceChannel);
      });
      
      const dialog = this.openLocalizedMetaformDialog(viewModel, formValues, (newFormValues) => {
        dialog.dialog("widget").addClass('loading');
        
        const updatedChannel = this.translateServiceLocationServiceChannelFromForm(this.serviceLocationServiceChannel, newFormValues);
        const validationError = this.validate(updatedChannel);
        
        if (validationError !== null) {
          this.showError('Virheellinen syöte', validationError);
        } else {
          this.serviceLocationServiceChannel = updatedChannel;
          
          this.saveServiceLocationServiceChannel(this.serviceLocationServiceChannel, (err) => {
            dialog.dialog("widget").removeClass('loading');
            if (err) {
              this.showError('Virhe tallentaessa', err);
            } else {
              dialog.dialog('close'); 
            }
          });
        }
      });
      
      $(dialog).on('click', '.add-service-hour', this._onAddServiceHourClick.bind(this));
      $(dialog).on('click', '.edit-service-hour', this._onEditServiceHourClick.bind(this));
      $(dialog).on('click', '.remove-service-hour', this._onRemoveServiceHourClick.bind(this));
      $(dialog).on('click', '.edit-additional-details', this._onEditAdditionalDetailsClick.bind(this));
      
      this.redrawServiceHours();
    }
    
    openServiceHourEditDialog(serviceHour, callback) {
      const viewModel = getServiceHourMetaform();
      const formValues = this.serviceHourToForm(serviceHour);
      const dialog = this.openMetaformDialog(this.prepareViewModel(viewModel), formValues, (newFormValues) => {
        const updatedServiceHour = this.serviceHourFromForm(newFormValues);
        callback(updatedServiceHour);
      });
    }
    
    openAdditionalDetailsEditDialog() {
      const viewModel = getAdditionalDetailsMetaform();
      this.additionalDetailsToForm(this.serviceLocationServiceChannel).then((formValues) => {
        const dialog = this.openMetaformDialog(this.prepareViewModel(viewModel), formValues, (newFormValues) => {
          this.additionalDetailsFromForm(newFormValues);
        });

        dialog.find('*[data-name="languages"]')
          .metaformMultivalueAutocomplete('val', formValues.languageCodes)
          .metaformMultivalueAutocomplete('option', 'customSource', (input, callback) => {
            this.searchCodes("Language", input.term + '*')
              .then((codes) => {
                callback(codes.map((codeItem) => {
                  return {
                    value: `${codeItem.type}:${codeItem.code}`,
                    label: this.getLocalizedValue(codeItem.names, 'fi')
                  };
                }));
              })
              .catch((err) => {
                tinyMCE.activeEditor.windowManager.alert(err);
              });
          });

        dialog.find('*[data-name="areas"]')
          .metaformMultivalueAutocomplete('val', formValues.areaCodes)
          .metaformMultivalueAutocomplete('option', 'customSource', (input, callback) => {
            this.searchCodes("Municipality,Province,HospitalRegions,BusinessRegions", input.term + '*')
              .then((codes) => {
                callback(codes.map((areaCode) => {
                  return {
                    value: `${areaCode.type}:${areaCode.code}`,
                    label: this.getCodeNameWithType(areaCode)
                  };
                }));
              })
              .catch((err) => {
                tinyMCE.activeEditor.windowManager.alert(err);
              });
          });
      
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
    
    redrawServiceHours() {
      const serviceHourTexts = this.serviceLocationServiceChannel.serviceHours.map((serviceHour) => {
        return this.formatServiceHour(serviceHour);
      });
      
      $('table.serviceHours tbody').empty();
      
      if (serviceHourTexts.length) {
        serviceHourTexts.forEach((serviceHourText) => {
          const row = $('<tr>').appendTo($('table.serviceHours tbody'));
          $('<td>').html(serviceHourText).appendTo(row);
          $('<td>').append($('<a>').addClass('btn btn-sm btn-warning remove-service-hour').html('Poista')).appendTo(row);
          $('<td>').append($('<a>').addClass('btn btn-sm btn-success edit-service-hour').html('Muokkaa')).appendTo(row);
        });
      } else {
        $('<tr>')
          .append($('<td>').html('Palveluaikoja ei ole vielä määritelty'))
          .appendTo($('table.serviceHours tbody'));
      }
    }
    
    serviceHourFromFormException(formValues) {
      const additionalInformation = [];
      const isClosed = formValues.type === 'closed-all-day';
      const validForNow = false;
      const toTime = isClosed ? null : formValues[`Exception-to-time`];
      const fromTime = isClosed ? null : formValues[`Exception-from-time`];
      const openingHour = [];
      
      if (toTime || fromTime) {
        openingHour.push({
          dayFrom: null,
          dayTo: null,
          from: fromTime,
          to: toTime,
          isExtra: false
        });
      }
      
      this.supportedLocales.forEach((locale) => {
        const value = formValues[`Exception-additional-information-${locale}`];
        if (value) {
          additionalInformation.push({
            language: locale,
            value: value
          });  
        }
      });
      
      return {
        serviceHourType: formValues.type,
        validFrom: this.parseIsoDate(formValues[`Exception-from-date`]),
        validTo: this.parseIsoDate(formValues[`Exception-to-date`]),
        isClosed: isClosed,
        validForNow: validForNow,
        additionalInformation: additionalInformation,
        openingHour: openingHour
      };
    }
    
    serviceHourFromFormStandard(formValues) {
      const isClosed = false;
      const validForNow = formValues[`${formValues.type}-validForNow`] === "true";
      const additionalInformation = [];
      const serviceHours = JSON.parse(formValues['Standard-openinghours']);
      const openingHour = formValues['Standard-open24h'] ? [] : serviceHours.map((serviceHour) => {
        return {
          dayFrom: parseInt(serviceHour.day),
          dayTo: parseInt(serviceHour.day),
          from: serviceHour.from,
          to: serviceHour.to,
          isExtra: false
        };
      });
      
      return {
        serviceHourType: formValues.type,
        validFrom: validForNow ? null : this.parseIsoDate(formValues[`${formValues.type}-validFrom`]),
        validTo: validForNow ? null : this.parseIsoDate(formValues[`${formValues.type}-validTo`]),
        isClosed: isClosed,
        validForNow: validForNow,
        additionalInformation: additionalInformation,
        openingHour: openingHour
      };
    }
    
    serviceHourFromFormSpecial(formValues) {
      const isClosed = false;
      const validForNow = formValues[`${formValues.type}-validForNow`] === "true";
      const additionalInformation = [];
      const openingHour = [{
        dayFrom: parseInt(formValues['Special-from-date']),
        dayTo: parseInt(formValues['Special-to-date']),
        from: formValues['Special-from-time'],
        to: formValues['Special-to-time'],
        isExtra: false
      }];
    
      return {
        serviceHourType: formValues.type,
        validFrom: validForNow ? null : this.parseIsoDate(formValues[`${formValues.type}-validFrom`]),
        validTo: validForNow ? null : this.parseIsoDate(formValues[`${formValues.type}-validTo`]),
        isClosed: isClosed,
        validForNow: validForNow,
        additionalInformation: additionalInformation,
        openingHour: openingHour
      };
    }
    
    serviceHourFromForm(formValues) {
      const serviceHourType = formValues.type;
      switch (serviceHourType) {
        case "Exception":
          return this.serviceHourFromFormException(formValues);
        case "Standard":
          return this.serviceHourFromFormStandard(formValues);
        case "Special":
          return this.serviceHourFromFormSpecial(formValues);
      };
    }
    
    translateServiceLocationServiceChannelFromForm(existingLocationServiceChannel, formValues) {
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
    
    serviceHourToForm(serviceHour) {
      if (!serviceHour) {
        return {};
      }
      
      const type = serviceHour.serviceHourType;
      const validForNow = serviceHour.validForNow ? "true" : "false";
      const validFrom = serviceHour.validForNow || !serviceHour.validFrom ? null : moment(serviceHour.validFrom);
      const validTo = serviceHour.validForNow || !serviceHour.validTo ? null : moment(serviceHour.validTo);
      const open24h = serviceHour.openingHour.length === 0 && !serviceHour.isClosed;
      const validFromStr = validFrom ? validFrom.format() : null;
      const validToStr = validTo ? validTo.format() : null;
      const openingHour = serviceHour.openingHour && serviceHour.openingHour.length ? serviceHour.openingHour[0] : null;
      const openingHours = [];
          
      (serviceHour.openingHour||[]).forEach((openingHour) => {
        for (let day = openingHour.dayFrom; day <= openingHour.dayTo; day++) {
          openingHours.push({
            day: day,
            from: openingHour.from,
            to: openingHour.to
          });
        };
      });
      
      switch (type) {
        case 'Standard':
          return {
            'type': type,
            'Standard-validForNow': validForNow,
            'Standard-validFrom': validFromStr,
            'Standard-validTo': validToStr,
            'Standard-open24h': open24h,
            'Standard-openinghours': openingHours
          };
        case 'Special':
          return {
            'type': type,
            'Special-validForNow': validForNow,
            'Special-validFrom': validFromStr,
            'Special-validTo': validToStr,
            'Special-from-date': openingHour ? openingHour.dayFrom : null,
            'Special-from-time': openingHour ? openingHour.from : null,
            'Special-to-date': openingHour ? openingHour.dayTo : null,
            'Special-to-time': openingHour ? openingHour.to : null
          };
        case 'Exception':
          const openFrom = openingHour ? openingHour.from : null;
          const openTo = openingHour ? openingHour.to : null;
          const exceptionType = !validTo ? !openFrom && !openTo ? 'closed-all-day' : 'single' : 'range';
          
          if (validFrom && openFrom) {
            const parts = openFrom.split(':');
            validFrom.hour(parseInt(parts[0]));
            validFrom.minute(parseInt(parts[1]));
          }
          
          if (validTo && openTo) {
            const parts = openTo.split(':');
            validTo.hour(parseInt(parts[0]));
            validTo.minute(parseInt(parts[1]));
          }
          
          const result = {
            'type': type,
            'Exception-type': exceptionType,
            'Exception-from-date': validFrom ? validFrom.format() : null,
            'Exception-to-date': validTo ? validTo.format() : null,
            'Exception-from-time': openFrom,
            'Exception-to-time': openTo
          };
          
          this.supportedLocales.forEach((locale) => {
            result[`Exception-additional-information-${locale}`] = this.getLocalizedValue(serviceHour.additionalInformation, locale);
          });
          
          return result;
        default:
          throw new Error(`Unknown service hour type ${type}`);
        break;
      }
    }
    
    additionalDetailsToForm(serviceLocationServiceChannel) {
      const languageQuery = serviceLocationServiceChannel.languages.map((language) => {
        return `code:${language}`;
      }).join(' ');
      
      return this.searchCodes("Language", `+(${languageQuery})`)
        .then((languageQueryResult) => {
          const languageMap = {};
          languageQueryResult.forEach((queryResult) => {
            languageMap[queryResult.code] = this.getLocalizedValue(queryResult.names, 'fi');
          });
  
          const languageCodes = serviceLocationServiceChannel.languages.map((language) => {
            return {
              value: language,
              label: languageMap[language] || language
            };
          });
          
          const areaCodes = [];
          serviceLocationServiceChannel.areas.forEach((area) => {
            if (area.type !== 'Municipality') {
              areaCodes.push({
                value: `${area.type}:${area.code}`,
                label: this.getCodeNameWithType(area)
              });
            } else {
              area.municipalities.forEach((municipality) => {
                areaCodes.push({
                  value: `Municipality:${municipality.code}`,
                  label: this.getMunicipalityNameWithType(municipality)
                });
              });
            }
          });
          
          return {
            languageCodes: languageCodes,
            areaCodes: areaCodes,
            areaType: serviceLocationServiceChannel.areaType
          };
        });
    }
    
    additionalDetailsFromForm(newFormValues) {
      this.serviceLocationServiceChannel.areaType = newFormValues.areaType;
      this.serviceLocationServiceChannel.languages = (newFormValues.languages||'').split(',');
      
      if (newFormValues.areaType === 'AreaType') {
        let mucicipalitiesIndex = -1;
        const areas = [];
        
        (newFormValues.areas||'').split(',').forEach((area) => {
          const parts = area.split(':');
          const type = parts[0];
          const code = parts[1];
          
          if (type === 'Municipality') {
            if (mucicipalitiesIndex > -1) {
              areas[mucicipalitiesIndex].municipalities.push({
                code: code
              });
            } else {
              mucicipalitiesIndex = areas.push({
                'type': 'Municipality',
                'municipalities': [{
                  code: code
                }]
              }) - 1;
            }
          } else {
            areas.push({
              type: type,
              code: code
            });
          }
        });
        
        this.serviceLocationServiceChannel.areas = areas;
      }
    }
   
    serviceLocationServiceChannelToForm(locale, serviceLocationServiceChannel) {
      const name = this.getTypedLocalizedValue(serviceLocationServiceChannel.names, locale, 'Name');
      const shortDescription = this.getTypedLocalizedValue(serviceLocationServiceChannel.descriptions, locale, 'ShortDescription');
      const description = this.getTypedLocalizedValue(serviceLocationServiceChannel.descriptions, locale, 'Description');
      const visitAddresses = serviceLocationServiceChannel.addresses.filter((address) => {
        return address.subtype !== 'Abroad';
      });
      
      const foreignAddresses = serviceLocationServiceChannel.addresses.filter((address) => {
        return address.subtype === 'Abroad';
      });
      
      const emails = serviceLocationServiceChannel.emails.filter((email) => {
        return locale === email.language;
      });
      
      const faxes = serviceLocationServiceChannel.phoneNumbers.filter((phoneNumber) => {
        return phoneNumber.type === 'Fax' && locale === phoneNumber.language;
      });
      
      const phoneNumbers = serviceLocationServiceChannel.phoneNumbers.filter((phoneNumber) => {
        return phoneNumber.type === 'Phone' && locale === phoneNumber.language;
      });
      
      const webPages = serviceLocationServiceChannel.webPages.filter((webPage) => {
        return locale === webPage.language;
      });
      
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
    
    _onAddServiceHourClick(event) {
      this.openServiceHourEditDialog(null, (createdServiceHour) => {
        this.serviceLocationServiceChannel.serviceHours.push(createdServiceHour);
        this.redrawServiceHours();
      });
    }
    
    _onEditAdditionalDetailsClick() {
      this.openAdditionalDetailsEditDialog(this.serviceLocationServiceChannel);
    }
    
    _onEditServiceHourClick(event) {
      const row = $(event.target).closest('tr');
      const index = row.index();
      const serviceHour = this.serviceLocationServiceChannel.serviceHours[index];
      
      this.openServiceHourEditDialog(serviceHour, (updatedServiceHour) => {
        this.serviceLocationServiceChannel.serviceHours.splice(index, 1, updatedServiceHour);
        this.redrawServiceHours();
      });
    }
    
    _onRemoveServiceHourClick(event) {
      const row = $(event.target).closest('tr');
      const index = row.index();
      this.serviceLocationServiceChannel.serviceHours.splice(index, 1);
      this.redrawServiceHours();
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