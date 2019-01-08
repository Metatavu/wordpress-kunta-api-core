import React from 'react';
import { wp } from 'wp';
import { SearchModal } from './search-modal';

declare var wp: wp;
const { __ } = wp.i18n;

/**
 * Interface describing component props
 */
interface Props {
  serviceId: string,
  component: string,
  lang: string,
  onComponentChange(component: string) : void;
  onLangChange(lang: string) : void;
  onServiceIdChange(serviceId: string): void;
}

/**
 * Interface describing component state
 */
interface State {
  isOpen: boolean,
  serviceId: string,
  component: string,
  lang: string
}

/**
 * Service location block
 */
class ServiceComponent extends React.Component<Props, State> {

  /*
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
      component: this.props.component,
      lang: this.props.lang,
      serviceId: this.props.serviceId
    };
  }

  /**
   * Component did update life-cycle event
   * 
   * @param prevProps previous props
   * @param prevState previous state
   */
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.component !== prevState.component) {
      this.props.onComponentChange(this.state.component);
    }

    if (this.state.lang !== prevState.lang) {
      this.props.onLangChange(this.state.lang);
    }

    if (this.state.serviceId !== prevState.serviceId) {
      this.props.onServiceIdChange(this.state.serviceId);
    }
  }

  /**
   * Component render method
   */
  render() {
    const Button = wp.components.Button;
    const components = [
      "description",
      "userInstruction",
      "languages",
      "electronicServiceChannelIds",
      "phoneServiceChannelIds",
      "printableFormServiceChannelIds",
      "serviceLocationServiceChannelIds",
      "webPageServiceChannelIds",
    ];

    const languages = ["fi", "sv", "en"];

    const componentOptions = components.map((component) => {
      return { label: __(`servicecomponent.${component}`, 'kunta_api_core'), value: component };
    });

    const languageOptions = languages.map((language) => {
      return { label: __(`language.${language}`, 'kunta_api_core'), value: language };
    });

    return (
      <div>
        <div>
          <div style={{ float: "right" }}>
            <Button className="button" isDefault onClick={ () => this.setState( { isOpen: true } ) }>{__( 'Change service', 'kunta_api_core' )}</Button>
          </div> 
          <div style={{ fontSize: "16px"}}>
            <div style={{ float: "left", paddingRight: "5px" }}>{__( 'Current service:', 'kunta_api_core' )}</div> 
            <wp.components.ServerSideRender 
              block="kunta-api/service" 
              attributes={{
                serviceId: this.state.serviceId, 
                lang: this.state.lang,
                component: this.state.component
              }} 
              urlQueryArgs={{displayName: true}} />
          </div>
        </div>

        <wp.components.SelectControl 
          label={ __("Component", 'kunta_api_core') }
          value={ this.state.component } 
          options={ componentOptions } 
          onChange={ ( component: any ) => { 
            this.setState({ component: component });            
          }} />

        <wp.components.SelectControl 
          label={ __("Language", 'kunta_api_core') } 
          value={ this.state.lang }
          options={ languageOptions } 
          onChange={ ( lang: any ) => { 
            this.setState({ lang: lang });            
          }} />

        <SearchModal 
          modalTitle={ __("Search Services", 'kunta_api_core') }
          inputLabel={ __("Search Services", "kunta_api_core") }
          inputHelp={ __("Enter some text to search services", "kunta_api_core") }
          searchAction="kunta_api_search_services"
          open={ this.state.isOpen }
          getDisplayName={ (entity: any) => {
            const names = entity.names || [];
            names.sort((a: any, b: any) => {
              return a.language === 'fi' ? -1 : 1;
            });
          
            return names.length ? names[0].value : null;
          }}
          onSelect={ (data) => { 
            this.setState( { isOpen: false, serviceId: data.id } ); 
          } }
          onClose={ () => this.setState( { isOpen: false } )}/>
        <hr/>
        
        <wp.components.ServerSideRender 
          block="kunta-api/service" 
          attributes={{
            serviceId: this.state.serviceId, 
            lang: this.state.lang,
            component: this.state.component
          }} 
          urlQueryArgs={{preview: true}} />
      </div>
    );
  }
}

export default ServiceComponent;