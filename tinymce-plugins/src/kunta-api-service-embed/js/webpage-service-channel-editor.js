/* jshint esversion: 6 */
/* global ajaxurl, moment, Promise */
(($) => {
  'use strict';
  
  class WebPageServiceChannelEditorDialog extends window.AbstractServiceChannelEditorDialog {

    /**
     * Constructs service channel editor dialog
     * 
     * @param {type} editor TinyMCE editor instance
     * @param {type} channel
     */
    constructor(editor, channel) {
      super(editor, channel, 'kunta_api_save_webpage_service_channel');
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
        supportPhones: this.getLocalizedPhoneNumbers(this.serviceChannel.supportPhones, locale),
        supportEmails: this.getLocalizedEmails(this.serviceChannel.supportEmails, locale),
        url: this.getLocalizedValue(this.serviceChannel.urls, locale),
        languages: this.serviceChannel.languages,
        publishingStatus: this.serviceChannel.publishingStatus
      };
    }
    
    /**
     * Returns main form for service channel
     * 
     * @returns {Object} metaform
     */
    getServiceChannelFormViewModel() {
      return getWebPageServiceChannelMetaform();
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
            languageCodes: languageCodes
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
      result.urls = [];
      result.supportPhones = [];
      result.supportEmails = [];
      result.urls = [];
  
      this.supportedLocales.forEach((locale) => {
        const localeValues = formValues[locale];
        
        result.publishingStatus = localeValues.publishingStatus || result.publishingStatus;
        
        this.setTypedLocalizedValue(result, 'names', localeValues, 'name', locale, 'Name');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'shortDescription', locale, 'Summary');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'description', locale, 'Description');

        this.setLocalizedTableValues(result, 'supportPhones', localeValues, 'supportPhones', locale, (supportPhone) => {
          return !!supportPhone.number;
        }, (supportPhone) => {
          return Object.assign({}, supportPhone, {
            language: locale,
            isFinnishServiceNumber: "true" === supportPhone.isFinnishServiceNumber,
            type: "Phone"
          });
        });
        
        this.setLocalizedTableValues(result, 'supportEmails', localeValues, 'supportEmails', locale, (supportEmail) => {
          return !!supportEmail.value;
        });
        
        this.setLocalizedValue(result, 'urls', localeValues, 'url', locale);
      });
      
      return result;
    }
    
    additionalDetailsFromForm(newFormValues) {
      this.serviceChannel.languages = (newFormValues.languages||'').split(',');
    }
    
    openAdditionalDetailsEditDialog() {
      const viewModel = getWebPageServiceChannelAdditionalDetailsMetaform();
      this.additionalDetailsToForm(this.serviceChannel)
        .then((formValues) => {
          const dialog = this.openMetaformDialog(this.prepareViewModel(viewModel), formValues, (newFormValues) => {
            this.additionalDetailsFromForm(newFormValues);
          });

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
      
      $(dialog).on('click', '.edit-additional-details', this.onEditAdditionalDetailsClick.bind(this));
    }
    
    onEditAdditionalDetailsClick() {
      this.openAdditionalDetailsEditDialog(this.serviceChannel);
    }
  }
  
  window.WebPageServiceChannelEditorDialog = WebPageServiceChannelEditorDialog;
  
})(jQuery);