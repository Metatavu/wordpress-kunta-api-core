import React from 'react';
import { wp } from 'wp';
import { SearchModal } from './search-modal';

declare var wp: wp;
const { __ } = wp.i18n;

/**
 * Registers block type
 */
wp.blocks.registerBlockType('kunta-api/service-location-service-channel', {
  title: __( 'Kunta API Service Location', 'kunta_api_core' ),
  icon: <svg aria-hidden="true" width="0.79em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1408 1792"><path d="M1344 0q26 0 45 19t19 45v1664q0 26-19 45t-45 19H64q-26 0-45-19t-19-45V64q0-26 19-45T64 0h1280zM512 288v64q0 14 9 23t23 9h64q14 0 23-9t9-23v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23zm0 256v64q0 14 9 23t23 9h64q14 0 23-9t9-23v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23zm0 256v64q0 14 9 23t23 9h64q14 0 23-9t9-23v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23zm0 256v64q0 14 9 23t23 9h64q14 0 23-9t9-23v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23zm-128 320v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm512 1280v-192q0-14-9-23t-23-9H544q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-512v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 1024v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23z" fill="#626262"/></svg>,
  category: 'layout',

  attributes: {
    channelId: {
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
      "adresses",
      "description",
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
          <div style={{ float: "right" }}>
            <Button className="button" isDefault onClick={ () => params.setState( { isOpen: true } ) }>{__( 'Change service location', 'kunta_api_core' )}</Button>
          </div> 
          <div style={{ fontSize: "16px"}}>
          <div style={{ float: "left", paddingRight: "5px" }}>{__( 'Current service location:', 'kunta_api_core' )}</div> 
            <wp.components.ServerSideRender block="kunta-api/service-location-service-channel" attributes={attributes} urlQueryArgs={{displayName: true}} />
          </div>
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
          modalTitle={ __("Search Services Locations", 'kunta_api_core') }
          inputLabel={ __("Search Services Locations", "kunta_api_core") }
          inputHelp={ __("Enter some text to search service locations", "kunta_api_core") }
          searchAction="kunta_api_search_service_location_channels"
          open={ params.isOpen }
          getDisplayName={ (entity: any) => {
            const names = entity.names || [];
            names.sort((a: any, b: any) => {
              return a.language === 'fi' ? -1 : 1;
            });
          
            return names.length ? names[0].value : null;
          }}
          onSelect={ (data) => { params.setState( { isOpen: false, service: data } ); params.setAttributes({"channelId": data.id}); } }
          onClose={ () => params.setState( { isOpen: false } )}/> 
        <hr/>
        
        <wp.components.ServerSideRender block="kunta-api/service-location-service-channel" attributes={attributes} urlQueryArgs={{preview: true}} />
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

