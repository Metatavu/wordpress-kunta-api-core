# KuntaAPI\FragmentsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationFragment**](FragmentsApi.md#findOrganizationFragment) | **GET** /organizations/{organizationId}/fragments/{fragmentId} | Finds organizations page fragment
[**listOrganizationFragments**](FragmentsApi.md#listOrganizationFragments) | **GET** /organizations/{organizationId}/fragments | Lists organizations page fragments


# **findOrganizationFragment**
> \KuntaAPI\Model\Fragment findOrganizationFragment($organizationId, $fragmentId)

Finds organizations page fragment

Finds single organization page fragment

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\FragmentsApi();
$organizationId = "organizationId_example"; // string | Organization id
$fragmentId = "fragmentId_example"; // string | fragment id

try {
    $result = $api_instance->findOrganizationFragment($organizationId, $fragmentId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling FragmentsApi->findOrganizationFragment: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **fragmentId** | **string**| fragment id |

### Return type

[**\KuntaAPI\Model\Fragment**](../Model/Fragment.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationFragments**
> \KuntaAPI\Model\Fragment[] listOrganizationFragments($organizationId, $slug)

Lists organizations page fragments

Lists organizations page fragments

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\FragmentsApi();
$organizationId = "organizationId_example"; // string | Organization id
$slug = "slug_example"; // string | Filter results by fragment slug

try {
    $result = $api_instance->listOrganizationFragments($organizationId, $slug);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling FragmentsApi->listOrganizationFragments: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **slug** | **string**| Filter results by fragment slug | [optional]

### Return type

[**\KuntaAPI\Model\Fragment[]**](../Model/Fragment.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

