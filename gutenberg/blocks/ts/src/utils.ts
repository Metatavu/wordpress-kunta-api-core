import { wp } from 'wp';

declare var wp: wp;
declare var ajaxurl: string;
declare var moment: any;
const { __ } = wp.i18n;

export default class Utils {

  /**
   * Search codes
   * 
   * @param types types
   * @param search search
   * @returns promise for search results
   */
  public static searchCodes(types: string, search: string): Promise<any> {
    const body = new URLSearchParams();
    body.append("action", "kunta_api_search_codes");
    body.append("types", types);
    body.append("search", search);

    return wp.apiFetch({ url: ajaxurl, method: "POST", body: body });
  }

  /**
   * Finds a service channel by type and id
   * 
   * @param type channel type
   * @param channelId channel id
   */
  public static findServiceChannel(type: string, channelId: string) {
    if (!channelId) {
      return null;
    }

    const apiFetch = wp.apiFetch;
    const body = new URLSearchParams();
    const actionTypeMap: any = {
      electronic: "electronic",
      phone: "phone",
      printableForm: "printable_form",
      webpage: "webpage",
      serviceLocation: "service_location"
    };
    
    body.append("action", `kunta_api_load_${actionTypeMap[type]}_service_channel`);
    body.append("id", channelId);

    return apiFetch({ url: ajaxurl, method: "POST", body: body });
  }

  /**
   * Searches organizations
   * 
   * @param search search term
   */
  public static searchOrganizations(search: string): Promise<any[]> {
    const body = new URLSearchParams();
    body.append("action", "kunta_api_search_organizations");
    body.append("search", this.splitSearchTerms(search));
    return wp.apiFetch({ url: ajaxurl, method: "POST", body: body });
  }

  /**
   * Finds an organization by id
   * 
   * @param id organization id
   * @returns promise for organization
   */
  public static findOrganization(id: string): Promise<any> {
    const body = new URLSearchParams();
    body.append("action", "kunta_api_find_organization");
    body.append("id", id);
    return wp.apiFetch({ url: ajaxurl, method: "POST", body: body });
  }

  /**
   * Splits search into terms
   * 
   * @param search search
   * @return search terms
   */
  public static splitSearchTerms(search: string) {
    if (!search) {
      return null;
    }

    const searchTerms = search.replace(/\ {1,}/g, ' ').split(' ').map((term: string) => {
      return `+(${term}*)`;
    });

    return searchTerms.join(' ');
  }

  /**
   * Returns code name with type
   * 
   * @param codeItem item
   */
  public static getCodeNameWithType(codeItem: any): string {
    const name = this.getLocalizedValue(codeItem.name || codeItem.names, 'fi');
    const type = this.getCodeTypeName(codeItem.type);
    return `${name} (${type})`;
  }

  /**
   * Returns nunicipality name with type
   * 
   * @param codeItem item
   */
  public static getMunicipalityNameWithType(municipality: any): string {
    const name = this.getLocalizedValue(municipality.names, 'fi');
    const type = this.getCodeTypeName('Municipality');
    return `${name} (${type})`;
  }

  /**
   * Returns localized value
   * 
   * @param values array containing localized values
   * @param locale Locale
   * @param property property containing value. Defaults to 'value'
   * @returns value
   */
  public static getLocalizedValue(values: any[], locale: string, property?: string) {
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

  /**
   * Returns first matching locale value
   * 
   * @param values array containing localized values
   */
  public static getAnyLocalizedValue(values: any[]) {
    const locales: string[] = values.map((value: { locale: string }): string => {
      return value.locale;
    });


    for (let i = 0; i < locales.length; i++) {
      const result = this.getLocalizedValue(values, locales[i]);
      if (result) {
        return result;
      }
    }
    
    return null;
  }

  /**
   * Translates language list to be suitable for form
   * 
   * @param languages language codes
   * @returns Promise for language items
   */

  public static async loadLanguageCodes(languages: string[]): Promise<any> {
    const languageQuery = languages
      .filter((language) => !!language)
      .map((language) => {
        return `code:${language}`;
      }).join(' ');

    if (!languageQuery) {
      return [];
    }

    const languageQueryResult = await Utils.searchCodes("Language", `+(${languageQuery})`);
    
    const languageMap: any = {};
    languageQueryResult.forEach((queryResult: any) => {
      languageMap[queryResult.code] = Utils.getLocalizedValue(queryResult.names, 'fi');
    });
    
    return languages.map((language) => {
      return {
        value: language,
        label: languageMap[language] || language
      };
    });
  }

 /**
  * Translates language list to be suitable for form
  * 
  * @param areaIds codes
  * @returns promise for areas
  */
  public static async loadAreas(areaIds: string[]): Promise<any[]> {
    const types: any = {};

    areaIds.forEach((areaId: string) => {
      const parts = areaId.split(":");
      types[parts[0]] = (types[parts[0]]||[]).concat(`code:${parts[1]}`);
    });

    const results = await Promise.all(Object.keys(types).map((type: string) => {
      const query = types[type].join(" ");
      return Utils.searchCodes(type, `+(${query})`);
    }));

    return [].concat(...results);
  }

  /**
   * Returns name for type
   * 
   * @param type type
   * @returns name
   */
  public static getCodeTypeName(type: string): string {
    return __(`codetype.${type}`, "kunta_api_core");
  }

  /**
   * Returns day's name by index (0 = sunday)
   * 
   * @param index day index
   * @param short whether to return short or long name
   */
  public static getDayName(index: number, short: boolean) {
    const longDayNames: any = {
      0: __("Sunday", "kunta_api_core"),
      1: __("Monday", "kunta_api_core"),
      2: __("Tuesday", "kunta_api_core"),
      3: __("Wednesday", "kunta_api_core"),
      4: __("Thursday", "kunta_api_core"),
      5: __("Friday", "kunta_api_core"),
      6: __("Saturday", "kunta_api_core"),
    };

    const shortDayNames: any = {
      0: __("Sun.", "kunta_api_core"),
      1: __("Mon.", "kunta_api_core"),
      2: __("Tue.", "kunta_api_core"),
      3: __("Wed.", "kunta_api_core"),
      4: __("Thu.", "kunta_api_core"),
      5: __("Fri.", "kunta_api_core"),
      6: __("Sat.", "kunta_api_core"),
    };

    return short ? shortDayNames[index] : longDayNames[index];
  }
  
  /**
   * Formats date for displaying
   * 
   * @param date date
   * @returns formatted date
   */
  public static formatDate(date: Date) {
    return moment(date).locale('fi').format('ll');
  }
  
  /**
   * Formats date and time for displaying
   * 
   * @param date date
   * @param time time
   * @returns formatted date time
   */
  public static formatDateWithTime(date: Date, time: string) {
    const result = this.formatDate(date);
    if (time) {
      return `${result} ${time}`;
    }
    
    return result;
  }
    
  /**
   * Formats date and time range for displaying
   * 
   * @param date date
   * @param startTime start time
   * @param endTime end time
   * @returns formatted date and time range
   */
  public static formatDateWithTimes(date: Date, startTime: string, endTime: string) {
    const start = this.formatDateWithTime(date, startTime);
    return endTime ? `${start} - ${endTime}` : start;
  }

  /**
   * Parses ISO date string into Date object
   * 
   * @param string ISO date string
   * @returns Date object
   */
  public static parseIsoDate(string: string): Date {
    if (!string) {
      return null;
    }
    
    return new Date(Date.parse(string));
  }

}