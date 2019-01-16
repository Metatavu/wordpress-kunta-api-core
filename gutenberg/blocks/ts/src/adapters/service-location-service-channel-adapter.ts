import { wp } from 'wp';
import { ServiceLocationServiceChannel } from '../kunta-api/models';
import AbstractServiceChannelAdapter from './abstract-service-channel-adapter';

declare var wp: wp;

/**
 * Adapter for transforming service data between form and REST forms
 */
export default class ServiceLocationServiceChannelAdapter extends AbstractServiceChannelAdapter<ServiceLocationServiceChannel> {

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
  public channelToForm(locale: string, channel: ServiceLocationServiceChannel): any {
    const name = this.getTypedLocalizedValue(channel.names, locale, 'Name');
    const shortDescription = this.getTypedLocalizedValue(channel.descriptions, locale, 'Summary');
    const description = this.getTypedLocalizedValue(channel.descriptions, locale, 'Description');
    const visitAddresses = channel.addresses.filter((address) => {
      return address.subtype !== 'Abroad';
    });
    
    const foreignAddresses = channel.addresses.filter((address) => {
      return address.subtype === 'Abroad';
    });
    
    const addresses = visitAddresses.map((address) => {
      return {
        street: this.getLocalizedValue(address.streetAddress, locale),
        streetNumber: address.streetNumber,
        postOfficeCode: address.postalCode,
        additionalInformation: this.getLocalizedValue(address.additionalInformations, locale) 
      };
    });

    return {
      name: name,
      description: description,
      shortDescription: shortDescription,
      addresses: addresses,
      emails: this.getLocalizedEmails(channel.emails, locale),
      phoneNumbers: this.getLocalizedPhoneNumbers(channel.phoneNumbers, locale, "Phone"),
      faxes: this.getLocalizedPhoneNumbers(channel.phoneNumbers, locale, "Fax"),
      foreignAddresses: foreignAddresses.map((foreignAddress) => {
        return {
          foreign: this.getLocalizedValue(foreignAddress.locationAbroad, locale)
        };
      }),
      webPages: this.getLocalizedWebPages(channel.webPages, locale)
    };
  }

  /**
   * Extracts additional form data from REST resource
   * 
   * @param channel channel
   * @returns form data
   */ 
  public additionalToForm(channel: ServiceLocationServiceChannel): any {
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
  public applyToChannel(values: any, additionalValues: any, serviceHours: any, channel: ServiceLocationServiceChannel): ServiceLocationServiceChannel {
    const result: ServiceLocationServiceChannel = JSON.parse(JSON.stringify(channel));

    result.addresses = [];
    result.descriptions = [];
    result.emails = [];
    result.phoneNumbers = [];
    result.webPages = [];
    result.serviceHours = this.serviceHoursFromForm(serviceHours);

    this.getSupportedLocales().forEach((locale: string) => {
      const localeValues = values[locale];
      this.setTypedLocalizedValue(result, 'names', localeValues, 'name', locale, 'Name');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'shortDescription', locale, 'Summary');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'description', locale, 'Description');
      
      const localeAddresses = localeValues.addresses.filter((address: any) => {
        return !!address.street && !!address.street.trim();
      });

      localeAddresses.forEach((localeAddress: any, addressIndex: number) => {
        let address;
        if (result.addresses.length - 1 < addressIndex) {
          address = {
            additionalInformations: [],
            streetAddress: [],
            subtype: 'Single',
            type: 'Location',
            country: 'FI'
          };
          
          result.addresses.push(address);
        } else {
          address = result.addresses[addressIndex];
        }
        
        if (localeAddress.additionalInformation) {
          localeAddress.additionalInformation = localeAddress.additionalInformation.trim();
        }
        
        if (localeAddress.additionalInformation) {
          address.additionalInformations.push({
            "language": locale,
            "value": localeAddress.additionalInformation
          });
        }
      
        address.streetAddress.push({
          "language": locale,
          "value": localeAddress.street
        });
        
        address.postalCode = localeAddress.postOfficeCode;
        address.streetNumber = localeAddress.streetNumber;
      });
      
      const foreignAddresses = localeValues.foreignAddresses.filter((address: any) => {
        return !!address.foreign;
      });
      
      foreignAddresses.forEach((foreignAddress: any, foreignAddressIndex: number) => {
        const addressIndex = localeAddresses.length + foreignAddressIndex;
        
        let address;
        if (result.addresses.length - 1 < addressIndex) {
          address = {
            subtype: 'Abroad',
            type: 'Location',
            locationAbroad: []
          };            
          result.addresses.push(address);
        } else {
          address = result.addresses[addressIndex];
        }
        
        address.locationAbroad.push({
          "language": locale,
          "value": foreignAddress.foreign
        });
      });

      this.setLocalizedTableValues(result, 'emails', localeValues, 'emails', locale, (email: any) => {
        return !!email.value;
      });
      
      this.setLocalizedTableValues(result, 'phoneNumbers', localeValues, 'phoneNumbers', locale, 
        (phoneNumber: any) => {
          return phoneNumber.prefixNumber || phoneNumber.number;
        }, 
        (phoneNumber: any) => {
          return Object.assign(phoneNumber, {
            "type": "Phone",
            "language": locale,
            "isFinnishServiceNumber": phoneNumber.isFinnishServiceNumber === "true"
          });
        });

      this.setLocalizedTableValues(result, 'phoneNumbers', localeValues, 'faxes', locale, 
        (phoneNumber: any) => {
          return phoneNumber.prefixNumber || phoneNumber.number;
        }, 
        (phoneNumber: any) => {
          return Object.assign(phoneNumber, {
            "type": "Fax",
            "language": locale,
            "number": phoneNumber.number,
            "prefixNumber": phoneNumber.prefixNumber,
            "isFinnishServiceNumber": false
          });
        });

      result.webPages = result.webPages.concat(localeValues.webPages
        .filter((webPage: any) => {
          return !!webPage.url;
        })
        .map((webPage: any) => {
          return Object.assign(webPage, {
            "language": locale
          });
        }) 
      );
    });

    result.areaType = additionalValues.areaType;
    result.areas = this.areasFromForm(additionalValues.areaType, additionalValues.areas);
    result.languages = additionalValues.languages.split(",");

    return result;
  }

}