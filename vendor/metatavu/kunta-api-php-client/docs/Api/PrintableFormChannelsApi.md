# KuntaAPI\PrintableFormChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findServicePrintableFormChannel**](PrintableFormChannelsApi.md#findServicePrintableFormChannel) | **GET** /services/{serviceId}/printableFormChannels/{printableFormChannelId} | finds PrintableFormChannel by printableFormChannelId
[**listServicePrintableFormChannels**](PrintableFormChannelsApi.md#listServicePrintableFormChannels) | **GET** /services/{serviceId}/printableFormChannels | Lists PrintableFormChannels by serviceId


# **findServicePrintableFormChannel**
> \KuntaAPI\Model\PrintableFormServiceChannel findServicePrintableFormChannel($serviceId, $printableFormChannelId)

finds PrintableFormChannel by printableFormChannelId

finds PrintableFormChannels by printableFormChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

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

[**\KuntaAPI\Model\PrintableFormServiceChannel**](../Model/PrintableFormServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServicePrintableFormChannels**
> \KuntaAPI\Model\PrintableFormServiceChannel[] listServicePrintableFormChannels($serviceId, $firstResult, $maxResults)

Lists PrintableFormChannels by serviceId

Lists PrintableFormChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

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

[**\KuntaAPI\Model\PrintableFormServiceChannel[]**](../Model/PrintableFormServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

