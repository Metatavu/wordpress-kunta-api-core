import React from 'react';
import { wp } from 'wp';
import ServiceLocationServiceChannelComponent from './service-location-service-channel-component';

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
    },
    serviceLocationPage: {
      type: 'boolean'
    }
  },

  /**
   * Block type edit method 
   */
  edit: ((params: any) => {
    return (
      <ServiceLocationServiceChannelComponent 
        component={params.attributes.component}
        lang={params.attributes.lang}
        channelId={params.attributes.channelId}
        serviceLocationPage={params.attributes.serviceLocationPage}
        onComponentChange={(component: string) => {
          params.setAttributes({"component": component});
        }}
        onLangChange={(lang: string) => {
          params.setAttributes({"lang": lang});
        }}
        onChannelIdChange={(channelId: string) => {
          params.setAttributes({"channelId": channelId});
        }}
        onServiceLocationPageChange={(serviceLocationPage: boolean) => {
          params.setAttributes({"serviceLocationPage": serviceLocationPage});
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

