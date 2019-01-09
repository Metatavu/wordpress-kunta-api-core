import AbstractAdapter from "./abstract-adapter";

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
  serviceToForm(locale: string, service: any) {
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
    const vouchers = service.vouchers.filter((voucher: any) => {
      return voucher.value && voucher.language === locale;
    });
    
    const legislation = service.legislation
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

}