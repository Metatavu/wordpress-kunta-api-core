/**
 * 
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * 
 * @export
 * @interface Address
 */
export interface Address {
    /**
     * Service location latitude coordinate.
     * @type {string}
     * @memberof Address
     */
    latitude?: string;
    /**
     * Service location longitude coordinate.
     * @type {string}
     * @memberof Address
     */
    longitude?: string;
    /**
     * 
     * @type {Coordinates}
     * @memberof Address
     */
    coordinates?: Coordinates;
    /**
     * State of coordinates. Coordinates are fetched from a service provided by Maanmittauslaitos (WFS).  Possible values are: Loading, Ok, Failed, NotReceived, EmptyInputReceived, MultipleResultsReceived or WrongFormatReceived.
     * @type {string}
     * @memberof Address
     */
    coordinateState?: string;
    /**
     * Address type, Visiting or Postal.
     * @type {string}
     * @memberof Address
     */
    type?: string;
    /**
     * Address sub type, Single, Street, PostOfficeBox, Abroad or Multipoint or NoAddress.
     * @type {string}
     * @memberof Address
     */
    subtype?: string;
    /**
     * Post office box like PL 310
     * @type {Array<LocalizedValue>}
     * @memberof Address
     */
    postOfficeBox?: Array<LocalizedValue>;
    /**
     * Postal code, for example 00010.
     * @type {string}
     * @memberof Address
     */
    postalCode?: string;
    /**
     * List of localized Post offices, for example Helsinki, Helsingfors.
     * @type {Array<LocalizedValue>}
     * @memberof Address
     */
    postOffice?: Array<LocalizedValue>;
    /**
     * List of localized street addresses.
     * @type {Array<LocalizedValue>}
     * @memberof Address
     */
    streetAddress?: Array<LocalizedValue>;
    /**
     * Street number for street address.
     * @type {string}
     * @memberof Address
     */
    streetNumber?: string;
    /**
     * 
     * @type {Municipality}
     * @memberof Address
     */
    municipality?: Municipality;
    /**
     * Country code (ISO 3166-1 alpha-2), for example FI.
     * @type {string}
     * @memberof Address
     */
    country?: string;
    /**
     * Localized list of foreign address information.
     * @type {Array<LocalizedValue>}
     * @memberof Address
     */
    locationAbroad?: Array<LocalizedValue>;
    /**
     * Moving address. Includes several street addresses.
     * @type {Array<Address>}
     * @memberof Address
     */
    multipointLocation?: Array<Address>;
    /**
     * Localized list of additional information about the address.
     * @type {Array<LocalizedValue>}
     * @memberof Address
     */
    additionalInformations?: Array<LocalizedValue>;
}

/**
 * 
 * @export
 * @interface Agency
 */
export interface Agency {
    /**
     * 
     * @type {string}
     * @memberof Agency
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Agency
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof Agency
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof Agency
     */
    timezone?: string;
}

/**
 * 
 * @export
 * @interface Announcement
 */
export interface Announcement {
    /**
     * 
     * @type {string}
     * @memberof Announcement
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Announcement
     */
    slug?: string;
    /**
     * 
     * @type {string}
     * @memberof Announcement
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Announcement
     */
    _abstract?: string;
    /**
     * 
     * @type {string}
     * @memberof Announcement
     */
    contents?: string;
    /**
     * 
     * @type {Date}
     * @memberof Announcement
     */
    published?: Date;
}

/**
 * Area
 * @export
 * @interface Area
 */
export interface Area {
    /**
     * Type of the area (Municipality, Province, BusinessRegions, HospitalRegions).
     * @type {string}
     * @memberof Area
     */
    type?: string;
    /**
     * Code of the area.
     * @type {string}
     * @memberof Area
     */
    code?: string;
    /**
     * Localized list of names for the area
     * @type {Array<LocalizedValue>}
     * @memberof Area
     */
    name?: Array<LocalizedValue>;
    /**
     * List of municipalities including municipality code and a localized list of municipality names.
     * @type {Array<Municipality>}
     * @memberof Area
     */
    municipalities?: Array<Municipality>;
}

/**
 * 
 * @export
 * @interface Attachment
 */
export interface Attachment {
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    contentType?: string;
    /**
     * 
     * @type {number}
     * @memberof Attachment
     */
    size?: number;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    type?: string;
}

/**
 * 
 * @export
 * @interface BadRequest
 */
export interface BadRequest {
    /**
     * 
     * @type {number}
     * @memberof BadRequest
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof BadRequest
     */
    message?: string;
}

/**
 * 
 * @export
 * @interface Banner
 */
export interface Banner {
    /**
     * 
     * @type {string}
     * @memberof Banner
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Banner
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Banner
     */
    contents?: string;
    /**
     * 
     * @type {string}
     * @memberof Banner
     */
    link?: string;
    /**
     * 
     * @type {string}
     * @memberof Banner
     */
    textColor?: string;
    /**
     * 
     * @type {string}
     * @memberof Banner
     */
    backgroundColor?: string;
}

/**
 * Generic code item describing code / name pair (e.g. LanguageCode, MunicipalityCode, etc...)
 * @export
 * @interface Code
 */
export interface Code {
    /**
     * Kunta API id for code
     * @type {string}
     * @memberof Code
     */
    id?: string;
    /**
     * Type of the code. Value must be one of MUNICIPALITY, PROVINCE, HOSPITALREGIONS, BUSINESSREGIONS, COUNTRY, LANGUAGE, POSTAL
     * @type {string}
     * @memberof Code
     */
    type?: string;
    /**
     * Code
     * @type {string}
     * @memberof Code
     */
    code?: string;
    /**
     * Names
     * @type {Array<LocalizedValue>}
     * @memberof Code
     */
    names?: Array<LocalizedValue>;
    /**
     * Names
     * @type {Array<CodeExtra>}
     * @memberof Code
     */
    extra?: Array<CodeExtra>;
}

