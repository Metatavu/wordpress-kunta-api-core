/* jshint esversion: 6 */
/* global ajaxurl, moment, Promise */
(($) => {
  'use strict';
  
  class AbstractServiceChannelEditorDialog extends window.KuntaApiAbstractEditDialog {
    
    /**
     * Constructs class
     * 
     * @param {Object} editor TinyMCE editor instance
     * @param {Object} serviceChannel service channel
     * @param {String} saveAction ajax action to save the channel
     */
    constructor(editor, serviceChannel, saveAction) {
      super(editor);
      this.serviceChannel = serviceChannel;
      this.saveAction = saveAction;
    }
    
    /**
     * Translates service channel to be suitable for form
     * 
     * @param {String} locale locale
     * @param {Object} channel channel object
     * @returns {Object} form data
     */
    serviceChannelToForm(locale, channel) {
      return {};
    }
    
    /**
     * Translates form values to service channel
     * 
     * @param {type} channel original channel data
     * @param {type} formValues form values
     * @returns {Object} updated service
     */
    serviceChannelFromForm(channel, formValues) {
      return {};  
    }
    
    /**
     * Returns main form for service channel
     * 
     * @returns {Object} metaform
     */
    getServiceChannelFormViewModel() {
      return null;
    }
    
    /**
     * Validates updated service channel. returns validation error message or null if servie channel is valid
     * 
     * @param {Object} serviceChannel
     * @returns {String} validation error message or null if servie channel is valid
     */
    validate(serviceChannel) {
      return null;  
    }
    
    /**
     * Saves the channel
     * 
     * @param updatedChannel channel data
     * @returns {Promise} promise for save result
     */
    saveChannel(updatedChannel) {
     return new Promise((resolve, reject) => {
        $.post(ajaxurl, {
          'action': this.saveAction,
          'serviceChannel': JSON.stringify(updatedChannel)
        }, (response) => {
          resolve();
        })
        .fail((response) => {
          reject(response.responseText || response.statusText || "Unknown error occurred");
        });
      });
    }
    
    /**
     * Redraws service hours table
     */
    redrawServiceHours() {
      const serviceHourTexts = this.serviceChannel.serviceHours.map((serviceHour) => {
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
      }
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
        }
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
      }
    }
    
    openServiceHourEditDialog(serviceHour, callback) {
      const viewModel = getServiceHourMetaform();
      const formValues = this.serviceHourToForm(serviceHour);
      const dialog = this.openMetaformDialog(this.prepareViewModel(viewModel), formValues, (newFormValues) => {
        const updatedServiceHour = this.serviceHourFromForm(newFormValues);
        callback(updatedServiceHour);
      });
    }
    
    /**
     * Opens channel editor
     */
    open() {
      const viewModel = this.getServiceChannelFormViewModel();
      const formValues = {};
      this.supportedLocales.map((locale) => {
        formValues[locale] = this.serviceChannelToForm(locale);
      });
      
      this.trigger("beforeDialogOpen");
      
      const dialog = this.openLocalizedMetaformDialog(viewModel, formValues, (newFormValues) => {
        dialog.dialog("widget").addClass('loading');
        
        const updatedChannel = this.serviceChannelFromForm(this.serviceChannel, newFormValues);
        const validationError = this.validate(updatedChannel);
        
        if (validationError !== null) {
          this.showError('Virheellinen syöte', validationError);
        } else {
          this.saveChannel(updatedChannel)
            .then(() => {
              this.serviceChannel = updatedChannel;
              dialog.dialog('close'); 
            })
            .catch((err) => {
              this.showError('Virhe tallentaessa', err);
            });
        }
      });
      
      this.trigger("afterDialogOpen", {
        dialog: dialog
      });
    }
  }
  
  window.AbstractServiceChannelEditorDialog = AbstractServiceChannelEditorDialog;
  
})(jQuery);