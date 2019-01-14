import { wp } from 'wp';
import { ElectronicServiceChannel } from '../kunta-api/models';
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
      supportPhones: this.getLocalizedPhoneNumbers(channel.supportPhones, locale),
      supportEmails: this.getLocalizedEmails(channel.supportEmails, locale),
      languages: channel.languages,
      attachments: (channel.attachments || []).filter((attachment) => {
        return attachment.url && attachment.language === locale;
      }),
      webPage: this.getLocalizedWebPageUrl(channel.webPages, locale),
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
  public additionalToForm(channel: ElectronicServiceChannel): any {
    return {
      requiresAuthentication: channel.requiresAuthentication,
      requiresSignature: channel.requiresSignature,
      signatureQuantity: channel.signatureQuantity,
      areas: this.getAreaIds(channel.areas || []).join(","),
      areaType: channel.areaType
    };
  }

  /**
   * Applies values from form into REST resource
   * 
   * @param values form values
   * @param additionalValues additional form values
   * @param channel channel
   * @return modified channel
   */ 
  public applyToChannel(values: any, additionalValues: any, channel: ElectronicServiceChannel): ElectronicServiceChannel {
    const result = JSON.parse(JSON.stringify(channel));
      
    result.names = [];
    result.descriptions = [];
    result.webPages = [];
    result.attachments = [];
    result.requiresSignature = false;
    result.requiresAuthentication = false;
    result.supportPhones = [];
    result.supportEmails = [];
    result.attachments = [];

    this.getSupportedLocales().forEach((locale: string) => {
      const localeValues: any = values[locale];
      
      result.publishingStatus = localeValues.publishingStatus || result.publishingStatus;
      
      this.setTypedLocalizedValue(result, 'names', localeValues, 'name', locale, 'Name');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'shortDescription', locale, 'Summary');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'description', locale, 'Description');

      this.setLocalizedTableValues(result, 'supportPhones', localeValues, 'supportPhones', locale, (supportPhone: any) => {
        return !!supportPhone.number;
      }, (supportPhone: any) => {
        return Object.assign({}, supportPhone, {
          language: locale,
          isFinnishServiceNumber: "true" === supportPhone.isFinnishServiceNumber,
          type: "Phone"
        });
      });
      
      this.setLocalizedTableValues(result, 'supportEmails', localeValues, 'supportEmails', locale, (supportEmail: any) => {
        return !!supportEmail.value;
      });
      
      this.setLocalizedWebPages(result, 'webPages', localeValues, 'webPage', locale);
      this.setLocalizedTableValues(result, 'attachments', localeValues, 'attachments', locale, (attachment: any) => {
        return !!attachment.url;
      }, (attachment: any) => {
        return Object.assign(attachment, {
          language: locale,
          type: 'Attachment'
        });
      });
    });

    result.areaType = additionalValues.areaType;
    result.areas = this.areasFromForm(additionalValues.areaType, additionalValues.areas);
    result.requiresAuthentication = this.getFormBooleanValue(additionalValues.requiresAuthentication, result.requiresAuthentication);
    result.requiresSignature = this.getFormBooleanValue(additionalValues.requiresSignature, result.requiresSignature);
    result.signatureQuantity = result.requiresSignature ? additionalValues.signatureQuantity || result.signatureQuantity : 1;
    
    return result;
  }

}