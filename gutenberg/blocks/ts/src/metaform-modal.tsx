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
  locales: string[],
  locale: string,
  saving: boolean,
  saveError: string,
  onLocaleChange: (locale: string) => void,
  onValuesChange: (locale: string, values: any) => void,
  onClose: () => void,
  onSave: () => void
}

/**
 * Interface describing component state
 */
interface State {
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
    this.state = { };
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
      <wp.components.Modal style={{ minWidth: "60%" }} title={ this.props.title } onRequestClose={ () => { this.props.onClose() } }>
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
      return (<wp.components.Spinner />);
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
        <div style={{ whiteSpace: "nowrap", position: "absolute", top: "0px", paddingTop: "10px", paddingBottom: "5px", width: "150px", right: "0px", height: "25px", background: "#fff", textAlign: "right", zIndex: 1 }}>
          { this.renderLocales() }
        </div>

        <Metaform title={ this.props.title } form={ this.props.form } values={ this.props.values } onValuesChange={ (values: any) => this.props.onValuesChange(this.props.locale, values ) } />

        <div style={{ position: "absolute", bottom: "0px", left: "0px", right: "0px", height: "25px", paddingTop: "5px", background: "#fff", zIndex: 1 }}>
          <button onClick={ () => { this.props.onSave(); }}> { __("Save", "kunta_api_core") } </button>
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

  private close() {

  }

}


  