/* jshint esversion: 6 */
/* global ajaxurl, moment, Promise */
(($) => {
  
  class KuntaApiAbstractEditDialog {
    
    /**
     * Constructs abstract dialog class
     * 
     * @param {type} editor TinyMCE editor instance
     */
    constructor(editor) {
      this.supportedLocales = ['fi', 'en', 'sv'];
      this.localeNames = {
        'fi': 'Suomi',
        'en': 'Englanti',
        'sv': 'Ruotsi'
      };
      
      this.serviceHourTypeNames = {
        'Special': 'Päivystys',
        'Standard': 'Normaali',
        'Exception': 'Poikkeus'
      };
      
      this.dayNames = {
        0: 'Sunnuntai',
        1: 'Maanantai',
        2: 'Tiistai',
        3: 'Keskiviikko',
        4: 'Torstai',
        5: 'Perjantai',
        6: 'Lauantai'
      };
      
      this.editor = editor;
      this.listeners = [];
    }
    
    getLocaleName(locale) {
      return this.localeNames[locale];
    }
    
    getServiceHourTypeName(type) {
      return this.serviceHourTypeNames[type];
    }
    
    getDayName(index, short) {
      const name = this.dayNames[index];
      if (short) {
        return name.substring(0, 2);
      }
      
      return name;
    }
    
    formatServiceHour(serviceHour) {
      const type = this.getServiceHourTypeName(serviceHour.serviceHourType);
      if (serviceHour.serviceHourType === 'Exception') {
        let result = `(${type})`;
        
        if (serviceHour.isClosed) {
          result += ' Suljettu';
        }
        
        const openingHour = serviceHour.openingHour && serviceHour.openingHour.length ? serviceHour.openingHour[0] : null;
        const openFrom = openingHour ? openingHour.from : null;
        const openTo = openingHour ? openingHour.to : null;
        
        if (serviceHour.validFrom && serviceHour.validTo) {
          result += ` ${this.formatDateWithTime(serviceHour.validFrom, openFrom)} - ${this.formatDateWithTime(serviceHour.validTo, openTo)}`;
        } else if (serviceHour.validFrom) {
          result += ` ${this.formatDateWithTimes(serviceHour.validFrom, openFrom, openTo)}`;
        }
        
        const additionalInformation = this.getAnyLocalizedValue(serviceHour.additionalInformation);
        if (additionalInformation) {
          return `${result} - ${additionalInformation}`;
        }
        
        return result;
      } else {
        if (serviceHour.openingHour.length === 0 && !serviceHour.isClosed) {
          return `(${type}) Aina avoinna (24/7)`;
        }
        
        const openingHours = serviceHour.openingHour.map((openingHour) => {
          return this.formatOpeningHour(openingHour);
        });

        return `(${type}) ${openingHours.join(',')}`;
      }
    }
    
    formatDateTime(dateTime) {
      return moment(dateTime).locale('fi').format('lll');
    }
    
    formatDate(date) {
      return moment(date).locale('fi').format('ll');
    }
    
    formatDateWithTime(date, time) {
      const result = this.formatDate(date);
      if (time) {
        return `${result} ${time}`;
      }
      
      return result;
    }
    
    formatDateWithTimes(date, startTime, endTime) {
      const start = this.formatDateWithTime(date, startTime);
      return endTime ? `${start} - ${endTime}` : start;
    }
    
    formatOpeningHour(dailyOpeningTime) {
      if (dailyOpeningTime.dayFrom === null) {
        return '';
      } else {
        let result = this.getDayName(dailyOpeningTime.dayFrom, true);

        if (dailyOpeningTime.dayTo !== null && dailyOpeningTime.dayTo !== dailyOpeningTime.dayFrom) {
          result += ' - ' + this.getDayName(dailyOpeningTime.dayTo, true);
        }

        if (dailyOpeningTime.from) {
          result += ' ' + dailyOpeningTime.from;
        }

        if (dailyOpeningTime.to) {
          result += ' - ' + dailyOpeningTime.to;
        }

        return result;
      }
    }
    
    openMetaformDialog(viewModel, formValues, callback) {
      const dialog = $('<div>')
        .attr({
          'title': viewModel.title
        });
      
      const dialogContents = $('<div>')
        .addClass('container-fluid')
        .html(mfRender({
          viewModel: viewModel,
          formValues: formValues
        }))
        .appendTo(dialog);
      
      $(dialog).dialog({
        modal: true,
        draggable: false,
        width: $(window).width() * 0.9,
        height: $(window).height() * 0.9,
        buttons: [{
          text: "Tallenna",
          click: () => {
            const formValues = {};
            
            $(dialog).find(`form.metaform`).metaform('val', true).forEach((value) => {
              formValues[value.name] = value.value;
            });
            
            callback(formValues);
            $(dialog).dialog("close");
          }
        }, {
          text: "Peruuta",
          click: () => {
            $(dialog).dialog("close");
          }
        }]
      });
       
      $(dialog).find('form.metaform').metaform();
      
      return dialog;
    }
    
    openLocalizedMetaformDialog(viewModel, formValues, callback) {
      const dialog = $('<div>')
        .attr({
          'title': viewModel.title
        });
      
      const dialogContents = $('<div>')
        .addClass('container-fluid')
        .appendTo(dialog);
      
      const dialogTabs = $('<ul>').appendTo(dialogContents);
     
      this.supportedLocales.forEach((locale) => {
        const tabId = `locale-tab-${locale}`;
        
        $('<li>')
          .appendTo(dialogTabs)
          .append($('<a>').attr('href', `#${tabId}`).text(this.getLocaleName(locale)));

        $('<div>')
          .attr('id', tabId)
          .html(mfRender({
            viewModel: viewModel,
            formValues: formValues[locale]
          }))
          .appendTo(dialogContents);
      });
      
      dialogContents.tabs();
      
      $(dialog).dialog({
        modal: true,
        draggable: false,
        width: $(window).width() * 0.9,
        height: $(window).height() * 0.9,
        buttons: [{
          text: "Tallenna",
          click: () => {
            const formValues = {};
            this.supportedLocales.forEach((locale) => {
              formValues[locale] = {};
              $(dialog).find(`#locale-tab-${locale} form.metaform`).metaform('val', true).forEach((value) => {
                formValues[locale][value.name] = value.value;
              });
            });
            
            callback(formValues);
          }
        }, {
          text: "Peruuta",
          click: () => {
            $(dialog).dialog("close");
          }
        }]
      });
       
      $(dialog).find('form.metaform').metaform();
      
      return dialog;
    }
    
    searchCodes(types, search) {
      return new Promise((resolve, reject) => {
        $.post(ajaxurl, {
          'action': 'kunta_api_search_codes',
          'types': types,
          'search': search
        }, (response) => {
          const codes = JSON.parse(response);
          resolve(codes);
        })
        .fail((response) => {
          reject(response.responseText || response.statusText);
        });
      });
    }
    
    getCodeTypeName(type) {
       switch (type) {
        case 'Municipality':
          return 'kunta';
        case 'Province':
          return 'maakunta';
        case 'HospitalRegions':
          return 'sairaanhoitopiiri';
        case 'BusinessRegions':
          return 'yrityspalvelujen seutualue';
        case 'Country':
          return 'maa';
        case 'Language':
          return 'kieli';
        case 'Postal':
          return 'postinumero';
      }
    }
    
    getCodeNameWithType(codeItem) {
      const name = this.getLocalizedValue(codeItem.name || codeItem.names, 'fi');
      const type = this.getCodeTypeName(codeItem.type);
      return `${name} (${type})`;
    }
    
    getMunicipalityNameWithType(municipality) {
      const name = this.getLocalizedValue(municipality.names, 'fi');
      const type = this.getCodeTypeName('Municipality');
      return `${name} (${type})`;
    }
    
    showError(title, text) {
      const contents = $('<div>')
        .addClass('error')
        .text(text);
      
      const dialog = $('<div>')
        .attr('title', title)
        .append(contents)
        .dialog({
          modal: true,
          draggable: false,
          width: 600,
          height: 350,
          buttons: {
            Ok: () => {
              $(dialog).dialog( "close" );
            }
          }
        });
    }
    
    getTypedLocalizedValue(values, locale, type) {
      if (!values) {
        return null;
      }
      
      for (let i = 0; i < values.length; i++) {
        if (locale === values[i].language && type === values[i].type) {
          return values[i].value;
        }
      }
      
      return null;
    }
    
    /**
     * Returns localized value
     * 
     * @param {Array} values array containing localized values
     * @param {String} locale Locale
     * @param {String} property property containing value. Defaults to 'value'
     * @returns {unresolved}
     */
    getLocalizedValue(values, locale, property) {
      if (!values) {
        return null;
      }
      
      for (let i = 0; i < values.length; i++) {
        if (locale === values[i].language) {
          return values[i][property || 'value'];
        }
      }
      
      return null;
    }
    
    getAnyLocalizedValue(values) {
      for (let i = 0; i < this.supportedLocales.length; i++) {
        const result = this.getLocalizedValue(values, this.supportedLocales[i]);
        if (result) {
          return result;
        }
      }
      
      return null;
    }
    
    /**
     * Sets localized value (e.g. service requirements) value
     * 
     * @param {type} result result object
     * @param {type} resultProperty result object property
     * @param {type} localeValues locale values from form
     * @param {type} formProperty form property
     * @param {type} language locale
     */
    setLocalizedValue(result, resultProperty, localeValues, formProperty, language) {
      if (!result[resultProperty]) {
        result[resultProperty] = [];
      }
      
      const value = localeValues[formProperty];
      if (!value) {
        return;
      }
      
      for (let i = 0; i < result[resultProperty].length; i++) {
        if (result[resultProperty][i].language === language) {
          result[resultProperty][i].value = value;
          return;
        }
      }
      
      result[resultProperty].push({
        value: value,
        language: language
      });
    }
    
    /**
     * Sets typed localized value (e.g. service description) value
     * 
     * @param {type} result result object
     * @param {type} resultProperty result object property
     * @param {type} localeValues locale values from form
     * @param {type} formProperty form property
     * @param {type} language locale
     * @param {type} type type
     */
    setTypedLocalizedValue(result, resultProperty, localeValues, formProperty, language, type) {
      if (!result[resultProperty]) {
        result[resultProperty] = [];
      }
      
      const value = localeValues[formProperty];
      if (!value) {
        return;
      }
      
      for (let i = 0; i < result[resultProperty].length; i++) {
        if (result[resultProperty][i].language === language && result[resultProperty][i].type === type) {
          result[resultProperty][i].value = value;
          return;
        }
      }
      
      result[resultProperty].push({
        value: value,
        language: language,
        type: type
      });
    }
    
    setLocalizedTableValues(result, resultProperty, localeValues, formProperty, language, filterFunction, mapFunction) {
      if (!result[resultProperty]) {
        result[resultProperty] = []; 
      }
      
      const value = localeValues[formProperty];
      if (!value) {
        return;
      }
      
      let tableValues = JSON.parse(value);
      
      if (filterFunction) {
        tableValues = tableValues.filter(filterFunction);
      }
      
      const mappedValues = tableValues.map(mapFunction ? mapFunction : (value) => {
        return Object.assign({
          language: language
        }, value);
      }) || [];
      
      result[resultProperty] = result[resultProperty].concat(mappedValues); 
    }
    
    prepareViewModel(viewModel) {
      (viewModel.sections||[]).forEach((section) => {
        (section.fields||[]).forEach((field, index) => {
          const localeVariableIndex = field.name.indexOf('{LOCALE}');
          if (localeVariableIndex !== -1) {
            section.fields.splice(index, 1);
            
            this.supportedLocales.forEach((locale) => {
              section.fields.splice(index, 0, Object.assign({}, field, {
                name: field.name.replace(/\{LOCALE\}/g, locale),
                title: field.title.replace(/\{LOCALE\}/g, this.getLocaleName(locale))
              }));   
            });
          }
        });
      });
      
      return viewModel;
    }
    
    parseIsoDate(string) {
      if (!string) {
        return null;
      }
      
      return new Date(Date.parse(string));
    }
    
    /**
     * Creates autocomplete field for selecting languages
     * 
     * @param {jQuery} element autocomplete element
     * @param {Array} languageCodes language codes
     */
    createLanguagesAutocomplete(element, languageCodes) {
      element
        .metaformMultivalueAutocomplete('val', languageCodes)
        .metaformMultivalueAutocomplete('option', 'customSource', (input, callback) => {
          this.searchCodes("Language", input.term + '*')
            .then((codes) => {
              callback(codes.map((codeItem) => {
                return {
                  value: codeItem.code,
                  label: this.getLocalizedValue(codeItem.names, 'fi')
                };
              }));
            })
            .catch((err) => {
              tinyMCE.activeEditor.windowManager.alert(err);
            });
        });
    }
    
    /**
     * Creates autocomplete field for selecting areas
     * 
     * @param {jQuery} element autocomplete element
     * @param {Array} areaCodes area codes
     */
    createAreasAutocomplete(element, areaCodes) {
      element
        .metaformMultivalueAutocomplete('val', areaCodes)
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
    }
    
    /**
     * Translates language list to be suitable for form
     * 
     * @param {Array} languages language codes
     * @returns {Promise} promise for language items
     */
    languagesToForm(languages) {
      const languageQuery = languages.map((language) => {
        return `code:${language}`;
      }).join(' ');
      
      return this.searchCodes("Language", `+(${languageQuery})`)
        .then((languageQueryResult) => {
          const languageMap = {};
          languageQueryResult.forEach((queryResult) => {
            languageMap[queryResult.code] = this.getLocalizedValue(queryResult.names, 'fi');
          });
          
          return languages.map((language) => {
            return {
              value: language,
              label: languageMap[language] || language
            };
          });
        });
    }
    
    /**
     * Translates areas to be suitable for form
     * 
     * @param {Array} areas areas
     * @returns {Array} area items
     */
    areasToForm(areas) {
      const areaCodes = [];
      areas.forEach((area) => {
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

      return areaCodes;
    }
    
    /**
     * Translates areas from form to be suitable for REST
     * 
     * @param {String} areaType area type 
     * @param {Array} areas array of area values
     * @returns {Array} result
     */
    areasFromForm(areaType, areas) {
      if (areaType === 'AreaType') {
        let mucicipalitiesIndex = -1;
        const result = [];
        
        (areas||'').split(',').forEach((area) => {
          const parts = area.split(':');
          const type = parts[0];
          const code = parts[1];
          
          if (type === 'Municipality') {
            if (mucicipalitiesIndex > -1) {
              result[mucicipalitiesIndex].municipalities.push({
                code: code
              });
            } else {
              mucicipalitiesIndex = result.push({
                'type': 'Municipality',
                'municipalities': [{
                  code: code
                }]
              }) - 1;
            }
          } else {
            result.push({
              type: type,
              code: code
            });
          }
        });
        
        return result;
      }
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
  
  window.KuntaApiAbstractEditDialog = KuntaApiAbstractEditDialog;
  
})(jQuery);