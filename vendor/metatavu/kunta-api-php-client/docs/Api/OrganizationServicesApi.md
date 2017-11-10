# KuntaAPI\OrganizationServicesApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createOrganizationService**](OrganizationServicesApi.md#createOrganizationService) | **POST** /organizations/{organizationId}/organizationServices | Create organization service
[**findOrganizationService**](OrganizationServicesApi.md#findOrganizationService) | **GET** /organizations/{organizationId}/organizationServices/{organizationServiceId} | Finds a organization service by id
[**listOrganizationOrganizationServices**](OrganizationServicesApi.md#listOrganizationOrganizationServices) | **GET** /organizations/{organizationId}/organizationServices | Organization organization service list
[**updateOrganizationService**](OrganizationServicesApi.md#updateOrganizationService) | **PUT** /organizations/{organizationId}/organizationServices/{organizationServiceId} | Updates an organization service


# **createOrganizationService**
> \KuntaAPI\Model\Organization createOrganizationService($organizationId, $body)

Create organization service

Create organization service

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\OrganizationServicesApi();
$organizationId = "organizationId_example"; // string | Organization id
$body = new \KuntaAPI\Model\OrganizationService(); // \KuntaAPI\Model\OrganizationService | Payload

try {
    $result = $api_instance->createOrganizationService($organizationId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling OrganizationServicesApi->createOrganizationService: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **body** | [**\KuntaAPI\Model\OrganizationService**](../Model/\KuntaAPI\Model\OrganizationService.md)| Payload |

### Return type

[**\KuntaAPI\Model\Organization**](../Model/Organization.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationService**
> \KuntaAPI\Model\OrganizationService findOrganizationService($organizationId, $organizationServiceId)

Finds a organization service by id

Find an organization service

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\OrganizationServicesApi();
$organizationId = "organizationId_example"; // string | Organization id
$organizationServiceId = "organizationServiceId_example"; // string | Organization service id

try {
    $result = $api_instance->findOrganizationService($organizationId, $organizationServiceId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling OrganizationServicesApi->findOrganizationService: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **organizationServiceId** | **string**| Organization service id |

### Return type

[**\KuntaAPI\Model\OrganizationService**](../Model/OrganizationService.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationOrganizationServices**
> \KuntaAPI\Model\OrganizationService[] listOrganizationOrganizationServices($organizationId, $firstResult, $maxResults)

Organization organization service list

Lists organization's organization services

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\OrganizationServicesApi();
$organizationId = "organizationId_example"; // string | Organization id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listOrganizationOrganizationServices($organizationId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling OrganizationServicesApi->listOrganizationOrganizationServices: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\OrganizationService[]**](../Model/OrganizationService.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updateOrganizationService**
> \KuntaAPI\Model\OrganizationService updateOrganizationService($organizationId, $organizationServiceId, $body)

Updates an organization service

Updates organization service

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new KuntaAPI\Api\OrganizationServicesApi();
$organizationId = "organizationId_example"; // string | Organization id
$organizationServiceId = "organizationServiceId_example"; // string | Organization service id
$body = new \KuntaAPI\Model\OrganizationService(); // \KuntaAPI\Model\OrganizationService | Payload

try {
    $result = $api_instance->updateOrganizationService($organizationId, $organizationServiceId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling OrganizationServicesApi->updateOrganizationService: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **organizationServiceId** | **string**| Organization service id |
 **body** | [**\KuntaAPI\Model\OrganizationService**](../Model/\KuntaAPI\Model\OrganizationService.md)| Payload |

### Return type

[**\KuntaAPI\Model\OrganizationService**](../Model/OrganizationService.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

