# KuntaAPI\PrintableFormServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findPrintableFormServiceChannel**](PrintableFormServiceChannelsApi.md#findPrintableFormServiceChannel) | **GET** /printableFormServiceChannels/{printableFormServiceChannelId} | Finds a printable form service channel
[**listPrintableFormServiceChannels**](PrintableFormServiceChannelsApi.md#listPrintableFormServiceChannels) | **GET** /printableFormServiceChannels | Lists printable form service channels
[**updatePrintableFormServiceChannel**](PrintableFormServiceChannelsApi.md#updatePrintableFormServiceChannel) | **PUT** /printableFormServiceChannels/{printableFormServiceChannelId} | Updates a channel


# **findPrintableFormServiceChannel**
> \KuntaAPI\Model\PrintableFormServiceChannel findPrintableFormServiceChannel($printableFormServiceChannelId)

Finds a printable form service channel

Finds a printable form service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

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

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listPrintableFormServiceChannels**
> \KuntaAPI\Model\PrintableFormServiceChannel[] listPrintableFormServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists printable form service channels

Lists printable form service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PrintableFormServiceChannelsApi();
$organizationId = "organizationId_example"; // string | Organization id
$search = "search_example"; // string | Search channels by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listPrintableFormServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PrintableFormServiceChannelsApi->listPrintableFormServiceChannels: ', $e->getMessage(), PHP_EOL;
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

[**\KuntaAPI\Model\PrintableFormServiceChannel[]**](../Model/PrintableFormServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updatePrintableFormServiceChannel**
> \KuntaAPI\Model\PrintableFormServiceChannel updatePrintableFormServiceChannel($printableFormServiceChannelId, $payload)

Updates a channel

Updates a service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PrintableFormServiceChannelsApi();
$printableFormServiceChannelId = "printableFormServiceChannelId_example"; // string | printable form channel id
$payload = new \KuntaAPI\Model\PrintableFormServiceChannel(); // \KuntaAPI\Model\PrintableFormServiceChannel | New printable form service data

try {
    $result = $api_instance->updatePrintableFormServiceChannel($printableFormServiceChannelId, $payload);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PrintableFormServiceChannelsApi->updatePrintableFormServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **printableFormServiceChannelId** | **string**| printable form channel id |
 **payload** | [**\KuntaAPI\Model\PrintableFormServiceChannel**](../Model/\KuntaAPI\Model\PrintableFormServiceChannel.md)| New printable form service data |

### Return type

[**\KuntaAPI\Model\PrintableFormServiceChannel**](../Model/PrintableFormServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

