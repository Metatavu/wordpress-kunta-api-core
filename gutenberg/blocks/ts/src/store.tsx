import { wp } from 'wp';
import Utils from './utils';

declare var wp: wp;
const { registerStore } = wp.data;
declare var ajaxurl: string;

/**
 * Actions for kunta-api/data store
 */
const actions = {

  /**
   * Setter action for service
   * 
   * @param serviceId service id
   * @param service service
   */
  setService(serviceId: string, service: any) {
    return {
      type: 'SET_SERVICE',
      serviceId,
      service
    };
  },

  /**
   * Setter action for electronic service channel
   * 
   * @param channelId channel id
   * @param channel channel
   */
  setElectronicServiceChannel(channelId: string, channel: any) {
    return {
      type: 'SET_ELECTRONIC_SERVICE_CHANNEL',
      channelId,
      channel
    };
  },
  
  /**
   * Setter action for phone service channel
   * 
   * @param channelId channel id
   * @param channel channel
   */
  setPhoneServiceChannel(channelId: string, channel: any) {
    return {
      type: 'SET_PHONE_SERVICE_CHANNEL',
      channelId,
      channel
    };
  },
  
  /**
   * Setter action for printable form service channel
   * 
   * @param channelId channel id
   * @param channel channel
   */
  setPrintableFormServiceChannel(channelId: string, channel: any) {
    return {
      type: 'SET_PRINTABLE_FORM_SERVICE_CHANNEL',
      channelId,
      channel
    };
  },
  
  /**
   * Setter action for webpage service channel
   * 
   * @param channelId channel id
   * @param channel channel
   */
  setWebpageServiceChannel(channelId: string, channel: any) {
    return {
      type: 'SET_WEBPAGE_SERVICE_CHANNEL',
      channelId,
      channel
    };
  },

  /**
   * Setter action for service location service channel
   * 
   * @param channelId channel id
   * @param channel channel
   */
  setServiceLocationServiceChannel(channelId: string, channel: any) {
    return {
      type: 'SET_SERVICE_LOCATION_SERVICE_CHANNEL',
      channelId,
      channel
    };
  },

  /**
   * Add action for page service id
   * 
   * @param pageChannelId channel id
   */
  addPageChannel(pageChannelId: string) {
    return {
      type: 'ADD_PAGE_CHANNEL',
      pageChannelId
    };
  },

  /**
   * Remove action for page service id
   * 
   * @param pageChannelId channel id
   */
  removePageChannel(pageChannelId: string) {
    return {
      type: 'REMOVE_PAGE_CHANNEL',
      pageChannelId
    };
  }
};

interface StateStore {
  services: { [s: string]: any },
  pageChannelIds: string[],
  electronicServiceChannels: { [s: string]: any },
  phoneServiceChannels: { [s: string]: any },
  printableFormServiceChannels: { [s: string]: any },
  webpageServiceChannels: { [s: string]: any },
  serviceLocationServiceChannels: { [s: string]: any }
}

/**
 * Register kunta-api/data store
 */
