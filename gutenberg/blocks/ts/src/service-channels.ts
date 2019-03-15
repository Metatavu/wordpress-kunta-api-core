import { ElectronicServiceChannel, PhoneServiceChannel, PrintableFormServiceChannel, WebPageServiceChannel, ServiceLocationServiceChannel } from './kunta-api/models';

/**
 * Interface describing service's channels
 */
export default interface ServiceChannels { 
  electronic: ElectronicServiceChannel[],
  phone: PhoneServiceChannel[],
  printableForm: PrintableFormServiceChannel[],
  webpage: WebPageServiceChannel[],
  serviceLocation: ServiceLocationServiceChannel[]
}