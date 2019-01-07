import { wp } from 'wp';

declare var wp: wp;
const { registerStore } = wp.data;

/**
 * Actions for kunta-api/service-location-service-channel store
 */
const actions = {
  addChannel(channelId: string) {
    return {
      type: 'ADD_CHANNEL',
      channelId
    };
  },

  removeChannel(channelId: string) {
    return {
      type: 'REMOVE_CHANNEL',
      channelId
    };
  }
};

/**
 * Register kunta-api/service-location-service-channel store
 */
registerStore("kunta-api/service-location-service-channel", {
  reducer: (storeState: { channelIds: string[] } = { channelIds: [] }, action: any) => {
    switch (action.type) {
      case "ADD_CHANNEL":
        return { ...storeState, channelIds: (storeState.channelIds||[]).concat(action.channelId)};
      case "REMOVE_CHANNEL":
        return { ...storeState, channelIds: (storeState.channelIds||[]).filter((channelId) => channelId !== action.channelId)};
    }

    return storeState;
  },

  actions: actions,

  selectors: {
		isChannelPage(storeState: any, channelId: string) {
      return (storeState.channelIds||[]).indexOf(channelId) > -1;
		},
  },

  resolvers: {
		isChannelPage(channelId: string) {
      const serviceLocationPage = wp.data.select("core/editor").getBlocks().filter((block: any) => {
        const attrs = block.attributes;
        return block.name === "kunta-api/service-location-service-channel" && attrs && attrs.channelId == channelId && attrs.serviceLocationPage;
      }).length > 0;

      console.log(serviceLocationPage, channelId);

      if (serviceLocationPage) {
        return actions.addChannel(channelId);
      } else {
        return actions.removeChannel(channelId);
      }
		}
  }
});