/**
 * Extra field for Code
 * @export
 * @interface CodeExtra
 */
export interface CodeExtra {
    /**
     * 
     * @type {string}
     * @memberof CodeExtra
     */
    key?: string;
    /**
     * 
     * @type {string}
     * @memberof CodeExtra
     */
    value?: string;
}

/**
 * 
 * @export
 * @interface Contact
 */
export interface Contact {
    /**
     * 
     * @type {string}
     * @memberof Contact
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Contact
     */
    displayName?: string;
    /**
     * 
     * @type {string}
     * @memberof Contact
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof Contact
     */
    lastName?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Contact
     */
    privateContact?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Contact
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Contact
     */
    organization?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Contact
     */
    organizationUnits?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Contact
     */
    additionalInformations?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Contact
     */
    emails?: Array<string>;
    /**
     * 
     * @type {Array<ContactPhone>}
     * @memberof Contact
     */
    phones?: Array<ContactPhone>;
    /**
     * 
     * @type {Array<Address>}
     * @memberof Contact
     */
    addresses?: Array<Address>;
    /**
     * 
     * @type {Array<ContactStatus>}
     * @memberof Contact
     */
    statuses?: Array<ContactStatus>;
}

/**
 * 
 * @export
 * @interface ContactPhone
 */
export interface ContactPhone {
    /**
     * 
     * @type {string}
     * @memberof ContactPhone
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof ContactPhone
     */
    number?: string;
}

/**
 * 
 * @export
 * @interface ContactStatus
 */
export interface ContactStatus {
    /**
     * 
     * @type {string}
     * @memberof ContactStatus
     */
    text?: string;
    /**
     * 
     * @type {Date}
     * @memberof ContactStatus
     */
    start?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ContactStatus
     */
    end?: Date;
}

/**
 * 
 * @export
 * @interface Coordinate
 */
export interface Coordinate {
    /**
     * latitude coordinate.
     * @type {string}
     * @memberof Coordinate
     */
    latitude?: string;
    /**
     * longitude coordinate.
     * @type {string}
     * @memberof Coordinate
     */
    longitude?: string;
}

/**
 * 
 * @export
 * @interface Coordinates
 */
export interface Coordinates {
    /**
     * 
     * @type {Coordinate}
     * @memberof Coordinates
     */
    epsg3067?: Coordinate;
    /**
     * 
     * @type {Coordinate}
     * @memberof Coordinates
     */
    epsg4326?: Coordinate;
}

/**
 * 
 * @export
 * @interface DailyOpeningTime
 */
export interface DailyOpeningTime {
    /**
     * Day index (0 == Sunday)
     * @type {number}
     * @memberof DailyOpeningTime
     */
    dayFrom?: number;
    /**
     * Day index (0 == Sunday)
     * @type {number}
     * @memberof DailyOpeningTime
     */
    dayTo?: number;
    /**
     * Start time for example 10:00:00
     * @type {string}
     * @memberof DailyOpeningTime
     */
    from?: string;
    /**
     * End time for example 20:00:00
     * @type {string}
     * @memberof DailyOpeningTime
     */
    to?: string;
    /**
     * Set to true to have extra time for a day. Enables to have open times like 10:00-14:00 and also on the same day 16:00-20:00. So the latter time is extra time.
     * @type {boolean}
     * @memberof DailyOpeningTime
     */
    isExtra?: boolean;
}

/**
 * 
 * @export
 * @interface ElectronicServiceChannel
 */
export interface ElectronicServiceChannel {
    /**
     * 
     * @type {string}
     * @memberof ElectronicServiceChannel
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof ElectronicServiceChannel
     */
    organizationId?: string;
    /**
     * 
     * @type {Array<LocalizedValue>}
     * @memberof ElectronicServiceChannel
     */
    names?: Array<LocalizedValue>;
    /**
     * 
     * @type {Array<LocalizedValue>}
     * @memberof ElectronicServiceChannel
     */
    descriptions?: Array<LocalizedValue>;
    /**
     * 
     * @type {number}
     * @memberof ElectronicServiceChannel
     */
    signatureQuantity?: number;
    /**
     * 
     * @type {boolean}
     * @memberof ElectronicServiceChannel
     */
    requiresSignature?: boolean;
    /**
     * List of support phone numbers for the service channel.
     * @type {Array<Phone>}
     * @memberof ElectronicServiceChannel
     */
    supportPhones?: Array<Phone>;
    /**
     * List of support email addresses for the service channel.
     * @type {Array<Email>}
     * @memberof ElectronicServiceChannel
     */
    supportEmails?: Array<Email>;
    /**
     * 
     * @type {boolean}
     * @memberof ElectronicServiceChannel
     */
    requiresAuthentication?: boolean;
    /**
     * 
     * @type {Array<LocalizedValue>}
     * @memberof ElectronicServiceChannel
     */
    urls?: Array<LocalizedValue>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ElectronicServiceChannel
     */
    languages?: Array<string>;
    /**
     * 
     * @type {Array<ServiceChannelAttachment>}
     * @memberof ElectronicServiceChannel
     */
    attachments?: Array<ServiceChannelAttachment>;
    /**
     * 
     * @type {Array<WebPage>}
     * @memberof ElectronicServiceChannel
     */
    webPages?: Array<WebPage>;
    /**
     * 
     * @type {Array<ServiceHour>}
     * @memberof ElectronicServiceChannel
     */
    serviceHours?: Array<ServiceHour>;
    /**
     * 
     * @type {string}
     * @memberof ElectronicServiceChannel
     */
    publishingStatus?: string;
    /**
     * Area type (WholeCountry, WholeCountryExceptAlandIslands, AreaType).
     * @type {string}
     * @memberof ElectronicServiceChannel
     */
    areaType?: string;
    /**
     * List of service channel areas.
     * @type {Array<Area>}
     * @memberof ElectronicServiceChannel
     */
    areas?: Array<Area>;
}

