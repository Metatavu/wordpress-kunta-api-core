# KuntaAPI\WebPageChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findServiceWebPageChannel**](WebPageChannelsApi.md#findServiceWebPageChannel) | **GET** /services/{serviceId}/webPageChannels/{webPageChannelId} | finds WebPageChannel by webPageChannelId
[**listServiceWebPageChannels**](WebPageChannelsApi.md#listServiceWebPageChannels) | **GET** /services/{serviceId}/webPageChannels | Lists WebPageChannels by serviceId


# **findServiceWebPageChannel**
> \KuntaAPI\Model\WebPageServiceChannel findServiceWebPageChannel($serviceId, $webPageChannelId)

finds WebPageChannel by webPageChannelId

finds WebPageChannels by webPageChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\WebPageChannelsApi();
$serviceId = "serviceId_example"; // string | Service id
$webPageChannelId = "webPageChannelId_example"; // string | webPageChannel id

try {
    $result = $api_instance->findServiceWebPageChannel($serviceId, $webPageChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebPageChannelsApi->findServiceWebPageChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **webPageChannelId** | **string**| webPageChannel id |

### Return type

[**\KuntaAPI\Model\WebPageServiceChannel**](../Model/WebPageServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceWebPageChannels**
> \KuntaAPI\Model\WebPageServiceChannel[] listServiceWebPageChannels($serviceId, $firstResult, $maxResults)

Lists WebPageChannels by serviceId

Lists WebPageChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\WebPageChannelsApi();
$serviceId = "serviceId_example"; // string | Service id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServiceWebPageChannels($serviceId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebPageChannelsApi->listServiceWebPageChannels: ', $e->getMessage(), PHP_EOL;
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

[**\KuntaAPI\Model\WebPageServiceChannel[]**](../Model/WebPageServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

