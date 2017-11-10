# KuntaAPI\ServiceLocationChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findServiceServiceLocationChannel**](ServiceLocationChannelsApi.md#findServiceServiceLocationChannel) | **GET** /services/{serviceId}/serviceLocationChannels/{serviceLocationChannelId} | finds ServiceLocationChannel by serviceLocationChannelId
[**listServiceServiceLocationChannels**](ServiceLocationChannelsApi.md#listServiceServiceLocationChannels) | **GET** /services/{serviceId}/serviceLocationChannels | Lists ServiceLocationChannels by serviceId


# **findServiceServiceLocationChannel**
> \KuntaAPI\Model\ServiceLocationServiceChannel findServiceServiceLocationChannel($serviceId, $serviceLocationChannelId)

finds ServiceLocationChannel by serviceLocationChannelId

finds ServiceLocationChannels by serviceLocationChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceLocationChannelsApi();
$serviceId = "serviceId_example"; // string | Service id
$serviceLocationChannelId = "serviceLocationChannelId_example"; // string | serviceLocationChannel id

try {
    $result = $api_instance->findServiceServiceLocationChannel($serviceId, $serviceLocationChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceLocationChannelsApi->findServiceServiceLocationChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **serviceLocationChannelId** | **string**| serviceLocationChannel id |

### Return type

[**\KuntaAPI\Model\ServiceLocationServiceChannel**](../Model/ServiceLocationServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceServiceLocationChannels**
> \KuntaAPI\Model\ServiceLocationServiceChannel[] listServiceServiceLocationChannels($serviceId, $firstResult, $maxResults)

Lists ServiceLocationChannels by serviceId

Lists ServiceLocationChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceLocationChannelsApi();
$serviceId = "serviceId_example"; // string | Service id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServiceServiceLocationChannels($serviceId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceLocationChannelsApi->listServiceServiceLocationChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\ServiceLocationServiceChannel[]**](../Model/ServiceLocationServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

