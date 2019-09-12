# KuntaAPI\PagesApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteOrganizationPage**](PagesApi.md#deleteOrganizationPage) | **DELETE** /organizations/{organizationId}/pages/{pageId} | Deletes an organizations page
[**findOrganizationPage**](PagesApi.md#findOrganizationPage) | **GET** /organizations/{organizationId}/pages/{pageId} | Finds organizations page
[**findOrganizationPageContent**](PagesApi.md#findOrganizationPageContent) | **GET** /organizations/{organizationId}/pages/{pageId}/content | Returns organizations page content in all available languages
[**findOrganizationPageImage**](PagesApi.md#findOrganizationPageImage) | **GET** /organizations/{organizationId}/pages/{pageId}/images/{imageId} | Returns a single organiztion page image
[**getOrganizationPageImageData**](PagesApi.md#getOrganizationPageImageData) | **GET** /organizations/{organizationId}/pages/{pageId}/images/{imageId}/data | Returns an organization page image data
[**listOrganizationPageImages**](PagesApi.md#listOrganizationPageImages) | **GET** /organizations/{organizationId}/pages/{pageId}/images | Returns a list of organization page images
[**listOrganizationPages**](PagesApi.md#listOrganizationPages) | **GET** /organizations/{organizationId}/pages | Lists organizations pages


# **deleteOrganizationPage**
> deleteOrganizationPage($organizationId, $pageId)

Deletes an organizations page

Deletes single organization page

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PagesApi();
$organizationId = "organizationId_example"; // string | Organization id
$pageId = "pageId_example"; // string | page id

try {
    $api_instance->deleteOrganizationPage($organizationId, $pageId);
} catch (Exception $e) {
    echo 'Exception when calling PagesApi->deleteOrganizationPage: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **pageId** | **string**| page id |

### Return type

void (empty response body)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationPage**
> \KuntaAPI\Model\Page findOrganizationPage($organizationId, $pageId)

Finds organizations page

Finds single organization page

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PagesApi();
$organizationId = "organizationId_example"; // string | Organization id
$pageId = "pageId_example"; // string | page id

try {
    $result = $api_instance->findOrganizationPage($organizationId, $pageId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PagesApi->findOrganizationPage: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **pageId** | **string**| page id |

### Return type

[**\KuntaAPI\Model\Page**](../Model/Page.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationPageContent**
> \KuntaAPI\Model\LocalizedValue[] findOrganizationPageContent($organizationId, $pageId)

Returns organizations page content in all available languages

Returns single organization page content in all available languages

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PagesApi();
$organizationId = "organizationId_example"; // string | Organization id
$pageId = "pageId_example"; // string | page id

try {
    $result = $api_instance->findOrganizationPageContent($organizationId, $pageId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PagesApi->findOrganizationPageContent: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **pageId** | **string**| page id |

### Return type

[**\KuntaAPI\Model\LocalizedValue[]**](../Model/LocalizedValue.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationPageImage**
> \KuntaAPI\Model\Attachment findOrganizationPageImage($organizationId, $pageId, $imageId)

Returns a single organiztion page image

Returns a single organiztion page image

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PagesApi();
$organizationId = "organizationId_example"; // string | Organization id
$pageId = "pageId_example"; // string | Page Id
$imageId = "imageId_example"; // string | Page image id

try {
    $result = $api_instance->findOrganizationPageImage($organizationId, $pageId, $imageId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PagesApi->findOrganizationPageImage: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **pageId** | **string**| Page Id |
 **imageId** | **string**| Page image id |

### Return type

[**\KuntaAPI\Model\Attachment**](../Model/Attachment.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **getOrganizationPageImageData**
> string getOrganizationPageImageData($organizationId, $pageId, $imageId, $size)

Returns an organization page image data

Returns an organization page image data

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PagesApi();
$organizationId = "organizationId_example"; // string | Organization id
$pageId = "pageId_example"; // string | Page id
$imageId = "imageId_example"; // string | Page image id
$size = 56; // int | Maximum width or height of image

try {
    $result = $api_instance->getOrganizationPageImageData($organizationId, $pageId, $imageId, $size);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PagesApi->getOrganizationPageImageData: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **pageId** | **string**| Page id |
 **imageId** | **string**| Page image id |
 **size** | **int**| Maximum width or height of image | [optional]

### Return type

**string**

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/octet-stream

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationPageImages**
> \KuntaAPI\Model\Attachment[] listOrganizationPageImages($organizationId, $pageId, $type)

Returns a list of organization page images

Returns a list of organization page images

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PagesApi();
$organizationId = "organizationId_example"; // string | Organization id
$pageId = "pageId_example"; // string | Page id
$type = "type_example"; // string | Filter by type

try {
    $result = $api_instance->listOrganizationPageImages($organizationId, $pageId, $type);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PagesApi->listOrganizationPageImages: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **pageId** | **string**| Page id |
 **type** | **string**| Filter by type | [optional]

### Return type

[**\KuntaAPI\Model\Attachment[]**](../Model/Attachment.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationPages**
> \KuntaAPI\Model\Page[] listOrganizationPages($organizationId, $parentId, $path, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists organizations pages

Lists organizations pages

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PagesApi();
$organizationId = "organizationId_example"; // string | Organization id
$parentId = "parentId_example"; // string | Filter results by parent id
$path = "path_example"; // string | Filter results by page path
$search = "search_example"; // string | Search pages by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL, SCORE or MENU). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listOrganizationPages($organizationId, $parentId, $path, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PagesApi->listOrganizationPages: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **parentId** | **string**| Filter results by parent id | [optional]
 **path** | **string**| Filter results by page path | [optional]
 **search** | **string**| Search pages by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL, SCORE or MENU). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\Page[]**](../Model/Page.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

