import React from 'react';
import { wp } from 'wp';
import MetaformModal from "./metaform-modal";
import Metaform from './metaform';
import { ElectronicServiceChannel, PhoneServiceChannel, PrintableFormServiceChannel, WebPageServiceChannel, ServiceLocationServiceChannel } from './kunta-api/models';
import AbstractServiceChannelAdapter from './adapters/abstract-service-channel-adapter';
import ElectronicServiceChannelAdapter from './adapters/electronic-service-channel-adapter';
import ServiceChannelAdditionDetailsEditModal from './service-channel-addition-details-edit-modal';
import ServiceHourModal from './servicehour-modal';
import Utils from './utils';
import PhoneServiceChannelAdapter from './adapters/phone-service-channel-adapter';
import PrintableFormServiceChannelAdapter from './adapters/printable-form-service-channel-adapter';
import WebPageServiceChannelAdapter from './adapters/webpage-service-channel-adapter';
import ServiceLocationServiceChannelAdapter from './adapters/service-location-service-channel-adapter';

declare var wp: wp;
declare var ajaxurl: string;
declare var jQuery: any;
const { withSelect } = wp.data;
const { __, sprintf } = wp.i18n;
const locales = ["fi", "sv", "en"];

/**
 * Interface describing component props
 */
interface Props {
  channelId: string,
  channelType: string,
  channel?: ElectronicServiceChannel|PhoneServiceChannel|PrintableFormServiceChannel|WebPageServiceChannel|ServiceLocationServiceChannel,
  open: boolean,
  onClose: () => void
}

/**
 * Interface describing component state
 */
interface State {
  locale: string,
  values: any,
  additionalValues: any,
  saving: boolean,
  saveError: string,
  additionalDetailsOpen: boolean,
  editServiceHourOpen: boolean,
  editServiceHourIndex: number,
  serviceHours: any[]
}

/**
 * Service channel edit modal component
 */
class ServiceChannelEditModal extends React.Component<Props, State> {

