# KuntaAPI\EventsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationEvent**](EventsApi.md#findOrganizationEvent) | **GET** /organizations/{organizationId}/events/{eventId} | Returns organizations event by id
[**findOrganizationEventImage**](EventsApi.md#findOrganizationEventImage) | **GET** /organizations/{organizationId}/events/{eventId}/images/{imageId} | Returns an event image
[**getOrganizationEventImageData**](EventsApi.md#getOrganizationEventImageData) | **GET** /organizations/{organizationId}/events/{eventId}/images/{imageId}/data | Returns an event image data
[**listOrganizationEventImages**](EventsApi.md#listOrganizationEventImages) | **GET** /organizations/{organizationId}/events/{eventId}/images | Returns list of event images
[**listOrganizationEvents**](EventsApi.md#listOrganizationEvents) | **GET** /organizations/{organizationId}/events | Lists organizations events


# **findOrganizationEvent**
> \KuntaAPI\Model\Event findOrganizationEvent($organizationId, $eventId)

Returns organizations event by id

Returns organizations event by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\EventsApi();
$organizationId = "organizationId_example"; // string | Organization id
$eventId = "eventId_example"; // string | Event id

try {
    $result = $api_instance->findOrganizationEvent($organizationId, $eventId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling EventsApi->findOrganizationEvent: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **eventId** | **string**| Event id |

### Return type

[**\KuntaAPI\Model\Event**](../Model/Event.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationEventImage**
> \KuntaAPI\Model\Attachment findOrganizationEventImage($organizationId, $eventId, $imageId)

Returns an event image

Returns an event image

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\EventsApi();
$organizationId = "organizationId_example"; // string | Organization id
$eventId = "eventId_example"; // string | Event id
$imageId = "imageId_example"; // string | Event image id

try {
    $result = $api_instance->findOrganizationEventImage($organizationId, $eventId, $imageId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling EventsApi->findOrganizationEventImage: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **eventId** | **string**| Event id |
 **imageId** | **string**| Event image id |

### Return type

[**\KuntaAPI\Model\Attachment**](../Model/Attachment.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **getOrganizationEventImageData**
> string getOrganizationEventImageData($organizationId, $eventId, $imageId, $size)

Returns an event image data

Returns an event image data

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\EventsApi();
$organizationId = "organizationId_example"; // string | Organization id
$eventId = "eventId_example"; // string | Event id
$imageId = "imageId_example"; // string | Event image id
$size = 56; // int | Maximum width or height of image

try {
    $result = $api_instance->getOrganizationEventImageData($organizationId, $eventId, $imageId, $size);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling EventsApi->getOrganizationEventImageData: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **eventId** | **string**| Event id |
 **imageId** | **string**| Event image id |
 **size** | **int**| Maximum width or height of image | [optional]

### Return type

**string**

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/octet-stream

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationEventImages**
> \KuntaAPI\Model\Attachment[] listOrganizationEventImages($organizationId, $eventId)

Returns list of event images

Returns list of event images

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\EventsApi();
$organizationId = "organizationId_example"; // string | Organization id
$eventId = "eventId_example"; // string | Event id

try {
    $result = $api_instance->listOrganizationEventImages($organizationId, $eventId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling EventsApi->listOrganizationEventImages: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **eventId** | **string**| Event id |

### Return type

[**\KuntaAPI\Model\Attachment[]**](../Model/Attachment.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationEvents**
> \KuntaAPI\Model\Event[] listOrganizationEvents($organizationId, $startBefore, $startAfter, $endBefore, $endAfter, $firstResult, $maxResults, $orderBy, $orderDir)

Lists organizations events

Lists organizations events

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\EventsApi();
$organizationId = "organizationId_example"; // string | Organization id
$startBefore = "startBefore_example"; // string | return only events starting before the date
$startAfter = "startAfter_example"; // string | return only events starting after the date
$endBefore = "endBefore_example"; // string | return only events ending before the date
$endAfter = "endAfter_example"; // string | return only events ending after the date
$firstResult = 56; // int | first index of results
$maxResults = 56; // int | maximum number of results
$orderBy = "orderBy_example"; // string | define order (startDate, endDate). Default is startDate
$orderDir = "orderDir_example"; // string | ascending, descending. Default is ascending

try {
    $result = $api_instance->listOrganizationEvents($organizationId, $startBefore, $startAfter, $endBefore, $endAfter, $firstResult, $maxResults, $orderBy, $orderDir);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling EventsApi->listOrganizationEvents: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **startBefore** | **string**| return only events starting before the date | [optional]
 **startAfter** | **string**| return only events starting after the date | [optional]
 **endBefore** | **string**| return only events ending before the date | [optional]
 **endAfter** | **string**| return only events ending after the date | [optional]
 **firstResult** | **int**| first index of results | [optional]
 **maxResults** | **int**| maximum number of results | [optional]
 **orderBy** | **string**| define order (startDate, endDate). Default is startDate | [optional]
 **orderDir** | **string**| ascending, descending. Default is ascending | [optional]

### Return type

[**\KuntaAPI\Model\Event[]**](../Model/Event.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

