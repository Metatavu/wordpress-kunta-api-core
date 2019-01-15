/* jshint esversion: 6 */
/* global ajaxurl, moment, Promise */
(($) => {
  'use strict';
  
  class ElectronicServiceChannelEditorDialog extends window.AbstractServiceChannelEditorDialog {

    /**
     * Constructs service channel editor dialog
     * 
     * @param {type} editor TinyMCE editor instance
     * @param {type} channel
     */
    constructor(editor, channel) {
      super(editor, channel, 'kunta_api_save_electronic_service_channel');
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
        requiresAuthentication: this.serviceChannel.requiresAuthentication,
        requiresSignature: this.serviceChannel.requiresSignature,
        signatureQuantity: this.serviceChannel.signatureQuantity,
        supportPhones: this.getLocalizedPhoneNumbers(this.serviceChannel.supportPhones, locale),
        supportEmails: this.getLocalizedEmails(this.serviceChannel.supportEmails, locale),
        webPage: this.getLocalizedWebPageUrl(this.serviceChannel.webPages, locale),
        languages: this.serviceChannel.languages,
        attachments: (this.serviceChannel.attachments || []).filter((attachment) => {
          return attachment.url && attachment.language === locale;
        }),
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
      return getElectronicServiceChannelMetaform();
    }
    
    additionalDetailsToForm(serviceChannel) {
      return {
        areaCodes: this.areasToForm(serviceChannel.areas),
        areaType: serviceChannel.areaType
      };
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
      result.webPages = [];
      result.attachments = [];
      result.requiresSignature = false;
      result.requiresAuthentication = false;
      result.supportPhones = [];
      result.supportEmails = [];
      result.attachments = [];
  
      this.supportedLocales.forEach((locale) => {
        const localeValues = formValues[locale];
        
        result.signatureQuantity = localeValues.signatureQuantity || result.signatureQuantity;
        result.requiresSignature = this.getFormBooleanValue(localeValues.requiresSignature, result.requiresSignature);
        result.publishingStatus = localeValues.publishingStatus || result.publishingStatus;
        result.requiresAuthentication = this.getFormBooleanValue(localeValues.requiresAuthentication, result.requiresAuthentication);
        
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
        
        this.setLocalizedWebPages(result, 'webPages', localeValues, 'webPage', locale);
        this.setLocalizedTableValues(result, 'attachments', localeValues, 'attachments', locale, (attachment) => {
          return !!attachment.url;
        }, (attachment) => {
          return Object.assign(attachment, {
            language: locale,
            type: 'Attachment'
          });
        });
      });
      
      return result;
    }
    
    additionalDetailsFromForm(newFormValues) {
      this.serviceChannel.areaType = newFormValues.areaType;
      this.serviceChannel.areas = this.areasFromForm(newFormValues.areaType, newFormValues.areas);
    }
    
    openAdditionalDetailsEditDialog() {
      const viewModel = getElectronicServiceChannelAdditionalDetailsMetaform();
      const formValues = this.additionalDetailsToForm(this.serviceChannel);

      const dialog = this.openMetaformDialog(this.prepareViewModel(viewModel), formValues, (newFormValues) => {
        this.additionalDetailsFromForm(newFormValues);
      });

      this.createAreasAutocomplete(dialog.find('*[data-name="areas"]'), formValues.areaCodes);      
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
      this.linkInputs(dialog, ['requiresAuthentication', 'requiresSignature', 'signatureQuantity']);
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
      this.openAdditionalDetailsEditDialog(this.serviceChannel);
    }
  }
  
  window.ElectronicServiceChannelEditorDialog = ElectronicServiceChannelEditorDialog;
  
})(jQuery);