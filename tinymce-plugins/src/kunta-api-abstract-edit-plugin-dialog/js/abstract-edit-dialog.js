/* jshint esversion: 6 */
/* global ajaxurl, moment, Promise */
(($) => {
  
  class KuntaApiAbstractEditDialog {
    
    /**
     * Constructs abstract dialog class
     * 
     * @param {type} editor TinyMCE editor instance
     * @param {type} serviceLocationServiceChannel
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
      const name = this.getLocalizedValue(codeItem.names, 'fi');
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
    
    getLocalizedValue(values, locale) {
      if (!values) {
        return null;
      }
      
      for (let i = 0; i < values.length; i++) {
        if (locale === values[i].language) {
          return values[i].value;
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