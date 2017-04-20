# ServiceLocationServiceChannel

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Identifier for the service channel. | [optional] 
**organizationId** | **string** | Organization identifier responsible for the channel. | [optional] 
**names** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | Localized list of service channel names. | [optional] 
**descriptions** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of localized service channel descriptions. | [optional] 
**serviceAreaRestricted** | **bool** | Is the service location channel restricted by service area. | [optional] 
**phoneNumbers** | [**\KuntaAPI\Model\Phone[]**](Phone.md) | List of phone numbers for the service channel. Includes also fax numbers. | [optional] 
**emails** | [**\KuntaAPI\Model\Email[]**](Email.md) | List email addresses for the service channel. | [optional] 
**languages** | **string[]** | List of languages the service channel is available in (two letter language code). | [optional] 
**phoneServiceCharge** | **bool** | Is the phone service charged for. | [optional] 
**webPages** | [**\KuntaAPI\Model\WebPage[]**](WebPage.md) | List of service channel web pages. | [optional] 
**serviceAreas** | [**\KuntaAPI\Model\Municipality[]**](Municipality.md) | List of serviceareas. Used when location service channel is restricted by service area (ServiceAreaRestricted&#x3D;true). | [optional] 
**addresses** | [**\KuntaAPI\Model\Address[]**](Address.md) | List of service location addresses. | [optional] 
**serviceHours** | [**\KuntaAPI\Model\ServiceHour[]**](ServiceHour.md) | List of service channel service hours. | [optional] 
**publishingStatus** | **string** | Service channel publishing status. Values: Draft, Published, Deleted, Modified or OldPublished. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


