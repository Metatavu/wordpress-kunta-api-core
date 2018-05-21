# KuntaAPI\OrganizationsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganization**](OrganizationsApi.md#findOrganization) | **GET** /organizations/{organizationId} | Find organization
[**listOrganizations**](OrganizationsApi.md#listOrganizations) | **GET** /organizations | List organizations


# **findOrganization**
> \KuntaAPI\Model\Organization findOrganization($organizationId)

Find organization

Find organization

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\OrganizationsApi();
$organizationId = "organizationId_example"; // string | organization id

try {
    $result = $api_instance->findOrganization($organizationId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling OrganizationsApi->findOrganization: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| organization id |

### Return type

[**\KuntaAPI\Model\Organization**](../Model/Organization.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizations**
> \KuntaAPI\Model\Organization[] listOrganizations($businessName, $businessCode, $search, $sortBy, $sortDir, $firstResult, $maxResults)

List organizations

List organizations

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\OrganizationsApi();
$businessName = "businessName_example"; // string | Filter by organization's business name
$businessCode = "businessCode_example"; // string | Filter by organization's business code
$search = "search_example"; // string | Search organizations by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listOrganizations($businessName, $businessCode, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling OrganizationsApi->listOrganizations: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **businessName** | **string**| Filter by organization&#39;s business name | [optional]
 **businessCode** | **string**| Filter by organization&#39;s business code | [optional]
 **search** | **string**| Search organizations by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL or SCORE). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\Organization[]**](../Model/Organization.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

