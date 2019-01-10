import React from 'react';
import { wp } from 'wp';
import MetaformModal from "./metaform-modal";
import Metaform from './metaform';

declare var wp: wp;
declare var ajaxurl: string;
declare var jQuery: any;
const { withSelect } = wp.data;
const { __ } = wp.i18n;

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
  values: any
}

/**
 * Service edit modal component
 */
class ServiceAdditionDetailsEditModal extends React.Component<Props, State> {

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      values: {}
    };
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
        onValuesChange={ (locale, values) => { this.updateValues(values) } }
        form="service/additionaldetails" 
        values={ this.getValues() } 
        title={ __(`Service details`, "kunta_api_core") } 
        open={ this.props.open } 
        onSave={ () => { } }
        onClose={ () => { this.props.onClose(); } }
        afterFormRender= { (metaform: Metaform, $metaform: any) => { this.afterFormRender(metaform, $metaform) } }/>
    );
  }

  /**
   * Event run after the form is rendered
   * 
   * @param $metaform metaform
   */
  private async afterFormRender(metaform: Metaform, $metaform: any) {
    this.createServiceProducersAutocomplete(metaform, $metaform.find('*[data-name="serviceProducersPurchaseServices"]'), (this.state.values.serviceProducersPurchaseServices || '').split(",").filter((value:string) => !!value));
    this.createServiceProducersAutocomplete(metaform, $metaform.find('*[data-name="serviceProducersOthers"]'), (this.state.values.serviceProducersOthers || '').split(",").filter((value:string) => !!value));
  } 

  /**
   * Creates autocomplete field for selecting service producers 
   * 
   * @param element autocomplete element
   * @param organizationItems organizationItem to be loaded
   */
  private async createServiceProducersAutocomplete(metaform: Metaform, element: any, organizationIds: any[]) {
    const values = await Promise.all(organizationIds.map(async (organizationId: string) => {
      const organization = await this.findOrganization(organizationId);
      return {
        value: organization.id,
        label: this.getLocalizedValue(organization.names, 'fi')
      };
    }));

    element
      .metaformMultivalueAutocomplete('val', values, false) 
      .metaformMultivalueAutocomplete("option", 'onchange', () => {
        metaform.triggerChange();
      })
      .autocomplete("option", "open", () => {
        jQuery('.ui-autocomplete').css('z-index', 999999);
      })
      .metaformMultivalueAutocomplete('option', 'customSource', (input: any, callback: any) => {
        const search = this.splitSearchTerms(input.term);
        if (!search) {
          callback([]);
          return;
        }
        
        this.searchOrganizations(search).then((organizations) => {
          callback(organizations.map((organization: any) => {
            return {
              value: organization.id,
              label: this.getLocalizedValue(organization.names, 'fi')
            };
          }));
        })
        .catch((err: any) => {
          // TODO: Proper error handling
          alert(err);
        });
      })
      .val('');
  }

  /**
   * Searches organizations
   * 
   * @param search search term
   */
  searchOrganizations(search: string): Promise<any[]> {
    const body = new URLSearchParams();
    body.append("action", "kunta_api_search_organizations");
    body.append("search", this.splitSearchTerms(search));
    return wp.apiFetch({ url: ajaxurl, method: "POST", body: body });
  }

  /**
   * Returns localized value
   * 
   * @param values array containing localized values
   * @param locale Locale
   * @param property property containing value. Defaults to 'value'
   * @returns value
   */
  getLocalizedValue(values: any[], locale: string, property?: string) {
    if (!values) {
      return null;
    }
    
    for (let i = 0; i < values.length; i++) {
      if (locale === values[i].language) {
        return values[i][property || 'value'];
      }
    }
    
    return null;
  }

  /**
   * Splits search into terms
   * 
   * @param search search
   * @return search terms
   */
  splitSearchTerms(search: string) {
    if (!search) {
      return null;
    }

    const searchTerms = search.replace(/\ {1,}/g, ' ').split(' ').map((term: string) => {
      return `+(${term}*)`;
    });

    return searchTerms.join(' ');
  }

  /**
   * Finds an organization by id
   * 
   * @param id organization id
   * @returns promise for organization
   */
  private findOrganization(id: string): Promise<any> {
    const body = new URLSearchParams();
    body.append("action", "kunta_api_find_organization");
    body.append("id", id);
    return wp.apiFetch({ url: ajaxurl, method: "POST", body: body });
  }

  /**
   * Updates form values for locale
   * 
   * @param locale locale
   * @param changedValues changed values
   */
  private updateValues(changedValues: any) {
    this.setState({ values: changedValues });
  }

  /**
   * Returns values
   * 
   * @returns values
   */
  private getValues() {
    return this.state.values;
  }

}

export default withSelect((select: any, ownProps: any) => {
  const { getService } = select("kunta-api/service");
  const { serviceId } = ownProps;
  
  return {
		service: serviceId ? getService(serviceId) : {}
	};
})(ServiceAdditionDetailsEditModal);