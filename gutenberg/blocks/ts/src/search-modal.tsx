import React from 'react';
import { wp } from 'wp';
import { SearchInput } from './search-input';

const { __ } = wp.i18n;

declare var wp: wp;

/**
 * Interface describing search modal component props
 */
interface Props {
  open: boolean,
  modalTitle: string,
  inputLabel: string,
  inputHelp: string,
  searchAction: string,
  onClose: () => void,
  getDisplayName(entity: any): string, 
  onSelect: (service: any) => void
}

/**
 * Interface describing search modal component state
 */
interface State {
  
}

/**
 * Search modal component
 */
export class SearchModal extends React.Component<Props, State> {

  /**
   * Constructor
   * 
   * @param props props
   */
  constructor(props: Props) {
    super(props);
  }

  /**
   * Event handler for handling search input select
   * 
   * @param data selected data
   */
  onSelect(data: any) {
    this.props.onSelect(data);
  }

  /**
   * Component render method
   */
  render() {
    if (!this.props.open) {
      return null;
    }

    return (
      <wp.components.Modal style={{ minWidth: "60%" }} title={ this.props.modalTitle } onRequestClose={ () => this.props.onClose() }>
        <SearchInput inputLabel = { this.props.inputLabel } inputHelp = { this.props.inputHelp } getDisplayName={ this.props.getDisplayName } searchAction={ this.props.searchAction } onSelect={ (data) => this.onSelect(data) } style={{ width: "100%" }}></SearchInput>
      </wp.components.Modal>
    );
  }

}


  