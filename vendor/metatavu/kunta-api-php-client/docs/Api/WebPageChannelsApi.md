# KuntaAPI\WebPageChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createServiceWebPageChannel**](WebPageChannelsApi.md#createServiceWebPageChannel) | **POST** /services/{serviceId}/webPageChannels | creates WebPageChannel
[**findServiceWebPageChannel**](WebPageChannelsApi.md#findServiceWebPageChannel) | **GET** /services/{serviceId}/webPageChannels/{webPageChannelId} | finds WebPageChannel by webPageChannelId
[**listServiceWebPageChannels**](WebPageChannelsApi.md#listServiceWebPageChannels) | **GET** /services/{serviceId}/webPageChannels | Lists WebPageChannels by serviceId
[**updateWebPageChannel**](WebPageChannelsApi.md#updateWebPageChannel) | **PUT** /services/{serviceId}/webPageChannels/{webPageChannelId} | Updates WebPageChannel


# **createServiceWebPageChannel**
> \KuntaAPI\Model\WebPageChannel createServiceWebPageChannel($serviceId, $body)

creates WebPageChannel

creates WebPageChannel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\WebPageChannelsApi();
$serviceId = "serviceId_example"; // string | service id
$body = new \KuntaAPI\Model\WebPageChannel(); // \KuntaAPI\Model\WebPageChannel | Payload

try {
    $result = $api_instance->createServiceWebPageChannel($serviceId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebPageChannelsApi->createServiceWebPageChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| service id |
 **body** | [**\KuntaAPI\Model\WebPageChannel**](../Model/\KuntaAPI\Model\WebPageChannel.md)| Payload |

### Return type

[**\KuntaAPI\Model\WebPageChannel**](../Model/WebPageChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServiceWebPageChannel**
> \KuntaAPI\Model\WebPageChannel findServiceWebPageChannel($serviceId, $webPageChannelId)

finds WebPageChannel by webPageChannelId

finds WebPageChannels by webPageChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

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

[**\KuntaAPI\Model\WebPageChannel**](../Model/WebPageChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceWebPageChannels**
> \KuntaAPI\Model\WebPageChannel[] listServiceWebPageChannels($serviceId, $firstResult, $maxResults)

Lists WebPageChannels by serviceId

Lists WebPageChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

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

[**\KuntaAPI\Model\WebPageChannel[]**](../Model/WebPageChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updateWebPageChannel**
> \KuntaAPI\Model\WebPageChannel updateWebPageChannel($serviceId, $webPageChannelId, $body)

Updates WebPageChannel

Updates WebPageChannel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\WebPageChannelsApi();
$serviceId = "serviceId_example"; // string | service id
$webPageChannelId = "webPageChannelId_example"; // string | webPageChannel id
$body = new \KuntaAPI\Model\WebPageChannel(); // \KuntaAPI\Model\WebPageChannel | Payload

try {
    $result = $api_instance->updateWebPageChannel($serviceId, $webPageChannelId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebPageChannelsApi->updateWebPageChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| service id |
 **webPageChannelId** | **string**| webPageChannel id |
 **body** | [**\KuntaAPI\Model\WebPageChannel**](../Model/\KuntaAPI\Model\WebPageChannel.md)| Payload |

### Return type

[**\KuntaAPI\Model\WebPageChannel**](../Model/WebPageChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

