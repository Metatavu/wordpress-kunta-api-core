# KuntaAPI\AnnouncementsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationAnnouncement**](AnnouncementsApi.md#findOrganizationAnnouncement) | **GET** /organizations/{organizationId}/announcements/{announcementId} | Finds an organizations announcement
[**listOrganizationAnnouncements**](AnnouncementsApi.md#listOrganizationAnnouncements) | **GET** /organizations/{organizationId}/announcements | Lists organizations announcements


# **findOrganizationAnnouncement**
> \KuntaAPI\Model\Announcement findOrganizationAnnouncement($organizationId, $announcementId)

Finds an organizations announcement

Finds organization's single announcement

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\AnnouncementsApi();
$organizationId = "organizationId_example"; // string | Organization id
$announcementId = "announcementId_example"; // string | Announcement id

try {
    $result = $api_instance->findOrganizationAnnouncement($organizationId, $announcementId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AnnouncementsApi->findOrganizationAnnouncement: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **announcementId** | **string**| Announcement id |

### Return type

[**\KuntaAPI\Model\Announcement**](../Model/Announcement.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationAnnouncements**
> \KuntaAPI\Model\Announcement[] listOrganizationAnnouncements($organizationId, $slug, $firstResult, $maxResults, $sortBy, $sortDir)

Lists organizations announcements

Lists organizations announcements

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\AnnouncementsApi();
$organizationId = "organizationId_example"; // string | Organization id
$slug = "slug_example"; // string | Filter with slug
$firstResult = 56; // int | first index of results
$maxResults = 56; // int | maximum number of results
$sortBy = "sortBy_example"; // string | PUBLICATION_DATE
$sortDir = "sortDir_example"; // string | ASC or DESC

try {
    $result = $api_instance->listOrganizationAnnouncements($organizationId, $slug, $firstResult, $maxResults, $sortBy, $sortDir);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AnnouncementsApi->listOrganizationAnnouncements: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **slug** | **string**| Filter with slug | [optional]
 **firstResult** | **int**| first index of results | [optional]
 **maxResults** | **int**| maximum number of results | [optional]
 **sortBy** | **string**| PUBLICATION_DATE | [optional]
 **sortDir** | **string**| ASC or DESC | [optional]

### Return type

[**\KuntaAPI\Model\Announcement[]**](../Model/Announcement.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

