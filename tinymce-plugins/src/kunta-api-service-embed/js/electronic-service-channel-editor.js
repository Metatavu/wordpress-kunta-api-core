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
      super(editor, channel);
      
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
        requiresAuthentication: this.serviceChannel.requiresAuthentication,
        requiresSignature: this.serviceChannel.requiresSignature,
        signatureQuantity: this.serviceChannel.signatureQuantity,
        supportPhones: this.getLocalizedPhoneNumbers(this.serviceChannel.supportPhones, locale),
        supportEmails: this.getLocalizedEmails(this.serviceChannel.supportEmails, locale),
        url: this.getLocalizedValue(this.serviceChannel.urls, locale),
        languages: this.serviceChannel.languages,
        attachments: (this.serviceChannel.attachments || []).filter((attachment) => {
          return attachment.url && attachment.language === locale;
        }),
        webPages: this.getLocalizedWebPages(this.serviceChannel.webPages, locale),
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
  }
  
  window.ElectronicServiceChannelEditorDialog = ElectronicServiceChannelEditorDialog;
  
})(jQuery);