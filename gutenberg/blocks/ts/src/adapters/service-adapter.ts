import { wp } from 'wp';
import AbstractAdapter from "./abstract-adapter";
import Utils from "../utils";
import ServiceChannelIds from '../service-channel-ids';
import { Service, ServiceOrganization, Area, Municipality } from '../kunta-api/models';

declare var wp: wp;

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
   * Applies form values into service and returns altered copy. Does not alter original service
   * 
   * @param formValues form values
   * @param additionalValues additional values
   * @param channelIds service channel ids
   * @param service service
   */
  applyToService(formValues: any, additionalValues: any, channelIds: ServiceChannelIds, service: Service) {
    const result: Service = JSON.parse(JSON.stringify(service));

    result.names = [];
    result.descriptions = [];
    result.vouchers = [];
    result.legislation = [];
    
    this.getSupportedLocales().forEach((locale: string) => {
      const localeValues = formValues[locale];
      const legistationValues = Array.isArray(localeValues.legislation) ? localeValues.legislation : localeValues.legislation ? JSON.parse(localeValues.legislation) : [];

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

      result.legislation = result.legislation.concat(legistationValues
        .filter((legislation: any) => {
          return legislation.name && legislation.webPage;
        })
        .map((legislation: any) => {
          return {
            names: [{
              language: locale,
              value: legislation.name
            }],
            webPages: [{
              url: legislation.webPage,
              type: "url",
              language: locale
            }]
          }
        }));
    });

    result.areaType = additionalValues.areaType;
    result.languages = (additionalValues.languages||'').split(',');
    result.areas = this.areasFromForm(additionalValues.areaType, additionalValues.areas);

    result.organizations = result.organizations.filter((serviceOrganization: any) => {
      return serviceOrganization.roleType === 'Responsible';
    });

    const responsibleOrganizationId = result.organizations
      .filter((serviceOrganization: any) => {
        return serviceOrganization.roleType === 'Responsible' && serviceOrganization.organizationId;
      })
      .map((serviceOrganization: any) => {
        return serviceOrganization.organizationId;
      })[0];

    if (responsibleOrganizationId && additionalValues.serviceProducersSelfProduced) {
      result.organizations.push({
        provisionType: 'SelfProducedServices',
        roleType: 'Producer',
        organizationId: responsibleOrganizationId
      });
    }

    const formProducersPurchaseServices =  (additionalValues.serviceProducersPurchaseServices||'').split(',');
    const formProducersOthers =  (additionalValues.serviceProducersOthers||'').split(',');
    
    formProducersPurchaseServices.forEach((organizationId: string) => {
      result.organizations.push({
        provisionType: 'ProcuredServices',
        roleType: 'Producer',
        organizationId: organizationId
      });
    });
    
    formProducersOthers.forEach((organizationId: string) => {
      result.organizations.push({
        provisionType: 'Other',
        roleType: 'Producer',
        organizationId: organizationId
      });
    });

    result.electronicServiceChannelIds = channelIds.electronic;
    result.phoneServiceChannelIds = channelIds.phone;
    result.printableFormServiceChannelIds = channelIds.printableForm;
    result.serviceLocationServiceChannelIds = channelIds.serviceLocation;
    result.webPageServiceChannelIds = channelIds.webpage;

    return result;
  }

  /**
   * Extracts service form data from REST service
   * 
   * @param locale locale locale
   * @param service service service
   * @returns service form data
   */ 
  public serviceToForm(locale: string, service: Service): any {
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

  /**
   * Extracts service additional form data from REST service
   * 
   * @param service service service
   * @returns service additional form data
   */ 
  public serviceAdditinalToForm(service: Service): any {
    const result = {
      languages: (service.languages || []).join(","),
      areas: this.getAreaIds(service.areas || []).join(","),
      areaType: service.areaType,
      serviceProducersSelfProduced: (service.organizations||[]).filter((serviceOrganization: any) => {
        return serviceOrganization.roleType === "Producer" && serviceOrganization.provisionType === "SelfProducedServices";
      }).length > 0,
      serviceProducersPurchaseServices: this.getServiceProducerOrganizationIds(service, "ProcuredServices").join(","),
      serviceProducersOthers: this.getServiceProducerOrganizationIds(service, "Other").join(",")
    }

    return result;
  }

  /**
   * Returns service producer organization ids by provision type
   * 
   * @param service service
   * @param provisionType provision type
   */
  private getServiceProducerOrganizationIds(service: Service, provisionType: string) {
    const serviceOrganizations: ServiceOrganization[] = service.organizations || [];

    return serviceOrganizations
      .filter((serviceOrganization: ServiceOrganization) => {
        return serviceOrganization.organizationId && serviceOrganization.roleType === "Producer" && serviceOrganization.provisionType === provisionType;
      })
      .map((serviceOrganization: ServiceOrganization) => {
        return serviceOrganization.organizationId;
      });

  }
  
  /**
   * Translates areas from form to be suitable for REST
   * 
   * @param areaType area type 
   * @param areas array of area values
   * @returns result
   */
  private areasFromForm(areaType: string, areas: string): Area[] {
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
   * Translates areas to be suitable for form
   * 
   * @param areas areas
   * @returns area items
   */
  private getAreaIds(areas: Area[]): string[] {
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

}