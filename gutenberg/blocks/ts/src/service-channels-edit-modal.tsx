import React from 'react';
import { wp } from 'wp';
import Utils from './utils';

declare var wp: wp;
const { withSelect } = wp.data;
const { __ } = wp.i18n;

/**
 * Interface describing component props
 */
interface Props {
  serviceId: string,
  service: any,
  channels: any,
  open: boolean,
  onClose: () => void
}

/**
 * Interface describing component state
 */
interface State {
}

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
    };
  }

  /**
   * Component render method
   */
  public render() {
    if (!this.props.open) {
      return null;
    }

    const channelTypes: any = {
      "electronic":  { 
        title: __("Electronic Service Channels", "kunta_api_core"),
        emptyMessage: __("No attached electronic service channels", "kunta_api_core")
      },
      "phone":  { 
        title: __("Phone Service Channels", "kunta_api_core"),
        emptyMessage: __("No attached phone service channels", "kunta_api_core")
      },
      "printable-form":  { 
        title: __("Printable form Service Channels", "kunta_api_core"),
        emptyMessage: __("No attached printable form service channels", "kunta_api_core")
      },
      "webpage":  { 
        title: __("Web page Service Channels", "kunta_api_core"),
        emptyMessage: __("No attached webpage service channels", "kunta_api_core")
      },
      "service-location":  { 
        title: __("Service Location Service Channels", "kunta_api_core"),
        emptyMessage: __("No attached service location service channels", "kunta_api_core")
      }
    };

    return (
      <wp.components.Modal style={{ minWidth: "60%" }} title={ __("Service channels", "kunta_api_core") } onRequestClose={ () => this.props.onClose() }>
        <wp.components.Panel header={ __("Service Channels", "kunta_api_core") }>
          {
            Object.keys(channelTypes).map((channelType: string) => {
              const details: any = channelTypes[channelType];

              return (
                <wp.components.PanelBody title={ details.title } initialOpen={ true }>
                  <wp.components.PanelRow>
                    {
                      this.props.channels[channelType] 
                        ? this.props.channels[channelType]
                          .filter((channel: any) => channel)
                          .map((channel: any) => {
                            return <div> { Utils.getLocalizedValue(channel.names, "fi") } </div>
                          })
                        : details.emptyMessage
                    }
                  </wp.components.PanelRow>
                </wp.components.PanelBody>
              )
            })
          }
        </wp.components.Panel>
      </wp.components.Modal>
    );
  }
}

export default withSelect((select: any, ownProps: any) => {
  const { getService, getElectronicServiceChannel } = select("kunta-api/data");
  const { serviceId } = ownProps;
  const service = serviceId ? getService(serviceId) : {};
  const electronicServiceChannels = (service.electronicServiceChannelIds || []).map((electronicServiceChannelId: string) => {
    return getElectronicServiceChannel(electronicServiceChannelId);
  });
  
  return {
    service: service,
    channels: {
      electronic: electronicServiceChannels
    }
	};
})(ServiceChannelsEditModal);