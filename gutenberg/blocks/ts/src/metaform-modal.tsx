import React from 'react';
import { wp } from 'wp';
import Metaform from './metaform';

declare var wp: wp;

const { __ } = wp.i18n;

/**
 * Interface describing component props
 */
interface Props {
  open: boolean,
  form: string,
  values: any,
  title: string,
  saveButtonText: string,
  locales?: string[],
  locale?: string,
  saving?: boolean,
  saveError?: string,
  afterFormRender?: (metaform: Metaform, $metaform: any) => void,
  onLocaleChange?: (locale: string) => void,
  onValuesChange: (locale: string, values: any) => void,
  onClose: () => void,
  onSave: () => void
}


/**
 * Interface describing component state
 */
interface State {
  formValid: boolean
}

/**
 * Metaform modal component
 */
export default class MetaformModal extends React.Component<Props, State> {

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);
    this.state = { 
      formValid: false
    };
  }

  /**
   * Component render method
   * 
   * @return {JSX.Element[]} dialog
   */
  public render() {
    if (!this.props.open) {
      return null;
    }

    return (
      <wp.components.Modal shouldCloseOnClickOutside={ false } style={{ minWidth: "60%" }} title={ this.props.title } onRequestClose={ () => { this.props.onClose() } }>
        { this.renderContent() }
      </wp.components.Modal>
    );
  }

  /**
   * Renders contents
   * 
   * @return {JSX.Element[]} contents
   */
  private renderContent() {
    if (!this.props.values) {
      return (<wp.components.Placeholder style={{ height: "300px" }}><wp.components.Spinner /></wp.components.Placeholder>);
    }

    if (this.props.saveError) {
      return (
        <wp.components.Notice status="error" isDismissible={ false }>
          <p>An error occurred: <code>{ this.props.saveError }</code>.</p>
        </wp.components.Notice>
      );
    }

    if (this.props.saving) {
      return (<wp.components.Placeholder style={{ height: "300px" }}><wp.components.Spinner /></wp.components.Placeholder> );
    }

    return (
      <div style={{ position: "relative" }}>
        { !this.props.locales ? null : <div style={{ whiteSpace: "nowrap", position: "absolute", top: "0px", paddingTop: "10px", paddingBottom: "5px", width: "150px", right: "0px", height: "25px", background: "#fff", textAlign: "right", zIndex: 1 }}>{ this.renderLocales() }</div> }
        
        <Metaform 
          title={ this.props.title } 
          form={ this.props.form } 
          values={ this.props.values } 
          valid={this.state.formValid }
          onValidityChage={ (valid: boolean) => { this.onValidityChage(valid); } }
          onValuesChange={ (values: any) => { this.onValuesChange(values) } } 
          afterFormRender={ this.props.afterFormRender }/>

        <div style={{ position: "absolute", bottom: "0px", left: "0px", right: "0px", height: "25px", paddingTop: "5px", background: "#fff", zIndex: 1 }}>
          <button disabled={ !this.state.formValid } onClick={ () => { this.props.onSave(); }}> { this.props.saveButtonText } </button>
          <button style={{ marginLeft: "3px" }} onClick={ () => { this.props.onClose(); }}> { __("Cancel", "kunta_api_core") } </button>
        </div>
      </div>
    )
  }

  /**
   * Renders locale change buttons
   * 
   * @return {JSX.Element[]} locale buttons
   */
  private renderLocales(): JSX.Element[] {
    return this.props.locales.map((locale) => {
      return <button style={{ marginLeft: "3px" }} onClick={ () => { this.props.onLocaleChange(locale) }}> { locale } </button>
    })
  }

  /**
   * Event handler for form validity change
   * 
   * @param valid is form valid
   */
  private onValidityChage(valid: boolean) {
    this.setState({
      formValid: valid
    });
  }

  /**
   * Event triggered when form values change
   * 
   * @param values values
   */
  private onValuesChange(values: any) {
    if (this.props.onValuesChange) {
      this.props.onValuesChange(this.props.locale, values);
    }
  }

}


  