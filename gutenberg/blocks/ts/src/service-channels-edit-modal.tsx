import React from 'react';
import { wp } from 'wp';
import { SearchModal } from './search-modal';
import ServiceChannelIds from './service-channel-ids';
import ServiceChannels from './service-channels';

declare var wp: wp;
const { withSelect } = wp.data;
const { __ } = wp.i18n;

/**
 * Interface describing component props
 */
interface Props {
  serviceId: string,
  service: any,
  channels: ServiceChannels,
  channelIds: ServiceChannelIds,
  open: boolean,
  applyValues: (channels: ServiceChannels) => void,
  onClose: () => void
}

/**
 * Interface describing component state
 */
interface State {
  channelAddType: string,
  channelAddOpen: boolean,
  channels: ServiceChannels
}

const channelTypes: { [key: string]: { title: string, emptyMessage: string, searchAction: string }  } = {
  "electronic":  { 
    title: __("Electronic Service Channels", "kunta_api_core"),
    emptyMessage: __("No attached electronic service channels", "kunta_api_core"),
    searchAction: "search_electronic_service_channels"
  },
  "phone":  { 
    title: __("Phone Service Channels", "kunta_api_core"),
    emptyMessage: __("No attached phone service channels", "kunta_api_core"),
    searchAction: "search_phone_service_channels"
  },
  "printableForm":  { 
    title: __("Printable form Service Channels", "kunta_api_core"),
    emptyMessage: __("No attached printable form service channels", "kunta_api_core"),
    searchAction: "search_printable_form_service_channels"
  },
  "webpage":  { 
    title: __("Web page Service Channels", "kunta_api_core"),
    emptyMessage: __("No attached webpage service channels", "kunta_api_core"),
    searchAction: "search_web_page_service_channels" 
  },
  "serviceLocation":  { 
    title: __("Service Location Service Channels", "kunta_api_core"),
    emptyMessage: __("No attached service location service channels", "kunta_api_core"),
    searchAction: "search_service_location_channels"
  }
};

/**
 * Service channels edit modal component
 */
class ServiceChannelsEditModal extends React.Component<Props, State> {

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      channelAddOpen: false,
      channelAddType: null,
      channels: props.channels
    };
  }

  /**
   * Component did update life-cycle event
   * 
   * @param prevProps previous props
   * @param prevState previous state
   */
  componentDidUpdate(prevProps: Props, prevState: State) {
    if ((JSON.stringify(prevProps.channels) !== JSON.stringify(this.props.channels))) {
      this.setState({
        channels: this.props.channels
      });
    }
  }

  /**
   * Component render method
   */
  public render() {
    if (!this.props.open) {
      return null;
    }

    if (this.state.channelAddOpen) {
      return (
        <SearchModal 
          modalTitle={ __("Add Channel", 'kunta_api_core') }
          inputLabel={ __("Search Channel", "kunta_api_core") }
          inputHelp={ __("Enter some text to search service channel", "kunta_api_core") }
          searchAction={ `kunta_api_${this.getChannelAddSearchAction()}` }
          open={ this.state.channelAddOpen }
          getDisplayName={ this.getChannelDisplayName }
          onSelect={ (channel) => { this.onAddChannelSelect(channel); } }
          onClose={ () => this.setState( { channelAddOpen: false } )}/>
      );
    }

    return (
      <wp.components.Modal style={{ minWidth: "60%" }} title={ __("Service channels", "kunta_api_core") } onRequestClose={ () => this.props.onClose() }>
        <wp.components.Panel header={ __("Service Channels", "kunta_api_core") }>
          {
            Object.keys(channelTypes).map((channelType: string) => {
              const details: any = channelTypes[channelType];

              return (
                <wp.components.PanelBody title={ details.title } initialOpen={ true }>
                  { this.renderChannels(channelType) }
                  <wp.components.PanelRow>
                    <wp.components.Button className="button" onClick={ () => { this.setState({ channelAddType: channelType, channelAddOpen: true }) } }>{ __("Add channel", "kunta_api_core") }</wp.components.Button>
                  </wp.components.PanelRow>
                </wp.components.PanelBody>
              )
            })
          }
        </wp.components.Panel>

        <div>
          <wp.components.Button className="button" isDefault onClick={ () => { this.props.applyValues(this.state.channels ); } }>{__( 'Apply changes', 'kunta_api_core' )}</wp.components.Button>
        </div>
      </wp.components.Modal>
    );
  }

  /**
   * Renders channels 
   * 
   * @param channelType channel type
   * @return rendered channels
   */
  private renderChannels(channelType: string): JSX.Element {
    const channels = (this.state.channels as any)[channelType];
    if (!channels || !channels.length) {
      return ( 
        <wp.components.PanelRow>
          <div>{ channelTypes[channelType].emptyMessage } </div>
        </wp.components.PanelRow>
      );
    }

    return (
      channels
        .filter((channel: any) => channel)
        .map((channel: any) => {
          return ( 
            <wp.components.PanelRow>
              <div> { this.getChannelDisplayName(channel) } </div>
            </wp.components.PanelRow>
          )
        })
    );
  }
  
  /**
   * Returns search action for current channel add dialog
   * 
   * @returns search action for current channel add dialog
   */
  private getChannelAddSearchAction(): string {
    return channelTypes[ this.state.channelAddType ].searchAction;
  }

  /**
   * Event triggered when new channel has been selected in add dialog
   * 
   * @param channel channel
   */
  private onAddChannelSelect(channel: any) {
    const channels: ServiceChannels = this.state.channels;

    switch (this.state.channelAddType) {
      case "electronic":
        channels.electronic = channels.electronic.concat(channel);
      break; 
      case "phone":
        channels.phone = channels.phone.concat(channel);
      break; 
      case "printableForm":
        channels.printableForm = channels.printableForm.concat(channel);
      break; 
      case "webpage":
        channels.webpage = channels.webpage.concat(channel);
      break; 
      case "serviceLocation":
        channels.serviceLocation = channels.serviceLocation.concat(channel);
      break; 
    }

    this.setState({
      channels: channels,
      channelAddOpen: false
    });
  }

  /**
   * Returns channel's display name
   * 
   * @param channel channel
   * @return display name
   */
  private getChannelDisplayName(channel: any): string {
    const names = channel.names || [];
    names.sort((a: any, b: any) => {
      return a.language === 'fi' ? -1 : 1;
    });
  
    return names.length ? names[0].value : null;
  }
}

export default withSelect((select: any, ownProps: any) => {
  const { getServiceChannel } = select("kunta-api/data");
  const { channelIds } = ownProps;
  const channels: any = {}; 

  Object.keys(channelTypes).forEach((channelType: string) => {
    channels[channelType] = (channelIds[channelType] || []).map((channelId: string) => {
      return getServiceChannel(channelType, channelId);
    });
  });

  return {
    channels: channels
	};
})(ServiceChannelsEditModal);