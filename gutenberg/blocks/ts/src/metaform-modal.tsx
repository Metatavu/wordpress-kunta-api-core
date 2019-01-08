import React from 'react';
import { wp } from 'wp';

declare var wp: wp;
declare var kuntaApiBlocks: any;
declare var jQuery: any;

const { __ } = wp.i18n;
const { metaformsUrl } = kuntaApiBlocks;

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
  onLocaleChange: (locale: string) => void,
  onValuesChange: (locale: string, values: any) => void,
  onClose: () => void
}

/**
 * Interface describing component state
 */
interface State {
  json: any
}

/**
 * Metaform modal component
 */
export default class MetaformModal extends React.Component<Props, State> {

  $metaform: any;

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);

    this.$metaform = null;

    this.state = {
      json: null
    };

  }
  
  /**
   * Component will mount life-cycle event
   */
  public componentWillMount() {
    this.loadForm().then((json) => {
      this.setState({
        json: json
      });
    });
  }

  /**
   * Component did update life-cycle event
   * 
   * @param prevProps previous props
   * @param prevState previous state
   */
  public componentDidUpdate(prevProps: Props, prevState: State) {
    if ((JSON.stringify(this.state.json) !== JSON.stringify(prevState.json)) || (this.props.values !== prevProps.values)) {
      if (this.$metaform) {
        this.$metaform.metaform('destroy');
      }

      this.$metaform = jQuery(this.refs.el).find('form.metaform')
        .metaform()
        .on("change", "input,select,textarea", this.onMetaformChange.bind(this));
    }
  }

  /**
   * Component will unmount life-cycle event
   */
  public componentWillUnmount() {
    this.$metaform.metaform('destroy');
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
      <wp.components.Modal style={{ minWidth: "60%" }} title={ this.props.title } onRequestClose={ () => { this.triggerChange(); this.props.onClose() } }>
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
    if (!this.state.json || !this.props.values) {
      return (<wp.components.Spinner />);
    }

    return (
      <div style={{ position: "relative" }}>
        <div style={{ whiteSpace: "nowrap", position: "absolute", top: "0px", paddingTop: "10px", paddingBottom: "5px", width: "150px", right: "0px", height: "25px", background: "#fff", textAlign: "right", zIndex: 1 }}>
          { this.renderLocales() }
        </div>
        <div ref="el" style={{ maxHeight: "calc(80vh - 120px)", overflow: "scroll", marginTop:"-20px", marginLeft: "0px", marginRight:"0px" }}>
          <div style={{ paddingBottom: "10px" }} dangerouslySetInnerHTML={{__html: this.renderForm() }}/>
        </div>
        <div style={{ position: "absolute", bottom: "0px", left: "0px", right: "0px", height: "25px", paddingTop: "5px", background: "#fff", zIndex: 1 }}>
          <button onClick={ () => { this.triggerChange(); this.props.onClose(); }}> { __("Save", "kunta_api_core") } </button>
          <button style={{ marginLeft: "3px" }} onClick={ () => { this.triggerChange(); this.props.onClose(); }}> { __("Cancel", "kunta_api_core") } </button>
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
      return <button style={{ marginLeft: "3px" }} onClick={ () => { this.triggerChange(); this.props.onLocaleChange(locale) }}> { locale } </button>
    })
  }

  /**
   * Renders form as HTML string
   * 
   * @return {string} form as HTML string
   */
  private renderForm(): string {
    return mfRender({
      viewModel: this.state.json,
      formValues: this.props.values
    });
  }

  /**
   * Returns Metaform values
   * 
   * @return {Object} values
   */
  private getValues(): any {
    const formValues: any = {};
    
    this.$metaform.metaform('val', true).forEach((value: { name: string, value: any }) => {
      formValues[value.name] = value.value;
    });
    
    return formValues;
  }

  /**
   * Event that is triggered when Metaform input changes
   * 
   * @param event event
   */
  private onMetaformChange(event: any) {
    this.triggerChange();
  }

  /**
   * Trigger value change
   */
  private triggerChange() {
    this.props.onValuesChange(this.props.locale, this.getValues());
  }

  /**
   * Loads Metaform JSON
   * 
   * @return {Promise<any>} promise for Metaform JSON
   */
  private async loadForm(): Promise<any> {
    const apiFetch = wp.apiFetch;
    return apiFetch({ url: `${metaformsUrl}/${this.props.form}.json` });
  }

}


  