import { wp } from 'wp';
import AbstractAdapter from "./abstract-adapter";
import { ServiceHour, Service } from '../kunta-api/models';
import Utils from '../utils';

declare var wp: wp;
declare var moment: any;

/**
 * Adapter for transforming service data between form and REST forms
 */
export default abstract class AbstractServiceChannelAdapter <T> extends AbstractAdapter {

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
  public abstract channelToForm(locale: string, channel: T): any;

  /**
   * Extracts additional form data from REST resource
   * 
   * @param channel channel
   * @returns form data
   */ 
  public abstract additionalToForm(channel: T): any;

  /**
   * Applies values from form into REST resource
   * 
   * @param values form values
   * @param additionalValues additional form values
   * @param serviceHours service hours
   * @param channel channel
   * @return modified channel
   */ 
  public abstract applyToChannel(values: any, additionalValues: any, serviceHours: any, channel: T): T;
  
  /**
   * Extract form service hours from channel REST resource 
   * 
   * @param channel channel
   * @return form data
   */
  public serviceHoursToForm(channel: T): any[] {
    return (channel as any).serviceHours.map((serviceHour: ServiceHour) => {
      return this.serviceHourToForm(serviceHour);
    });
  }

  /**
   * Translates form service hours into REST service hours
   * 
   * @param formValues form values
   * @return service hours
   */
  public serviceHoursFromForm(formValues: any[]): ServiceHour[] {
    return formValues.map((formValue) => {
      return this.serviceHourFromForm(formValue);
    });
  }
  
  /**
   * Translates form service hour into REST service hour
   * 
   * @param formValue form value
   * @return service hour
   */
  public serviceHourFromForm(formValue: any): ServiceHour {
    const serviceHourType = formValue.type;
    switch (serviceHourType) {
      case "Exceptional":
        return this.serviceHourFromFormException(formValue);
      case "DaysOfTheWeek":
        return this.serviceHourFromFormStandard(formValue);
      case "OverMidnight":
        return this.serviceHourFromFormSpecial(formValue);
    }
  }

  /**
   * Translates exception form service hour into REST service hour
   * 
   * @param formValue form value
   * @return service hour
   */
  private serviceHourFromFormException(formValues: any): ServiceHour {
    const additionalInformation: any[] = [];
    const isClosed = formValues.type === 'closed-all-day';
    const validForNow = false;
    const toTime = isClosed ? null : formValues[`Exception-to-time`];
    const fromTime = isClosed ? null : formValues[`Exception-from-time`];
    const openingHour: any[] = [];
    
    if (toTime || fromTime) {
      openingHour.push({
        dayFrom: null,
        dayTo: null,
        from: fromTime,
        to: toTime,
        isExtra: false
      });
    }
    
    this.getSupportedLocales().forEach((locale: string) => {
      const value = formValues[`Exception-additional-information-${locale}`];
      if (value) {
        additionalInformation.push({
          language: locale,
          value: value
        });  
      }
    });
    
    return {
      serviceHourType: formValues.type,
      validFrom: Utils.parseIsoDate(formValues[`Exception-from-date`]),
      validTo: Utils.parseIsoDate(formValues[`Exception-to-date`]),
      isClosed: isClosed,
      validForNow: validForNow,
      additionalInformation: additionalInformation,
      openingHour: openingHour
    };
  }
  
  /**
   * Translates standard form service hour into REST service hour
   * 
   * @param formValue form value
   * @return service hour
   */
  private serviceHourFromFormStandard(formValues: any): ServiceHour {
    const isClosed = false;
    const validForNow = formValues[`${formValues.type}-validForNow`] === "true";
    const additionalInformation: any[] = [];
    const serviceHours = formValues['Standard-open24h'] ? [] : formValues['Standard-openinghours'] || [];

    const openingHour = (Array.isArray(serviceHours) ? serviceHours  : JSON.parse(serviceHours))
      .map((serviceHour: any) => {
        return {
          dayFrom: parseInt(serviceHour.day),
          dayTo: parseInt(serviceHour.day),
          from: serviceHour.from,
          to: serviceHour.to,
          isExtra: false
        };
      });
    
    return {
      serviceHourType: formValues.type,
      validFrom: validForNow ? null : Utils.parseIsoDate(formValues[`${formValues.type}-validFrom`]),
      validTo: validForNow ? null : Utils.parseIsoDate(formValues[`${formValues.type}-validTo`]),
      isClosed: isClosed,
      validForNow: validForNow,
      additionalInformation: additionalInformation,
      openingHour: openingHour
    };
  }
  