/**
 * 
 * @export
 * @interface Email
 */
export interface Email {
    /**
     * 
     * @type {string}
     * @memberof Email
     */
    value?: string;
    /**
     * 
     * @type {string}
     * @memberof Email
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Email
     */
    language?: string;
}

/**
 * 
 * @export
 * @interface Emergency
 */
export interface Emergency {
    /**
     * 
     * @type {string}
     * @memberof Emergency
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Emergency
     */
    location?: string;
    /**
     * 
     * @type {Date}
     * @memberof Emergency
     */
    time?: Date;
    /**
     * 
     * @type {string}
     * @memberof Emergency
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Emergency
     */
    extent?: string;
    /**
     * 
     * @type {string}
     * @memberof Emergency
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof Emergency
     */
    url?: string;
    /**
     * Emergency latitude coordinate.
     * @type {string}
     * @memberof Emergency
     */
    latitude?: string;
    /**
     * Emergency longitude coordinate.
     * @type {string}
     * @memberof Emergency
     */
    longitude?: string;
    /**
     * List of emergency source
     * @type {Array<EmergencySource>}
     * @memberof Emergency
     */
    sources?: Array<EmergencySource>;
}

/**
 * 
 * @export
 * @interface EmergencySource
 */
export interface EmergencySource {
    /**
     * 
     * @type {string}
     * @memberof EmergencySource
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof EmergencySource
     */
    url?: string;
}

/**
 * 
 * @export
 * @interface Event
 */
export interface Event {
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    originalUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    description?: string;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    start?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    end?: Date;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    city?: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    place?: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    address?: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    zip?: string;
}

/**
 * 
 * @export
 * @interface FileDef
 */
export interface FileDef {
    /**
     * 
     * @type {string}
     * @memberof FileDef
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof FileDef
     */
    pageId?: string;
    /**
     * 
     * @type {string}
     * @memberof FileDef
     */
    slug?: string;
    /**
     * 
     * @type {string}
     * @memberof FileDef
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof FileDef
     */
    contentType?: string;
    /**
     * 
     * @type {number}
     * @memberof FileDef
     */
    size?: number;
}

/**
 * 
 * @export
 * @interface Forbidden
 */
export interface Forbidden {
    /**
     * 
     * @type {number}
     * @memberof Forbidden
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof Forbidden
     */
    message?: string;
}

/**
 * 
 * @export
 * @interface Fragment
 */
export interface Fragment {
    /**
     * 
     * @type {string}
     * @memberof Fragment
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Fragment
     */
    slug?: string;
    /**
     * 
     * @type {string}
     * @memberof Fragment
     */
    contents?: string;
}

/**
 * 
 * @export
 * @interface Incident
 */
export interface Incident {
    /**
     * 
     * @type {string}
     * @memberof Incident
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Incident
     */
    slug?: string;
    /**
     * 
     * @type {string}
     * @memberof Incident
     */
    severity?: string;
    /**
     * 
     * @type {string}
     * @memberof Incident
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Incident
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Incident
     */
    detailsLink?: string;
    /**
     * 
     * @type {string}
     * @memberof Incident
     */
    detailsLinkText?: string;
    /**
     * 
     * @type {Date}
     * @memberof Incident
     */
    start?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Incident
     */
    end?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof Incident
     */
    areas?: Array<string>;
}

/**
 * 
 * @export
 * @interface InternalServerError
 */
export interface InternalServerError {
    /**
     * 
     * @type {number}
     * @memberof InternalServerError
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof InternalServerError
     */
    message?: string;
}

/**
 * 
 * @export
 * @interface Job
 */
export interface Job {
    /**
     * 
     * @type {string}
     * @memberof Job
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Job
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Job
     */
    employmentType?: string;
    /**
     * 
     * @type {string}
     * @memberof Job
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Job
     */
    location?: string;
    /**
     * 
     * @type {string}
     * @memberof Job
     */
    organisationalUnit?: string;
    /**
     * 
     * @type {string}
     * @memberof Job
     */
    duration?: string;
    /**
     * 
     * @type {string}
     * @memberof Job
     */
    taskArea?: string;
    /**
     * 
     * @type {Date}
     * @memberof Job
     */
    publicationStart?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Job
     */
    publicationEnd?: Date;
    /**
     * 
     * @type {string}
     * @memberof Job
     */
    link?: string;
}

/**
 * a Law
 * @export
 * @interface Law
 */
export interface Law {
    /**
     * 
     * @type {Array<LocalizedValue>}
     * @memberof Law
     */
    names?: Array<LocalizedValue>;
    /**
     * List of localized web page urls.
     * @type {Array<WebPage>}
     * @memberof Law
     */
    webPages?: Array<WebPage>;
}

/**
 * 
 * @export
 * @interface LocalizedValue
 */
export interface LocalizedValue {
    /**
     * 
     * @type {string}
     * @memberof LocalizedValue
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof LocalizedValue
     */
    value?: string;
    /**
     * 
     * @type {string}
     * @memberof LocalizedValue
     */
    type?: string;
}

/**
 * 
 * @export
 * @interface Menu
 */
export interface Menu {
    /**
     * 
     * @type {string}
     * @memberof Menu
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Menu
     */
    slug?: string;
}

