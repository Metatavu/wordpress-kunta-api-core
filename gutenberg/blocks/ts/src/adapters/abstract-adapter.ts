import Utils from "../utils";
import { Area, Municipality, WebPage, Phone } from "src/kunta-api/models";

/**
 * Base class for form <> REST resource adapters
 */
export default abstract class AbstractAdapter {

  /**
   * Constructor
   */
  constructor() {
    
  }

  /**
   * Returns array of supported locales 
   */
  protected getSupportedLocales(): string[] {
    return ["fi", "sv", "en"];
  }

  /**
   * Returns localized value
   * 
   * @param values array containing localized values
   * @param locale Locale
   * @param property property containing value. Defaults to 'value'
   * @returns value
   */
  protected getLocalizedValue(values: any[], locale: string, property?: string) {
    return Utils.getLocalizedValue(values, locale, property);
  }

  /**
   * Returns list of values in specified locale
   * 
   * @param values values
   * @param locale locale
   * @returns list of values in specified locale
   */
  protected getLocalizedValues(values: any[], locale: string): any[] {
    return (values || []).filter((value) => {
      return value.value && value.language === locale;
    });
  }

  /**
   * Sets localized value (e.g. service requirements) value
   * 
   * @param result result object
   * @param resultProperty result object property
   * @param localeValues locale values from form
   * @param formProperty form property
   * @param language locale
   */
  protected setLocalizedValue(result: any, resultProperty: string, localeValues: any, formProperty: string, language: string) {
    this.setLocalizedPropertyValue(result, resultProperty, "value", localeValues, formProperty, language);
  }

  /**
   * Sets typed localized value (e.g. service description) value
   * 
   * @param result result object
   * @param resultProperty result object property
   * @param localeValues locale values from form
   * @param formProperty form property
   * @param language locale
   * @param type type
   */
  protected setTypedLocalizedValue(result: any, resultProperty: string, localeValues: any, formProperty: string, language: string, type: string) {
    if (!result[resultProperty]) {
      result[resultProperty] = [];
    }
    
    const value = localeValues[formProperty];
    if (!value) {
      return;
    }
    
    for (let i = 0; i < result[resultProperty].length; i++) {
      if (result[resultProperty][i].language === language && result[resultProperty][i].type === type) {
        result[resultProperty][i].value = value;
        return;
      }
    }
    
    result[resultProperty].push({
      value: value,
      language: language,
      type: type
    });
  }

  /**
   * Sets values from table into result object
   * 
   * @param result result object
   * @param resultProperty result object property
   * @param localeValues locale values from form
   * @param formProperty form property
   * @param language locale
   * @param filterFunction function used to filter values (e.g. remove nulls). Optional
   * @param mapFunction function used to map values. Optional
   */
  protected setLocalizedTableValues(result: any, resultProperty: string, localeValues: any, formProperty: string, language: string, filterFunction?: any, mapFunction?: any) {
    if (!result[resultProperty]) {
      result[resultProperty] = []; 
    }
    
    const value = localeValues[formProperty];
    if (!value) {
      return;
    }

    let tableValues = Array.isArray(value) ? value : JSON.parse(value);
    
    if (filterFunction) {
      tableValues = tableValues.filter(filterFunction);
    }
    
    const mappedValues = tableValues.map(mapFunction ? mapFunction : (value: any) => {
      return Object.assign({
        language: language
      }, value);
    }) || [];
    
    result[resultProperty] = result[resultProperty].concat(mappedValues); 
  }

  /**
   * Returns localized value for locale and type
   * 
   * @param values values
   * @param locale locale
   * @param type type
   * @returns value
   */
  protected getTypedLocalizedValue(values: any[], locale: string, type: string): string {
    if (!values) {
      return null;
    }
    
    for (let i = 0; i < values.length; i++) {
      if (locale === values[i].language && type === values[i].type) {
        return values[i].value;
      }
    }
    
    return null;
  }

  /**
   * Translates areas to be suitable for form
   * 
   * @param areas areas
   * @returns area items
   */
  protected getAreaIds(areas: Area[]): string[] {
    const areaCodes: string[] = [];

    areas.forEach((area: Area) => {
      if (area.type !== 'Municipality') {
        areaCodes.push(`${area.type}:${area.code}`);
      } else {
        area.municipalities.forEach((municipality: Municipality) => {
          areaCodes.push(`Municipality:${municipality.code}`);
        });
      }
    });

    return areaCodes;
  }
  
