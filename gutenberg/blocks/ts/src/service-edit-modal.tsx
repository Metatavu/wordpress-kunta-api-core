import React from 'react';
import { wp } from 'wp';
import MetaformModal from "./metaform-modal";
import ServiceAdapter from './adapters/service-adapter';

declare var wp: wp;
declare var ajaxurl: string;

const { __ } = wp.i18n;
const locales = ["fi", "sv", "en"];

/**
 * Interface describing component props
 */
interface Props {
  serviceId: string,
  open: boolean,
  onClose: () => void
}

/**
 * Interface describing component state
 */
interface State {
  locale: string,
  service: any,
  values: any
}

/**
 * Service edit modal component
 */
export default class ServiceEditModal extends React.Component<Props, State> {

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      locale: "fi",
      service: null,
      values: {}
    };
  }

  /**
   * Component will mount life-cycle event
   */
  public componentWillMount() {
    this.loadService();
  }

  /**
   * Component render method
   */
  public render() {
    if (!this.props.open) {
      return null;
    }
    
    switch (this.state.locale) {
      case "fi":
        return (<MetaformModal
          locales={ locales }
          locale="fi"
          onLocaleChange={ (locale) => { this.changeLocale(locale) } }
          onValuesChange={ (locale, values) => {this.updateValues(locale, values) } }
          form="service/service"
          values={ this.getValues("fi") } 
          title={ __("Edit service fi", "kunta_api_core") } 
          open={this.props.open} 
          onClose={ this.props.onClose }/>);
      case "sv":
        return (<MetaformModal
          locales={ locales }
          locale="sv"
          onLocaleChange={ (locale) => { this.changeLocale(locale) } }
          onValuesChange={ (locale, values) => {this.updateValues(locale, values) } }
          form="service/service" 
          values={ this.getValues("sv") } 
          title={ __("Edit service sv", "kunta_api_core") } 
          open={this.props.open} 
          onClose={ this.props.onClose }/>);
      case "en":
        return (<MetaformModal
          locales={ locales }
          locale="en"
          onLocaleChange={ (locale) => { this.changeLocale(locale) } }
          onValuesChange={ (locale, values) => {this.updateValues(locale, values) } }
          form="service/service" 
          values={ this.getValues("en") } 
          title={ __("Edit service en", "kunta_api_core") } 
          open={this.props.open} 
          onClose={ this.props.onClose }/>);
      default:
        return null;
    };
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
   * Loads service data
   */
  private loadService() {
    const apiFetch = wp.apiFetch;

    const body = new URLSearchParams();
    body.append("action", "kunta_api_load_service");
    body.append("serviceId", this.props.serviceId);

    apiFetch({ url: ajaxurl, method: "POST", body: body }).then((service: any) => {
      const values: any = {};
      const serviceAdapter = new ServiceAdapter();

      locales.forEach((locale) => {
        values[locale] = serviceAdapter.serviceToForm(locale, service);
      });

      this.setState({ 
        service: service,
        values: values
      });
    });
  }

}


  