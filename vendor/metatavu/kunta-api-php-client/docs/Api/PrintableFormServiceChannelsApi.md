# KuntaAPI\PrintableFormServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findPrintableFormServiceChannel**](PrintableFormServiceChannelsApi.md#findPrintableFormServiceChannel) | **GET** /printableFormServiceChannels/{printableFormServiceChannelId} | Finds a printable form service channel
[**listPrintableFormServiceChannels**](PrintableFormServiceChannelsApi.md#listPrintableFormServiceChannels) | **GET** /printableFormServiceChannels | Lists printable form service channels


# **findPrintableFormServiceChannel**
> \KuntaAPI\Model\PrintableFormServiceChannel findPrintableFormServiceChannel($printableFormServiceChannelId)

Finds a printable form service channel

Finds a printable form service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\PrintableFormServiceChannelsApi();
$printableFormServiceChannelId = "printableFormServiceChannelId_example"; // string | Printable form service channel id

try {
    $result = $api_instance->findPrintableFormServiceChannel($printableFormServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PrintableFormServiceChannelsApi->findPrintableFormServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **printableFormServiceChannelId** | **string**| Printable form service channel id |

### Return type

[**\KuntaAPI\Model\PrintableFormServiceChannel**](../Model/PrintableFormServiceChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listPrintableFormServiceChannels**
> \KuntaAPI\Model\PrintableFormServiceChannel[] listPrintableFormServiceChannels($firstResult, $maxResults)

Lists printable form service channels

Lists printable form service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\PrintableFormServiceChannelsApi();
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listPrintableFormServiceChannels($firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PrintableFormServiceChannelsApi->listPrintableFormServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\PrintableFormServiceChannel[]**](../Model/PrintableFormServiceChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