/**
 * 
 * @export
 * @interface MenuItem
 */
export interface MenuItem {
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    label?: string;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    parentItemId?: string;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    pageId?: string;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    fileId?: string;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    externalUrl?: string;
}

/**
 * 
 * @export
 * @interface Municipality
 */
export interface Municipality {
    /**
     * Municipality code (like 491 or 091).
     * @type {string}
     * @memberof Municipality
     */
    code?: string;
    /**
     * 
     * @type {Array<LocalizedValue>}
     * @memberof Municipality
     */
    names?: Array<LocalizedValue>;
}

/**
 * Name type by language
 * @export
 * @interface NameTypeByLanguage
 */
export interface NameTypeByLanguage {
    /**
     * DisplayNameType preferred by language code (Name or AlternateName).
     * @type {string}
     * @memberof NameTypeByLanguage
     */
    type?: string;
    /**
     * Language code.
     * @type {string}
     * @memberof NameTypeByLanguage
     */
    language?: string;
}

/**
 * 
 * @export
 * @interface NewsArticle
 */
export interface NewsArticle {
    /**
     * 
     * @type {string}
     * @memberof NewsArticle
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof NewsArticle
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof NewsArticle
     */
    _abstract?: string;
    /**
     * 
     * @type {string}
     * @memberof NewsArticle
     */
    slug?: string;
    /**
     * 
     * @type {string}
     * @memberof NewsArticle
     */
    contents?: string;
    /**
     * 
     * @type {Date}
     * @memberof NewsArticle
     */
    published?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof NewsArticle
     */
    tags?: Array<string>;
}

/**
 * 
 * @export
 * @interface NotFound
 */
export interface NotFound {
    /**
     * 
     * @type {number}
     * @memberof NotFound
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof NotFound
     */
    message?: string;
}

/**
 * 
 * @export
 * @interface NotImplemented
 */
export interface NotImplemented {
    /**
     * 
     * @type {number}
     * @memberof NotImplemented
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof NotImplemented
     */
    message?: string;
}

/**
 * 
 * @export
 * @interface OntologyItem
 */
export interface OntologyItem {
    /**
     * 
     * @type {string}
     * @memberof OntologyItem
     */
    system?: string;
    /**
     * 
     * @type {Array<LocalizedValue>}
     * @memberof OntologyItem
     */
    name?: Array<LocalizedValue>;
    /**
     * 
     * @type {string}
     * @memberof OntologyItem
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof OntologyItem
     */
    ontologyType?: string;
    /**
     * 
     * @type {string}
     * @memberof OntologyItem
     */
    uri?: string;
    /**
     * 
     * @type {string}
     * @memberof OntologyItem
     */
    parentId?: string;
    /**
     * 
     * @type {string}
     * @memberof OntologyItem
     */
    parentUri?: string;
}

/**
 * Organization
 * @export
 * @interface Organization
 */
export interface Organization {
    /**
     * Entity identifier.
     * @type {string}
     * @memberof Organization
     */
    id?: string;
    /**
     * Organizations parent organization identifier if exists.
     * @type {string}
     * @memberof Organization
     */
    parentOrganization?: string;
    /**
     * Organization type (State, Municipality, RegionalOrganization, Organization, Company).
     * @type {string}
     * @memberof Organization
     */
    organizationType?: string;
    /**
     * Municipality including municipality code and a localized list of municipality names.
     * @type {Municipality}
     * @memberof Organization
     */
    municipality?: Municipality;
    /**
     * Organization business code (Y-tunnus).
     * @type {string}
     * @memberof Organization
     */
    businessCode?: string;
    /**
     * Organization business name (name used for business code).
     * @type {string}
     * @memberof Organization
     */
    businessName?: string;
    /**
     * List of organization names.
     * @type {Array<LocalizedValue>}
     * @memberof Organization
     */
    names?: Array<LocalizedValue>;
    /**
     * List of Display name types (Name or AlternateName) for each language version of OrganizationNames.
     * @type {Array<NameTypeByLanguage>}
     * @memberof Organization
     */
    displayNameType?: Array<NameTypeByLanguage>;
    /**
     * Area type (WholeCountry, WholeCountryExceptAlandIslands, AreaType).
     * @type {string}
     * @memberof Organization
     */
    areaType?: string;
    /**
     * List of organization areas.
     * @type {Array<Area>}
     * @memberof Organization
     */
    areas?: Array<Area>;
    /**
     * List of organizations descriptions.
     * @type {Array<LocalizedValue>}
     * @memberof Organization
     */
    descriptions?: Array<LocalizedValue>;
    /**
     * List of organizations email addresses.
     * @type {Array<Email>}
     * @memberof Organization
     */
    emailAddresses?: Array<Email>;
    /**
     * List of organizations phone numbers.
     * @type {Array<Phone>}
     * @memberof Organization
     */
    phoneNumbers?: Array<Phone>;
    /**
     * List of organizations web pages.
     * @type {Array<WebPage>}
     * @memberof Organization
     */
    webPages?: Array<WebPage>;
    /**
     * List of organizations addresses.
     * @type {Array<Address>}
     * @memberof Organization
     */
    addresses?: Array<Address>;
    /**
     * Publishing status (Draft, Published, Deleted, Modified and OldPublished).
     * @type {string}
     * @memberof Organization
     */
    publishingStatus?: string;
    /**
     * List of organizations services.
     * @type {Array<OrganizationService>}
     * @memberof Organization
     */
    services?: Array<OrganizationService>;
}

/**
 * Organization service
 * @export
 * @interface OrganizationService
 */
