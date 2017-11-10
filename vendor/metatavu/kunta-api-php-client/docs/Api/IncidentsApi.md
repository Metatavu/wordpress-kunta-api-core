# KuntaAPI\IncidentsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationIncident**](IncidentsApi.md#findOrganizationIncident) | **GET** /organizations/{organizationId}/incidents/{incidentId} | Returns organizations incident by id
[**listOrganizationIncidents**](IncidentsApi.md#listOrganizationIncidents) | **GET** /organizations/{organizationId}/incidents | Lists organizations incidents


# **findOrganizationIncident**
> \KuntaAPI\Model\Incident findOrganizationIncident($organizationId, $incidentId)

Returns organizations incident by id

Returns organizations incident by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\IncidentsApi();
$organizationId = "organizationId_example"; // string | Organization id
$incidentId = "incidentId_example"; // string | Incident id

try {
    $result = $api_instance->findOrganizationIncident($organizationId, $incidentId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IncidentsApi->findOrganizationIncident: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **incidentId** | **string**| Incident id |

### Return type

[**\KuntaAPI\Model\Incident**](../Model/Incident.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationIncidents**
> \KuntaAPI\Model\Incident[] listOrganizationIncidents($organizationId, $slug, $startBefore, $endAfter, $area, $firstResult, $maxResults, $orderBy, $orderDir)

Lists organizations incidents

Lists organizations incidents

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\IncidentsApi();
$organizationId = "organizationId_example"; // string | Organization id
$slug = "slug_example"; // string | Filter with slug
$startBefore = "startBefore_example"; // string | 
$endAfter = "endAfter_example"; // string | 
$area = 56; // int | Return only incidents from specified area
$firstResult = 56; // int | First index of results
$maxResults = 56; // int | Maximum number of results
$orderBy = "orderBy_example"; // string | Define order (start, end)
$orderDir = "orderDir_example"; // string | Order direction (ASC, DESC). Default is ASC

try {
    $result = $api_instance->listOrganizationIncidents($organizationId, $slug, $startBefore, $endAfter, $area, $firstResult, $maxResults, $orderBy, $orderDir);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IncidentsApi->listOrganizationIncidents: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **slug** | **string**| Filter with slug | [optional]
 **startBefore** | **string**|  | [optional]
 **endAfter** | **string**|  | [optional]
 **area** | **int**| Return only incidents from specified area | [optional]
 **firstResult** | **int**| First index of results | [optional]
 **maxResults** | **int**| Maximum number of results | [optional]
 **orderBy** | **string**| Define order (start, end) | [optional]
 **orderDir** | **string**| Order direction (ASC, DESC). Default is ASC | [optional]

### Return type

[**\KuntaAPI\Model\Incident[]**](../Model/Incident.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

