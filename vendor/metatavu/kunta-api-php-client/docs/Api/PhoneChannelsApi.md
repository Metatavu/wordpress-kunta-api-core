# KuntaAPI\PhoneChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findServicePhoneChannel**](PhoneChannelsApi.md#findServicePhoneChannel) | **GET** /services/{serviceId}/phoneChannels/{phoneChannelId} | finds PhoneChannel by phoneChannelId
[**listServicePhoneChannels**](PhoneChannelsApi.md#listServicePhoneChannels) | **GET** /services/{serviceId}/phoneChannels | Lists PhoneChannels by serviceId


# **findServicePhoneChannel**
> \KuntaAPI\Model\PhoneServiceChannel findServicePhoneChannel($serviceId, $phoneChannelId)

finds PhoneChannel by phoneChannelId

finds PhoneChannels by phoneChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

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

[**\KuntaAPI\Model\PhoneServiceChannel**](../Model/PhoneServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServicePhoneChannels**
> \KuntaAPI\Model\PhoneServiceChannel[] listServicePhoneChannels($serviceId, $firstResult, $maxResults)

Lists PhoneChannels by serviceId

Lists PhoneChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

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

[**\KuntaAPI\Model\PhoneServiceChannel[]**](../Model/PhoneServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

