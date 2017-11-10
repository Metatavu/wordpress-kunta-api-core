# KuntaAPI\ServiceLocationServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findServiceLocationServiceChannel**](ServiceLocationServiceChannelsApi.md#findServiceLocationServiceChannel) | **GET** /serviceLocationServiceChannels/{serviceLocationServiceChannelId} | Finds a service location service by id
[**listServiceLocationServiceChannels**](ServiceLocationServiceChannelsApi.md#listServiceLocationServiceChannels) | **GET** /serviceLocationServiceChannels | Lists service location service channels
[**updateServiceLocationServiceChannel**](ServiceLocationServiceChannelsApi.md#updateServiceLocationServiceChannel) | **PUT** /serviceLocationServiceChannels/{serviceLocationServiceChannelId} | Updates a service location channel


# **findServiceLocationServiceChannel**
> \KuntaAPI\Model\ServiceLocationServiceChannel findServiceLocationServiceChannel($serviceLocationServiceChannelId)

Finds a service location service by id

Finds a service location service by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

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

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceLocationServiceChannels**
> \KuntaAPI\Model\ServiceLocationServiceChannel[] listServiceLocationServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists service location service channels

Lists service location service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceLocationServiceChannelsApi();
$organizationId = "organizationId_example"; // string | Organization id
$search = "search_example"; // string | Search service location channels by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServiceLocationServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceLocationServiceChannelsApi->listServiceLocationServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id | [optional]
 **search** | **string**| Search service location channels by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL or SCORE). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\ServiceLocationServiceChannel[]**](../Model/ServiceLocationServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updateServiceLocationServiceChannel**
> \KuntaAPI\Model\ServiceLocationServiceChannel updateServiceLocationServiceChannel($serviceLocationServiceChannelId, $serviceLocationChannel)

Updates a service location channel

Updates a service location channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceLocationServiceChannelsApi();
$serviceLocationServiceChannelId = "serviceLocationServiceChannelId_example"; // string | serviceLocationChannel id
$serviceLocationChannel = new \KuntaAPI\Model\ServiceLocationServiceChannel(); // \KuntaAPI\Model\ServiceLocationServiceChannel | New service location channel data

try {
    $result = $api_instance->updateServiceLocationServiceChannel($serviceLocationServiceChannelId, $serviceLocationChannel);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceLocationServiceChannelsApi->updateServiceLocationServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceLocationServiceChannelId** | **string**| serviceLocationChannel id |
 **serviceLocationChannel** | [**\KuntaAPI\Model\ServiceLocationServiceChannel**](../Model/\KuntaAPI\Model\ServiceLocationServiceChannel.md)| New service location channel data |

### Return type

[**\KuntaAPI\Model\ServiceLocationServiceChannel**](../Model/ServiceLocationServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

