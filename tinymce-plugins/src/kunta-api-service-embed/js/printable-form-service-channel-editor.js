/* jshint esversion: 6 */
/* global ajaxurl, moment, Promise */
(($) => {
  'use strict';
  
  class PrintableFormServiceChannelEditorDialog extends window.AbstractServiceChannelEditorDialog {

    /**
     * Constructs service channel editor dialog
     * 
     * @param {type} editor TinyMCE editor instance
     * @param {type} channel
     */
    constructor(editor, channel) {
      super(editor, channel, 'kunta_api_save_printable_form_service_channel');
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
        shortDescription: this.getTypedLocalizedValue(this.serviceChannel.descriptions, locale, 'ShortDescription'),
        description: this.getTypedLocalizedValue(this.serviceChannel.descriptions, locale, 'Description'),
        formIdentifier: this.getLocalizedValue(this.serviceChannel.formIdentifier, locale),
        formReceiver: this.getLocalizedValue(this.serviceChannel.formReceiver, locale),
        addressType: this.serviceChannel.deliveryAddress.subtype,
        streetAddress: this.getLocalizedValue(this.serviceChannel.deliveryAddress.streetAddress, locale),
        postOfficeBox: this.getLocalizedValue(this.serviceChannel.deliveryAddress.postOfficeBox, locale),
        streetNumber: this.serviceChannel.deliveryAddress.streetNumber,
        postalCode: this.serviceChannel.deliveryAddress.postalCode,
        addressAdditionalInformation: this.getLocalizedValue(this.serviceChannel.deliveryAddress.additionalInformations, locale),
        addressAdditionalInformationNoAddress: this.getLocalizedValue(this.serviceChannel.deliveryAddress.additionalInformations, locale),
        channelUrls: this.getLocalizedValues(this.serviceChannel.channelUrls, locale),
        attachments: (this.serviceChannel.attachments || []).filter((attachment) => {
          return attachment.url && attachment.language === locale;
        }),
        supportPhones: this.getLocalizedPhoneNumbers(this.serviceChannel.supportPhones, locale),
        supportEmails: this.getLocalizedEmails(this.serviceChannel.supportEmails, locale),
        publishingStatus: this.serviceChannel.publishingStatus
      };
    }
    
    /**
     * Returns main form for service channel
     * 
     * @returns {Object} metaform
     */
    getServiceChannelFormViewModel() {
      return getPrintableFormServiceChannelMetaform();
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
      result.formIdentifier = [];
      result.formReceiver = [];
      result.channelUrls = [];
      result.deliveryAddress = {};
      
      this.supportedLocales.forEach((locale) => {
        const localeValues = formValues[locale];
        
        result.publishingStatus = localeValues.publishingStatus || result.publishingStatus;
        
        this.setTypedLocalizedValue(result, 'names', localeValues, 'name', locale, 'Name');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'shortDescription', locale, 'ShortDescription');
        this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'description', locale, 'Description');
        
        this.setLocalizedValue(result, 'formIdentifier', localeValues, 'formIdentifier', locale);
        this.setLocalizedValue(result, 'formReceiver', localeValues, 'formReceiver', locale);
        
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
        
        this.setLocalizedTableValues(result, 'attachments', localeValues, 'attachments', locale, (attachment) => {
          return !!attachment.url;
        }, (attachment) => {
          return Object.assign(attachment, {
            language: locale,
            type: 'Attachment'
          });
        });
        
        if (localeValues.webPages) {
          result.webPages.push({
            url: localeValues.webPages,
            language: locale
          });
        }
        
        this.setLocalizedTableValues(result, 'channelUrls', localeValues, 'channelUrls', locale, (channelUrl) => {
          return !!channelUrl.value;
        }, (channelUrl) => {
          return Object.assign(channelUrl, {
            language: locale
          });
        });
        
        const addressType = localeValues.addressType;
        
        result.deliveryAddress.subtype = addressType;
        result.deliveryAddress.streetNumber = localeValues.streetNumber || result.streetNumber;
        result.deliveryAddress.postalCode = localeValues.postalCode || result.postalCode;
        
        this.setLocalizedValue(result.deliveryAddress, 'streetAddress', localeValues, 'streetAddress', locale);
        this.setLocalizedValue(result.deliveryAddress, 'postOfficeBox', localeValues, 'postOfficeBox', locale);
        this.setLocalizedValue(result.deliveryAddress, 'additionalInformations', localeValues, 'NoAddress' ? 'addressAdditionalInformationNoAddress' : 'addressAdditionalInformation', locale);
      });
      
      return result;
    }
    
    additionalDetailsFromForm(newFormValues) {
      this.serviceChannel.areaType = newFormValues.areaType;
      this.serviceChannel.areas = this.areasFromForm(newFormValues.areaType, newFormValues.areas);
    }
    
    openAdditionalDetailsEditDialog() {
      const viewModel = getPrintableFormServiceChannelAdditionalDetailsMetaform();
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
      this.linkInputs(dialog, ['addressType']);
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
  
  window.PrintableFormServiceChannelEditorDialog = PrintableFormServiceChannelEditorDialog;
  
})(jQuery);