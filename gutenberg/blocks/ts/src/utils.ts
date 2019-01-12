import { wp } from 'wp';

declare var wp: wp;
declare var ajaxurl: string;

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
    switch (type) {
      case 'Municipality':
        return 'kunta';
      case 'Province':
        return 'maakunta';
      case 'HospitalRegions':
        return 'sairaanhoitopiiri';
      case 'BusinessRegions':
        return 'yrityspalvelujen seutualue';
      case 'Country':
        return 'maa';
      case 'Language':
        return 'kieli';
      case 'Postal':
        return 'postinumero';
    }
  }

}