  private $metaform: any;

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);

    const adapter: AbstractServiceChannelAdapter<ElectronicServiceChannel|PhoneServiceChannel|PrintableFormServiceChannel|WebPageServiceChannel|ServiceLocationServiceChannel> = this.getAdapter();
    const values: any = {};

    if (props.channel) {
      locales.forEach((locale: string) => {
        values[locale] = adapter.channelToForm(locale, props.channel)
      });
    };

    this.state = {
      locale: "fi",
      saving: false,
      saveError: null,
      additionalDetailsOpen: false,
      values: values,
      additionalValues: props.channel ? adapter.additionalToForm(props.channel) : {},
      editServiceHourOpen: false,
      serviceHours: props.channel ? adapter.serviceHoursToForm(props.channel) : [],
      editServiceHourIndex: -1
    };
  }

  /**
   * Component did update life-cycle event
   * 
   * @param prevProps previous props
   * @param prevState previous state
   */
  componentDidUpdate(prevProps: Props, prevState: State) {
    if ((JSON.stringify(this.props.channel) !== JSON.stringify(prevProps.channel))) {
      const adapter: AbstractServiceChannelAdapter<ElectronicServiceChannel|PhoneServiceChannel|PrintableFormServiceChannel|WebPageServiceChannel|ServiceLocationServiceChannel> = this.getAdapter();
      const values: any = {};

      locales.forEach((locale: string) => {
        values[locale] = this.getAdapter().channelToForm(locale, this.props.channel)
      });

      this.setState({
        values: values,
        additionalValues: this.props.channel ? adapter.additionalToForm(this.props.channel) : {},
        serviceHours: this.props.channel ? adapter.serviceHoursToForm(this.props.channel) : [],
      });
    }

    if ((JSON.stringify(this.state.serviceHours) !== JSON.stringify(prevState.serviceHours))) {
      this.renderServiceHours();
    }    
  }

  /**
   * Component render method
   */
  public render() {
    if (!this.props.open) {
      return null;
    }

    if (this.state.editServiceHourOpen) {
      return (
        <ServiceHourModal 
          adapter={ this.getAdapter() }
          values={ this.state.editServiceHourIndex > -1 ? this.state.serviceHours[this.state.editServiceHourIndex] : {} }
          okButtonText={ this.state.editServiceHourIndex > -1 ? __("Apply", "kunta_api_core") : __("Add", "kunta_api_core") } 
          onOkClick={ (values: any) => {
            this.onServiceHourOk(values);
          }}
          onClose={ () => { 
            this.setState({editServiceHourOpen: false }); 
          } }/>
      )
    }

    if (this.state.additionalDetailsOpen) {
      return (
        <ServiceChannelAdditionDetailsEditModal 
          channelId = { this.props.channelId }
          channelType = {this.props.channelType }
          open = { this.state.additionalDetailsOpen } 
          values={ this.state.additionalValues } 
          applyValues={ (additionalValues: any) => { this.applyAdditionalValues(additionalValues); } } 
          onClose={ () => { 
            this.setState({additionalDetailsOpen: false }); 
          } }/>
      );
    }

    return (
      <MetaformModal
        locales={ locales }
        locale={ this.state.locale }
        saveButtonText={ __("Save", "kunta_api_core") } 
        onLocaleChange={ (locale) => { this.changeLocale(locale) } }
        onValuesChange={ (locale, values) => { this.updateValues(locale, values) } }
        form={ `servicechannel/${this.getForm()}` } 
        values={ this.getValues(this.state.locale) } 
        title={ sprintf(__(`Edit service channel (%s)`, "kunta_api_core"), this.state.locale) } 
        saveError={ this.state.saveError }
        saving={ this.state.saving }
        open={ this.props.open } 
        afterFormRender={ (metaform: Metaform, $metaform: any) => this.afterFormRender(metaform, $metaform) }
        onSave={ () => { this.saveServiceChannel() } }
        onClose={ () => { this.setState({saving: false, saveError: null}); this.props.onClose(); } }/>
    );
  }

  /**
   * Event triggered 
   * 
   * @param serviceHour 
   */
  private onServiceHourOk(serviceHour: any) {
    const serviceHours = [].concat(this.state.serviceHours);

    if (this.state.editServiceHourIndex > -1) {
      serviceHours[this.state.editServiceHourIndex] = serviceHour;
    } else {
      serviceHours.push(serviceHour);
    }

    this.setState({
      editServiceHourIndex: -1,
      editServiceHourOpen: false,
      serviceHours: serviceHours.filter((serviceHour) => {
        return !!serviceHour && !!serviceHour.type;
      })
    });  
  }

  /**
   * Renders service hours into the form
   */
  renderServiceHours() {
    const serviceHours: any[] = this.getAdapter().serviceHoursFromForm(this.state.serviceHours);
    const serviceHourTexts: string[] = serviceHours.map((serviceHour: any): string => {
      return this.formatServiceHour(serviceHour);
    });

    const tableBody = this.$metaform.find('table.serviceHours tbody');
    
    tableBody.empty();
    
    if (serviceHourTexts.length) {
      serviceHourTexts.forEach((serviceHourText: string) => {
        const row = jQuery('<tr>').appendTo(tableBody);
        const removeButton = jQuery('<a>')
          .css("margin-right", "4px")
          .addClass('btn btn-sm btn-warning remove-service-hour')
          .html(__("Remove", "kunta_api_core"));
          
        const editButton = jQuery('<a>')
          .addClass('btn btn-sm btn-success edit-service-hour')
          .html(__("Edit", "kunta_api_core"));

        jQuery('<td>').html(serviceHourText).appendTo(row);
        jQuery('<td>').css({"text-align": "right"}).append(removeButton, editButton).appendTo(row);
      });
    } else {
      const row = jQuery('<tr>').appendTo(tableBody);
      jQuery('<td>')
        .html('Palveluaikoja ei ole vielä määritelty')
        .appendTo(row);
    }
  }

  /**
   * Formats service hour for displaying
   * 
   * @param serviceHour 
   * @return formatted service hour
   */
  private formatServiceHour(serviceHour: any): string {
    const type = this.getServiceHourTypeName(serviceHour.serviceHourType);
    
    if (serviceHour.serviceHourType === 'Exceptional') {
      let result = `(${type})`;
      
      if (serviceHour.isClosed) {
        result += ` ${__("Closed", "kunta_api_core")}`;
      }
      
      const openingHour = serviceHour.openingHour && serviceHour.openingHour.length ? serviceHour.openingHour[0] : null;
      const openFrom = openingHour ? openingHour.from : null;
      const openTo = openingHour ? openingHour.to : null;
      
      if (serviceHour.validFrom && serviceHour.validTo) {
        result += ` ${Utils.formatDateWithTime(serviceHour.validFrom, openFrom)} - ${Utils.formatDateWithTime(serviceHour.validTo, openTo)}`;
      } else if (serviceHour.validFrom) {
        result += ` ${Utils.formatDateWithTimes(serviceHour.validFrom, openFrom, openTo)}`;
      }
      
      const additionalInformation = Utils.getAnyLocalizedValue(serviceHour.additionalInformation);
      if (additionalInformation) {
        return `${result} - ${additionalInformation}`;
      }
      
      return result;
    } else {
      if (serviceHour.openingHour.length === 0 && !serviceHour.isClosed) {
        return `(${type}) Aina avoinna (24/7)`;
      }
      
      const openingHours = (serviceHour.openingHour||[]).map((openingHour: any) => {
        return this.formatOpeningHour(openingHour);
      });

      return `(${type}) ${openingHours.join(',')}`;
    }
  }

  /**
   * Formats opening hour for displaying
   * 
   * @param dailyOpeningTime daily opening time 
   * @return formatted opening hour
   */
  private formatOpeningHour(dailyOpeningTime: any) {
    if (!dailyOpeningTime) {
      return null;
    }
    
    if (dailyOpeningTime.dayFrom === null) {
      return '';
    } else {
      let result = Utils.getDayName(dailyOpeningTime.dayFrom, true);

      if (dailyOpeningTime.dayTo && dailyOpeningTime.dayTo !== dailyOpeningTime.dayFrom) {
        result += ' - ' + Utils.getDayName(dailyOpeningTime.dayTo, true);
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

  /**
   * Returns service hour type name
   * 
   * @param type type 
   * @return service hour type name
   */
  private getServiceHourTypeName(type: string): string {
    const serviceHourTypeNames: any = {
      'OverMidnight': 'Päivystys',
      'DaysOfTheWeek': 'Normaali',
      'Exceptional': 'Poikkeus'
    };

    return serviceHourTypeNames[type];
  }
  
  /**
   * Returns adapter for this channel type
   * 
   * @retrn adapter for this channel type
   */
  private getAdapter(): AbstractServiceChannelAdapter<ElectronicServiceChannel|PhoneServiceChannel|PrintableFormServiceChannel|WebPageServiceChannel|ServiceLocationServiceChannel> {
    switch (this.props.channelType) {
      case "electronic":
        return new ElectronicServiceChannelAdapter();
      case "phone":
        return new PhoneServiceChannelAdapter();
      case "printableForm":
        return new PrintableFormServiceChannelAdapter();
      case "webpage":
        return new WebPageServiceChannelAdapter();
      case "serviceLocation":
        return new ServiceLocationServiceChannelAdapter();
    }

    return null;
  }

  /**
   * Applies additional values into state and closes adiitional details dialog
   */
  private applyAdditionalValues(additionalValues: any) {
    this.setState({ 
      additionalValues: additionalValues,
      additionalDetailsOpen: false,
    });
  }

  /**
   * Returns form for this channel type
   * 
   * @return form for this channel type
   */
  private getForm(): string {
    switch (this.props.channelType) {
      case "electronic":
        return "electronic";
      case "phone":
        return "phone";
      case "printableForm":
        return "printable-form";
      case "webpage":
        return "webpage";
      case "serviceLocation":
        return "service-location"; 
    }

    return this.props.channelType;
  }

  /**
   * Returns save action channel type
   * 
   * @return save action this channel type
   */
  private getSaveAction(): string {
    switch (this.props.channelType) {
      case "electronic":
        return "kunta_api_save_electronic_service_channel";
      case "phone":
        return "kunta_api_save_phone_service_channel";
      case "printableForm":
        return "kunta_api_save_printable_form_service_channel";
      case "webpage":
        return "kunta_api_save_webpage_service_channel";
      case "serviceLocation":
        return "kunta_api_save_service_location_service_channel"; 
    }

    return null;
  }

  /**
   * Event run after the form is rendered
   * 
   * @param $metaform metaform
   */
  private afterFormRender(metaform: Metaform, $metaform: any) {
    this.$metaform = $metaform;
    $metaform.on("click", ".edit-additional-details", this.onEditAdditionalDetailsClick.bind(this));
    $metaform.on("click", ".btn.add-service-hour", this.onAddServiceHourClick.bind(this));
    $metaform.on("click", ".btn.remove-service-hour", this.onRemoveServiceHourClick.bind(this));
    $metaform.on("click", ".btn.edit-service-hour", this.onEditServiceHourClick.bind(this));

    this.renderServiceHours();
  }

  /**
   * Event handler for additional details button click
   * 
   * @param event event
   */
  private onEditAdditionalDetailsClick(event: any) {
    this.setState({
      additionalDetailsOpen: true
    });
  }

  /**
   * Event handler for add service hour button click
   * 
   * @param event event
   */
  private onAddServiceHourClick(event: any) {
    this.setState({
      editServiceHourOpen: true
    });
  }

  /**
   * Event handler for remove service hour button click
   * 
   * @param event event
   */
  private onRemoveServiceHourClick(event: any) {
    const index = jQuery(event.target).closest("tr").index();
    const serviceHours = [].concat(this.state.serviceHours);
    serviceHours.splice(index, 1);

    this.setState({
      serviceHours: serviceHours
    }); 
  }

  /**
   * Event handler for edit service hour button click
   * 
   * @param event event
   */
  private onEditServiceHourClick(event: any) {
    const index = jQuery(event.target).closest("tr").index();
    
    this.setState({
      editServiceHourOpen: true,
      editServiceHourIndex: index
    }); 
  }

  /**
   * Changes locale
   * 
   * @param locale locale
   */
  private changeLocale(locale: string) {
    this.setState({locale: locale});
  }

  /**
   * Updates form values for locale
   * 
   * @param locale locale
   * @param changedValues changed values
   */
  private updateValues(locale: string, changedValues: any) {
    const newValues = { ...this.state.values }
    newValues[locale] = changedValues;
    this.setState({locale: locale, values: newValues});
  }

  /**
   * Returns values for locale
   * 
   * @param locale locale
   * @returns values
   */
  private getValues(locale: string) {
    return this.state.values[locale];
  }

  /**
   * Saves the service channel
   */
  private saveServiceChannel() {
    const apiFetch = wp.apiFetch;
    this.setState({ 
      saving: true
    });

    const adapter: AbstractServiceChannelAdapter<ElectronicServiceChannel|PhoneServiceChannel|PrintableFormServiceChannel|WebPageServiceChannel|ServiceLocationServiceChannel> = this.getAdapter();
    const data = adapter.applyToChannel(this.state.values, this.state.additionalValues, this.state.serviceHours, this.props.channel);

    const body = new URLSearchParams();
    body.append("action", this.getSaveAction());
    body.append("serviceChannel", JSON.stringify(data));

    apiFetch({ url: ajaxurl, method: "POST", body: body })
      .then((updatedChannel: ElectronicServiceChannel|PhoneServiceChannel|PrintableFormServiceChannel|WebPageServiceChannel|ServiceLocationServiceChannel) => {
        wp.data.dispatch("kunta-api/data").setServiceChannel(this.props.channelType, this.props.channelId, updatedChannel);

        this.setState({
          saving: false,
          saveError: null
        });

        this.props.onClose();
      })
      .catch((err: any) => {
        this.setState({
          saving: false,
          saveError: JSON.stringify(err)
        });
      });
  }

}

export default withSelect((select: any, ownProps: any) => {
  const { getServiceChannel } = select("kunta-api/data");
  const { channelType, channelId } = ownProps;
  const channel = getServiceChannel(channelType, channelId);
  
  return {
		channel: channel || null
	};
})(ServiceChannelEditModal);