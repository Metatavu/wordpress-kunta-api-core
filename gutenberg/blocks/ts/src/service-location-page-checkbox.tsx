import React from 'react';
import { wp } from 'wp';

const { withSelect } = wp.data;
const { __ } = wp.i18n;

declare var wp: wp;

/**
 * Interface describing search modal component props
 */
interface Props {
  channelId: string,
  isChecked: boolean,
  onChange: (isChecked: boolean) => void 
}

/**
 * Interface describing search modal component state
 */
interface State {
  
}

/**
 * mark location channel modal component
 */
class ServiceLocationPageCheckbox extends React.Component<Props, State> {

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);
  }

  /**
   * Component render method
   */
  render() {
    return (<wp.components.CheckboxControl 
      label={ __("Service location page", "kunta_api_core") }
      checked={ this.props.isChecked }
      onChange={ ( isChecked: boolean ) => {
        if (isChecked) {
          wp.data.dispatch("kunta-api/service-location-service-channel").addChannel(this.props.channelId);
        } else {
          wp.data.dispatch("kunta-api/service-location-service-channel").removeChannel(this.props.channelId);
        }
    } }/>);
  }
  
}

export default withSelect((select: any, ownProps: any) => {
  const { isChannelPage } = select("kunta-api/service-location-service-channel");
  const { channelId } = ownProps;

  return {
		isChecked: isChannelPage(channelId)
	};
})(ServiceLocationPageCheckbox);