export interface OrganizationService {
    /**
     * Localized list of additional information.
     * @type {Array<LocalizedValue>}
     * @memberof OrganizationService
     */
    additionalInformation?: Array<LocalizedValue>;
    /**
     * Service identifier.
     * @type {string}
     * @memberof OrganizationService
     */
    serviceId?: string;
    /**
     * Organization identifier (organization related to the service).
     * @type {string}
     * @memberof OrganizationService
     */
    organizationId?: string;
    /**
     * Role type, valid values Responsible or Producer.
     * @type {string}
     * @memberof OrganizationService
     */
    roleType?: string;
    /**
     * Provision type, valid values SelfProduced, VoucherServices, PurchaseServices or Other. Required if RoleType value is Producer.
     * @type {string}
     * @memberof OrganizationService
     */
    provisionType?: string;
    /**
     * List of web pages.
     * @type {Array<WebPage>}
     * @memberof OrganizationService
     */
    webPages?: Array<WebPage>;
}

/**
 * 
 * @export
 * @interface OrganizationSetting
 */
export interface OrganizationSetting {
    /**
     * 
     * @type {string}
     * @memberof OrganizationSetting
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof OrganizationSetting
     */
    key?: string;
    /**
     * 
     * @type {string}
     * @memberof OrganizationSetting
     */
    value?: string;
}

/**
 * 
 * @export
 * @interface Page
 */
export interface Page {
    /**
     * 
     * @type {string}
     * @memberof Page
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Page
     */
    slug?: string;
    /**
     * 
     * @type {Array<LocalizedValue>}
     * @memberof Page
     */
    titles?: Array<LocalizedValue>;
    /**
     * 
     * @type {string}
     * @memberof Page
     */
    parentId?: string;
    /**
     * 
     * @type {PageMeta}
     * @memberof Page
     */
    meta?: PageMeta;
}

/**
 * 
 * @export
 * @interface PageMeta
 */
export interface PageMeta {
    /**
     * 
     * @type {boolean}
     * @memberof PageMeta
     */
    hideMenuChildren?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PageMeta
     */
    unmappedParentId?: string;
}

/**
 * 
 * @export
 * @interface Phone
 */
export interface Phone {
    /**
     * 
     * @type {string}
     * @memberof Phone
     */
    additionalInformation?: string;
    /**
     * 
     * @type {string}
     * @memberof Phone
     */
    serviceChargeType?: string;
    /**
     * 
     * @type {string}
     * @memberof Phone
     */
    chargeDescription?: string;
    /**
     * 
     * @type {string}
     * @memberof Phone
     */
    prefixNumber?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Phone
     */
    isFinnishServiceNumber?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Phone
     */
    number?: string;
    /**
     * 
     * @type {string}
     * @memberof Phone
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof Phone
     */
    type?: string;
}

/**
 * 
 * @export
 * @interface PhoneServiceChannel
 */
export interface PhoneServiceChannel {
    /**
     * Identifier for the service channel.
     * @type {string}
     * @memberof PhoneServiceChannel
     */
    id?: string;
    /**
     * Organization identifier responsible for the channel.
     * @type {string}
     * @memberof PhoneServiceChannel
     */
    organizationId?: string;
    /**
     * Localized list of service channel names.
     * @type {Array<LocalizedValue>}
     * @memberof PhoneServiceChannel
     */
    names?: Array<LocalizedValue>;
    /**
     * List of localized service channel descriptions.
     * @type {Array<LocalizedValue>}
     * @memberof PhoneServiceChannel
     */
    descriptions?: Array<LocalizedValue>;
    /**
     * List of phone numbers for the service channel.
     * @type {Array<Phone>}
     * @memberof PhoneServiceChannel
     */
    phoneNumbers?: Array<Phone>;
    /**
     * List of support email addresses for the service channel.
     * @type {Array<Email>}
     * @memberof PhoneServiceChannel
     */
    supportEmails?: Array<Email>;
    /**
     * List of languages the service channel is available in (two letter language code).
     * @type {Array<string>}
     * @memberof PhoneServiceChannel
     */
    languages?: Array<string>;
    /**
     * List of service channel web pages.
     * @type {Array<WebPage>}
     * @memberof PhoneServiceChannel
     */
    webPages?: Array<WebPage>;
    /**
     * List of service channel service hours.
     * @type {Array<ServiceHour>}
     * @memberof PhoneServiceChannel
     */
    serviceHours?: Array<ServiceHour>;
    /**
     * Service channel publishing status. Values: Draft, Published, Deleted, Modified or OldPublished.
     * @type {string}
     * @memberof PhoneServiceChannel
     */
    publishingStatus?: string;
    /**
     * Area type (WholeCountry, WholeCountryExceptAlandIslands, AreaType).
     * @type {string}
     * @memberof PhoneServiceChannel
     */
    areaType?: string;
    /**
     * List of organization areas.
     * @type {Array<Area>}
     * @memberof PhoneServiceChannel
     */
    areas?: Array<Area>;
}

/**
 * 
 * @export
 * @interface PrintableFormServiceChannel
 */
