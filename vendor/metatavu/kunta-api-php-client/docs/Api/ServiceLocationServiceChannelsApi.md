# KuntaAPI\ServiceLocationServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findServiceLocationServiceChannel**](ServiceLocationServiceChannelsApi.md#findServiceLocationServiceChannel) | **GET** /serviceLocationServiceChannels/{serviceLocationServiceChannelId} | Finds a service location service by id
[**listServiceLocationServiceChannels**](ServiceLocationServiceChannelsApi.md#listServiceLocationServiceChannels) | **GET** /serviceLocationServiceChannels | Lists service location service channels


# **findServiceLocationServiceChannel**
> \KuntaAPI\Model\ServiceLocationServiceChannel findServiceLocationServiceChannel($serviceLocationServiceChannelId)

Finds a service location service by id

Finds a service location service by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\ServiceLocationServiceChannelsApi();
$serviceLocationServiceChannelId = "serviceLocationServiceChannelId_example"; // string | serviceLocationChannel id

try {
    $result = $api_instance->findServiceLocationServiceChannel($serviceLocationServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceLocationServiceChannelsApi->findServiceLocationServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceLocationServiceChannelId** | **string**| serviceLocationChannel id |

### Return type

[**\KuntaAPI\Model\ServiceLocationServiceChannel**](../Model/ServiceLocationServiceChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceLocationServiceChannels**
> \KuntaAPI\Model\ServiceLocationServiceChannel[] listServiceLocationServiceChannels($firstResult, $maxResults)

Lists service location service channels

Lists service location service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\ServiceLocationServiceChannelsApi();
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServiceLocationServiceChannels($firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceLocationServiceChannelsApi->listServiceLocationServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\ServiceLocationServiceChannel[]**](../Model/ServiceLocationServiceChannel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

