# KuntaAPI\CodesApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findCode**](CodesApi.md#findCode) | **GET** /codes/{codeId} | Finds a code
[**listCodes**](CodesApi.md#listCodes) | **GET** /codes | Lists codes


# **findCode**
> \KuntaAPI\Model\Code findCode($codeId)

Finds a code

Finds a code

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\CodesApi();
$codeId = "codeId_example"; // string | Id of the code

try {
    $result = $api_instance->findCode($codeId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling CodesApi->findCode: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **codeId** | **string**| Id of the code |

### Return type

[**\KuntaAPI\Model\Code**](../Model/Code.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listCodes**
> \KuntaAPI\Model\Code[] listCodes($types, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists codes

Lists codes

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\CodesApi();
$types = array("types_example"); // string[] | Filter results by types
$search = "search_example"; // string | Search codes by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is SCORE
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listCodes($types, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling CodesApi->listCodes: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **types** | [**string[]**](../Model/string.md)| Filter results by types | [optional]
 **search** | **string**| Search codes by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL or SCORE). Default is SCORE | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\Code[]**](../Model/Code.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

