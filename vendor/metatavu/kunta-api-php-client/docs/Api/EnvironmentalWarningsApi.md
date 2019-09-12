# KuntaAPI\EnvironmentalWarningsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationEnvironmentalWarning**](EnvironmentalWarningsApi.md#findOrganizationEnvironmentalWarning) | **GET** /organizations/{organizationId}/environmentalWarnings/{environmentalWarningId} | Returns organizations environmental warning by id
[**listOrganizationEnvironmentalWarnings**](EnvironmentalWarningsApi.md#listOrganizationEnvironmentalWarnings) | **GET** /organizations/{organizationId}/environmentalWarnings | Lists organizations environmentalWarnings


# **findOrganizationEnvironmentalWarning**
> \KuntaAPI\Model\EnvironmentalWarning findOrganizationEnvironmentalWarning($organizationId, $environmentalWarningId)

Returns organizations environmental warning by id

Returns organizations environmental warning by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\EnvironmentalWarningsApi();
$organizationId = "organizationId_example"; // string | Organization id
$environmentalWarningId = "environmentalWarningId_example"; // string | Environmental warning id

try {
    $result = $api_instance->findOrganizationEnvironmentalWarning($organizationId, $environmentalWarningId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling EnvironmentalWarningsApi->findOrganizationEnvironmentalWarning: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **environmentalWarningId** | **string**| Environmental warning id |

### Return type

[**\KuntaAPI\Model\EnvironmentalWarning**](../Model/EnvironmentalWarning.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationEnvironmentalWarnings**
> \KuntaAPI\Model\EnvironmentalWarning[] listOrganizationEnvironmentalWarnings($organizationId, $firstResult, $contexts, $startBefore, $startAfter, $maxResults, $sortBy, $sortDir)

Lists organizations environmentalWarnings

Lists organizations environmentalWarnings

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\EnvironmentalWarningsApi();
$organizationId = "organizationId_example"; // string | Organization id
$firstResult = 56; // int | First index of results
$contexts = "contexts_example"; // string | Return environmental warnings by contexts.
$startBefore = "startBefore_example"; // string | Return environmental warnings starting before specified time
$startAfter = "startAfter_example"; // string | Return environmental warnings starting after specified time
$maxResults = 56; // int | Maximum number of results
$sortBy = "sortBy_example"; // string | define order (NATURAL, START). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC

try {
    $result = $api_instance->listOrganizationEnvironmentalWarnings($organizationId, $firstResult, $contexts, $startBefore, $startAfter, $maxResults, $sortBy, $sortDir);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling EnvironmentalWarningsApi->listOrganizationEnvironmentalWarnings: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **firstResult** | **int**| First index of results | [optional]
 **contexts** | **string**| Return environmental warnings by contexts. | [optional]
 **startBefore** | **string**| Return environmental warnings starting before specified time | [optional]
 **startAfter** | **string**| Return environmental warnings starting after specified time | [optional]
 **maxResults** | **int**| Maximum number of results | [optional]
 **sortBy** | **string**| define order (NATURAL, START). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]

### Return type

[**\KuntaAPI\Model\EnvironmentalWarning[]**](../Model/EnvironmentalWarning.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

