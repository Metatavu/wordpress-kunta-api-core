# PrintableFormServiceChannel

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Identifier for the service channel. | [optional] 
**organizationId** | **string** | Organization identifier responsible for the channel. | [optional] 
**names** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | Localized list of service channel names. | [optional] 
**descriptions** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of localized service channel descriptions. | [optional] 
**formIdentifier** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of localized form identifier. One per language. | [optional] 
**formReceiver** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of localized form receiver. One per language. | [optional] 
**deliveryAddress** | [**\KuntaAPI\Model\Address**](Address.md) | Form delivery address. | [optional] 
**channelUrls** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of localized channel urls. | [optional] 
**attachments** | [**\KuntaAPI\Model\ServiceChannelAttachment[]**](ServiceChannelAttachment.md) | List of attachments. | [optional] 
**supportPhones** | [**\KuntaAPI\Model\Phone[]**](Phone.md) | List of support phone numbers for the service channel. | [optional] 
**supportEmails** | [**\KuntaAPI\Model\Email[]**](Email.md) | List of support email addresses for the service channel. | [optional] 
**languages** | **string[]** | List of languages the service channel is available in (two letter language code). | [optional] 
**webPages** | [**\KuntaAPI\Model\WebPage[]**](WebPage.md) | List of service channel web pages. | [optional] 
**serviceHours** | [**\KuntaAPI\Model\ServiceHour[]**](ServiceHour.md) | List of service channel service hours. | [optional] 
**publishingStatus** | **string** | Service channel publishing status. Values: Draft, Published, Deleted, Modified or OldPublished. | [optional] 
**areaType** | **string** | Area type (WholeCountry, WholeCountryExceptAlandIslands, AreaType). | [optional] 
**areas** | [**\KuntaAPI\Model\Area[]**](Area.md) | List of service channel areas. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


