# KuntaAPI\WebPageServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findWebPageServiceChannel**](WebPageServiceChannelsApi.md#findWebPageServiceChannel) | **GET** /webPageServiceChannels/{webPageServiceChannelId} | Finds a web page service channel by id
[**listWebPageServiceChannels**](WebPageServiceChannelsApi.md#listWebPageServiceChannels) | **GET** /webPageServiceChannels | Lists web page service channels
[**updateWebPageServiceChannel**](WebPageServiceChannelsApi.md#updateWebPageServiceChannel) | **PUT** /webPageServiceChannels/{webPageServiceChannelId} | Updates a channel


# **findWebPageServiceChannel**
> \KuntaAPI\Model\WebPageServiceChannel findWebPageServiceChannel($webPageServiceChannelId)

Finds a web page service channel by id

Finds a web page service channel by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

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

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listWebPageServiceChannels**
> \KuntaAPI\Model\WebPageServiceChannel[] listWebPageServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists web page service channels

Lists web page service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\WebPageServiceChannelsApi();
$organizationId = "organizationId_example"; // string | Organization id
$search = "search_example"; // string | Search channels by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listWebPageServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebPageServiceChannelsApi->listWebPageServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id | [optional]
 **search** | **string**| Search channels by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL or SCORE). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\WebPageServiceChannel[]**](../Model/WebPageServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updateWebPageServiceChannel**
> \KuntaAPI\Model\WebPageServiceChannel updateWebPageServiceChannel($webPageServiceChannelId, $payload)

Updates a channel

Updates a service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\WebPageServiceChannelsApi();
$webPageServiceChannelId = "webPageServiceChannelId_example"; // string | webPageChannel id
$payload = new \KuntaAPI\Model\WebPageServiceChannel(); // \KuntaAPI\Model\WebPageServiceChannel | New webPage service data

try {
    $result = $api_instance->updateWebPageServiceChannel($webPageServiceChannelId, $payload);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebPageServiceChannelsApi->updateWebPageServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webPageServiceChannelId** | **string**| webPageChannel id |
 **payload** | [**\KuntaAPI\Model\WebPageServiceChannel**](../Model/\KuntaAPI\Model\WebPageServiceChannel.md)| New webPage service data |

### Return type

[**\KuntaAPI\Model\WebPageServiceChannel**](../Model/WebPageServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

