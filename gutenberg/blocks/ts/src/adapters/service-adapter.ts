import { wp } from 'wp';
import AbstractAdapter from "./abstract-adapter";

declare var wp: wp;
declare var ajaxurl: string;

/**
 * Adapter for transforming service data between form and REST forms
 */
export default class ServiceAdapter extends AbstractAdapter {

  /**
   * Constructor
   */
  constructor() {
    super();
  }

  applyToService(formValues: any, service: any) {
    const result = JSON.parse(JSON.stringify(service));

    result.names = [];
    result.descriptions = [];
    result.vouchers = []; 

    // TODO: legislation
  
    this.getSupportedLocales().forEach((locale: string) => {
      const localeValues = formValues[locale];
      
      result.type = localeValues.type || result.type;
      result.chargeType = localeValues.serviceChargeType || result.chargeType;
      result.fundingType = localeValues.fundingType || result.fundingType;
      
      this.setTypedLocalizedValue(result, 'names', localeValues, 'name', locale, 'Name');
      this.setTypedLocalizedValue(result, 'names', localeValues, 'alternateName', locale, 'AlternativeName');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'shortDescription', locale, 'Summary');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'description', locale, 'Description');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'chargeTypeAdditionalInfo', locale, 'ChargeTypeAdditionalInfo');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'userInstruction', locale, 'UserInstruction');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'deadLineAdditionalInfo', locale, 'DeadLine');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'processingTimeAdditionalInfo', locale, 'ProcessingTime');
      this.setTypedLocalizedValue(result, 'descriptions', localeValues, 'validityTimeAdditionalInfo', locale, 'ValidityTime');
      
      this.setLocalizedValue(result, 'requirements', localeValues, 'requirements', locale);
      
      this.setLocalizedTableValues(result, 'vouchers', localeValues, 'serviceVouchers', locale, (voucher: any) => {
        return voucher.value && voucher.url;
      });
    });

    return result;
  }

  /**
   * Converts REST data into form data
   * 
   * @param locale locale
   * @param service service
   */
  serviceToForm(locale: string, service: any): any {
    const type = service.type;
    const chargeType = service.chargeType;
    const fundingType = service.fundingType;
    const name = this.getTypedLocalizedValue(service.names, locale, 'Name');
    const alternateName = this.getTypedLocalizedValue(service.names, locale, 'AlternateName');
    const shortDescription = this.getTypedLocalizedValue(service.descriptions, locale, 'Summary');
    const description = this.getTypedLocalizedValue(service.descriptions, locale, 'Description');
    const chargeTypeAdditionalInfo = this.getTypedLocalizedValue(service.descriptions, locale, 'ChargeTypeAdditionalInfo');
    const userInstruction = this.getTypedLocalizedValue(service.descriptions, locale, 'UserInstruction');
    const deadLineAdditionalInfo = this.getTypedLocalizedValue(service.descriptions, locale, 'DeadLine');
    const processingTimeAdditionalInfo = this.getTypedLocalizedValue(service.descriptions, locale, 'ProcessingTime');
    const validityTimeAdditionalInfo = this.getTypedLocalizedValue(service.descriptions, locale, 'ValidityTime');
    const requirements = this.getLocalizedValue(service.requirements, locale);
    const vouchers = (service.vouchers || []).filter((voucher: any) => {
      return voucher.value && voucher.language === locale;
    });
    
    const legislation = (service.legislation || [])
      .map((legistation: any) => {
        return {
          name: this.getLocalizedValue(legistation.names, locale),
          webPage: this.getLocalizedValue(legistation.webPages, locale, 'url')
        };
      })
      .filter((legistation: any) => {
        return legistation.name && legistation.webPage;
      });

    return {
      type: type,
      serviceChargeType: chargeType,
      fundingType: fundingType,
      name: name,
      alternateName: alternateName,
      shortDescription: shortDescription,
      description: description,
      chargeTypeAdditionalInfo: chargeTypeAdditionalInfo,
      userInstruction: userInstruction,
      deadLineAdditionalInfo: deadLineAdditionalInfo,
      processingTimeAdditionalInfo: processingTimeAdditionalInfo,
      validityTimeAdditionalInfo: validityTimeAdditionalInfo,
      requirements: requirements,
      serviceVouchersInUse: vouchers.length > 0 ? 'true' : 'false',
      serviceVouchers: vouchers,
      legislation: legislation
    };
  }

  serviceAdditinalToForm(service: any): any {
    return {
      languages: (service.languages || []).join(",")
    };
  }

  /**
   * Translates areas from form to be suitable for REST
   * 
   * @param areaType area type 
   * @param areas array of area values
   * @returns result
   */
  private areasFromForm(areaType: string, areas: string): any[] {
    if (areaType === 'AreaType') {
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
   * Translates areas to be suitable for form
   * 
   * @param areas areas
   * @returns area items
   */
  private areasToForm(areas: any[]): any[] {
    const areaCodes: any = [];
    areas.forEach((area) => {
      if (area.type !== 'Municipality') {
        areaCodes.push({
          value: `${area.type}:${area.code}`,
          label: this.getCodeNameWithType(area)
        });
      } else {
        area.municipalities.forEach((municipality: any) => {
          areaCodes.push({
            value: `Municipality:${municipality.code}`,
            label: this.getMunicipalityNameWithType(municipality)
          });
        });
      }
    });

    return areaCodes;
  }

  /**
   * Returns code name with type
   * 
   * @param codeItem item
   */
  private getCodeNameWithType(codeItem: any): string {
    const name = this.getLocalizedValue(codeItem.name || codeItem.names, 'fi');
    const type = this.getCodeTypeName(codeItem.type);
    return `${name} (${type})`;
  }
  
  /**
   * Returns nunicipality name with type
   * 
   * @param codeItem item
   */
  private getMunicipalityNameWithType(municipality: any): string {
    const name = this.getLocalizedValue(municipality.names, 'fi');
    const type = this.getCodeTypeName('Municipality');
    return `${name} (${type})`;
  }

  /**
   * Returns name for type
   * 
   * @param type type
   * @returns name
   */
  private getCodeTypeName(type: string): string {
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

  /**
   * Finds an organization by id
   * 
   * @param id organization id
   * @returns promise for organization
   */
  private findOrganization(id: string): Promise<any> {
    const body = new URLSearchParams();
    body.append("action", "kunta_api_find_organization");
    body.append("id", id);
    return wp.apiFetch({ url: ajaxurl, method: "POST", body: body });
  }
  
}