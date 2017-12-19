/* jshint esversion: 6 */
/* global ajaxurl, moment, Promise */
(($) => {
  'use strict';
  
  class ServiceChannelsDialog extends window.KuntaApiAbstractEditDialog {

    /**
     * Constructs service channels dialog
     * 
     * @param {type} editor TinyMCE editor instance
     * @param {type} service
     */
    constructor(editor, service) {
      super(editor);
      this.service = service;
    }

    saveService(service, callback) {
      $.post(ajaxurl, {
        'action': 'kunta_api_save_service',
        'service': JSON.stringify(this.service)
      }, (response) => {
        callback();
      })
      .fail((response) => {
        callback(response.responseText || response.statusText || "Unknown error occurred");
      });
    }

    open() {
      const viewModel = getServiceChannelsMetaform();
      const formValues = {};
      const tabs = [{
        id: 'electronic-channels',
        title: 'Sähköiset asiointikanavat'
      }];
    
      this.dialog = this.openTabbedMetaformDialog(tabs, viewModel, formValues, (newFormValues) => {
        this.dialog.dialog("widget").addClass('loading');
      });
      
      const electronicChannelsTable = this.dialog.find('#electronic-channels .table-field[data-field-name="channels"]');
      electronicChannelsTable.tableField('option', 'afterProcessRow', this._onAfterElectronicChannelTableProcessRow.bind(this));
      electronicChannelsTable.tableField('removeAllRows');
      const electronicServiceChannelPromises = (this.service.electronicServiceChannelIds||[]).map((electronicServiceChannelId) => {
        return this.findElectronicServiceChannel(electronicServiceChannelId);
      });
      
      electronicChannelsTable.on('click', 'td button[data-action="edit-channel"]', this._onElectronicChannelTableEditChannelButtonClick.bind(this));

      Promise.all(electronicServiceChannelPromises).then((electronicServiceChannels) => {
        electronicServiceChannels.forEach((channel) => {
          const row = electronicChannelsTable.tableField('addRow', {
            id: channel.id,
            name: this.getLocalizedValue(channel.names, 'fi')
          });
          
          row.find('*[data-column-name="name"] input').metaformAutocomplete('val', {
            value: channel.id,
            label: this.getLocalizedValue(channel.names, 'fi')
          });
          
        });
      });
    }
    
    /**
     * Closes dialog
     */
    close() {
      this.dialog.remove();
    }
    
    /**
     * Opens electronic service channel editor
     * 
     * @param {String} channelId channel id
     */
    openElectronicServiceChannelEditor(channelId) {
      this.close();
      
      this.findElectronicServiceChannel(channelId)
        .then((serviceChannel) => {
          const ElectronicServiceChannelEditorDialog = window.ElectronicServiceChannelEditorDialog;
          const channelDialog = new ElectronicServiceChannelEditorDialog(this.editor, serviceChannel);
          channelDialog.open();
        })
        .catch((err) => {
          tinyMCE.activeEditor.windowManager.alert(err);
        });
    }
    
    /**
     * Creates autocomplete field for selecting service channels
     * 
     * @param {jQuery} element autocomplete element
     * @param {Array} channelId service channel id
     */
    createElectronicServiceChannelsAutocomplete(element, channelId) {
      element.metaformAutocomplete('val', channelId);
    }
    
    _onAfterElectronicChannelTableProcessRow(row) {
      row.find('*[data-column-name="name"] input')
        .metaformAutocomplete('option', 'customSource', (input, callback) => {
          this.searchElectronicServiceChannels(input.term + '*')
            .then((channels) => {
              callback((channels||[]).map((channel) => {
                return {
                  value: channel.id,
                  label: this.getLocalizedValue(channel.names, 'fi')
                };
              }));
            })
            .catch((err) => {
              tinyMCE.activeEditor.windowManager.alert(err);
            });
        });
    }
    
    _onElectronicChannelTableEditChannelButtonClick(event) {
      event.preventDefault();
      
      const value = $(event.target).closest('tr').find('*[data-column-name="name"] input')
        .metaformAutocomplete('val');

      this.openElectronicServiceChannelEditor(value.value);
    }

  }
  
  window.ServiceChannelsDialog = ServiceChannelsDialog;
  
})(jQuery);