registerStore("kunta-api/data", {

  /**
   * Store reducer
   */
  reducer: (storeState: StateStore = { services: {}, pageChannelIds: [], electronicServiceChannels: {}, phoneServiceChannels: {}, printableFormServiceChannels: {}, webpageServiceChannels: {}, serviceLocationServiceChannels: {} }, action: any) => {
    switch (action.type) {
      case "SET_SERVICE":
        const services = { ... storeState.services };
        services[action.serviceId] = action.service;
        return { ...storeState, services: services };
      case "SET_ELECTRONIC_SERVICE_CHANNEL":
        const electronicServiceChannels = { ... storeState.electronicServiceChannels };
        electronicServiceChannels[action.channelId] = action.channel;
        return { ...storeState, electronicServiceChannels: electronicServiceChannels };
      case "SET_PHONE_SERVICE_CHANNEL":
        const phoneServiceChannels = { ... storeState.phoneServiceChannels };
        phoneServiceChannels[action.channelId] = action.channel;
        return { ...storeState, phoneServiceChannels: phoneServiceChannels };
      case "SET_PRINTABLE_FORM_SERVICE_CHANNEL":
        const printableFormServiceChannels = { ... storeState.printableFormServiceChannels };
        printableFormServiceChannels[action.channelId] = action.channel;
        return { ...storeState, printableFormServiceChannels: printableFormServiceChannels };
      case "SET_WEBPAGE_SERVICE_CHANNEL":
        const webpageServiceChannels = { ... storeState.webpageServiceChannels };
        webpageServiceChannels[action.channelId] = action.channel;
        return { ...storeState, webpageServiceChannels: webpageServiceChannels };
      case "SET_SERVICE_LOCATION_SERVICE_CHANNEL":
        const serviceLocationServiceChannels = { ... storeState.serviceLocationServiceChannels };
        serviceLocationServiceChannels[action.channelId] = action.channel;
        return { ...storeState, serviceLocationServiceChannels: serviceLocationServiceChannels };
      case "ADD_PAGE_CHANNEL":
        return { ...storeState, pageChannelIds: (storeState.pageChannelIds||[]).concat(action.pageChannelId)};
      case "REMOVE_PAGE_CHANNEL":
        return { ...storeState, pageChannelIds: (storeState.pageChannelIds||[]).filter((pageChannelId) => pageChannelId !== action.pageChannelId)};
    }
    
    return storeState;
  },

  actions: actions,

  selectors: {
    
    /**
     * Returns service from store by id
     * 
     * @param storeState store state
     * @param serviceId service id
     */
    getService(storeState: any, serviceId: string) {
      return storeState.services[serviceId];
    },

    /**
     * Returns electronic service channel from store by id
     * 
     * @param storeState store state
     * @param serviceId service id
     */
    getElectronicServiceChannel(storeState: any, channelId: string) {
      return storeState.electronicServiceChannels[channelId];
    },

    /**
     * Returns webpage service channel from store by id
     * 
     * @param storeState store state
     * @param serviceId service id
     */
    getWebpageServiceChannel(storeState: any, channelId: string) {
      return storeState.webPageServiceChannels[channelId];
    },

    /**
     * Returns printable form service channel from store by id
     * 
     * @param storeState store state
     * @param serviceId service id
     */
    getPrintableFormServiceChannel(storeState: any, channelId: string) {
      return storeState.printableFormServiceChannels[channelId];
    },

    /**
     * Returns phone service channel from store by id
     * 
     * @param storeState store state
     * @param serviceId service id
     */
    getPhoneServiceChannel(storeState: any, channelId: string) {
      return storeState.phoneServiceChannels[channelId];
    },

    /**
     * Returns service location service channel from store by id
     * 
     * @param storeState store state
     * @param serviceId service id
     */
    getServiceLocationServiceChannel(storeState: any, channelId: string) {
      return storeState.serviceLocationServiceChannels[channelId];
    },

    /**
     * Returns whether channel is page channel or not
     * 
     * @param storeState store state
     * @param pageChannelId service channel id
     */
    isPageChannel(storeState: any, pageChannelId: string) {
      return (storeState.pageChannelIds||[]).indexOf(pageChannelId) > -1;
		}
  },
  
  resolvers: {

    /**
     * Loads initial service into store from server
     * 
     * @param serviceId service id
     * @returns service setter action
     */
		async getService(serviceId: string) {
      const apiFetch = wp.apiFetch;
      const body = new URLSearchParams();
      
      body.append("action", "kunta_api_load_service");
      body.append("serviceId", serviceId);

      const service = await apiFetch({ url: ajaxurl, method: "POST", body: body });
      return actions.setService(serviceId, service);
    },

    /**
     * Loads initial service channel into store from server
     * 
     * @param channelId channel id
     * @returns channel setter action
     */
		async getElectronicServiceChannel(channelId: string) {
      return actions.setElectronicServiceChannel(channelId, await Utils.findServiceChannel("electronic", channelId));
    },

    /**
     * Loads initial service channel into store from server
     * 
     * @param channelId channel id
     * @returns channel setter action
     */
		async getWebpageServiceChannel(channelId: string) {
      return actions.setWebpageServiceChannel(channelId, await Utils.findServiceChannel("webpage", channelId));
    },

    /**
     * Loads initial service channel into store from server
     * 
     * @param channelId channel id
     * @returns channel setter action
     */
		async getPrintableFormServiceChannel(channelId: string) {
      return actions.setPrintableFormServiceChannel(channelId, await Utils.findServiceChannel("printable_form", channelId));
    },

    /**
     * Loads initial service channel into store from server
     * 
     * @param channelId channel id
     * @returns channel setter action
     */
		async getPhoneServiceChannel(channelId: string) {
      return actions.setPhoneServiceChannel(channelId, await Utils.findServiceChannel("phone", channelId));
    },

    /**
     * Loads initial service channel into store from server
     * 
     * @param channelId channel id
     * @returns channel setter action
     */
		async getServiceLocationServiceChannel(channelId: string) {
      return actions.setServiceLocationServiceChannel(channelId, await Utils.findServiceChannel("service_location", channelId));
    },

    /**
     * Returns whether given channel id is marked as a page service or not
     * 
     * @param pageChannelId page channel id
     * @return whether given channel id is marked as a page service or not
     */
    isPageChannel(pageChannelId: string) {
      const serviceLocationPage = wp.data.select("core/editor").getBlocks().filter((block: any) => {
        const attrs = block.attributes;
        return block.name === "kunta-api/service-location-service-channel" && attrs && attrs.pageChannelId == pageChannelId && attrs.serviceLocationPage;
      }).length > 0;

      if (serviceLocationPage) {
        return actions.addPageChannel(pageChannelId);
      } else {
        return actions.removePageChannel(pageChannelId);
      }
		}
  }
});