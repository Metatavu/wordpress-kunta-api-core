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
   * @param channelType channel type
   * @param channelId channel id
   * @param channel channel
   */
  setServiceChannel(channelType: string, channelId: string, channel: any) {
    return {
      type: 'SET_SERVICE_CHANNEL',
      channelType,
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

interface ServiceChannelMap { 
  [ channelId : string]: any
}

interface ServiceChannelTypeMap { 
  electronic: ServiceChannelMap,
  phone: ServiceChannelMap,
  printableForm: ServiceChannelMap,
  webpage: ServiceChannelMap,
  serviceLocation: ServiceChannelMap
}

interface StateStore {
  services: { [s: string]: any },
  pageChannelIds: string[],
  serviceChannelTypeMap: ServiceChannelTypeMap
}

/**
 * Register kunta-api/data store
 */
registerStore("kunta-api/data", {

  /**
   * Store reducer
   */
  reducer: (storeState: StateStore = { services: {}, pageChannelIds: [], serviceChannelTypeMap: { electronic: {}, phone: {}, printableForm: {}, webpage: {}, serviceLocation: {} } }, action: any) => {
    switch (action.type) {
      case "SET_SERVICE":
        const services = { ... storeState.services };
        services[action.serviceId] = action.service;
        return { ...storeState, services: services };
      case "SET_SERVICE_CHANNEL":
        const serviceChannelTypeMap: ServiceChannelTypeMap = { ... storeState.serviceChannelTypeMap };
        const serviceChannelMap: ServiceChannelMap = (serviceChannelTypeMap as any)[action.channelType];
        serviceChannelMap[action.channelId] = action.channel;
        return { ...storeState, serviceChannelTypeMap: serviceChannelTypeMap };
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
    getServiceChannel(storeState: any, channelType: string, channelId: string) {
      return storeState.serviceChannelTypeMap[channelType][channelId];
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
     * @param channelType channel type
     * @param channelId channel id
     * @returns channel setter action
     */
		async getServiceChannel(channelType: string, channelId: string) {
      return actions.setServiceChannel(channelType, channelId, await Utils.findServiceChannel(channelType, channelId));
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