import React from 'react';
import { wp } from 'wp';
import { SearchModal } from './search-modal';
import ServiceLocationPageCheckbox from './service-location-page-checkbox';
import ServiceChannelEditModal from './service-channel-edit-modal';
import { ServiceLocationServiceChannel } from './kunta-api/models';

declare var wp: wp;
declare var kuntaApiBlocks: any;
const { __ } = wp.i18n;
const { withSelect, subscribe } = wp.data;
const { allowEdit } = kuntaApiBlocks;

/**
 * Interface describing component props
 */
interface Props {
  channelId: string,
  channel?: ServiceLocationServiceChannel,
  component: string,
  lang: string,
  serviceLocationPage: boolean,
  onComponentChange(component: string) : void;
  onLangChange(lang: string) : void;
  onChannelIdChange(channelId: string): void;
  onServiceLocationPageChange(serviceLocationPage: boolean): void;
}

/**
 * Interface describing component state
 */
interface State {
  isOpen: boolean,
  channelId: string,
  component: string,
  lang: string,
  serviceLocationPage: boolean,
  isEditOpen: boolean,
  version: number
}

/**
 * Service location block
 */
class ServiceLocationServiceChannelComponent extends React.Component<Props, State> {

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
      channelId: this.props.channelId,
      serviceLocationPage: this.props.serviceLocationPage,
      isEditOpen: false,
      version: 0
    };

    subscribe(() => {
      const { isPageChannel } = wp.data.select("kunta-api/data");
      this.setState({
        serviceLocationPage: isPageChannel(this.state.channelId)
      });
    });
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

    if (this.state.channelId !== prevState.channelId) {
      this.props.onChannelIdChange(this.state.channelId);
    }

    if (this.state.serviceLocationPage !== prevState.serviceLocationPage) {
      this.props.onServiceLocationPageChange(this.state.serviceLocationPage);
    }

    if ((JSON.stringify(this.props.channel || {}) !== JSON.stringify(prevProps.channel || {}))) {
      this.setState({
        version: this.state.version + 1
      });
    }
  }

  /**
   * Component render method
   */
  render() {
    const components = [
      "description",
      "addresses",
      "email",
      "fax",
      "name",
      "phone",
      "phone-charge-info",
      "servicehours",
      "webpages"
    ];
    
    const languages = ["fi", "sv", "en"];

    const componetOptions = components.map((component) => {
      return { label: __(`servicelocationservicechannel.${component}`, 'kunta_api_core'), value: component };
    });

    const languageOptions = languages.map((language) => {
      return { label: __(`language.${language}`, 'kunta_api_core'), value: language };
    });
    
    return (
      <div>
        <div>
          { this.renderChangeButton() }
          { this.renderEditButton() }
          <div style={{ fontSize: "16px"}}>
          <div style={{ float: "left", paddingRight: "5px" }}>{__( 'Current service location:', 'kunta_api_core' )}</div> 
            <wp.components.ServerSideRender 
              block="kunta-api/service-location-service-channel" 
              attributes={{
                channelId: this.state.channelId, 
                lang: this.state.lang,
                component: this.state.component
              }}
              urlQueryArgs={{displayName: true, version: this.state.version }} />
          </div>
        </div>

        <wp.components.SelectControl 
          label={ __("Component", 'kunta_api_core') }
          value={ this.state.component } 
          options={ componetOptions } 
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
          modalTitle={ __("Search Services Locations", 'kunta_api_core') }
          inputLabel={ __("Search Services Locations", "kunta_api_core") }
          inputHelp={ __("Enter some text to search service locations", "kunta_api_core") }
          searchAction="kunta_api_search_service_location_channels"
          open={ this.state.isOpen }
          getDisplayName={ (entity: any) => {
            const names = entity.names || [];
            names.sort((a: any, b: any) => {
              return a.language === 'fi' ? -1 : 1;
            });
          
            return names.length ? names[0].value : null;
          }}
          onSelect={ (data) => { 
            this.setState( { isOpen: false, channelId: data.id } ); 
          } }
          onClose={ () => this.setState( { isOpen: false } )}/> 

        <ServiceLocationPageCheckbox 
          channelId={ this.state.channelId } 
          onChange={ (isChecked: boolean) => { 
            this.setState({ serviceLocationPage: isChecked });
          } }/>
        <hr/>
        
        <ServiceChannelEditModal
          channelId={ this.state.channelId }
          channelType={ "serviceLocation" }
          open={ this.state.isEditOpen }
          onClose={ () => this.setState( { isEditOpen: false } )}/>

        <wp.components.ServerSideRender block="kunta-api/service-location-service-channel" 
          attributes={{
            channelId: this.state.channelId, 
            lang: this.state.lang,
            component: this.state.component
          }} 
          urlQueryArgs={{ preview: true, version: this.state.version }} />
      </div>
    );
  }

  /**
   * Renders change button if needed
   */
  private renderChangeButton() {
    return (
      <div style={{ float: "right" }}>
        <wp.components.Button className="button" isDefault onClick={ () => this.setState( { isOpen: true } ) }>{__( 'Change service location', 'kunta_api_core' )}</wp.components.Button>
      </div> 

    );
  }

  /**
   * Renders edit button if needed
   */
  private renderEditButton() {
    if (!this.state.channelId || !allowEdit) {
      return null;
    }

    return (
      <div style={{ float: "right" }}>
        <wp.components.Button className="button" style={{ marginRight: "2px" }} isDefault onClick={ () => this.setState( { isEditOpen: true } ) }>{__( 'Edit service location', 'kunta_api_core' )}</wp.components.Button>
      </div> 
    );
  }
}
export default withSelect((select: any, ownProps: any) => {
  const { getServiceChannel } = select("kunta-api/data");
  const { channelId } = ownProps;

  return {
		channel: channelId ? getServiceChannel("serviceLocation", channelId) : {}
	};
})(ServiceLocationServiceChannelComponent);