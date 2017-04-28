# OrganizationService

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**additionalInformation** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | Localized list of additional information. | [optional] 
**serviceId** | **string** | Service identifier. | [optional] 
**organizationId** | **string** | Organization identifier (organization related to the service). | [optional] 
**roleType** | **string** | Role type, valid values Responsible or Producer. | [optional] 
**provisionType** | **string** | Provision type, valid values SelfProduced, VoucherServices, PurchaseServices or Other. Required if RoleType value is Producer. | [optional] 
**webPages** | [**\KuntaAPI\Model\WebPage[]**](WebPage.md) | List of web pages. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