  /**
   * Translates areas from form to be suitable for REST
   * 
   * @param areaType area type 
   * @param areas array of area values
   * @returns result
   */
  protected areasFromForm(areaType: string, areas: string): Area[] {
    if (areaType === 'LimitedType') {
      let mucicipalitiesIndex = -1;
      const result: any[] = [];
      
      (areas||'').split(',').forEach((area) => {
        const parts = area.split(':');
        const type = parts[0];
        const code = parts[1];
        
        if (type === 'Municipality') {
          if (mucicipalitiesIndex > -1) {
            result[mucicipalitiesIndex].municipalities.push({
              code: code
            });
          } else {
            mucicipalitiesIndex = result.push({
              'type': 'Municipality',
              'municipalities': [{
                code: code
              }]
            }) - 1;
          }
        } else {
          result.push({
            type: type,
            code: code
          });
        }
      });
      
      return result;
    }
  }

  /**
   * Converts boolean from form into boolean
   * 
   * @param value form value
   * @param defaultValue default value
   * @returns boolean
   */
  protected getFormBooleanValue(value: string, defaultValue: boolean): boolean {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    
    return defaultValue;
  }

  /**
   * Returns list of emails in specified locale
   * 
   * @param {Array} emails emails
   * @param {String} locale locale
   * @returns {Array} list of emails in specified locale
   */
  protected getLocalizedEmails(emails: any[], locale: string) {
    return this.getLocalizedValues(emails, locale);  
  }
    
  /**
   * Returns list of phones in specified locale
   * 
   * @param phones phones
   * @param locale locale
   * @returns list of phones in specified locale
   */
  protected getLocalizedPhoneNumbers(phones: Phone[], locale: string, type?: string): Phone[] {
    return (phones || [])
      .filter((phone: Phone) => {
        if (type && phone.type !== type) {
          return false;
        }

        return phone.number && phone.language === locale;
      })
      .map((phone: Phone) => {
        return Object.assign({}, phone, {
          isFinnishServiceNumber: phone.isFinnishServiceNumber ? "true" : "false"
        });
      });
  }

  /**
   * Returns web page url by locale
   * 
   * @param webPages web pages
   * @param locale locale
   * @return web page url or null if not found
   */
  protected getLocalizedWebPageUrl(webPages: WebPage[], locale: string): string {
    const localeWebPages = this.getLocalizedWebPages(webPages, locale);
    if (localeWebPages && localeWebPages.length) {
      return localeWebPages[0].url;
    }

    return null;
  }

  /**
   * Returns list of web pages in specified locale
   * 
   * @param webPages web pages
   * @param locale locale
   * @returns list of web pages in specified locale
   */
  protected getLocalizedWebPages(webPages: WebPage[], locale: string): WebPage[] {
    return (webPages || []).filter((webPage) => {
      return webPage.url && webPage.language === locale;
    });
  }

  /**
   * Sets localized value (e.g. service requirements) value
   * 
   * @param result result object
   * @param resultProperty result object property
   * @param localeValues locale values from form
   * @param formProperty form property
   * @param language locale
   */
  protected setLocalizedWebPages(result: any, resultProperty: string, localeValues: any, formProperty: string, language: string) {
    this.setLocalizedPropertyValue(result, resultProperty, "url", localeValues, formProperty, language);
  }

  /**
   * Sets localized property value
   * 
   * @param result result object
   * @param resultProperty result object property
   * @param resultField value field in result item
   * @param localeValues locale values from form
   * @param formProperty form property
   * @param language locale
   */
  private setLocalizedPropertyValue(result: any, resultProperty: string, resultField: string, localeValues: any, formProperty: string, language: string) {
    if (!result[resultProperty]) {
      result[resultProperty] = [];
    }
    
    const value = localeValues[formProperty];
    if (!value) {
      return;
    }
    
    for (let i = 0; i < result[resultProperty].length; i++) {
      if (result[resultProperty][i].language === language) {
        result[resultProperty][i].value = value;
        return;
      }
    }

    const resultItem: any = {
      language: language
    };

    resultItem[resultField] = value;
    result[resultProperty].push(resultItem);
  }

  /**
   * Returns array value from form
   * 
   * @param sourceObject 
   * @param sourceProperty 
   */
  protected getFormArray(sourceObject: any, sourceProperty: string): any[] {
    if (!sourceObject || sourceObject[sourceProperty]) {
      return [];
    }

    if (Array.isArray(sourceObject[sourceProperty])) {
      return sourceObject[sourceProperty];
    }

    return JSON.parse(sourceObject[sourceProperty]);
  }
}