export interface PrintableFormServiceChannel {
    /**
     * Identifier for the service channel.
     * @type {string}
     * @memberof PrintableFormServiceChannel
     */
    id?: string;
    /**
     * Organization identifier responsible for the channel.
     * @type {string}
     * @memberof PrintableFormServiceChannel
     */
    organizationId?: string;
    /**
     * Localized list of service channel names.
     * @type {Array<LocalizedValue>}
     * @memberof PrintableFormServiceChannel
     */
    names?: Array<LocalizedValue>;
    /**
     * List of localized service channel descriptions.
     * @type {Array<LocalizedValue>}
     * @memberof PrintableFormServiceChannel
     */
    descriptions?: Array<LocalizedValue>;
    /**
     * List of localized form identifier. One per language.
     * @type {Array<LocalizedValue>}
     * @memberof PrintableFormServiceChannel
     */
    formIdentifier?: Array<LocalizedValue>;
    /**
     * List of localized form receiver. One per language.
     * @type {Array<LocalizedValue>}
     * @memberof PrintableFormServiceChannel
     */
    formReceiver?: Array<LocalizedValue>;
    /**
     * Form delivery address.
     * @type {Address}
     * @memberof PrintableFormServiceChannel
     */
    deliveryAddress?: Address;
    /**
     * List of localized channel urls.
     * @type {Array<LocalizedValue>}
     * @memberof PrintableFormServiceChannel
     */
    channelUrls?: Array<LocalizedValue>;
    /**
     * List of attachments.
     * @type {Array<ServiceChannelAttachment>}
     * @memberof PrintableFormServiceChannel
     */
    attachments?: Array<ServiceChannelAttachment>;
    /**
     * List of support phone numbers for the service channel.
     * @type {Array<Phone>}
     * @memberof PrintableFormServiceChannel
     */
    supportPhones?: Array<Phone>;
    /**
     * List of support email addresses for the service channel.
     * @type {Array<Email>}
     * @memberof PrintableFormServiceChannel
     */
    supportEmails?: Array<Email>;
    /**
     * List of languages the service channel is available in (two letter language code).
     * @type {Array<string>}
     * @memberof PrintableFormServiceChannel
     */
    languages?: Array<string>;
    /**
     * List of service channel web pages.
     * @type {Array<WebPage>}
     * @memberof PrintableFormServiceChannel
     */
    webPages?: Array<WebPage>;
    /**
     * List of service channel service hours.
     * @type {Array<ServiceHour>}
     * @memberof PrintableFormServiceChannel
     */
    serviceHours?: Array<ServiceHour>;
    /**
     * Service channel publishing status. Values: Draft, Published, Deleted, Modified or OldPublished.
     * @type {string}
     * @memberof PrintableFormServiceChannel
     */
    publishingStatus?: string;
    /**
     * Area type (WholeCountry, WholeCountryExceptAlandIslands, AreaType).
     * @type {string}
     * @memberof PrintableFormServiceChannel
     */
    areaType?: string;
    /**
     * List of service channel areas.
     * @type {Array<Area>}
     * @memberof PrintableFormServiceChannel
     */
    areas?: Array<Area>;
}

/**
 * 
 * @export
 * @interface Route
 */
export interface Route {
    /**
     * 
     * @type {string}
     * @memberof Route
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Route
     */
    agencyId?: string;
    /**
     * 
     * @type {string}
     * @memberof Route
     */
    shortName?: string;
    /**
     * 
     * @type {string}
     * @memberof Route
     */
    longName?: string;
}

/**
 * 
 * @export
 * @interface Schedule
 */
export interface Schedule {
    /**
     * 
     * @type {string}
     * @memberof Schedule
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Schedule
     */
    name?: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof Schedule
     */
    days?: Array<number>;
    /**
     * 
     * @type {Array<ScheduleException>}
     * @memberof Schedule
     */
    exceptions?: Array<ScheduleException>;
    /**
     * 
     * @type {Date}
     * @memberof Schedule
     */
    startDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Schedule
     */
    endDate?: Date;
}

/**
 * 
 * @export
 * @interface ScheduleException
 */
export interface ScheduleException {
    /**
     * 
     * @type {string}
     * @memberof ScheduleException
     */
    type?: string;
    /**
     * 
     * @type {Date}
     * @memberof ScheduleException
     */
    date?: Date;
}

/**
 * 
 * @export
 * @interface Service
 */
export interface Service {
    /**
     * 
     * @type {string}
     * @memberof Service
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Service
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof Service
     */
    statutoryDescriptionId?: string;
    /**
     * 
     * @type {string}
     * @memberof Service
     */
    chargeType?: string;
    /**
     * Service funding type. Possible values are: PubliclyFunded or MarketFunded.
     * @type {string}
     * @memberof Service
     */
    fundingType?: string;
    /**
     * 
     * @type {Array<LocalizedValue>}
     * @memberof Service
     */
    names?: Array<LocalizedValue>;
    /**
     * Area type (WholeCountry, WholeCountryExceptAlandIslands, AreaType).
     * @type {string}
     * @memberof Service
     */
    areaType?: string;
    /**
     * List of service areas.
     * @type {Array<Area>}
     * @memberof Service
     */
    areas?: Array<Area>;
    /**
     * 
     * @type {Array<LocalizedValue>}
     * @memberof Service
     */
    descriptions?: Array<LocalizedValue>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Service
     */
    languages?: Array<string>;
    /**
     * 
     * @type {Array<OntologyItem>}
     * @memberof Service
     */
    serviceClasses?: Array<OntologyItem>;
    /**
     * 
     * @type {Array<OntologyItem>}
     * @memberof Service
     */
    ontologyTerms?: Array<OntologyItem>;
    /**
     * 
     * @type {Array<OntologyItem>}
     * @memberof Service
     */
    targetGroups?: Array<OntologyItem>;
    /**
     * 
     * @type {Array<OntologyItem>}
     * @memberof Service
     */
    lifeEvents?: Array<OntologyItem>;
    /**
     * 
     * @type {Array<OntologyItem>}
     * @memberof Service
     */
    industrialClasses?: Array<OntologyItem>;
    /**
     * List of laws related to the service.
     * @type {Array<Law>}
     * @memberof Service
     */
    legislation?: Array<Law>;
    /**
     * List of localized service keywords.
     * @type {Array<LocalizedValue>}
     * @memberof Service
     */
    keywords?: Array<LocalizedValue>;
    /**
     * 
     * @type {Array<LocalizedValue>}
     * @memberof Service
     */
    requirements?: Array<LocalizedValue>;
    /**
     * Publishing status. Possible values are: Draft, Published, Deleted, Modified or OldPublished.
     * @type {string}
     * @memberof Service
     */
    publishingStatus?: string;
    /**
     * 
     * @type {Array<ServiceOrganization>}
     * @memberof Service
     */
    organizations?: Array<ServiceOrganization>;
    /**
     * List of service vouchers.
     * @type {Array<ServiceVoucher>}
     * @memberof Service
     */
    vouchers?: Array<ServiceVoucher>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Service
     */
    electronicServiceChannelIds?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Service
     */
    phoneServiceChannelIds?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Service
     */
    printableFormServiceChannelIds?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Service
     */
    serviceLocationServiceChannelIds?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Service
     */
    webPageServiceChannelIds?: Array<string>;
}

