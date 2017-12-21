# KuntaAPI\PhoneServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findPhoneServiceChannel**](PhoneServiceChannelsApi.md#findPhoneServiceChannel) | **GET** /phoneServiceChannels/{phoneServiceChannelId} | Finds a phone service channel by id
[**listPhoneServiceChannels**](PhoneServiceChannelsApi.md#listPhoneServiceChannels) | **GET** /phoneServiceChannels | Lists phone service channels
[**updatePhoneServiceChannel**](PhoneServiceChannelsApi.md#updatePhoneServiceChannel) | **PUT** /phoneServiceChannels/{phoneServiceChannelId} | Updates a channel


# **findPhoneServiceChannel**
> \KuntaAPI\Model\PhoneServiceChannel findPhoneServiceChannel($phoneServiceChannelId)

Finds a phone service channel by id

Finds a phone service channel by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PhoneServiceChannelsApi();
$phoneServiceChannelId = "phoneServiceChannelId_example"; // string | Phone service channel id

try {
    $result = $api_instance->findPhoneServiceChannel($phoneServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PhoneServiceChannelsApi->findPhoneServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **phoneServiceChannelId** | **string**| Phone service channel id |

### Return type

[**\KuntaAPI\Model\PhoneServiceChannel**](../Model/PhoneServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listPhoneServiceChannels**
> \KuntaAPI\Model\PhoneServiceChannel[] listPhoneServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists phone service channels

Lists phone service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PhoneServiceChannelsApi();
$organizationId = "organizationId_example"; // string | Organization id
$search = "search_example"; // string | Search channels by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listPhoneServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PhoneServiceChannelsApi->listPhoneServiceChannels: ', $e->getMessage(), PHP_EOL;
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

[**\KuntaAPI\Model\PhoneServiceChannel[]**](../Model/PhoneServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updatePhoneServiceChannel**
> \KuntaAPI\Model\PhoneServiceChannel updatePhoneServiceChannel($phoneServiceChannelId, $payload)

Updates a channel

Updates a service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PhoneServiceChannelsApi();
$phoneServiceChannelId = "phoneServiceChannelId_example"; // string | phone channel id
$payload = new \KuntaAPI\Model\PhoneServiceChannel(); // \KuntaAPI\Model\PhoneServiceChannel | New phone service data

try {
    $result = $api_instance->updatePhoneServiceChannel($phoneServiceChannelId, $payload);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PhoneServiceChannelsApi->updatePhoneServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **phoneServiceChannelId** | **string**| phone channel id |
 **payload** | [**\KuntaAPI\Model\PhoneServiceChannel**](../Model/\KuntaAPI\Model\PhoneServiceChannel.md)| New phone service data |

### Return type

[**\KuntaAPI\Model\PhoneServiceChannel**](../Model/PhoneServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

