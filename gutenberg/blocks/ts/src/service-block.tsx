import React from 'react';
import { wp } from 'wp';
import { SearchModal } from './search-modal';

declare var wp: wp;
const { __ } = wp.i18n;

/**
 * Registers block type
 */
wp.blocks.registerBlockType('kunta-api/service', {
  title: __( 'Kunta API Service', 'kunta_api_core' ),
  icon: 'universal-access-alt',
  category: 'layout',

  attributes: {
    serviceId: {
      type: 'string'
    },
    component: {
      type: 'string'
    },
    lang: {
      type: 'string'
    }
  },

  /**
   * Block type edit method 
   */
  edit: wp.compose.withState({ isOpen: false, service: null })((params: any) => {
    const Button = wp.components.Button;
    const attributes = params.attributes;
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

    const componetOptions = components.map((component) => {
      return { label: __(`servicecomponent.${component}`, 'kunta_api_core'), value: component };
    });

    const languageOptions = languages.map((language) => {
      return { label: __(`language.${language}`, 'kunta_api_core'), value: language };
    });

    return (
      <div>
        <div style={{ textAlign: "right" }}>
          <Button className="button" isDefault onClick={ () => params.setState( { isOpen: true } ) }>{__( 'Change service', 'kunta_api_core' )}</Button>
        </div>

        <wp.components.SelectControl 
          label={ __("Component", 'kunta_api_core') }
          value={ attributes.component } 
          options={ componetOptions } 
          onChange={ ( component: any ) => { params.setAttributes({"component": component}) }} />

        <wp.components.SelectControl 
          label={ __("Language", 'kunta_api_core') } 
          value={ attributes.lang } 
          options={ languageOptions } 
          onChange={ ( lang: any ) => { params.setAttributes({"lang": lang}) }} />

        <SearchModal 
          open={ params.isOpen } 
          onSelect={ (data) => { params.setState( { isOpen: false, service: data } ); params.setAttributes({"serviceId": data.id}); } }
          onClose={ () => params.setState( { isOpen: false } )}/> 

        <hr/>
        
        <wp.components.ServerSideRender block="kunta-api/service" attributes={attributes} urlQueryArgs={{preview: true}} />
      </div>
    );
  }),
  
  /**
   * Block type save method 
   */
  save: (): any => {
    return null;
  }

});

