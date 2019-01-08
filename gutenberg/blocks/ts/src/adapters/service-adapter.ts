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
    const shortDescription = this.getTypedLocalizedValue(service.descriptions, locale, 'ShortDescription');
    const description = this.getTypedLocalizedValue(service.descriptions, locale, 'Description');
    const chargeTypeAdditionalInfo = this.getTypedLocalizedValue(service.descriptions, locale, 'ChargeTypeAdditionalInfo');
    const userInstruction = this.getTypedLocalizedValue(service.descriptions, locale, 'ServiceUserInstruction');
    const deadLineAdditionalInfo = this.getTypedLocalizedValue(service.descriptions, locale, 'DeadLineAdditionalInfo');
    const processingTimeAdditionalInfo = this.getTypedLocalizedValue(service.descriptions, locale, 'ProcessingTimeAdditionalInfo');
    const validityTimeAdditionalInfo = this.getTypedLocalizedValue(service.descriptions, locale, 'ValidityTimeAdditionalInfo');
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