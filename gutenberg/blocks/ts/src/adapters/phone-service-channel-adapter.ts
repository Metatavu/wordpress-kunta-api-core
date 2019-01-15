import { wp } from 'wp';
import { PhoneServiceChannel } from '../kunta-api/models';
import AbstractServiceChannelAdapter from './abstract-service-channel-adapter';

declare var wp: wp;

/**
 * Adapter for transforming service data between form and REST forms
 */
export default class PhoneServiceChannelAdapter extends AbstractServiceChannelAdapter<PhoneServiceChannel> {

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
  public channelToForm(locale: string, channel: PhoneServiceChannel): any {
    return {
      name: this.getTypedLocalizedValue(channel.names, locale, 'Name'),
      shortDescription: this.getTypedLocalizedValue(channel.descriptions, locale, 'Summary'),
      description: this.getTypedLocalizedValue(channel.descriptions, locale, 'Description'),
      phoneNumbers: this.getLocalizedPhoneNumbers(channel.phoneNumbers, locale),
      supportEmails: this.getLocalizedEmails(channel.supportEmails, locale),
      languages: channel.languages,
      webPages: this.getLocalizedValue(channel.webPages, locale, 'url'),
      serviceHours: null,
      publishingStatus: channel.publishingStatus
    };
  }

  /**
   * Extracts additional form data from REST resource
   * 
   * @param channel channel
   * @returns form data
   */ 
  public additionalToForm(channel: PhoneServiceChannel): any {
    return {
      languages: channel.languages.join(","),
      areas: this.getAreaIds(channel.areas || []).join(","),
      areaType: channel.areaType
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
  public applyToChannel(values: any, additionalValues: any, serviceHours: any, channel: PhoneServiceChannel): PhoneServiceChannel {
    const result: PhoneServiceChannel = JSON.parse(JSON.stringify(channel));

    result.names = [];
    result.descriptions = [];
    result.phoneNumbers = [];
    result.supportEmails = [];
    result.webPages = [];
    result.serviceHours = this.serviceHoursFromForm(serviceHours);

    this.getSupportedLocales().forEach((locale: string) => {
      const localeValues = values[locale];
      
      result.publishingStatus = localeValues.publishingStatus || result.publishingStatus;
      
      this.setTypedLocalizedValue(result, 'names', localeValues, 'name', locale, 'Name');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'shortDescription', locale, 'Summary');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'description', locale, 'Description');

      this.setLocalizedTableValues(result, 'phoneNumbers', localeValues, 'phoneNumbers', locale, 
        (phoneNumber: any) => {
          return !!phoneNumber.number;
        }, (phoneNumber: any) => {
          return Object.assign({}, phoneNumber, {
            language: locale,
            isFinnishServiceNumber: "true" === phoneNumber.isFinnishServiceNumber
          });
        });
      
      this.setLocalizedTableValues(result, 'supportEmails', localeValues, 'supportEmails', locale, 
        (supportEmail: any) => {
          return !!supportEmail.value;
        });
      
      if (localeValues.webPages) {
        result.webPages.push({
          url: localeValues.webPages,
          language: locale
        });
      } 
    });

    result.areaType = additionalValues.areaType;
    result.areas = this.areasFromForm(additionalValues.areaType, additionalValues.areas);
    result.languages = additionalValues.languages.split(",");

    return result;
  }

}