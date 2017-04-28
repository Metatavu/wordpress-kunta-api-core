# KuntaAPI\BannersApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationBanner**](BannersApi.md#findOrganizationBanner) | **GET** /organizations/{organizationId}/banners/{bannerId} | Finds organizations banner
[**findOrganizationBannerImage**](BannersApi.md#findOrganizationBannerImage) | **GET** /organizations/{organizationId}/banners/{bannerId}/images/{imageId} | Returns a single organiztion banner image
[**getOrganizationBannerImageData**](BannersApi.md#getOrganizationBannerImageData) | **GET** /organizations/{organizationId}/banners/{bannerId}/images/{imageId}/data | Returns an organization banner image data
[**listOrganizationBannerImages**](BannersApi.md#listOrganizationBannerImages) | **GET** /organizations/{organizationId}/banners/{bannerId}/images | Returns a list of organization banner images
[**listOrganizationBanners**](BannersApi.md#listOrganizationBanners) | **GET** /organizations/{organizationId}/banners | Lists organizations banners


# **findOrganizationBanner**
> \KuntaAPI\Model\NewsArticle findOrganizationBanner($organizationId, $bannerId)

Finds organizations banner

Finds single organization banner

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\BannersApi();
$organizationId = "organizationId_example"; // string | Organization id
$bannerId = "bannerId_example"; // string | banner id

try {
    $result = $api_instance->findOrganizationBanner($organizationId, $bannerId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BannersApi->findOrganizationBanner: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **bannerId** | **string**| banner id |

### Return type

[**\KuntaAPI\Model\NewsArticle**](../Model/NewsArticle.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationBannerImage**
> \KuntaAPI\Model\Attachment findOrganizationBannerImage($organizationId, $bannerId, $imageId)

Returns a single organiztion banner image

Returns a single organiztion banner image

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\BannersApi();
$organizationId = "organizationId_example"; // string | Organization id
$bannerId = "bannerId_example"; // string | Banner Id
$imageId = "imageId_example"; // string | Banner image id

try {
    $result = $api_instance->findOrganizationBannerImage($organizationId, $bannerId, $imageId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BannersApi->findOrganizationBannerImage: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **bannerId** | **string**| Banner Id |
 **imageId** | **string**| Banner image id |

### Return type

[**\KuntaAPI\Model\Attachment**](../Model/Attachment.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **getOrganizationBannerImageData**
> string getOrganizationBannerImageData($organizationId, $bannerId, $imageId, $size)

Returns an organization banner image data

Returns an organization banner image data

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\BannersApi();
$organizationId = "organizationId_example"; // string | Organization id
$bannerId = "bannerId_example"; // string | Banner id
$imageId = "imageId_example"; // string | Banner image id
$size = 56; // int | Maximum width or height of image

try {
    $result = $api_instance->getOrganizationBannerImageData($organizationId, $bannerId, $imageId, $size);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BannersApi->getOrganizationBannerImageData: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **bannerId** | **string**| Banner id |
 **imageId** | **string**| Banner image id |
 **size** | **int**| Maximum width or height of image | [optional]

### Return type

**string**

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/octet-stream

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationBannerImages**
> \KuntaAPI\Model\Attachment[] listOrganizationBannerImages($organizationId, $bannerId)

Returns a list of organization banner images

Returns a list of organization banner images

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\BannersApi();
$organizationId = "organizationId_example"; // string | Organization id
$bannerId = "bannerId_example"; // string | Banner id

try {
    $result = $api_instance->listOrganizationBannerImages($organizationId, $bannerId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BannersApi->listOrganizationBannerImages: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **bannerId** | **string**| Banner id |

### Return type

[**\KuntaAPI\Model\Attachment[]**](../Model/Attachment.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationBanners**
> \KuntaAPI\Model\Banner[] listOrganizationBanners($organizationId)

Lists organizations banners

Lists organizations banners

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\BannersApi();
$organizationId = "organizationId_example"; // string | Organization id

try {
    $result = $api_instance->listOrganizationBanners($organizationId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BannersApi->listOrganizationBanners: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |

### Return type

[**\KuntaAPI\Model\Banner[]**](../Model/Banner.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

