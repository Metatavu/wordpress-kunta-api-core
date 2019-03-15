import React from 'react';
import { wp } from 'wp';
import Utils from './utils';

const { __ } = wp.i18n;

declare var wp: wp;
declare var ajaxurl: string;

/**
 * Interface describing search input component props
 */
interface Props {
  style: object,
  inputLabel: string,
  inputHelp: string,
  searchAction: string,
  getDisplayName(entity: any): string, 
  onSelect: (entity: any) => void
}

/**
 * Interface describing search input component state
 */
interface State {
  entities: any[], 
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
      entities: [], 
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
    body.append("action", this.props.searchAction);
    body.append("search", Utils.splitSearchTerms(value));

    this.setState({ searching: true });

    apiFetch({ url: ajaxurl, method: "POST", body: body }).then((result: any) => {
      this.setState({ searching: false, entities: result });
    });
  }

  /**
   * Component render method
   */
  render() {
    return (
      <div style={ this.props.style }>
        <wp.components.BaseControl style={{ width: "100%" }} id="search" label={ this.props.inputLabel } help={ this.props.inputHelp }>
          <input id="search" style={{ width: "100%" }} onChange={ this.onInputChange }/>
        </wp.components.BaseControl>
        <div style={{ height: "300px", overflowY: "auto" }}>
        { 
          this.state.searching ? (<wp.components.Placeholder style={{ height: "300px" }}><wp.components.Spinner /></wp.components.Placeholder> ) : this.state.entities.map((entity, index) => {
            return <div 
              onMouseOver={ () => this.setState({ hoverIndex: index }) } 
              onClick = { () => this.props.onSelect(entity) }
              style={{ fontWeight: this.state.hoverIndex == index ? "bold": "normal", cursor: "pointer", paddingTop: "5px", paddingBottom: "5px" }} 
              key={entity.id}>{this.props.getDisplayName(entity)}</div>
          })
        }
        </div>
      </div>
    );
  }

}