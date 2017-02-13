# KuntaAPI\ElectronicChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createServiceElectronicChannel**](ElectronicChannelsApi.md#createServiceElectronicChannel) | **POST** /services/{serviceId}/electronicChannels | creates ElectronicChannel
[**findServiceElectronicChannel**](ElectronicChannelsApi.md#findServiceElectronicChannel) | **GET** /services/{serviceId}/electronicChannels/{electronicChannelId} | finds ElectronicChannel by electronicChannelId
[**listServiceElectronicChannels**](ElectronicChannelsApi.md#listServiceElectronicChannels) | **GET** /services/{serviceId}/electronicChannels | Lists ElectronicChannels by serviceId
[**updateServiceElectronicChannel**](ElectronicChannelsApi.md#updateServiceElectronicChannel) | **PUT** /services/{serviceId}/electronicChannels/{electronicChannelId} | Updates ElectronicChannel


# **createServiceElectronicChannel**
> \KuntaAPI\Model\ElectronicChannel createServiceElectronicChannel($serviceId, $body)

creates ElectronicChannel

creates ElectronicChannel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\ElectronicChannelsApi();
$serviceId = "serviceId_example"; // string | service id
$body = new \KuntaAPI\Model\ElectronicChannel(); // \KuntaAPI\Model\ElectronicChannel | Payload

try {
    $result = $api_instance->createServiceElectronicChannel($serviceId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ElectronicChannelsApi->createServiceElectronicChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| service id |
 **body** | [**\KuntaAPI\Model\ElectronicChannel**](../Model/\KuntaAPI\Model\ElectronicChannel.md)| Payload |

### Return type

[**\KuntaAPI\Model\ElectronicChannel**](../Model/ElectronicChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServiceElectronicChannel**
> \KuntaAPI\Model\ElectronicChannel findServiceElectronicChannel($serviceId, $electronicChannelId)

finds ElectronicChannel by electronicChannelId

finds ElectronicChannels by electronicChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\ElectronicChannelsApi();
$serviceId = "serviceId_example"; // string | Service id
$electronicChannelId = "electronicChannelId_example"; // string | electronicChannel id

try {
    $result = $api_instance->findServiceElectronicChannel($serviceId, $electronicChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ElectronicChannelsApi->findServiceElectronicChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **electronicChannelId** | **string**| electronicChannel id |

### Return type

[**\KuntaAPI\Model\ElectronicChannel**](../Model/ElectronicChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceElectronicChannels**
> \KuntaAPI\Model\ElectronicChannel[] listServiceElectronicChannels($serviceId, $firstResult, $maxResults)

Lists ElectronicChannels by serviceId

Lists ElectronicChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\ElectronicChannelsApi();
$serviceId = "serviceId_example"; // string | Service id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServiceElectronicChannels($serviceId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ElectronicChannelsApi->listServiceElectronicChannels: ', $e->getMessage(), PHP_EOL;
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

[**\KuntaAPI\Model\ElectronicChannel[]**](../Model/ElectronicChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updateServiceElectronicChannel**
> \KuntaAPI\Model\ElectronicChannel updateServiceElectronicChannel($serviceId, $electronicChannelId, $body)

Updates ElectronicChannel

Updates ElectronicChannel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\ElectronicChannelsApi();
$serviceId = "serviceId_example"; // string | service id
$electronicChannelId = "electronicChannelId_example"; // string | electronicChannel id
$body = new \KuntaAPI\Model\ElectronicChannel(); // \KuntaAPI\Model\ElectronicChannel | Payload

try {
    $result = $api_instance->updateServiceElectronicChannel($serviceId, $electronicChannelId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ElectronicChannelsApi->updateServiceElectronicChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| service id |
 **electronicChannelId** | **string**| electronicChannel id |
 **body** | [**\KuntaAPI\Model\ElectronicChannel**](../Model/\KuntaAPI\Model\ElectronicChannel.md)| Payload |

### Return type

[**\KuntaAPI\Model\ElectronicChannel**](../Model/ElectronicChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

