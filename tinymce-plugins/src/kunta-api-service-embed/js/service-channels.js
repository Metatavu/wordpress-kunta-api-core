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
    
      const dialog = this.openTabbedMetaformDialog(tabs, viewModel, formValues, (newFormValues) => {
        dialog.dialog("widget").addClass('loading');
      });
      
      const electronicChannelsTable = dialog.find('#electronic-channels .table-field[data-field-name="channels"]');
      electronicChannelsTable.tableField('option', 'afterProcessRow', this._onAfterElectronicChannelTableProcessRow.bind(this));
      electronicChannelsTable.tableField('removeAllRows');
      const electronicServiceChannelPromises = (this.service.electronicServiceChannelIds||[]).map((electronicServiceChannelId) => {
        return this.findElectronicServiceChannel(electronicServiceChannelId);
      });
      
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

  }
  
  window.ServiceChannelsDialog = ServiceChannelsDialog;
  
})(jQuery);