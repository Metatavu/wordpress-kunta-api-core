import React from 'react';
import { wp } from 'wp';

const { __ } = wp.i18n;

declare var wp: wp;
declare var ajaxurl: string;

/**
 * Interface describing search modal component props
 */
interface Props {
  open: boolean,
  onClose: () => void
}

/**
 * Interface describing search modal component state
 */
interface State {
  
}

/**
 * mark location channel modal component
 */
export class MarkLocationChannelModal extends React.Component<Props, State> {

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
    const channelId = this.getChannelId();

    if (!this.props.open || !channelId) {
      return null;
    }

    return (
      <wp.components.Modal style={{ minWidth: "60%" }} title={ __("huuhuuh") } onRequestClose={ () => this.props.onClose() }>
        <div>
          <span>{__( `Do you wish to mark this page as service location for location: XXXXXXX`, 'kunta_api_core' )}</span>
        </div>
        <wp.components.Button className="button" isDefault onClick={ () => this.markPageAsLocationPage(channelId) }>{__( 'Yes', 'kunta_api_core' )}</wp.components.Button>
        <wp.components.Button className="button" onClick={ () => this.props.onClose() }>{__( 'No', 'kunta_api_core' )}</wp.components.Button>
      </wp.components.Modal>
    );
  }

  getChannelId() {
    const channelIds = wp.data.select("core/editor").getBlocks()
      .filter((block: any) => block.name === "kunta-api/service-location-service-channel" && block.attributes && block.attributes.channelId)
      .map((block: any) => block.attributes.channelId);

    return channelIds.length === 1 ? channelIds[0] : null;
  } 

  markPageAsLocationPage(channelId: string) {
    const apiFetch = wp.apiFetch;
    const { getCurrentPostId } = wp.data.select("core/editor");
    const pageId = getCurrentPostId();

    const body = new URLSearchParams();
    body.append("action", "kunta_api_mark_page_as_location_page");
    body.append("pageId", pageId);
    body.append("locationChannelId", channelId);

    this.setState({ searching: true });

    apiFetch({ url: ajaxurl, method: "POST", body: body }).then((result: any) => {
      this.props.onClose();
    });
  }

  

}


  