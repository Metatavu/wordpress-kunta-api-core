# KuntaAPI\ElectronicServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findElectronicServiceChannel**](ElectronicServiceChannelsApi.md#findElectronicServiceChannel) | **GET** /electronicServiceChannels/{electronicServiceChannelId} | Finds an electronic service channel by id
[**listElectronicServiceChannels**](ElectronicServiceChannelsApi.md#listElectronicServiceChannels) | **GET** /electronicServiceChannels | Lists electronic service channels


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
> \KuntaAPI\Model\ElectronicServiceChannel[] listElectronicServiceChannels($firstResult, $maxResults)

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
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listElectronicServiceChannels($firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ElectronicServiceChannelsApi->listElectronicServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
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