  /**
   * Translates special form service hour into REST service hour
   * 
   * @param formValue form value
   * @return service hour
   */
  private serviceHourFromFormSpecial(formValues: any): ServiceHour {
    const isClosed = false;
    const validForNow = formValues[`${formValues.type}-validForNow`] === "true";
    const additionalInformation: any[] = [];
    const openingHour = [{
      dayFrom: parseInt(formValues['Special-from-date']),
      dayTo: parseInt(formValues['Special-to-date']),
      from: formValues['Special-from-time'],
      to: formValues['Special-to-time'],
      isExtra: false
    }];
  
    return {
      serviceHourType: formValues.type,
      validFrom: validForNow ? null : Utils.parseIsoDate(formValues[`${formValues.type}-validFrom`]),
      validTo: validForNow ? null : Utils.parseIsoDate(formValues[`${formValues.type}-validTo`]),
      isClosed: isClosed,
      validForNow: validForNow,
      additionalInformation: additionalInformation,
      openingHour: openingHour
    };
  }

  /**
   * Translates REST service hour to be suitable for form
   * 
   * @param serviceHour service hour
   * @return 
   */
  private serviceHourToForm(serviceHour: ServiceHour): any {
    if (!serviceHour) {
      return {};
    }
    
    const type = serviceHour.serviceHourType;
    const validForNow = serviceHour.validForNow ? "true" : "false";
    const validFrom = serviceHour.validForNow || !serviceHour.validFrom ? null : moment(serviceHour.validFrom);
    const validTo = serviceHour.validForNow || !serviceHour.validTo ? null : moment(serviceHour.validTo);
    const open24h = serviceHour.openingHour.length === 0 && !serviceHour.isClosed;
    const validFromStr = validFrom ? validFrom.format() : null;
    const validToStr = validTo ? validTo.format() : null;
    const openingHour = serviceHour.openingHour && serviceHour.openingHour.length ? serviceHour.openingHour[0] : null;
    const openingHours: any[] = [];
        
    (serviceHour.openingHour||[]).forEach((openingHour) => {
      for (let day = openingHour.dayFrom; day <= openingHour.dayTo; day++) {
        openingHours.push({
          day: day,
          from: openingHour.from,
          to: openingHour.to
        });
      }
    });
    
    switch (type) {
      case 'DaysOfTheWeek':
        return {
          'type': type,
          'Standard-validForNow': validForNow,
          'Standard-validFrom': validFromStr,
          'Standard-validTo': validToStr,
          'Standard-open24h': open24h,
          'Standard-openinghours': openingHours
        };
      case 'OverMidnight':
        return {
          'type': type,
          'Special-validForNow': validForNow,
          'Special-validFrom': validFromStr,
          'Special-validTo': validToStr,
          'Special-from-date': openingHour ? openingHour.dayFrom : null,
          'Special-from-time': openingHour ? openingHour.from : null,
          'Special-to-date': openingHour ? openingHour.dayTo : null,
          'Special-to-time': openingHour ? openingHour.to : null
        };
      case 'Exceptional':
        const openFrom = openingHour ? openingHour.from : null;
        const openTo = openingHour ? openingHour.to : null;
        const exceptionType = !validTo ? !openFrom && !openTo ? 'closed-all-day' : 'single' : 'range';
        
        if (validFrom && openFrom) {
          const parts = openFrom.split(':');
          validFrom.hour(parseInt(parts[0]));
          validFrom.minute(parseInt(parts[1]));
        }
        
        if (validTo && openTo) {
          const parts = openTo.split(':');
          validTo.hour(parseInt(parts[0]));
          validTo.minute(parseInt(parts[1]));
        }
        
        const result: any = {
          'type': type,
          'Exception-type': exceptionType,
          'Exception-from-date': validFrom ? validFrom.format() : null,
          'Exception-to-date': validTo ? validTo.format() : null,
          'Exception-from-time': openFrom,
          'Exception-to-time': openTo
        };
        
        this.getSupportedLocales().forEach((locale: string) => {
          result[`Exception-additional-information-${locale}`] = this.getLocalizedValue(serviceHour.additionalInformation, locale);
        });
        
        return result;
      default:
        throw new Error(`Unknown service hour type ${type}`);
    }
  }

}