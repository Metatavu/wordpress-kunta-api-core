# KuntaAPI\TilesApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationTile**](TilesApi.md#findOrganizationTile) | **GET** /organizations/{organizationId}/tiles/{tileId} | Finds organizations tile
[**findOrganizationTileImage**](TilesApi.md#findOrganizationTileImage) | **GET** /organizations/{organizationId}/tiles/{tileId}/images/{imageId} | Returns a single organiztion tile image
[**getOrganizationTileImageData**](TilesApi.md#getOrganizationTileImageData) | **GET** /organizations/{organizationId}/tiles/{tileId}/images/{imageId}/data | Returns an organization tile image data
[**listOrganizationTileImages**](TilesApi.md#listOrganizationTileImages) | **GET** /organizations/{organizationId}/tiles/{tileId}/images | Returns a list of organization tile images
[**listOrganizationTiles**](TilesApi.md#listOrganizationTiles) | **GET** /organizations/{organizationId}/tiles | Lists organizations tiles


# **findOrganizationTile**
> \KuntaAPI\Model\Tile findOrganizationTile($organizationId, $tileId)

Finds organizations tile

Finds single organization tile

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\TilesApi();
$organizationId = "organizationId_example"; // string | Organization id
$tileId = "tileId_example"; // string | tile id

try {
    $result = $api_instance->findOrganizationTile($organizationId, $tileId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TilesApi->findOrganizationTile: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **tileId** | **string**| tile id |

### Return type

[**\KuntaAPI\Model\Tile**](../Model/Tile.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationTileImage**
> \KuntaAPI\Model\Attachment findOrganizationTileImage($organizationId, $tileId, $imageId)

Returns a single organiztion tile image

Returns a single organiztion tile image

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\TilesApi();
$organizationId = "organizationId_example"; // string | Organization id
$tileId = "tileId_example"; // string | Tile Id
$imageId = "imageId_example"; // string | Tile image id

try {
    $result = $api_instance->findOrganizationTileImage($organizationId, $tileId, $imageId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TilesApi->findOrganizationTileImage: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **tileId** | **string**| Tile Id |
 **imageId** | **string**| Tile image id |

### Return type

[**\KuntaAPI\Model\Attachment**](../Model/Attachment.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **getOrganizationTileImageData**
> string getOrganizationTileImageData($organizationId, $tileId, $imageId, $size)

Returns an organization tile image data

Returns an organization tile image data

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\TilesApi();
$organizationId = "organizationId_example"; // string | Organization id
$tileId = "tileId_example"; // string | Tile id
$imageId = "imageId_example"; // string | Tile image id
$size = 56; // int | Maximum width or height of image

try {
    $result = $api_instance->getOrganizationTileImageData($organizationId, $tileId, $imageId, $size);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TilesApi->getOrganizationTileImageData: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **tileId** | **string**| Tile id |
 **imageId** | **string**| Tile image id |
 **size** | **int**| Maximum width or height of image | [optional]

### Return type

**string**

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/octet-stream

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationTileImages**
> \KuntaAPI\Model\Attachment[] listOrganizationTileImages($organizationId, $tileId)

Returns a list of organization tile images

Returns a list of organization tile images

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\TilesApi();
$organizationId = "organizationId_example"; // string | Organization id
$tileId = "tileId_example"; // string | Tile id

try {
    $result = $api_instance->listOrganizationTileImages($organizationId, $tileId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TilesApi->listOrganizationTileImages: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **tileId** | **string**| Tile id |

### Return type

[**\KuntaAPI\Model\Attachment[]**](../Model/Attachment.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationTiles**
> \KuntaAPI\Model\Tile[] listOrganizationTiles($organizationId)

Lists organizations tiles

Lists organizations tiles

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\TilesApi();
$organizationId = "organizationId_example"; // string | Organization id

try {
    $result = $api_instance->listOrganizationTiles($organizationId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TilesApi->listOrganizationTiles: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |

### Return type

[**\KuntaAPI\Model\Tile[]**](../Model/Tile.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

