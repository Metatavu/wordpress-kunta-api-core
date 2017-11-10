# KuntaAPI\ShortlinksApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationShortlink**](ShortlinksApi.md#findOrganizationShortlink) | **GET** /organizations/{organizationId}/shortlinks/{shortlinkId} | Finds organization shortlink
[**listOrganizationShortlinks**](ShortlinksApi.md#listOrganizationShortlinks) | **GET** /organizations/{organizationId}/shortlinks | Lists organizations shortlinks


# **findOrganizationShortlink**
> \KuntaAPI\Model\Shortlink findOrganizationShortlink($organizationId, $shortlinkId)

Finds organization shortlink

Finds single organization shortlink

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ShortlinksApi();
$organizationId = "organizationId_example"; // string | Organization id
$shortlinkId = "shortlinkId_example"; // string | shortlink id

try {
    $result = $api_instance->findOrganizationShortlink($organizationId, $shortlinkId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ShortlinksApi->findOrganizationShortlink: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **shortlinkId** | **string**| shortlink id |

### Return type

[**\KuntaAPI\Model\Shortlink**](../Model/Shortlink.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationShortlinks**
> \KuntaAPI\Model\Shortlink[] listOrganizationShortlinks($organizationId, $path, $firstResult, $maxResults)

Lists organizations shortlinks

Lists organizations shortlinks

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ShortlinksApi();
$organizationId = "organizationId_example"; // string | Organization id
$path = "path_example"; // string | Filter results by path
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listOrganizationShortlinks($organizationId, $path, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ShortlinksApi->listOrganizationShortlinks: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **path** | **string**| Filter results by path | [optional]
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\Shortlink[]**](../Model/Shortlink.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

