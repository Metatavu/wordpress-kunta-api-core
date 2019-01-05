import React from 'react';
import { wp } from 'wp';

const { __ } = wp.i18n;

declare var wp: wp;
declare var ajaxurl: string;

/**
 * Interface describing search input component props
 */
interface Props {
  style: object,
  onSelect: (service: any) => void
}

/**
 * Interface describing search input component state
 */
interface State {
  services: any[], 
  searching: boolean,
  hoverIndex: number
}

/**
 * Search input component
 */
export class SearchInput extends React.Component<Props, State> {

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      services: [], 
      searching: false,
      hoverIndex: -1
    };
  }

  /**
   * Event handler for handling use input changes
   * 
   * @param event event
   */
  onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const apiFetch = wp.apiFetch;
    const value = event.currentTarget.value;
    if (this.state.searching || value.length < 3) {
      return;
    }

    const body = new URLSearchParams();
    body.append("action", "kunta_api_search_services");
    body.append("data", value);

    this.setState({ searching: true });

    apiFetch({ url: ajaxurl, method: "POST", body: body }).then((result: any) => {
      this.setState({ searching: false, services: result });
    });
  }

  /**
   * Returns service's display name
   */
  getServiceName = (service: any) => {
    const names = service.names || [];
    names.sort((a: any, b: any) => {
      return a.language === 'fi' ? -1 : 1;
    });
  
    return names.length ? names[0].value : null;
  }

  /**
   * Component render method
   */
  render() {
    return (
      <div style={ this.props.style }>
        <wp.components.BaseControl style={{ width: "100%" }} id="search" label={ __("Search Services", "kunta_api_core") } help={ __("Enter some text to search services", "kunta_api_core") }>
          <input id="search" style={{ width: "100%" }} onChange={ this.onInputChange }/>
        </wp.components.BaseControl>
        <div style={{ height: "300px", overflowY: "auto" }}>
        { 
          this.state.searching ? (<wp.components.Placeholder style={{ height: "300px" }}><wp.components.Spinner /></wp.components.Placeholder> ) : this.state.services.map((service, index) => {
            return <div 
              onMouseOver={ () => this.setState({ hoverIndex: index }) } 
              onClick = { () => this.props.onSelect(service) }
              style={{ fontWeight: this.state.hoverIndex == index ? "bold": "normal", cursor: "pointer", paddingTop: "5px", paddingBottom: "5px" }} 
              key={service.id}>{this.getServiceName(service)}</div>
          })
        }
        </div>
      </div>
    );
  }

}