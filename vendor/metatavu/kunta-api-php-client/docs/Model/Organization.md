# Organization

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Entity identifier. | [optional] 
**parentOrganization** | **string** | Organizations parent organization identifier if exists. | [optional] 
**organizationType** | **string** | Organization type (State, Municipality, RegionalOrganization, Organization, Company). | [optional] 
**municipality** | [**\KuntaAPI\Model\Municipality**](Municipality.md) | Municipality including municipality code and a localized list of municipality names. | [optional] 
**businessCode** | **string** | Organization business code (Y-tunnus). | [optional] 
**businessName** | **string** | Organization business name (name used for business code). | [optional] 
**names** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of organization names. | [optional] 
**displayNameType** | [**\KuntaAPI\Model\NameTypeByLanguage[]**](NameTypeByLanguage.md) | List of Display name types (Name or AlternateName) for each language version of OrganizationNames. | [optional] 
**areaType** | **string** | Area type (WholeCountry, WholeCountryExceptAlandIslands, AreaType). | [optional] 
**areas** | [**\KuntaAPI\Model\Area[]**](Area.md) | List of organization areas. | [optional] 
**descriptions** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | List of organizations descriptions. | [optional] 
**emailAddresses** | [**\KuntaAPI\Model\Email[]**](Email.md) | List of organizations email addresses. | [optional] 
**phoneNumbers** | [**\KuntaAPI\Model\Phone[]**](Phone.md) | List of organizations phone numbers. | [optional] 
**webPages** | [**\KuntaAPI\Model\WebPage[]**](WebPage.md) | List of organizations web pages. | [optional] 
**addresses** | [**\KuntaAPI\Model\Address[]**](Address.md) | List of organizations addresses. | [optional] 
**publishingStatus** | **string** | Publishing status (Draft, Published, Deleted, Modified and OldPublished). | [optional] 
**services** | [**\KuntaAPI\Model\OrganizationService[]**](OrganizationService.md) | List of organizations services. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


