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
  form: string,
  values: any,
  title: string,
  onValuesChange: (values: any) => void,
  afterFormRender: (metaform: Metaform, $metaform: any) => void
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
export default class Metaform extends React.Component<Props, State> {

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

      if (this.props.afterFormRender) {
        this.props.afterFormRender(this, this.$metaform);
      }
    }
  }

  /**
   * Component will unmount life-cycle event
   */
  public componentWillUnmount() {
    if (this.$metaform) {
      this.$metaform.metaform('destroy');
    }
  }

  /**
   * Component render method
   * 
   * @return {JSX.Element[]} dialog
   */
  public render() {
    if (!this.state.json || !this.props.values) {
      return (<wp.components.Spinner />);
    }

    return (
      <div ref="el" style={{ overflow: "scroll", marginTop:"-20px", marginLeft: "0px", marginRight:"0px" }}>
        <div dangerouslySetInnerHTML={{__html: this.renderForm() }}/>
      </div>
    )
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
  public triggerChange() {
    this.props.onValuesChange(this.getValues());
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


  