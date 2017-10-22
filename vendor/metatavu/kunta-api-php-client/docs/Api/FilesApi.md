# KuntaAPI\FilesApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteOrganizationFile**](FilesApi.md#deleteOrganizationFile) | **DELETE** /organizations/{organizationId}/files/{fileId} | Deletes an organization file
[**findOrganizationFile**](FilesApi.md#findOrganizationFile) | **GET** /organizations/{organizationId}/files/{fileId} | Finds organizations file
[**getOrganizationFileData**](FilesApi.md#getOrganizationFileData) | **GET** /organizations/{organizationId}/files/{fileId}/data | Returns an organization file data
[**listOrganizationFiles**](FilesApi.md#listOrganizationFiles) | **GET** /organizations/{organizationId}/files | Lists organizations files


# **deleteOrganizationFile**
> deleteOrganizationFile($organizationId, $fileId)

Deletes an organization file

Deletes single organization file

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\FilesApi();
$organizationId = "organizationId_example"; // string | Organization id
$fileId = "fileId_example"; // string | file id

try {
    $api_instance->deleteOrganizationFile($organizationId, $fileId);
} catch (Exception $e) {
    echo 'Exception when calling FilesApi->deleteOrganizationFile: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **fileId** | **string**| file id |

### Return type

void (empty response body)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationFile**
> \KuntaAPI\Model\FileDef findOrganizationFile($organizationId, $fileId)

Finds organizations file

Finds single organization file

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\FilesApi();
$organizationId = "organizationId_example"; // string | Organization id
$fileId = "fileId_example"; // string | file id

try {
    $result = $api_instance->findOrganizationFile($organizationId, $fileId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling FilesApi->findOrganizationFile: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **fileId** | **string**| file id |

### Return type

[**\KuntaAPI\Model\FileDef**](../Model/FileDef.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **getOrganizationFileData**
> string getOrganizationFileData($organizationId, $fileId)

Returns an organization file data

Returns an organization file data

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\FilesApi();
$organizationId = "organizationId_example"; // string | Organization id
$fileId = "fileId_example"; // string | file id

try {
    $result = $api_instance->getOrganizationFileData($organizationId, $fileId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling FilesApi->getOrganizationFileData: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **fileId** | **string**| file id |

### Return type

**string**

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/octet-stream

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationFiles**
> \KuntaAPI\Model\FileDef[] listOrganizationFiles($organizationId, $pageId, $search, $firstResult, $maxResults)

Lists organizations files

Lists organizations files

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\FilesApi();
$organizationId = "organizationId_example"; // string | Organization id
$pageId = "pageId_example"; // string | Filter with page
$search = "search_example"; // string | Search files by free-text query
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listOrganizationFiles($organizationId, $pageId, $search, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling FilesApi->listOrganizationFiles: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **pageId** | **string**| Filter with page | [optional]
 **search** | **string**| Search files by free-text query | [optional]
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\FileDef[]**](../Model/FileDef.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

