# KuntaAPI\ServiceLocationChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createServiceServiceLocationChannel**](ServiceLocationChannelsApi.md#createServiceServiceLocationChannel) | **POST** /services/{serviceId}/serviceLocationChannels | creates ServiceLocationChannel
[**findServiceServiceLocationChannel**](ServiceLocationChannelsApi.md#findServiceServiceLocationChannel) | **GET** /services/{serviceId}/serviceLocationChannels/{serviceLocationChannelId} | finds ServiceLocationChannel by serviceLocationChannelId
[**listServiceServiceLocationChannels**](ServiceLocationChannelsApi.md#listServiceServiceLocationChannels) | **GET** /services/{serviceId}/serviceLocationChannels | Lists ServiceLocationChannels by serviceId
[**updateServiceLocationChannel**](ServiceLocationChannelsApi.md#updateServiceLocationChannel) | **PUT** /services/{serviceId}/serviceLocationChannels/{serviceLocationChannelId} | Updates ServiceLocationChannel


# **createServiceServiceLocationChannel**
> \KuntaAPI\Model\ServiceLocationChannel createServiceServiceLocationChannel($serviceId, $body)

creates ServiceLocationChannel

creates ServiceLocationChannel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\ServiceLocationChannelsApi();
$serviceId = "serviceId_example"; // string | service id
$body = new \KuntaAPI\Model\ServiceLocationChannel(); // \KuntaAPI\Model\ServiceLocationChannel | Payload

try {
    $result = $api_instance->createServiceServiceLocationChannel($serviceId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceLocationChannelsApi->createServiceServiceLocationChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| service id |
 **body** | [**\KuntaAPI\Model\ServiceLocationChannel**](../Model/\KuntaAPI\Model\ServiceLocationChannel.md)| Payload |

### Return type

[**\KuntaAPI\Model\ServiceLocationChannel**](../Model/ServiceLocationChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServiceServiceLocationChannel**
> \KuntaAPI\Model\ServiceLocationChannel findServiceServiceLocationChannel($serviceId, $serviceLocationChannelId)

finds ServiceLocationChannel by serviceLocationChannelId

finds ServiceLocationChannels by serviceLocationChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

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

[**\KuntaAPI\Model\ServiceLocationChannel**](../Model/ServiceLocationChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceServiceLocationChannels**
> \KuntaAPI\Model\ServiceLocationChannel[] listServiceServiceLocationChannels($serviceId, $firstResult, $maxResults)

Lists ServiceLocationChannels by serviceId

Lists ServiceLocationChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

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

[**\KuntaAPI\Model\ServiceLocationChannel[]**](../Model/ServiceLocationChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updateServiceLocationChannel**
> \KuntaAPI\Model\ServiceLocationChannel updateServiceLocationChannel($serviceId, $serviceLocationChannelId, $body)

Updates ServiceLocationChannel

Updates ServiceLocationChannel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\ServiceLocationChannelsApi();
$serviceId = "serviceId_example"; // string | service id
$serviceLocationChannelId = "serviceLocationChannelId_example"; // string | serviceLocationChannel id
$body = new \KuntaAPI\Model\ServiceLocationChannel(); // \KuntaAPI\Model\ServiceLocationChannel | Payload

try {
    $result = $api_instance->updateServiceLocationChannel($serviceId, $serviceLocationChannelId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceLocationChannelsApi->updateServiceLocationChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| service id |
 **serviceLocationChannelId** | **string**| serviceLocationChannel id |
 **body** | [**\KuntaAPI\Model\ServiceLocationChannel**](../Model/\KuntaAPI\Model\ServiceLocationChannel.md)| Payload |

### Return type

[**\KuntaAPI\Model\ServiceLocationChannel**](../Model/ServiceLocationChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

