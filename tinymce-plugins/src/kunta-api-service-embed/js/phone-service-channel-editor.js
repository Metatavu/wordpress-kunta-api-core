/* jshint esversion: 6 */
/* global ajaxurl, moment, Promise */
(($) => {
  'use strict';
  
  class PhoneServiceChannelEditorDialog extends window.AbstractServiceChannelEditorDialog {

    /**
     * Constructs service channel editor dialog
     * 
     * @param {type} editor TinyMCE editor instance
     * @param {type} channel
     */
    constructor(editor, channel) {
      super(editor, channel, 'kunta_api_save_phone_service_channel');
      this.on("afterDialogOpen", this.onAfterDialogOpen.bind(this));
    }
    
    /**
     * Translates service channel to be suitable for form
     * 
     * @param {String} locale locale
     * @returns {Object} form data
     */
    serviceChannelToForm(locale) {
      return {
        name: this.getTypedLocalizedValue(this.serviceChannel.names, locale, 'Name'),
        shortDescription: this.getTypedLocalizedValue(this.serviceChannel.descriptions, locale, 'Summary'),
        description: this.getTypedLocalizedValue(this.serviceChannel.descriptions, locale, 'Description'),
        phoneNumbers: this.getLocalizedPhoneNumbers(this.serviceChannel.phoneNumbers, locale),
        supportEmails: this.getLocalizedEmails(this.serviceChannel.supportEmails, locale),
        languages: this.serviceChannel.languages,
        webPages: this.getLocalizedValue(this.serviceChannel.webPages, locale, 'url'),
        serviceHours: null,
        publishingStatus: this.serviceChannel.publishingStatus
      };
    }
    
    /**
     * Returns main form for service channel
     * 
     * @returns {Object} metaform
     */
    getServiceChannelFormViewModel() {
      return getPhoneServiceChannelMetaform();
    }
    
    /**
     * Loads values for additional details form
     * 
     * @param {Object} serviceChannel service channel
     * @returns {Promise} promise for additional details
     */
    additionalDetailsToForm(serviceChannel) {
      return this.languagesToForm(serviceChannel.languages)
        .then((languageCodes) => {
          return {
            languageCodes: languageCodes,
            areaCodes: this.areasToForm(serviceChannel.areas),
            areaType: serviceChannel.areaType
          };
        });
    }
    
    /**
     * Translates form values to service channel
     * 
     * @param {type} channel original channel data
     * @param {type} formValues form values
     * @returns {Object} updated service
     */
    serviceChannelFromForm(channel, formValues) {
      const result = JSON.parse(JSON.stringify(channel));
      
      result.names = [];
      result.descriptions = [];
      result.phoneNumbers = [];
      result.supportEmails = [];
      result.webPages = [];
  
      this.supportedLocales.forEach((locale) => {
        const localeValues = formValues[locale];
        
        result.publishingStatus = localeValues.publishingStatus || result.publishingStatus;
        
        this.setTypedLocalizedValue(result, 'names', localeValues, 'name', locale, 'Name');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'shortDescription', locale, 'Summary');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'description', locale, 'Description');

        this.setLocalizedTableValues(result, 'phoneNumbers', localeValues, 'phoneNumbers', locale, (phoneNumber) => {
          return !!phoneNumber.number;
        }, (phoneNumber) => {
          return Object.assign({}, phoneNumber, {
            language: locale,
            isFinnishServiceNumber: "true" === phoneNumber.isFinnishServiceNumber
          });
        });
        
        this.setLocalizedTableValues(result, 'supportEmails', localeValues, 'supportEmails', locale, (supportEmail) => {
          return !!supportEmail.value;
        });
        
        if (localeValues.webPages) {
          result.webPages.push({
            url: localeValues.webPages,
            language: locale
          });
        }
        
      });
      
      return result;
    }
    
    additionalDetailsFromForm(newFormValues) {
      this.serviceChannel.areaType = newFormValues.areaType;
      this.serviceChannel.languages = newFormValues.languages.split(",");
      this.serviceChannel.areas = this.areasFromForm(newFormValues.areaType, newFormValues.areas);
    }
    
    openAdditionalDetailsEditDialog() {
      const viewModel = getPhoneServiceChannelAdditionalDetailsMetaform();
      this.additionalDetailsToForm(this.serviceChannel)
        .then((formValues) => {
          const dialog = this.openMetaformDialog(this.prepareViewModel(viewModel), formValues, (newFormValues) => {
            this.additionalDetailsFromForm(newFormValues);
          });

          this.createAreasAutocomplete(dialog.find('*[data-name="areas"]'), formValues.areaCodes);   
          this.createLanguagesAutocomplete(dialog.find('*[data-name="languages"]'), formValues.languageCodes);   
        })
        .catch((err) => {
          tinyMCE.activeEditor.windowManager.alert(err);
        });
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
      this.openAdditionalDetailsEditDialog();
    }
  }
  
  window.PhoneServiceChannelEditorDialog = PhoneServiceChannelEditorDialog;
  
})(jQuery);