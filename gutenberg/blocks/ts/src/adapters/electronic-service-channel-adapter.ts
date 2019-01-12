import { wp } from 'wp';
import Utils from "../utils";
import ServiceChannelIds from '../service-channel-ids';
import { Service, ServiceOrganization, Area, Municipality, ElectronicServiceChannel } from '../kunta-api/models';
import AbstractServiceChannelAdapter from './abstract-service-channel-adapter';

declare var wp: wp;

/**
 * Adapter for transforming service data between form and REST forms
 */
export default class ElectronicServiceChannelAdapter extends AbstractServiceChannelAdapter<ElectronicServiceChannel> {

  /**
   * Constructor
   */
  constructor() {
    super();
  }
  
  /**
   * Extracts form data from REST resource
   * 
   * @param locale locale locale
   * @param channel channel
   * @returns form data
   */ 
  public channelToForm(locale: string, channel: ElectronicServiceChannel): any {
    return {
      name: this.getTypedLocalizedValue(channel.names, locale, 'Name'),
      shortDescription: this.getTypedLocalizedValue(channel.descriptions, locale, 'Summary'),
      description: this.getTypedLocalizedValue(channel.descriptions, locale, 'Description'),
      requiresAuthentication: channel.requiresAuthentication,
      requiresSignature: channel.requiresSignature,
      signatureQuantity: channel.signatureQuantity,
      supportPhones: this.getLocalizedPhoneNumbers(channel.supportPhones, locale),
      supportEmails: this.getLocalizedEmails(channel.supportEmails, locale),
      url: this.getLocalizedValue(channel.urls, locale),
      languages: channel.languages,
      attachments: (channel.attachments || []).filter((attachment) => {
        return attachment.url && attachment.language === locale;
      }),
      webPages: this.getLocalizedWebPages(channel.webPages, locale),
      serviceHours: null,
      publishingStatus: channel.publishingStatus
    };
  }

}