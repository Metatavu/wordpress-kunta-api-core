import { wp } from 'wp';
import { PrintableFormServiceChannel } from '../kunta-api/models';
import AbstractServiceChannelAdapter from './abstract-service-channel-adapter';

declare var wp: wp;

/**
 * Adapter for transforming service data between form and REST forms
 */
export default class PrintableFormServiceChannelAdapter extends AbstractServiceChannelAdapter<PrintableFormServiceChannel> {

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
  public channelToForm(locale: string, channel: PrintableFormServiceChannel): any {
    const deliveryAddress = channel.deliveryAddress || {};

    return {
      name: this.getTypedLocalizedValue(channel.names, locale, 'Name'),
      shortDescription: this.getTypedLocalizedValue(channel.descriptions, locale, 'Summary'),
      description: this.getTypedLocalizedValue(channel.descriptions, locale, 'Description'),
      formIdentifier: this.getLocalizedValue(channel.formIdentifier, locale),
      formReceiver: this.getLocalizedValue(channel.formReceiver, locale),
      addressType: deliveryAddress.subtype,
      streetAddress: this.getLocalizedValue(deliveryAddress.streetAddress, locale),
      postOfficeBox: this.getLocalizedValue(deliveryAddress.postOfficeBox, locale),
      streetNumber: deliveryAddress.streetNumber,
      postalCode: deliveryAddress.postalCode,
      addressAdditionalInformation: this.getLocalizedValue(deliveryAddress.additionalInformations, locale),
      addressAdditionalInformationNoAddress: this.getLocalizedValue(deliveryAddress.additionalInformations, locale),
      channelUrls: this.getLocalizedValues(channel.channelUrls, locale),
      attachments: (channel.attachments || []).filter((attachment) => {
        return attachment.url && attachment.language === locale;
      }),
      supportPhones: this.getLocalizedPhoneNumbers(channel.supportPhones, locale),
      supportEmails: this.getLocalizedEmails(channel.supportEmails, locale),
      publishingStatus: channel.publishingStatus
    };
  }

  /**
   * Extracts additional form data from REST resource
   * 
   * @param channel channel
   * @returns form data
   */ 
  public additionalToForm(channel: PrintableFormServiceChannel): any {
    return {
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
  public applyToChannel(values: any, additionalValues: any, serviceHours: any, channel: PrintableFormServiceChannel): PrintableFormServiceChannel {
    const result: PrintableFormServiceChannel = JSON.parse(JSON.stringify(channel));

    result.names = [];
    result.descriptions = [];
    result.formIdentifier = [];
    result.formReceiver = [];
    result.channelUrls = [];
    result.deliveryAddress = {};
    result.supportPhones = [];
    result.attachments = [];
    result.serviceHours = this.serviceHoursFromForm(serviceHours);

    this.getSupportedLocales().forEach((locale: string) => {
      const localeValues: any = values[locale];
      
      result.publishingStatus = localeValues.publishingStatus || result.publishingStatus;
      
      this.setTypedLocalizedValue(result, 'names', localeValues, 'name', locale, 'Name');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'shortDescription', locale, 'Summary');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'description', locale, 'Description');
      
      this.setLocalizedValue(result, 'formIdentifier', localeValues, 'formIdentifier', locale);
      this.setLocalizedValue(result, 'formReceiver', localeValues, 'formReceiver', locale);
      
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
      
      this.setLocalizedTableValues(result, 'attachments', localeValues, 'attachments', locale, 
        (attachment: any) => {
          return !!attachment.url;
        }, (attachment: any) => {
          return Object.assign(attachment, {
            language: locale,
            type: 'Attachment'
          });
        });
      
      if (localeValues.webPages) {
        result.webPages.push({
          url: localeValues.webPages,
          language: locale
        });
      }
      
      this.setLocalizedTableValues(result, 'channelUrls', localeValues, 'channelUrls', locale, 
        (channelUrl: any) => {
          return !!channelUrl.value;
        }, (channelUrl: any) => {
          return Object.assign(channelUrl, {
            language: locale
          });
        });
        
      const addressType = localeValues.addressType; 
      if (!result.deliveryAddress.subtype) {
        result.deliveryAddress.subtype = addressType;
        result.deliveryAddress.streetNumber = localeValues.streetNumber || result.deliveryAddress.streetNumber;
        result.deliveryAddress.postalCode = localeValues.postalCode || result.deliveryAddress.postalCode;
      }
    
      this.setLocalizedValue(result.deliveryAddress, 'streetAddress', localeValues, 'streetAddress', locale);
      this.setLocalizedValue(result.deliveryAddress, 'postOfficeBox', localeValues, 'postOfficeBox', locale);
      this.setLocalizedValue(result.deliveryAddress, 'additionalInformations', localeValues, addressType === 'NoAddress' ? 'addressAdditionalInformationNoAddress' : 'addressAdditionalInformation', locale);
    });

    result.areaType = additionalValues.areaType;
    result.areas = this.areasFromForm(additionalValues.areaType, additionalValues.areas);

    return result;
  }

}