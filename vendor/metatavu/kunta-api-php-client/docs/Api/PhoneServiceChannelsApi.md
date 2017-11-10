# KuntaAPI\PhoneServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findPhoneServiceChannel**](PhoneServiceChannelsApi.md#findPhoneServiceChannel) | **GET** /phoneServiceChannels/{phoneServiceChannelId} | Finds a phone service channel by id
[**listPhoneServiceChannels**](PhoneServiceChannelsApi.md#listPhoneServiceChannels) | **GET** /phoneServiceChannels | Lists phone service channels


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
> \KuntaAPI\Model\PhoneServiceChannel[] listPhoneServiceChannels($firstResult, $maxResults)

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
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listPhoneServiceChannels($firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PhoneServiceChannelsApi->listPhoneServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
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

