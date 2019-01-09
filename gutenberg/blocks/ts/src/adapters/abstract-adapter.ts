/**
 * Base class for form <> REST resource adapters
 */
export default class AbstractAdapter {

  /**
   * Constructor
   */
  constructor() {
    
  }

  protected getSupportedLocales(): string[] {
    return ["fi", "sv", "en"];
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
    
    result[resultProperty].push({
      value: value,
      language: language
    });
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
   * Returns localized value
   * 
   * @param values array containing localized values
   * @param locale Locale
   * @param property property containing value. Defaults to 'value'
   * @returns value
   */
  protected getLocalizedValue(values: any[], locale: string, property?: string) {
    if (!values) {
      return null;
    }
    
    for (let i = 0; i < values.length; i++) {
      if (locale === values[i].language) {
        return values[i][property || 'value'];
      }
    }
    
    return null;
  }
}

