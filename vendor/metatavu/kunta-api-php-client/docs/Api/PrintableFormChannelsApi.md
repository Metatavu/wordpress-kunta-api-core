# KuntaAPI\PrintableFormChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createServicePrintableFormChannel**](PrintableFormChannelsApi.md#createServicePrintableFormChannel) | **POST** /services/{serviceId}/printableFormChannels | creates PrintableFormChannel
[**findServicePrintableFormChannel**](PrintableFormChannelsApi.md#findServicePrintableFormChannel) | **GET** /services/{serviceId}/printableFormChannels/{printableFormChannelId} | finds PrintableFormChannel by printableFormChannelId
[**listServicePrintableFormChannels**](PrintableFormChannelsApi.md#listServicePrintableFormChannels) | **GET** /services/{serviceId}/printableFormChannels | Lists PrintableFormChannels by serviceId
[**updatePrintableFormChannel**](PrintableFormChannelsApi.md#updatePrintableFormChannel) | **PUT** /services/{serviceId}/printableFormChannels/{printableFormChannelId} | Updates PrintableFormChannel


# **createServicePrintableFormChannel**
> \KuntaAPI\Model\PrintableFormChannel createServicePrintableFormChannel($serviceId, $body)

creates PrintableFormChannel

creates PrintableFormChannel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\PrintableFormChannelsApi();
$serviceId = "serviceId_example"; // string | service id
$body = new \KuntaAPI\Model\PrintableFormChannel(); // \KuntaAPI\Model\PrintableFormChannel | Payload

try {
    $result = $api_instance->createServicePrintableFormChannel($serviceId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PrintableFormChannelsApi->createServicePrintableFormChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| service id |
 **body** | [**\KuntaAPI\Model\PrintableFormChannel**](../Model/\KuntaAPI\Model\PrintableFormChannel.md)| Payload |

### Return type

[**\KuntaAPI\Model\PrintableFormChannel**](../Model/PrintableFormChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServicePrintableFormChannel**
> \KuntaAPI\Model\PrintableFormChannel findServicePrintableFormChannel($serviceId, $printableFormChannelId)

finds PrintableFormChannel by printableFormChannelId

finds PrintableFormChannels by printableFormChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\PrintableFormChannelsApi();
$serviceId = "serviceId_example"; // string | Service id
$printableFormChannelId = "printableFormChannelId_example"; // string | printableFormChannel id

try {
    $result = $api_instance->findServicePrintableFormChannel($serviceId, $printableFormChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PrintableFormChannelsApi->findServicePrintableFormChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **printableFormChannelId** | **string**| printableFormChannel id |

### Return type

[**\KuntaAPI\Model\PrintableFormChannel**](../Model/PrintableFormChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServicePrintableFormChannels**
> \KuntaAPI\Model\PrintableFormChannel[] listServicePrintableFormChannels($serviceId, $firstResult, $maxResults)

Lists PrintableFormChannels by serviceId

Lists PrintableFormChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\PrintableFormChannelsApi();
$serviceId = "serviceId_example"; // string | Service id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServicePrintableFormChannels($serviceId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PrintableFormChannelsApi->listServicePrintableFormChannels: ', $e->getMessage(), PHP_EOL;
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

[**\KuntaAPI\Model\PrintableFormChannel[]**](../Model/PrintableFormChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updatePrintableFormChannel**
> \KuntaAPI\Model\PrintableFormChannel updatePrintableFormChannel($serviceId, $printableFormChannelId, $body)

Updates PrintableFormChannel

Updates PrintableFormChannel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\PrintableFormChannelsApi();
$serviceId = "serviceId_example"; // string | service id
$printableFormChannelId = "printableFormChannelId_example"; // string | printableFormChannel id
$body = new \KuntaAPI\Model\PrintableFormChannel(); // \KuntaAPI\Model\PrintableFormChannel | Payload

try {
    $result = $api_instance->updatePrintableFormChannel($serviceId, $printableFormChannelId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PrintableFormChannelsApi->updatePrintableFormChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| service id |
 **printableFormChannelId** | **string**| printableFormChannel id |
 **body** | [**\KuntaAPI\Model\PrintableFormChannel**](../Model/\KuntaAPI\Model\PrintableFormChannel.md)| Payload |

### Return type

[**\KuntaAPI\Model\PrintableFormChannel**](../Model/PrintableFormChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

