# KuntaAPI\SourcesApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findServiceSource**](SourcesApi.md#findServiceSource) | **GET** /serviceSources/{serviceSourceId} | Find a service by id
[**listServiceSources**](SourcesApi.md#listServiceSources) | **GET** /serviceSources | List service sources


# **findServiceSource**
> \KuntaAPI\Model\ServiceSource findServiceSource($serviceSourceId)

Find a service by id

Returns single service by it's unique id.

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\SourcesApi();
$serviceSourceId = "serviceSourceId_example"; // string | Service source id

try {
    $result = $api_instance->findServiceSource($serviceSourceId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling SourcesApi->findServiceSource: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceSourceId** | **string**| Service source id |

### Return type

[**\KuntaAPI\Model\ServiceSource**](../Model/ServiceSource.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceSources**
> \KuntaAPI\Model\ServiceSource[] listServiceSources()

List service sources

Returns list of service sources.

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\SourcesApi();

try {
    $result = $api_instance->listServiceSources();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling SourcesApi->listServiceSources: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**\KuntaAPI\Model\ServiceSource[]**](../Model/ServiceSource.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

