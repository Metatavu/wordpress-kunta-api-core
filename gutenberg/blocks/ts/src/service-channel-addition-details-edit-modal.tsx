import React from 'react';
import { wp } from 'wp';
import MetaformModal from "./metaform-modal";
import Metaform from './metaform';
import Utils from './utils';

declare var wp: wp;
declare var jQuery: any;
const { withSelect } = wp.data;
const { __ } = wp.i18n;

/**
 * Interface describing component props
 */
interface Props {
  channelId: string,
  channelType: string,
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
 * Service channel edit modal component
 */
class ServiceChannelAdditionDetailsEditModal extends React.Component<Props, State> {

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
        form={ `servicechannel/${this.getForm()}` } 
        values={ this.getValues() } 
        title={ __(`Channel details`, "kunta_api_core") }
        saveButtonText={ __("Apply", "kunta_api_core") } 
        open={ this.props.open } 
        onSave={ () => { this.props.applyValues(this.state.values) } }
        onClose={ () => { this.props.onClose(); } }
        afterFormRender= { (metaform: Metaform, $metaform: any) => { this.afterFormRender(metaform, $metaform) } }/>
    );
  }

  /**
   * Returns form for this channel type
   * 
   * @return form for this channel type
   */
  private getForm(): string {
    switch (this.props.channelType) {
      case "electronic":
        return "electronic-additionaldetails";
      case "phone":
        return "phone-additionaldetails";
      case "printableForm":
        return "printable-form-additionaldetails";
      case "webpage":
        return "webpage-additionaldetails";
      case "serviceLocation":
        return "service-location-additionaldetails"; 
    }

    return this.props.channelType;
  }

  /**
   * Event run after the form is rendered
   * 
   * @param $metaform metaform
   */
  private async afterFormRender(metaform: Metaform, $metaform: any) {
    this.createAreasAutocomplete($metaform.find('*[data-name="areas"]'), (this.state.values.areas || '').split(","));
    this.createLanguagesAutocomplete($metaform.find('*[data-name="languages"]'), (this.state.values.languages || '').split(","));
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
    const values = await Utils.loadLanguageCodes(languages);

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
  const { getServiceChannel } = select("kunta-api/data");
  const { channelType, channelId } = ownProps;
  const channel = getServiceChannel(channelType, channelId);
  
  return {
		channel: channel || {}
	};
})(ServiceChannelAdditionDetailsEditModal);