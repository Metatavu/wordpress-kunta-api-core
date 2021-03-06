import React from 'react';
import { wp } from 'wp';
import MetaformModal from "./metaform-modal";
import ServiceAdapter from './adapters/service-adapter';
import Metaform from './metaform';
import ServiceAdditionDetailsEditModal from './service-addition-details-edit-modal';
import ServiceChannelsEditModal from './service-channels-edit-modal';
import ServiceChannelIds from './service-channel-ids';
import ServiceChannels from './service-channels';

declare var wp: wp;
declare var ajaxurl: string;
const { withSelect } = wp.data;
const { __, sprintf } = wp.i18n;
const locales = ["fi", "sv", "en"];

/**
 * Interface describing component props
 */
interface Props {
  serviceId: string,
  service: any,
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
  channelIds: ServiceChannelIds,
  saving: boolean,
  saveError: string,
  additionalDetailsOpen: boolean,
  channelsOpen: boolean
}

/**
 * TODO:
 * 
 * shortDescription, description should be at least 5 characters long
 * An error occurred: {"ServiceClasses":["All the service classes are main service classes. Not allowed!"]}.
 */

/**
 * Service edit modal component
 */
class ServiceEditModal extends React.Component<Props, State> {

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      locale: "fi",
      saving: false,
      saveError: null,
      additionalDetailsOpen: false,
      channelsOpen: false,
      values: {},
      additionalValues: {},
      channelIds: {
        electronic: [],
        phone: [],
        printableForm: [],
        serviceLocation: [],
        webpage: []
      }
    };
  }

  /**
   * Component did update life-cycle event
   * 
   * @param prevProps previous props
   * @param prevState previous state
   */
  componentDidUpdate(prevProps: Props, prevState: State) {
    const service = this.props.service;    
    if ((JSON.stringify(service || {}) !== JSON.stringify(prevProps.service || {}))) {
      const serviceAdapter = new ServiceAdapter();
      const values: any = {};

      locales.forEach((locale: string) => {
        values[locale] = service ? serviceAdapter.serviceToForm(locale, service) : {};
      });
      
      this.setState({ 
        values: values,
        additionalValues: service ? serviceAdapter.serviceAdditinalToForm(service) : {},
        channelIds: {
          electronic: service ? service.electronicServiceChannelIds : [],
          phone: service ? service.phoneServiceChannelIds : [],
          printableForm: service ? service.printableFormServiceChannelIds : [],
          serviceLocation: service ? service.serviceLocationServiceChannelIds : [],
          webpage: service ? service.webPageServiceChannelIds : []
        }
      });
    }
  }

  /**
   * Component render method
   */
  public render() {
    if (!this.props.open) {
      return null;
    }

    if (this.state.channelsOpen) {
      return (
        <ServiceChannelsEditModal 
          serviceId={ this.props.serviceId }
          channelIds={ this.state.channelIds }
          open= { this.state.channelsOpen }
          applyValues= { (channels: ServiceChannels) => this.applyChannelValues(channels) }
          onClose={ () => { 
            this.setState({channelsOpen: false }); 
          } }/>
      );
    }

    if (this.state.additionalDetailsOpen) {
      return (
        <ServiceAdditionDetailsEditModal 
          serviceId={ this.props.serviceId } 
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
        form="service/service" 
        values={ this.getValues(this.state.locale) } 
        title={ sprintf(__(`Edit service (%s)`, "kunta_api_core"), this.state.locale) } 
        saveError={ this.state.saveError }
        saving={ this.state.saving }
        open={ this.props.open } 
        afterFormRender={ (metaform: Metaform, $metaform: any) => this.afterFormRender(metaform, $metaform) }
        onSave={ () => { this.saveService() } }
        onClose={ () => { this.setState({saving: false, saveError: null}); this.props.onClose(); } }/>
    );
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
   * Applies channels into state and closes channels dialog
   * 
   * @param channels channels
   */
  private applyChannelValues(channels: ServiceChannels) {
    this.setState({ 
      channelIds: {
        electronic: channels.electronic.map((channel) => channel.id),
        phone: channels.phone.map((channel) => channel.id),
        printableForm: channels.printableForm.map((channel) => channel.id),
        serviceLocation: channels.serviceLocation.map((channel) => channel.id),
        webpage: channels.webpage.map((channel) => channel.id),
      },
      channelsOpen: false
    });
  }

  /**
   * Event run after the form is rendered
   * 
   * @param $metaform metaform
   */
  async afterFormRender(metaform: Metaform, $metaform: any) {
    $metaform.on("click", ".edit-additional-details", this.onEditAdditionalDetailsClick.bind(this));
    $metaform.on("click", ".edit-channels", this.onEditChannelsClick.bind(this));
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
   * Event handler for edit channel button click
   * 
   * @param event event
   */
  private onEditChannelsClick(event: any) {
    this.setState({
      channelsOpen: true
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
   * Saves the service
   */
  private saveService() {
    const apiFetch = wp.apiFetch;
    this.setState({ 
      saving: true
    });

    const serviceAdapter = new ServiceAdapter();
    const serviceData = serviceAdapter.applyToService(this.state.values, this.state.additionalValues, this.state.channelIds, this.props.service);    
    const body = new URLSearchParams();
    body.append("action", "kunta_api_save_service");
    body.append("service", JSON.stringify(serviceData));

    apiFetch({ url: ajaxurl, method: "POST", body: body })
      .then((updatedService: any) => {
        wp.data.dispatch("kunta-api/data").setService(this.props.serviceId, updatedService);

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
  const { getService } = select("kunta-api/data");
  const { serviceId } = ownProps;
  
  return {
		service: serviceId ? getService(serviceId) : {}
	};
})(ServiceEditModal);