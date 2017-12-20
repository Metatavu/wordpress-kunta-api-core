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
      
      this._channelDetails = [{
        tabId: 'electronic-channels',
        property: 'electronicServiceChannelIds',
        title: 'Verkkoasiointikanavat',
        afterProcessRow: this.onAfterElectronicChannelTableProcessRow.bind(this),
        click: this.onElectronicChannelTableEditChannelButtonClick.bind(this),
        findMethod: this.findElectronicServiceChannel
      }, {
        tabId: 'webpage-channels',
        property: 'webPageServiceChannelIds',
        title: 'Verkkosivu',
        afterProcessRow: this.onAfterWebPageTableProcessRow.bind(this),
        click: this.onWebPageChannelTableEditChannelButtonClick.bind(this),
        findMethod: this.findWebPageChannelServiceChannel
      }, {
        tabId: 'printable-form-service-channels',
        property: 'printableFormServiceChannelIds',
        title: 'Tulostettava lomake',
        afterProcessRow: this.onAfterPrintableFormTableProcessRow.bind(this),
        click: this.onPrintableFormChannelTableEditChannelButtonClick.bind(this),
        findMethod: this.findPrintableFormChannelServiceChannel
      }, {
        tabId: 'phone-service-channels',
        property: 'phoneServiceChannelIds',
        title: 'Puhelinasiointi',
        afterProcessRow: this.onAfterPhoneServiceTableProcessRow.bind(this),
        click: this.onPhoneServiceChannelTableEditChannelButtonClick.bind(this),
        findMethod: this.findPhoneServiceChannel
      }, {
        tabId: 'service-location-service-channels',
        property: 'serviceLocationServiceChannelIds',
        title: 'Palvelupaikka',
        afterProcessRow: this.onAfterServiceLocationTableProcessRow.bind(this),
        click: this.onServiceLocationServiceChannelTableEditChannelButtonClick.bind(this),
        findMethod: this.findServiceLocationServiceChannel
      }];
    }

    open() {
      const viewModel = getServiceChannelsMetaform();
      const formValues = {};

      this.dialog = this.openTabbedMetaformDialog(this._channelDetails.map((channelDetail) => {
        return {
          id: channelDetail.tabId,
          title: channelDetail.title
        };
      }), viewModel, formValues, () => {
        const newFormValues = {};
        
        this._channelDetails.forEach((channelDetail) => {
          newFormValues[channelDetail.tabId] = {};
          $(this.dialog).find(`#${channelDetail.tabId} form.metaform`).metaform('val', true).forEach((value) => {
            newFormValues[channelDetail.tabId][value.name] = value.value;
          });
        });
        
        this.dialog.dialog("widget").addClass('loading');
        
        const updatedService = this.translateServiceFromForm(newFormValues);
        
        this.saveService(updatedService, (err) => {
          this.service = updatedService;
           
          this.dialog.dialog("widget").removeClass('loading');
          if (err) {
            this.showError('Virhe tallentaessa', err);
          } else {
            this.dialog.dialog('close'); 
          }
        });
      });
      
      this._channelDetails.forEach((channelDetail) => {
        const tabId = channelDetail.tabId;
        
        const channelsTable = this.dialog.find(`#${tabId} .table-field[data-field-name="channels"]`);
        channelsTable.tableField('option', 'afterProcessRow', channelDetail.afterProcessRow);
        channelsTable.tableField('removeAllRows');
        const channelPromises = (this.service[channelDetail.property]||[]).map((channelId) => {
          return channelDetail.findMethod.call(this, channelId);
        });
        
        channelsTable.on('click', 'td button[data-action="edit-channel"]', channelDetail.click);
        
        Promise.all(channelPromises).then((channels) => {
          channels.forEach((channel) => {
            const row = channelsTable.tableField('addRow', {
              id: channel.id,
              name: this.getLocalizedValue(channel.names, 'fi')
            });

            row.find('*[data-column-name="name"] input').metaformAutocomplete('val', {
              value: channel.id,
              label: this.getLocalizedValue(channel.names, 'fi')
            }).change() ;
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
      if (!channelId) {
        return;
      }
      
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
     * Opens service location service channel editor
     * 
     * @param {type} channelId
     */
    openServiceLocationServiceChannelEditor(channelId) {
      if (!channelId) {
        return;
      }
      
      this.close();
      
      this.findServiceLocationServiceChannel(channelId)
        .then((serviceChannel) => {
          const ServiceLocationServiceChannelDialog = window.ServiceLocationServiceChannelDialog;
          const dialog = new ServiceLocationServiceChannelDialog(this.editor, serviceChannel);
          dialog.open();
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
    
    /**
     * Creates updated version of service using form values
     * 
     * @returns {Object} updated service
     */
    translateServiceFromForm() {
      const result = JSON.parse(JSON.stringify(this.service));
      
      this._channelDetails.forEach((channelDetail) => {
        const formValues = {};
        
        this.dialog.find(`#${channelDetail.tabId} .metaform`).metaform('val', true).forEach((value) => {
          formValues[value.name] = value.value;
        });
        
        const tableData = formValues['channels'];
        
        const channelIds = (tableData ? JSON.parse(tableData) : []).map((tableRow) => {
          return tableRow.name;
        }).filter((channelId) => {
          return !!channelId;
        });
        
        result[channelDetail.property] = channelIds;
      });
      
      return result;
    }
    
    onAfterElectronicChannelTableProcessRow(row) {
      this.createChannelAutocomplete(row, this.searchElectronicServiceChannels.bind(this));
    }
    
    onAfterWebPageTableProcessRow(row) {
      // TODO
    }
    
    onAfterPrintableFormTableProcessRow(row) {
      // TODO
    }
    
    onAfterPhoneServiceTableProcessRow(row) {
      // TODO 
    }
    
    onAfterServiceLocationTableProcessRow(row) {
      this.createChannelAutocomplete(row, this.searchServiceLocationServiceChannels.bind(this));
    }
    
    createChannelAutocomplete(row, searchCall) {
      row.find('*[data-column-name="name"] input')
        .metaformAutocomplete('option', 'customSource', (input, callback) => {
          searchCall(input.term + '*')
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
    
    onElectronicChannelTableEditChannelButtonClick(event) {
      event.preventDefault();
      
      const value = $(event.target).closest('tr').find('*[data-column-name="name"] input')
        .metaformAutocomplete('val');

      this.openElectronicServiceChannelEditor(value.value);
    }

    onWebPageChannelTableEditChannelButtonClick(event) {
      event.preventDefault();
      
      const value = $(event.target).closest('tr').find('*[data-column-name="name"] input')
        .metaformAutocomplete('val');

      // this.openWebPageServiceChannelEditor(value.value);
    }
    
    onPrintableFormChannelTableEditChannelButtonClick(event) {
      event.preventDefault();
      
      const value = $(event.target).closest('tr').find('*[data-column-name="name"] input')
        .metaformAutocomplete('val');

      // this.openPrintableFormServiceChannelEditor(value.value);
    }
    
    onPhoneServiceChannelTableEditChannelButtonClick(event) {
      event.preventDefault();
      
      const value = $(event.target).closest('tr').find('*[data-column-name="name"] input')
        .metaformAutocomplete('val');

      // this.openPhoneServiceChannelEditor(value.value);
    }
    
    onServiceLocationServiceChannelTableEditChannelButtonClick(event) {
      event.preventDefault();
      
      const value = $(event.target).closest('tr').find('*[data-column-name="name"] input')
        .metaformAutocomplete('val');

      this.openServiceLocationServiceChannelEditor(value.value);
    }
    
  }
  
  window.ServiceChannelsDialog = ServiceChannelsDialog;
  
})(jQuery);