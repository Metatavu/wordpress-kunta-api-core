import React from 'react';
import { wp } from 'wp';
import MetaformModal from "./metaform-modal";
import ServiceAdapter from './adapters/service-adapter';
import Metaform from './metaform';
import ServiceAdditionDetailsEditModal from './service-addition-details-edit-modal';

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
  saving: boolean,
  saveError: string,
  additionalDetailsOpen: boolean
}

/**
 * TODO:
 * 
 * shortDescription, description should be at least 5 characters long
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
      values: {},
      saving: false,
      saveError: null,
      additionalDetailsOpen: false
    };
  }

  /**
   * Component did update life-cycle event
   * 
   * @param prevProps previous props
   * @param prevState previous state
   */
  componentDidUpdate(prevProps: Props, prevState: State) {
    if ((JSON.stringify(this.props.service) !== JSON.stringify(prevProps.service))) {
      const serviceAdapter = new ServiceAdapter();

      Promise.all(locales.map((locale) => { return serviceAdapter.serviceToForm(locale, this.props.service); })).then((results) => {
        const values: any = {};

        for (let i = 0; i < locales.length; i++) {
          values[locales[i]] = results[i];
        }

        this.setState({ 
          values: values
        });
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
        <ServiceAdditionDetailsEditModal serviceId={ this.props.serviceId } open = { this.state.additionalDetailsOpen } onClose={ () => { this.setState({additionalDetailsOpen: false }); } }/>
      );
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
        afterFormRender={ (metaform: Metaform, $metaform: any) => this.afterFormRender(metaform, $metaform) }
        onSave={ () => { this.saveService() } }
        onClose={ () => { this.setState({saving: false, saveError: null}); this.props.onClose(); } }/>
    );
  }

  /**
   * Event run after the form is rendered
   * 
   * @param $metaform metaform
   */
  async afterFormRender(metaform: Metaform, $metaform: any) {
    $metaform.on("click", ".edit-additional-details", this.onEditAdditionalDetailsClick.bind(this));
  }

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
    body.append("service", JSON.stringify(serviceAdapter.applyToService(this.state.values, this.props.service)));

    apiFetch({ url: ajaxurl, method: "POST", body: body })
      .then((updatedService: any) => {
        wp.data.dispatch("kunta-api/service").setService(this.props.serviceId, updatedService);

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
  const { getService } = select("kunta-api/service");
  const { serviceId } = ownProps;
  
  return {
		service: serviceId ? getService(serviceId) : {}
	};
})(ServiceEditModal);