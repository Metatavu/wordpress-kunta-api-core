# Service

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] 
**type** | **string** |  | [optional] 
**statutoryDescriptionId** | **string** |  | [optional] 
**serviceClasses** | [**\KuntaAPI\Model\OntologyItem[]**](OntologyItem.md) |  | [optional] 
**ontologyTerms** | [**\KuntaAPI\Model\OntologyItem[]**](OntologyItem.md) |  | [optional] 
**targetGroups** | [**\KuntaAPI\Model\OntologyItem[]**](OntologyItem.md) |  | [optional] 
**lifeEvents** | [**\KuntaAPI\Model\OntologyItem[]**](OntologyItem.md) |  | [optional] 
**industrialClasses** | [**\KuntaAPI\Model\OntologyItem[]**](OntologyItem.md) |  | [optional] 
**names** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) |  | [optional] 
**descriptions** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) |  | [optional] 
**languages** | **string[]** |  | [optional] 
**keywords** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of localized service keywords. | [optional] 
**legislation** | [**\KuntaAPI\Model\Law[]**](Law.md) | List of laws related to the service. | [optional] 
**coverageType** | **string** | Service coverage type. Valid values are: Local or Nationwide. | [optional] 
**municipalities** | [**\KuntaAPI\Model\Municipality[]**](Municipality.md) |  | [optional] 
**requirements** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) |  | [optional] 
**publishingStatus** | **string** | Publishing status. Possible values are: Draft, Published, Deleted, Modified or OldPublished. | [optional] 
**chargeType** | **string** |  | [optional] 
**organizations** | [**\KuntaAPI\Model\ServiceOrganization[]**](ServiceOrganization.md) |  | [optional] 
**electronicServiceChannelIds** | **string[]** |  | [optional] 
**phoneServiceChannelIds** | **string[]** |  | [optional] 
**printableFormServiceChannelIds** | **string[]** |  | [optional] 
**serviceLocationServiceChannelIds** | **string[]** |  | [optional] 
**webPageServiceChannelIds** | **string[]** |  | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


