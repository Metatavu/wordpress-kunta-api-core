import { wp } from 'wp';
import AbstractAdapter from "./abstract-adapter";
import Utils from "../utils";
import ServiceChannelIds from '../service-channel-ids';
import { Service, ServiceOrganization, Area, Municipality } from '../kunta-api/models';

declare var wp: wp;

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
  protected getLocalizedPhoneNumbers(phones: any[], locale: string): any[] {
    return (phones || [])
      .filter((phone) => {
        return phone.number && phone.language === locale;
      })
      .map((phone) => {
        return Object.assign({}, phone, {
          isFinnishServiceNumber: phone.isFinnishServiceNumber ? "true" : "false"
        });
      });
  }

  /**
   * Returns list of web pages in specified locale
   * 
   * @param webPages web pages
   * @param locale locale
   * @returns list of web pages in specified locale
   */
  protected getLocalizedWebPages(webPages: any[], locale: string): any[] {
    return (webPages || []).filter((webPage) => {
      return webPage.url && webPage.language === locale;
    });
  }
}