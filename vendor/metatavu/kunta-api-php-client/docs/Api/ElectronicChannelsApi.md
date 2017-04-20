# KuntaAPI\ElectronicChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findServiceElectronicChannel**](ElectronicChannelsApi.md#findServiceElectronicChannel) | **GET** /services/{serviceId}/electronicChannels/{electronicChannelId} | finds ElectronicChannel by electronicChannelId
[**listServiceElectronicChannels**](ElectronicChannelsApi.md#listServiceElectronicChannels) | **GET** /services/{serviceId}/electronicChannels | Lists ElectronicChannels by serviceId


# **findServiceElectronicChannel**
> \KuntaAPI\Model\ElectronicServiceChannel findServiceElectronicChannel($serviceId, $electronicChannelId)

finds ElectronicChannel by electronicChannelId

finds ElectronicChannels by electronicChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

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

[**\KuntaAPI\Model\ElectronicServiceChannel**](../Model/ElectronicServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceElectronicChannels**
> \KuntaAPI\Model\ElectronicServiceChannel[] listServiceElectronicChannels($serviceId, $firstResult, $maxResults)

Lists ElectronicChannels by serviceId

Lists ElectronicChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

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

[**\KuntaAPI\Model\ElectronicServiceChannel[]**](../Model/ElectronicServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

