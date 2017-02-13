# KuntaAPI\PhoneChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createServicePhoneChannel**](PhoneChannelsApi.md#createServicePhoneChannel) | **POST** /services/{serviceId}/phoneChannels | creates PhoneChannel
[**findServicePhoneChannel**](PhoneChannelsApi.md#findServicePhoneChannel) | **GET** /services/{serviceId}/phoneChannels/{phoneChannelId} | finds PhoneChannel by phoneChannelId
[**listServicePhoneChannels**](PhoneChannelsApi.md#listServicePhoneChannels) | **GET** /services/{serviceId}/phoneChannels | Lists PhoneChannels by serviceId
[**updatePhoneChannel**](PhoneChannelsApi.md#updatePhoneChannel) | **PUT** /services/{serviceId}/phoneChannels/{phoneChannelId} | Updates PhoneChannel


# **createServicePhoneChannel**
> \KuntaAPI\Model\PhoneChannel createServicePhoneChannel($serviceId, $body)

creates PhoneChannel

creates PhoneChannel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\PhoneChannelsApi();
$serviceId = "serviceId_example"; // string | service id
$body = new \KuntaAPI\Model\PhoneChannel(); // \KuntaAPI\Model\PhoneChannel | Payload

try {
    $result = $api_instance->createServicePhoneChannel($serviceId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PhoneChannelsApi->createServicePhoneChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| service id |
 **body** | [**\KuntaAPI\Model\PhoneChannel**](../Model/\KuntaAPI\Model\PhoneChannel.md)| Payload |

### Return type

[**\KuntaAPI\Model\PhoneChannel**](../Model/PhoneChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServicePhoneChannel**
> \KuntaAPI\Model\PhoneChannel findServicePhoneChannel($serviceId, $phoneChannelId)

finds PhoneChannel by phoneChannelId

finds PhoneChannels by phoneChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\PhoneChannelsApi();
$serviceId = "serviceId_example"; // string | Service id
$phoneChannelId = "phoneChannelId_example"; // string | phoneChannel id

try {
    $result = $api_instance->findServicePhoneChannel($serviceId, $phoneChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PhoneChannelsApi->findServicePhoneChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **phoneChannelId** | **string**| phoneChannel id |

### Return type

[**\KuntaAPI\Model\PhoneChannel**](../Model/PhoneChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServicePhoneChannels**
> \KuntaAPI\Model\PhoneChannel[] listServicePhoneChannels($serviceId, $firstResult, $maxResults)

Lists PhoneChannels by serviceId

Lists PhoneChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\PhoneChannelsApi();
$serviceId = "serviceId_example"; // string | Service id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServicePhoneChannels($serviceId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PhoneChannelsApi->listServicePhoneChannels: ', $e->getMessage(), PHP_EOL;
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

[**\KuntaAPI\Model\PhoneChannel[]**](../Model/PhoneChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updatePhoneChannel**
> \KuntaAPI\Model\PhoneChannel updatePhoneChannel($serviceId, $phoneChannelId, $body)

Updates PhoneChannel

Updates PhoneChannel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\PhoneChannelsApi();
$serviceId = "serviceId_example"; // string | service id
$phoneChannelId = "phoneChannelId_example"; // string | phoneChannel id
$body = new \KuntaAPI\Model\PhoneChannel(); // \KuntaAPI\Model\PhoneChannel | Payload

try {
    $result = $api_instance->updatePhoneChannel($serviceId, $phoneChannelId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PhoneChannelsApi->updatePhoneChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| service id |
 **phoneChannelId** | **string**| phoneChannel id |
 **body** | [**\KuntaAPI\Model\PhoneChannel**](../Model/\KuntaAPI\Model\PhoneChannel.md)| Payload |

### Return type

[**\KuntaAPI\Model\PhoneChannel**](../Model/PhoneChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

