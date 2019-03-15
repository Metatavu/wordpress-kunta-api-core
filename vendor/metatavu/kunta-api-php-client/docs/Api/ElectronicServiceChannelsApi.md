# KuntaAPI\ElectronicServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findElectronicServiceChannel**](ElectronicServiceChannelsApi.md#findElectronicServiceChannel) | **GET** /electronicServiceChannels/{electronicServiceChannelId} | Finds an electronic service channel by id
[**listElectronicServiceChannels**](ElectronicServiceChannelsApi.md#listElectronicServiceChannels) | **GET** /electronicServiceChannels | Lists electronic service channels
[**updateElectronicServiceChannel**](ElectronicServiceChannelsApi.md#updateElectronicServiceChannel) | **PUT** /electronicServiceChannels/{electronicServiceChannelId} | Updates a channel


# **findElectronicServiceChannel**
> \KuntaAPI\Model\ElectronicServiceChannel findElectronicServiceChannel($electronicServiceChannelId)

Finds an electronic service channel by id

Finds an electronic service channel by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ElectronicServiceChannelsApi();
$electronicServiceChannelId = "electronicServiceChannelId_example"; // string | electronicChannel id

try {
    $result = $api_instance->findElectronicServiceChannel($electronicServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ElectronicServiceChannelsApi->findElectronicServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **electronicServiceChannelId** | **string**| electronicChannel id |

### Return type

[**\KuntaAPI\Model\ElectronicServiceChannel**](../Model/ElectronicServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listElectronicServiceChannels**
> \KuntaAPI\Model\ElectronicServiceChannel[] listElectronicServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists electronic service channels

Lists electronic service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ElectronicServiceChannelsApi();
$organizationId = "organizationId_example"; // string | Organization id
$search = "search_example"; // string | Search channels by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listElectronicServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ElectronicServiceChannelsApi->listElectronicServiceChannels: ', $e->getMessage(), PHP_EOL;
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

[**\KuntaAPI\Model\ElectronicServiceChannel[]**](../Model/ElectronicServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updateElectronicServiceChannel**
> \KuntaAPI\Model\ElectronicServiceChannel updateElectronicServiceChannel($electronicServiceChannelId, $payload)

Updates a channel

Updates a service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ElectronicServiceChannelsApi();
$electronicServiceChannelId = "electronicServiceChannelId_example"; // string | electronicChannel id
$payload = new \KuntaAPI\Model\ElectronicServiceChannel(); // \KuntaAPI\Model\ElectronicServiceChannel | New electronic service data

try {
    $result = $api_instance->updateElectronicServiceChannel($electronicServiceChannelId, $payload);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ElectronicServiceChannelsApi->updateElectronicServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **electronicServiceChannelId** | **string**| electronicChannel id |
 **payload** | [**\KuntaAPI\Model\ElectronicServiceChannel**](../Model/\KuntaAPI\Model\ElectronicServiceChannel.md)| New electronic service data |

### Return type

[**\KuntaAPI\Model\ElectronicServiceChannel**](../Model/ElectronicServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

