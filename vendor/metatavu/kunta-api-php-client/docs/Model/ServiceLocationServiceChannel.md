# ServiceLocationServiceChannel

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Identifier for the service channel. | [optional] 
**organizationId** | **string** | Organization identifier responsible for the channel. | [optional] 
**names** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | Localized list of service channel names. | [optional] 
**descriptions** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of localized service channel descriptions. | [optional] 
**phoneNumbers** | [**\KuntaAPI\Model\Phone[]**](Phone.md) | List of phone numbers for the service channel. Includes also fax numbers. | [optional] 
**emails** | [**\KuntaAPI\Model\Email[]**](Email.md) | List email addresses for the service channel. | [optional] 
**languages** | **string[]** | List of languages the service channel is available in (two letter language code). | [optional] 
**phoneServiceCharge** | **bool** | DEPRECATED. DO NOT USE! | [optional] 
**webPages** | [**\KuntaAPI\Model\WebPage[]**](WebPage.md) | List of service channel web pages. | [optional] 
**areaType** | **string** | Area type (WholeCountry, WholeCountryExceptAlandIslands, AreaType). | [optional] 
**areas** | [**\KuntaAPI\Model\Area[]**](Area.md) | List of service channel areas. | [optional] 
**addresses** | [**\KuntaAPI\Model\Address[]**](Address.md) | List of service location addresses. | [optional] 
**serviceHours** | [**\KuntaAPI\Model\ServiceHour[]**](ServiceHour.md) | List of service channel service hours. | [optional] 
**publishingStatus** | **string** | Service channel publishing status. Values: Draft, Published, Deleted, Modified or OldPublished. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


