import React from 'react';
import { wp } from 'wp';
import MetaformModal from "./metaform-modal";
import ServiceAdapter from './adapters/service-adapter';

declare var wp: wp;
declare var ajaxurl: string;

const { __, sprintf } = wp.i18n;
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
  values: any,
  saving: boolean,
  saveError: string
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
      values: {},
      saving: false,
      saveError: null
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

    return (
      <MetaformModal
        locales={ locales }
        locale={ this.state.locale }
        onLocaleChange={ (locale) => { this.changeLocale(locale) } }
        onValuesChange={ (locale, values) => { this.updateValues(locale, values) } }
        form="service/service" 
        values={ this.getValues(this.state.locale) } 
        title={ sprintf(__(`Edit service (%s)`, "kunta_api_core"), this.state.locale) } 
        saveError={ this.state.saveError }
        saving={ this.state.saving }
        open={ this.props.open } 
        onSave={ () => { this.saveService() } }
        onClose={ () => { this.setState({saving: false, saveError: null}); this.props.onClose(); } }/>
    );
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

    apiFetch({ url: ajaxurl, method: "POST", body: body })
      .then((service: any) => {
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

  /**
   * Saves the service
   */
  private saveService() {
    const apiFetch = wp.apiFetch;
    this.setState({ 
      saving: true
    });

    const serviceAdapter = new ServiceAdapter();    
    const body = new URLSearchParams();
    body.append("action", "kunta_api_save_service");
    body.append("service", JSON.stringify(serviceAdapter.applyToService(this.state.values, this.state.service)));

    apiFetch({ url: ajaxurl, method: "POST", body: body })
      .then((updatedService: any) => {
        this.setState({
          service: updatedService
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


  