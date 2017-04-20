# Organization

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Entity identifier. | [optional] 
**municipality** | [**\KuntaAPI\Model\Municipality**](Municipality.md) | Municipality including municipality code and a localized list of municipality names. | [optional] 
**organizationType** | **string** | Organization type (State, Municipality, RegionalOrganization, Organization, Company). | [optional] 
**businessCode** | **string** | Organization business code (Y-tunnus). | [optional] 
**businessName** | **string** | Organization business name (name used for business code). | [optional] 
**names** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of organization names. | [optional] 
**displayNameType** | **string** | Display name type (Name or AlternateName). Which name type should be used as the display name for the organization (OrganizationNames list). | [optional] 
**descriptions** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of organizations descriptions. | [optional] 
**emailAddresses** | [**\KuntaAPI\Model\Email[]**](Email.md) | List of organizations email addresses. | [optional] 
**phoneNumbers** | [**\KuntaAPI\Model\Phone[]**](Phone.md) | List of organizations phone numbers. | [optional] 
**webPages** | [**\KuntaAPI\Model\WebPage[]**](WebPage.md) | List of organizations web pages. | [optional] 
**addresses** | [**\KuntaAPI\Model\Address[]**](Address.md) | List of organizations addresses. | [optional] 
**publishingStatus** | **string** | Publishing status (Draft, Published, Deleted, Modified and OldPublished). | [optional] 
**parentOrganization** | **string** | Organizations parent organization identifier if exists. | [optional] 
**services** | [**\KuntaAPI\Model\OrganizationService[]**](OrganizationService.md) | List of organizations services. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


