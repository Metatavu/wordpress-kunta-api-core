# Service

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] 
**type** | **string** |  | [optional] 
**statutoryDescriptionId** | **string** |  | [optional] 
**chargeType** | **string** |  | [optional] 
**fundingType** | **string** | Service funding type. Possible values are: PubliclyFunded or MarketFunded. | [optional] 
**names** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) |  | [optional] 
**areaType** | **string** | Area type (WholeCountry, WholeCountryExceptAlandIslands, AreaType). | [optional] 
**areas** | [**\KuntaAPI\Model\Area[]**](Area.md) | List of service areas. | [optional] 
**descriptions** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) |  | [optional] 
**languages** | **string[]** |  | [optional] 
**serviceClasses** | [**\KuntaAPI\Model\OntologyItem[]**](OntologyItem.md) |  | [optional] 
**ontologyTerms** | [**\KuntaAPI\Model\OntologyItem[]**](OntologyItem.md) |  | [optional] 
**targetGroups** | [**\KuntaAPI\Model\OntologyItem[]**](OntologyItem.md) |  | [optional] 
**lifeEvents** | [**\KuntaAPI\Model\OntologyItem[]**](OntologyItem.md) |  | [optional] 
**industrialClasses** | [**\KuntaAPI\Model\OntologyItem[]**](OntologyItem.md) |  | [optional] 
**legislation** | [**\KuntaAPI\Model\Law[]**](Law.md) | List of laws related to the service. | [optional] 
**keywords** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of localized service keywords. | [optional] 
**requirements** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) |  | [optional] 
**publishingStatus** | **string** | Publishing status. Possible values are: Draft, Published, Deleted, Modified or OldPublished. | [optional] 
**organizations** | [**\KuntaAPI\Model\ServiceOrganization[]**](ServiceOrganization.md) |  | [optional] 
**vouchers** | [**\KuntaAPI\Model\ServiceVoucher[]**](ServiceVoucher.md) | List of service vouchers. | [optional] 
**electronicServiceChannelIds** | **string[]** |  | [optional] 
**phoneServiceChannelIds** | **string[]** |  | [optional] 
**printableFormServiceChannelIds** | **string[]** |  | [optional] 
**serviceLocationServiceChannelIds** | **string[]** |  | [optional] 
**webPageServiceChannelIds** | **string[]** |  | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