/**
 * 
 * @export
 * @interface ServiceChannelAttachment
 */
export interface ServiceChannelAttachment {
    /**
     * 
     * @type {string}
     * @memberof ServiceChannelAttachment
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof ServiceChannelAttachment
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof ServiceChannelAttachment
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof ServiceChannelAttachment
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof ServiceChannelAttachment
     */
    language?: string;
}

/**
 * 
 * @export
 * @interface ServiceHour
 */
export interface ServiceHour {
    /**
     * 
     * @type {string}
     * @memberof ServiceHour
     */
    serviceHourType?: string;
    /**
     * Date time where from this entry is valid.
     * @type {Date}
     * @memberof ServiceHour
     */
    validFrom?: Date;
    /**
     * Date time to this entry is valid.
     * @type {Date}
     * @memberof ServiceHour
     */
    validTo?: Date;
    /**
     * Set to true to present a time between the valid from and to times as closed.
     * @type {boolean}
     * @memberof ServiceHour
     */
    isClosed?: boolean;
    /**
     * Set to true to present that this entry is valid for now.
     * @type {boolean}
     * @memberof ServiceHour
     */
    validForNow?: boolean;
    /**
     * Localized list of additional information.
     * @type {Array<LocalizedValue>}
     * @memberof ServiceHour
     */
    additionalInformation?: Array<LocalizedValue>;
    /**
     * List of servicing hours (open and closes times).
     * @type {Array<DailyOpeningTime>}
     * @memberof ServiceHour
     */
    openingHour?: Array<DailyOpeningTime>;
}

/**
 * 
 * @export
 * @interface ServiceLocationServiceChannel
 */
export interface ServiceLocationServiceChannel {
    /**
     * Identifier for the service channel.
     * @type {string}
     * @memberof ServiceLocationServiceChannel
     */
    id?: string;
    /**
     * Organization identifier responsible for the channel.
     * @type {string}
     * @memberof ServiceLocationServiceChannel
     */
    organizationId?: string;
    /**
     * Localized list of service channel names.
     * @type {Array<LocalizedValue>}
     * @memberof ServiceLocationServiceChannel
     */
    names?: Array<LocalizedValue>;
    /**
     * List of localized service channel descriptions.
     * @type {Array<LocalizedValue>}
     * @memberof ServiceLocationServiceChannel
     */
    descriptions?: Array<LocalizedValue>;
    /**
     * List of phone numbers for the service channel. Includes also fax numbers.
     * @type {Array<Phone>}
     * @memberof ServiceLocationServiceChannel
     */
    phoneNumbers?: Array<Phone>;
    /**
     * List email addresses for the service channel.
     * @type {Array<Email>}
     * @memberof ServiceLocationServiceChannel
     */
    emails?: Array<Email>;
    /**
     * List of languages the service channel is available in (two letter language code).
     * @type {Array<string>}
     * @memberof ServiceLocationServiceChannel
     */
    languages?: Array<string>;
    /**
     * DEPRECATED. DO NOT USE!
     * @type {boolean}
     * @memberof ServiceLocationServiceChannel
     */
    phoneServiceCharge?: boolean;
    /**
     * List of service channel web pages.
     * @type {Array<WebPage>}
     * @memberof ServiceLocationServiceChannel
     */
    webPages?: Array<WebPage>;
    /**
     * Area type (WholeCountry, WholeCountryExceptAlandIslands, AreaType).
     * @type {string}
     * @memberof ServiceLocationServiceChannel
     */
    areaType?: string;
    /**
     * List of service channel areas.
     * @type {Array<Area>}
     * @memberof ServiceLocationServiceChannel
     */
    areas?: Array<Area>;
    /**
     * List of service location addresses.
     * @type {Array<Address>}
     * @memberof ServiceLocationServiceChannel
     */
    addresses?: Array<Address>;
    /**
     * List of service channel service hours.
     * @type {Array<ServiceHour>}
     * @memberof ServiceLocationServiceChannel
     */
    serviceHours?: Array<ServiceHour>;
    /**
     * Service channel publishing status. Values: Draft, Published, Deleted, Modified or OldPublished.
     * @type {string}
     * @memberof ServiceLocationServiceChannel
     */
    publishingStatus?: string;
}

/**
 * Service organization
 * @export
 * @interface ServiceOrganization
 */
