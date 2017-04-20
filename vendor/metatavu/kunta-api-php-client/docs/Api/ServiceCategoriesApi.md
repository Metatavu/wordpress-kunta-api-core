# KuntaAPI\ServiceCategoriesApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listServiceClasses**](ServiceCategoriesApi.md#listServiceClasses) | **GET** /organizations/{organizationId}/serviceClasses/ | List service classes for an organization


# **listServiceClasses**
> \KuntaAPI\Model\ServiceClass[] listServiceClasses($organizationId)

List service classes for an organization

Returns list of organization's service classes

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\ServiceCategoriesApi();
$organizationId = "organizationId_example"; // string | Organization id

try {
    $result = $api_instance->listServiceClasses($organizationId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceCategoriesApi->listServiceClasses: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |

### Return type

[**\KuntaAPI\Model\ServiceClass[]**](../Model/ServiceClass.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

