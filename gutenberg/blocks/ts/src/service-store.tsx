import { wp } from 'wp';

declare var wp: wp;
const { registerStore } = wp.data;
declare var ajaxurl: string;

/**
 * Actions for kunta-api/service store
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
  }
};

/**
 * Register kunta-api/service store
 */
registerStore("kunta-api/service", {

  /**
   * Store reducer
   */
  reducer: (storeState: { services: any } = { services: {} }, action: any) => {
    switch (action.type) {
      case "SET_SERVICE":
        const services = { ... storeState.services };
        services[action.serviceId] = action.service;
        return { ...storeState, services: services };
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
		}
  }
});