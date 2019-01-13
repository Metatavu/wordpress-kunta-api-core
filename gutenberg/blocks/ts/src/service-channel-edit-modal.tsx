import React from 'react';
import { wp } from 'wp';
import MetaformModal from "./metaform-modal";
import Metaform from './metaform';
import { ElectronicServiceChannel, PhoneServiceChannel, PrintableFormServiceChannel, WebPageServiceChannel, ServiceLocationServiceChannel } from './kunta-api/models';
import AbstractServiceChannelAdapter from './adapters/abstract-service-channel-adapter';
import ElectronicServiceChannelAdapter from './adapters/electronic-service-channel-adapter';
import ServiceChannelAdditionDetailsEditModal from './service-channel-addition-details-edit-modal';

declare var wp: wp;
declare var ajaxurl: string;
const { withSelect } = wp.data;
const { __, sprintf } = wp.i18n;
const locales = ["fi", "sv", "en"];

/**
 * Interface describing component props
 */
interface Props {
  channelId: string,
  channelType: string,
  channel: ElectronicServiceChannel|PhoneServiceChannel|PrintableFormServiceChannel|WebPageServiceChannel|ServiceLocationServiceChannel,
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
  additionalDetailsOpen: boolean
}

/**
 * Service channel edit modal component
 */
class ServiceChannelEditModal extends React.Component<Props, State> {

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);

    const values: any = {};

    if (props.channel) {
      locales.forEach((locale: string) => {
        values[locale] = this.getAdapter().channelToForm(locale, props.channel)
      });
    }

    this.state = {
      locale: "fi",
      saving: false,
      saveError: null,
      additionalDetailsOpen: false,
      values: values,
      additionalValues: props.channel ? this.getAdapter().additionalToForm(props.channel) : {}
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
      const values: any = {};

      locales.forEach((locale: string) => {
        values[locale] = this.getAdapter().channelToForm(locale, this.props.channel)
      });

      this.setState({ 
        values: values,
        additionalValues: this.props.channel ? this.getAdapter().additionalToForm(this.props.channel) : {}
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

  private getAdapter(): AbstractServiceChannelAdapter<ElectronicServiceChannel|PhoneServiceChannel|PrintableFormServiceChannel|WebPageServiceChannel|ServiceLocationServiceChannel> {
    switch (this.props.channelType) {
      case "electronic":
        return new ElectronicServiceChannelAdapter();
      case "phone":
      case "printableForm":
      case "webpage":
      case "serviceLocation":
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
    $metaform.on("click", ".edit-additional-details", this.onEditAdditionalDetailsClick.bind(this));
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
    const data = adapter.applyToChannel(this.state.values, this.state.additionalValues, this.props.channel);

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
		channel: channel || {}
	};
})(ServiceChannelEditModal);