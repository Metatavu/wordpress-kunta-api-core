/**
 * Base class for form <> REST resource adapters
 */
export default class AbstractAdapter {

  /**
   * Constructor
   */
  constructor() {
    
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

