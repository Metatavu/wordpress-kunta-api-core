# Address

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**latitude** | **string** | Service location latitude coordinate. | [optional] 
**longitude** | **string** | Service location longitude coordinate. | [optional] 
**coordinates** | [**\KuntaAPI\Model\Coordinates**](Coordinates.md) |  | [optional] 
**coordinateState** | **string** | State of coordinates. Coordinates are fetched from a service provided by Maanmittauslaitos (WFS).  Possible values are: Loading, Ok, Failed, NotReceived, EmptyInputReceived, MultipleResultsReceived or WrongFormatReceived. | [optional] 
**type** | **string** | Address type, Visiting or Postal. | [optional] 
**subtype** | **string** | Address sub type, Single, Street, PostOfficeBox, Abroad or Multipoint or NoAddress. | [optional] 
**postOfficeBox** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | Post office box like PL 310 | [optional] 
**postalCode** | **string** | Postal code, for example 00010. | [optional] 
**postOffice** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of localized Post offices, for example Helsinki, Helsingfors. | [optional] 
**streetAddress** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of localized street addresses. | [optional] 
**streetNumber** | **string** | Street number for street address. | [optional] 
**municipality** | [**\KuntaAPI\Model\Municipality**](Municipality.md) |  | [optional] 
**country** | **string** | Country code (ISO 3166-1 alpha-2), for example FI. | [optional] 
**locationAbroad** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | Localized list of foreign address information. | [optional] 
**multipointLocation** | [**\KuntaAPI\Model\Address[]**](Address.md) | Moving address. Includes several street addresses. | [optional] 
**additionalInformations** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | Localized list of additional information about the address. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


