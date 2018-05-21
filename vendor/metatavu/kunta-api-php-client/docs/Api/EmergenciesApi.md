# KuntaAPI\EmergenciesApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationEmergency**](EmergenciesApi.md#findOrganizationEmergency) | **GET** /organizations/{organizationId}/emergencies/{emergencyId} | Returns organizations emergency by id
[**listOrganizationEmergencies**](EmergenciesApi.md#listOrganizationEmergencies) | **GET** /organizations/{organizationId}/emergencies | Lists organizations emergencies


# **findOrganizationEmergency**
> \KuntaAPI\Model\Emergency findOrganizationEmergency($organizationId, $emergencyId)

Returns organizations emergency by id

Returns organizations emergency by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\EmergenciesApi();
$organizationId = "organizationId_example"; // string | Organization id
$emergencyId = "emergencyId_example"; // string | Emergency id

try {
    $result = $api_instance->findOrganizationEmergency($organizationId, $emergencyId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling EmergenciesApi->findOrganizationEmergency: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **emergencyId** | **string**| Emergency id |

### Return type

[**\KuntaAPI\Model\Emergency**](../Model/Emergency.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationEmergencies**
> \KuntaAPI\Model\Emergency[] listOrganizationEmergencies($organizationId, $location, $before, $after, $firstResult, $maxResults, $orderBy, $orderDir)

Lists organizations emergencies

Lists organizations emergencies

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\EmergenciesApi();
$organizationId = "organizationId_example"; // string | Organization id
$location = "location_example"; // string | Return emergencies by location
$before = "before_example"; // string | Return emergencies before specified time
$after = "after_example"; // string | Return emergencies after specified time
$firstResult = 56; // int | First index of results
$maxResults = 56; // int | Maximum number of results
$orderBy = "orderBy_example"; // string | Define order (NATURAL, START)
$orderDir = "orderDir_example"; // string | Order direction (ASC, DESC). Default is ASC

try {
    $result = $api_instance->listOrganizationEmergencies($organizationId, $location, $before, $after, $firstResult, $maxResults, $orderBy, $orderDir);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling EmergenciesApi->listOrganizationEmergencies: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **location** | **string**| Return emergencies by location | [optional]
 **before** | **string**| Return emergencies before specified time | [optional]
 **after** | **string**| Return emergencies after specified time | [optional]
 **firstResult** | **int**| First index of results | [optional]
 **maxResults** | **int**| Maximum number of results | [optional]
 **orderBy** | **string**| Define order (NATURAL, START) | [optional]
 **orderDir** | **string**| Order direction (ASC, DESC). Default is ASC | [optional]

### Return type

[**\KuntaAPI\Model\Emergency[]**](../Model/Emergency.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

