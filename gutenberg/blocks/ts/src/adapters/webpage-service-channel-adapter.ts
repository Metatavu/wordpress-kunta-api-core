import { wp } from 'wp';
import { WebPageServiceChannel } from '../kunta-api/models';
import AbstractServiceChannelAdapter from './abstract-service-channel-adapter';

declare var wp: wp;

/**
 * Adapter for transforming service data between form and REST forms
 */
export default class WebPageServiceChannelAdapter extends AbstractServiceChannelAdapter<WebPageServiceChannel> {

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
  public channelToForm(locale: string, channel: WebPageServiceChannel): any {
    return {
      name: this.getTypedLocalizedValue(channel.names, locale, 'Name'),
      shortDescription: this.getTypedLocalizedValue(channel.descriptions, locale, 'Summary'),
      description: this.getTypedLocalizedValue(channel.descriptions, locale, 'Description'),
      supportPhones: this.getLocalizedPhoneNumbers(channel.supportPhones, locale),
      supportEmails: this.getLocalizedEmails(channel.supportEmails, locale),
      webPage: this.getLocalizedWebPageUrl(channel.webPages, locale),
      languages: channel.languages,
      publishingStatus: channel.publishingStatus
    };
  }

  /**
   * Extracts additional form data from REST resource
   * 
   * @param channel channel
   * @returns form data
   */ 
  public additionalToForm(channel: WebPageServiceChannel): any {
    return {
      languages: channel.languages.join(",")
    };
  }

  /**
   * Applies values from form into REST resource
   * 
   * @param values form values
   * @param additionalValues additional form values
   * @param serviceHours service hours
   * @param channel channel
   * @return modified channel
   */ 
  public applyToChannel(values: any, additionalValues: any, serviceHours: any, channel: WebPageServiceChannel): WebPageServiceChannel {
    const result: WebPageServiceChannel = JSON.parse(JSON.stringify(channel));

    result.names = [];
    result.descriptions = [];
    result.webPages = [];
    result.supportPhones = [];
    result.supportEmails = [];

    this.getSupportedLocales().forEach((locale: string) => {
      const localeValues = values[locale];
      
      result.publishingStatus = localeValues.publishingStatus || result.publishingStatus;
      
      this.setTypedLocalizedValue(result, 'names', localeValues, 'name', locale, 'Name');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'shortDescription', locale, 'Summary');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'description', locale, 'Description');

      this.setLocalizedTableValues(result, 'supportPhones', localeValues, 'supportPhones', locale, 
        (supportPhone: any) => {
          return !!supportPhone.number;
        }, (supportPhone: any) => {
          return Object.assign({}, supportPhone, {
            language: locale,
            isFinnishServiceNumber: "true" === supportPhone.isFinnishServiceNumber,
            type: "Phone"
          });
        });
        
      this.setLocalizedTableValues(result, 'supportEmails', localeValues, 'supportEmails', locale, 
        (supportEmail: any) => {
          return !!supportEmail.value;
        });
      
      this.setLocalizedWebPages(result, 'webPages', localeValues, 'webPage', locale);
    });

    result.languages = additionalValues.languages.split(",");

    return result;
  }

}