import React from 'react';
import { wp } from 'wp';
import MetaformModal from "./metaform-modal";
import Metaform from './metaform';
import Utils from './utils';

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
  open: boolean,
  values: any,
  applyValues: (values: any) => void,
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
      values: props.values
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
        onSave={ () => { this.props.applyValues(this.state.values) } }
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
    this.createLanguagesAutocomplete($metaform.find('*[data-name="languages"]'), (this.state.values.languages || '').split(","));
    this.createAreasAutocomplete($metaform.find('*[data-name="areas"]'), (this.state.values.areas || '').split(","));
    this.createServiceProducersAutocomplete(metaform, $metaform.find('*[data-name="serviceProducersPurchaseServices"]'), (this.state.values.serviceProducersPurchaseServices || '').split(",").filter((value:string) => !!value));
    this.createServiceProducersAutocomplete(metaform, $metaform.find('*[data-name="serviceProducersOthers"]'), (this.state.values.serviceProducersOthers || '').split(",").filter((value:string) => !!value));
  }

  /**
   * Creates autocomplete field for selecting areas
   * 
   * @param element autocomplete element
   * @param areas area codes
   */
  async createAreasAutocomplete(element: any, areaIds: string[]) {
    element.val("");
    const areas = await Utils.loadAreas(areaIds);
    
    const values = areas.map((area: any) => {
      const areaCode: string = `${area.type}:${area.code}`;
      
      if (area.type == "Municipality") {
        return {
          value: areaCode,
          label: Utils.getMunicipalityNameWithType(area)
        };
      } else {
        return {
          value: areaCode,
          label: Utils.getCodeNameWithType(area)
        };
      }
    });

    element
      .autocomplete("option", "open", () => {
        jQuery('.ui-autocomplete').css('z-index', 999999);
      })
      .metaformMultivalueAutocomplete('val', values, false)
      .metaformMultivalueAutocomplete('option', 'customSource', (input: any, callback: any) => {
        Utils.searchCodes("Municipality,Province,HospitalRegions,BusinessRegions", input.term + '*')
          .then((codes) => {
            callback(codes.map((areaCode: any) => {
              return {
                value: `${areaCode.type}:${areaCode.code}`,
                label: Utils.getCodeNameWithType(areaCode)
              };
            }));
          })
          .catch((err) => {
            // TODO: Proper error handling
            alert(err);
          });
      });
  }

  /**
   * Creates autocomplete field for selecting languages
   * 
   * @param element autocomplete element
   * @param languageCodes language codes
   */
  private async createLanguagesAutocomplete(element: any, languages: string[]) {
    element.val("");
    const values = await this.loadLanguageCodes(languages);

    element
      .autocomplete("option", "open", () => {
        jQuery('.ui-autocomplete').css('z-index', 999999);
      })
      .metaformMultivalueAutocomplete('val', values, false)
      .metaformMultivalueAutocomplete('option', 'customSource', (input: any, callback: any) => {
        Utils.searchCodes("Language", input.term + '*')
          .then((codes: any[]) => {
            callback(codes.map((codeItem: any) => {
              return {
                value: codeItem.code,
                label: Utils.getLocalizedValue(codeItem.names, 'fi')
              };
            }));
          })
          .catch((err: any) => {
            // TODO: Proper error handling
            alert(err);
          });
      });
  }

  /**
   * Creates autocomplete field for selecting service producers 
   * 
   * @param element autocomplete element
   * @param organizationItems organizationItem to be loaded
   */
  private async createServiceProducersAutocomplete(metaform: Metaform, element: any, organizationIds: any[]) {
    element.val('');

    const values = await Promise.all(organizationIds.map(async (organizationId: string) => {
      const organization = await Utils.findOrganization(organizationId);
      return {
        value: organization.id,
        label: Utils.getLocalizedValue(organization.names, 'fi')
      };
    }));

    element
      .autocomplete("option", "open", () => {
        jQuery('.ui-autocomplete').css('z-index', 999999);
      })
      .metaformMultivalueAutocomplete('val', values, false) 
      .metaformMultivalueAutocomplete("option", 'onchange', () => {
        metaform.triggerChange();
      })
      .metaformMultivalueAutocomplete('option', 'customSource', (input: any, callback: any) => {
        const search = Utils.splitSearchTerms(input.term);
        if (!search) {
          callback([]);
          return;
        }
        
        Utils.searchOrganizations(search).then((organizations) => {
          callback(organizations.map((organization: any) => {
            return {
              value: organization.id,
              label: Utils.getLocalizedValue(organization.names, 'fi')
            };
          }));
        })
        .catch((err: any) => {
          // TODO: Proper error handling
          alert(err);
        });
      });
  }

  /**
   * Translates language list to be suitable for form
   * 
   * @param languages language codes
   * @returns Promise for language items
   */

  private async loadLanguageCodes(languages: string[]): Promise<any> {
    const languageQuery = languages.map((language) => {
      return `code:${language}`;
    }).join(' ');

    const languageQueryResult = await Utils.searchCodes("Language", `+(${languageQuery})`);
    
    const languageMap: any = {};
    languageQueryResult.forEach((queryResult: any) => {
      languageMap[queryResult.code] = Utils.getLocalizedValue(queryResult.names, 'fi');
    });
    
    return languages.map((language) => {
      return {
        value: language,
        label: languageMap[language] || language
      };
    });
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