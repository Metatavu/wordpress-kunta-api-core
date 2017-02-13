# KuntaAPI\NewsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationBannerImage**](NewsApi.md#findOrganizationBannerImage) | **GET** /organizations/{organizationId}/banners/{bannerId}/images/{imageId} | Returns a single organiztion banner image
[**findOrganizationNewsArticle**](NewsApi.md#findOrganizationNewsArticle) | **GET** /organizations/{organizationId}/news/{newsArticleId} | Finds organizations news article
[**findOrganizationNewsArticleImage**](NewsApi.md#findOrganizationNewsArticleImage) | **GET** /organizations/{organizationId}/news/{newsArticleId}/images/{imageId} | Returns an news article image
[**getOrganizationBannerImageData**](NewsApi.md#getOrganizationBannerImageData) | **GET** /organizations/{organizationId}/banners/{bannerId}/images/{imageId}/data | Returns an organization banner image data
[**getOrganizationNewsArticleImageData**](NewsApi.md#getOrganizationNewsArticleImageData) | **GET** /organizations/{organizationId}/news/{newsArticleId}/images/{imageId}/data | Returns a news article image data
[**listOrganizationNews**](NewsApi.md#listOrganizationNews) | **GET** /organizations/{organizationId}/news | Lists organizations news
[**listOrganizationNewsArticleImages**](NewsApi.md#listOrganizationNewsArticleImages) | **GET** /organizations/{organizationId}/news/{newsArticleId}/images | Returns list of news article images


# **findOrganizationBannerImage**
> \KuntaAPI\Model\Attachment findOrganizationBannerImage($organizationId, $bannerId, $imageId)

Returns a single organiztion banner image

Returns a single organiztion banner image

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\NewsApi();
$organizationId = "organizationId_example"; // string | Organization id
$bannerId = "bannerId_example"; // string | Banner Id
$imageId = "imageId_example"; // string | Banner image id

try {
    $result = $api_instance->findOrganizationBannerImage($organizationId, $bannerId, $imageId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling NewsApi->findOrganizationBannerImage: ', $e->getMessage(), PHP_EOL;
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

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationNewsArticle**
> \KuntaAPI\Model\NewsArticle findOrganizationNewsArticle($organizationId, $newsArticleId)

Finds organizations news article

Finds organizations single news article

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\NewsApi();
$organizationId = "organizationId_example"; // string | Organization id
$newsArticleId = "newsArticleId_example"; // string | News article id

try {
    $result = $api_instance->findOrganizationNewsArticle($organizationId, $newsArticleId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling NewsApi->findOrganizationNewsArticle: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **newsArticleId** | **string**| News article id |

### Return type

[**\KuntaAPI\Model\NewsArticle**](../Model/NewsArticle.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationNewsArticleImage**
> \KuntaAPI\Model\Attachment findOrganizationNewsArticleImage($organizationId, $newsArticleId, $imageId)

Returns an news article image

Returns an news article image

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\NewsApi();
$organizationId = "organizationId_example"; // string | Organization id
$newsArticleId = "newsArticleId_example"; // string | News article id
$imageId = "imageId_example"; // string | Event image id

try {
    $result = $api_instance->findOrganizationNewsArticleImage($organizationId, $newsArticleId, $imageId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling NewsApi->findOrganizationNewsArticleImage: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **newsArticleId** | **string**| News article id |
 **imageId** | **string**| Event image id |

### Return type

[**\KuntaAPI\Model\Attachment**](../Model/Attachment.md)

### Authorization

No authorization required

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

$api_instance = new KuntaAPI\Api\NewsApi();
$organizationId = "organizationId_example"; // string | Organization id
$bannerId = "bannerId_example"; // string | Banner id
$imageId = "imageId_example"; // string | Banner image id
$size = 56; // int | Maximum width or height of image

try {
    $result = $api_instance->getOrganizationBannerImageData($organizationId, $bannerId, $imageId, $size);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling NewsApi->getOrganizationBannerImageData: ', $e->getMessage(), PHP_EOL;
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

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/octet-stream

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **getOrganizationNewsArticleImageData**
> string getOrganizationNewsArticleImageData($organizationId, $newsArticleId, $imageId, $size)

Returns a news article image data

Returns a news article image data

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\NewsApi();
$organizationId = "organizationId_example"; // string | Organization id
$newsArticleId = "newsArticleId_example"; // string | News article id
$imageId = "imageId_example"; // string | Event image id
$size = 56; // int | Maximum width or height of image

try {
    $result = $api_instance->getOrganizationNewsArticleImageData($organizationId, $newsArticleId, $imageId, $size);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling NewsApi->getOrganizationNewsArticleImageData: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **newsArticleId** | **string**| News article id |
 **imageId** | **string**| Event image id |
 **size** | **int**| Maximum width or height of image | [optional]

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/octet-stream

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationNews**
> \KuntaAPI\Model\NewsArticle[] listOrganizationNews($organizationId, $slug, $publishedBefore, $publishedAfter, $firstResult, $maxResults)

Lists organizations news

Lists organizations news

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\NewsApi();
$organizationId = "organizationId_example"; // string | Organization id
$slug = "slug_example"; // string | Filter with slug
$publishedBefore = "publishedBefore_example"; // string | return only news published before the date
$publishedAfter = "publishedAfter_example"; // string | return only news published after the date
$firstResult = 56; // int | first index of results
$maxResults = 56; // int | maximum number of results

try {
    $result = $api_instance->listOrganizationNews($organizationId, $slug, $publishedBefore, $publishedAfter, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling NewsApi->listOrganizationNews: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **slug** | **string**| Filter with slug | [optional]
 **publishedBefore** | **string**| return only news published before the date | [optional]
 **publishedAfter** | **string**| return only news published after the date | [optional]
 **firstResult** | **int**| first index of results | [optional]
 **maxResults** | **int**| maximum number of results | [optional]

### Return type

[**\KuntaAPI\Model\NewsArticle[]**](../Model/NewsArticle.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationNewsArticleImages**
> \KuntaAPI\Model\Attachment[] listOrganizationNewsArticleImages($organizationId, $newsArticleId)

Returns list of news article images

Returns list of news article images

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\NewsApi();
$organizationId = "organizationId_example"; // string | Organization id
$newsArticleId = "newsArticleId_example"; // string | News article id

try {
    $result = $api_instance->listOrganizationNewsArticleImages($organizationId, $newsArticleId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling NewsApi->listOrganizationNewsArticleImages: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **newsArticleId** | **string**| News article id |

### Return type

[**\KuntaAPI\Model\Attachment[]**](../Model/Attachment.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

