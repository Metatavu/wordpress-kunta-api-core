# KuntaAPI\WebPageServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findWebPageServiceChannel**](WebPageServiceChannelsApi.md#findWebPageServiceChannel) | **GET** /webPageServiceChannels/{webPageServiceChannelId} | Finds a web page service channel by id
[**listWebPageServiceChannels**](WebPageServiceChannelsApi.md#listWebPageServiceChannels) | **GET** /webPageServiceChannels | Lists web page service channels


# **findWebPageServiceChannel**
> \KuntaAPI\Model\WebPageServiceChannel findWebPageServiceChannel($webPageServiceChannelId)

Finds a web page service channel by id

Finds a web page service channel by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\WebPageServiceChannelsApi();
$webPageServiceChannelId = "webPageServiceChannelId_example"; // string | webPageChannel id

try {
    $result = $api_instance->findWebPageServiceChannel($webPageServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebPageServiceChannelsApi->findWebPageServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webPageServiceChannelId** | **string**| webPageChannel id |

### Return type

[**\KuntaAPI\Model\WebPageServiceChannel**](../Model/WebPageServiceChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listWebPageServiceChannels**
> \KuntaAPI\Model\WebPageServiceChannel[] listWebPageServiceChannels($firstResult, $maxResults)

Lists web page service channels

Lists web page service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\WebPageServiceChannelsApi();
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listWebPageServiceChannels($firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebPageServiceChannelsApi->listWebPageServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\WebPageServiceChannel[]**](../Model/WebPageServiceChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