export interface ServiceOrganization {
    /**
     * Localized list of additional information.
     * @type {Array<LocalizedValue>}
     * @memberof ServiceOrganization
     */
    additionalInformation?: Array<LocalizedValue>;
    /**
     * Organization identifier (organization related to the service). Required if role type is Responsible or if ProvisionType is SelfProduced.
     * @type {string}
     * @memberof ServiceOrganization
     */
    organizationId?: string;
    /**
     * Role type, valid values Responsible or Producer.
     * @type {string}
     * @memberof ServiceOrganization
     */
    roleType?: string;
    /**
     * Provision type, valid values SelfProduced, VoucherServices, PurchaseServices or Other. Required if RoleType value is Producer.
     * @type {string}
     * @memberof ServiceOrganization
     */
    provisionType?: string;
    /**
     * DEPRECATED. DO NOT USE
     * @type {Array<WebPage>}
     * @memberof ServiceOrganization
     */
    webPages?: Array<WebPage>;
}

/**
 * Service voucher
 * @export
 * @interface ServiceVoucher
 */
export interface ServiceVoucher {
    /**
     * Name of the service voucher.
     * @type {string}
     * @memberof ServiceVoucher
     */
    value?: string;
    /**
     * Language code.
     * @type {string}
     * @memberof ServiceVoucher
     */
    language: string;
    /**
     * Web page url
     * @type {string}
     * @memberof ServiceVoucher
     */
    url?: string;
    /**
     * Service voucher additional information
     * @type {string}
     * @memberof ServiceVoucher
     */
    additionalInformation?: string;
}

/**
 * 
 * @export
 * @interface Shortlink
 */
export interface Shortlink {
    /**
     * 
     * @type {string}
     * @memberof Shortlink
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Shortlink
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof Shortlink
     */
    path?: string;
    /**
     * 
     * @type {string}
     * @memberof Shortlink
     */
    url?: string;
}

/**
 * 
 * @export
 * @interface Stop
 */
export interface Stop {
    /**
     * 
     * @type {string}
     * @memberof Stop
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Stop
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof Stop
     */
    lat?: number;
    /**
     * 
     * @type {number}
     * @memberof Stop
     */
    lng?: number;
}

/**
 * 
 * @export
 * @interface StopTime
 */
export interface StopTime {
    /**
     * 
     * @type {string}
     * @memberof StopTime
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof StopTime
     */
    tripId?: string;
    /**
     * 
     * @type {string}
     * @memberof StopTime
     */
    stopId?: string;
    /**
     * 
     * @type {number}
     * @memberof StopTime
     */
    arrivalTime?: number;
    /**
     * 
     * @type {number}
     * @memberof StopTime
     */
    departureTime?: number;
    /**
     * 
     * @type {number}
     * @memberof StopTime
     */
    sequency?: number;
    /**
     * 
     * @type {number}
     * @memberof StopTime
     */
    distanceTraveled?: number;
}

/**
 * 
 * @export
 * @interface Tile
 */
export interface Tile {
    /**
     * 
     * @type {string}
     * @memberof Tile
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Tile
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Tile
     */
    contents?: string;
    /**
     * 
     * @type {string}
     * @memberof Tile
     */
    link?: string;
}

/**
 * 
 * @export
 * @interface Trip
 */
export interface Trip {
    /**
     * 
     * @type {string}
     * @memberof Trip
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Trip
     */
    routeId?: string;
    /**
     * 
     * @type {string}
     * @memberof Trip
     */
    scheduleId?: string;
    /**
     * 
     * @type {string}
     * @memberof Trip
     */
    headsign?: string;
}

/**
 * 
 * @export
 * @interface WebPage
 */
export interface WebPage {
    /**
     * Web page description.
     * @type {string}
     * @memberof WebPage
     */
    description?: string;
    /**
     * Web page url.
     * @type {string}
     * @memberof WebPage
     */
    url?: string;
    /**
     * Language code.
     * @type {string}
     * @memberof WebPage
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof WebPage
     */
    value?: string;
    /**
     * 
     * @type {string}
     * @memberof WebPage
     */
    type?: string;
}

/**
 * 
 * @export
 * @interface WebPageServiceChannel
 */
export interface WebPageServiceChannel {
    /**
     * Identifier for the service channel.
     * @type {string}
     * @memberof WebPageServiceChannel
     */
    id?: string;
    /**
     * Organization identifier responsible for the channel.
     * @type {string}
     * @memberof WebPageServiceChannel
     */
    organizationId?: string;
    /**
     * Localized list of service channel names.
     * @type {Array<LocalizedValue>}
     * @memberof WebPageServiceChannel
     */
    names?: Array<LocalizedValue>;
    /**
     * List of localized service channel descriptions.
     * @type {Array<LocalizedValue>}
     * @memberof WebPageServiceChannel
     */
    descriptions?: Array<LocalizedValue>;
    /**
     * List of localized urls.
     * @type {Array<LocalizedValue>}
     * @memberof WebPageServiceChannel
     */
    urls?: Array<LocalizedValue>;
    /**
     * List of support phone numbers for the service channel.
     * @type {Array<Phone>}
     * @memberof WebPageServiceChannel
     */
    supportPhones?: Array<Phone>;
    /**
     * List of support email addresses for the service channel.
     * @type {Array<Email>}
     * @memberof WebPageServiceChannel
     */
    supportEmails?: Array<Email>;
    /**
     * List of languages the service channel is available in (two letter language code).
     * @type {Array<string>}
     * @memberof WebPageServiceChannel
     */
    languages?: Array<string>;
    /**
     * List of service channel web pages.
     * @type {Array<WebPage>}
     * @memberof WebPageServiceChannel
     */
    webPages?: Array<WebPage>;
    /**
     * List of service channel service hours.
     * @type {Array<ServiceHour>}
     * @memberof WebPageServiceChannel
     */
    serviceHours?: Array<ServiceHour>;
    /**
     * Service channel publishing status. Values: Draft, Published, Deleted, Modified or OldPublished.
     * @type {string}
     * @memberof WebPageServiceChannel
     */
    publishingStatus?: string;
}