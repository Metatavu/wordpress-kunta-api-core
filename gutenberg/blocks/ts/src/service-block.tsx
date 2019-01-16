import React from 'react';
import { wp } from 'wp';
import ServiceComponent from './service-component';

declare var wp: wp;
const { __ } = wp.i18n;

/**
 * Registers block type
 * 
 * Icon from https://fontawesome.com/v4.7.0/icon/info
 */
wp.blocks.registerBlockType('kunta-api/service', {
  title: __( 'Kunta API Service', 'kunta_api_core' ),
  icon: <svg aria-hidden="true" width="0.46em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 1408"><path d="M640 1216v128q0 26-19 45t-45 19H64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64V768H64q-26 0-45-19T0 704V576q0-26 19-45t45-19h384q26 0 45 19t19 45v576h64q26 0 45 19t19 45zM512 64v192q0 26-19 45t-45 19H192q-26 0-45-19t-19-45V64q0-26 19-45t45-19h256q26 0 45 19t19 45z" fill="#626262"/></svg>,
  category: 'kunta-api',

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
  edit: ((params: any) => {
    return (
      <ServiceComponent 
        component={params.attributes.component}
        lang={params.attributes.lang}
        serviceId={params.attributes.serviceId}
        onComponentChange={(component: string) => {
          params.setAttributes({"component": component});
        }}
        onLangChange={(lang: string) => {
          params.setAttributes({"lang": lang});
        }}
        onServiceIdChange={(serviceId: string) => {
          params.setAttributes({"serviceId": serviceId});
        }}/>
    );
  }),
  
  /**
   * Block type save method 
   */
  save: (): any => {
    return null;
  }

});

