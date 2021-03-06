import React from 'react';
import { wp } from 'wp';
import MetaformModal from "./metaform-modal";
import Metaform from './metaform';
import AbstractServiceChannelAdapter from './adapters/abstract-service-channel-adapter';

declare var wp: wp;
const { __ } = wp.i18n;

/**
 * Interface describing component props
 */
interface Props {
  okButtonText: string,
  values: any,
  adapter: AbstractServiceChannelAdapter<any>,
  onOkClick: (serviceHour: any) => void,
  onClose: () => void
}

/**
 * Interface describing component state
 */
interface State {
  values: any
}

/**
 * service hour modal component
 */
export default class ServiceHourModal extends React.Component<Props, State> {

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
    return (
      <MetaformModal
        form={ "general/servicehour" } 
        values={ this.state.values } 
        title={ __(`Service hour`, "kunta_api_core") }
        saveButtonText={ this.props.okButtonText } 
        open={ true } 
        onValuesChange={ (locale: string, values: any) => { this.setState({ values: values }) } }
        onSave={ () => { this.props.onOkClick(this.state.values) } }
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

  }

}