# KuntaAPI\PublicTransportApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationPublicTransportAgency**](PublicTransportApi.md#findOrganizationPublicTransportAgency) | **GET** /organizations/{organizationId}/transportAgencies/{agencyId} | Finds an organizations public transport agency
[**findOrganizationPublicTransportRoute**](PublicTransportApi.md#findOrganizationPublicTransportRoute) | **GET** /organizations/{organizationId}/transportRoutes/{routeId} | Finds an organizations public transport route
[**findOrganizationPublicTransportSchedule**](PublicTransportApi.md#findOrganizationPublicTransportSchedule) | **GET** /organizations/{organizationId}/transportSchedules/{scheduleId} | Finds organizations public transport schedule
[**findOrganizationPublicTransportStop**](PublicTransportApi.md#findOrganizationPublicTransportStop) | **GET** /organizations/{organizationId}/transportStops/{stopId} | Finds a stop of organizations public transport route
[**findOrganizationPublicTransportStopTime**](PublicTransportApi.md#findOrganizationPublicTransportStopTime) | **GET** /organizations/{organizationId}/transportStopTimes/{stopTimeId} | Finds organizations public transport stopTime
[**findOrganizationPublicTransportTrip**](PublicTransportApi.md#findOrganizationPublicTransportTrip) | **GET** /organizations/{organizationId}/transportTrips/{tripId} | Finds organizations public transport trip
[**listOrganizationPublicTransportAgencies**](PublicTransportApi.md#listOrganizationPublicTransportAgencies) | **GET** /organizations/{organizationId}/transportAgencies | Lists organizations public transport agencies
[**listOrganizationPublicTransportRoutes**](PublicTransportApi.md#listOrganizationPublicTransportRoutes) | **GET** /organizations/{organizationId}/transportRoutes | Lists organizations public transport routes
[**listOrganizationPublicTransportSchedules**](PublicTransportApi.md#listOrganizationPublicTransportSchedules) | **GET** /organizations/{organizationId}/transportSchedules | Lists schedules of organization&#39;s public transport schedules
[**listOrganizationPublicTransportStopTimes**](PublicTransportApi.md#listOrganizationPublicTransportStopTimes) | **GET** /organizations/{organizationId}/transportStopTimes | Lists stopTimes of organization&#39;s public transport stopTimes
[**listOrganizationPublicTransportStops**](PublicTransportApi.md#listOrganizationPublicTransportStops) | **GET** /organizations/{organizationId}/transportStops | Lists organizations public transport stops
[**listOrganizationPublicTransportTrips**](PublicTransportApi.md#listOrganizationPublicTransportTrips) | **GET** /organizations/{organizationId}/transportTrips | Lists trips of organization&#39;s public transport trips


# **findOrganizationPublicTransportAgency**
> \KuntaAPI\Model\Agency findOrganizationPublicTransportAgency($organizationId, $agencyId)

Finds an organizations public transport agency

Finds organization's single public transport agency

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id
$agencyId = "agencyId_example"; // string | Agency id

try {
    $result = $api_instance->findOrganizationPublicTransportAgency($organizationId, $agencyId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->findOrganizationPublicTransportAgency: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **agencyId** | **string**| Agency id |

### Return type

[**\KuntaAPI\Model\Agency**](../Model/Agency.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationPublicTransportRoute**
> \KuntaAPI\Model\Route findOrganizationPublicTransportRoute($organizationId, $routeId)

Finds an organizations public transport route

Finds organization's single public transport route

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id
$routeId = "routeId_example"; // string | Route id

try {
    $result = $api_instance->findOrganizationPublicTransportRoute($organizationId, $routeId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->findOrganizationPublicTransportRoute: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **routeId** | **string**| Route id |

### Return type

[**\KuntaAPI\Model\Route**](../Model/Route.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationPublicTransportSchedule**
> \KuntaAPI\Model\Schedule findOrganizationPublicTransportSchedule($organizationId, $scheduleId)

Finds organizations public transport schedule

Finds organizations public transport schedule

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id
$scheduleId = "scheduleId_example"; // string | Schedule id

try {
    $result = $api_instance->findOrganizationPublicTransportSchedule($organizationId, $scheduleId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->findOrganizationPublicTransportSchedule: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **scheduleId** | **string**| Schedule id |

### Return type

[**\KuntaAPI\Model\Schedule**](../Model/Schedule.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationPublicTransportStop**
> \KuntaAPI\Model\Stop findOrganizationPublicTransportStop($organizationId, $stopId)

Finds a stop of organizations public transport route

Finds a stop of organizations public transport route

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id
$stopId = "stopId_example"; // string | Stop id

try {
    $result = $api_instance->findOrganizationPublicTransportStop($organizationId, $stopId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->findOrganizationPublicTransportStop: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **stopId** | **string**| Stop id |

### Return type

[**\KuntaAPI\Model\Stop**](../Model/Stop.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationPublicTransportStopTime**
> \KuntaAPI\Model\StopTime findOrganizationPublicTransportStopTime($organizationId, $stopTimeId)

Finds organizations public transport stopTime

Finds organizations public transport stopTime

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id
$stopTimeId = "stopTimeId_example"; // string | StopTime id

try {
    $result = $api_instance->findOrganizationPublicTransportStopTime($organizationId, $stopTimeId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->findOrganizationPublicTransportStopTime: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **stopTimeId** | **string**| StopTime id |

### Return type

[**\KuntaAPI\Model\StopTime**](../Model/StopTime.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationPublicTransportTrip**
> \KuntaAPI\Model\Trip findOrganizationPublicTransportTrip($organizationId, $tripId)

Finds organizations public transport trip

Finds organizations public transport trip

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id
$tripId = "tripId_example"; // string | Trip id

try {
    $result = $api_instance->findOrganizationPublicTransportTrip($organizationId, $tripId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->findOrganizationPublicTransportTrip: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **tripId** | **string**| Trip id |

### Return type

[**\KuntaAPI\Model\Trip**](../Model/Trip.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationPublicTransportAgencies**
> \KuntaAPI\Model\Agency[] listOrganizationPublicTransportAgencies($organizationId)

Lists organizations public transport agencies

Lists organizations public transport agencies

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id

try {
    $result = $api_instance->listOrganizationPublicTransportAgencies($organizationId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->listOrganizationPublicTransportAgencies: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |

### Return type

[**\KuntaAPI\Model\Agency[]**](../Model/Agency.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationPublicTransportRoutes**
> \KuntaAPI\Model\Route[] listOrganizationPublicTransportRoutes($organizationId)

Lists organizations public transport routes

Lists organizations public transport routes

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id

try {
    $result = $api_instance->listOrganizationPublicTransportRoutes($organizationId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->listOrganizationPublicTransportRoutes: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |

### Return type

[**\KuntaAPI\Model\Route[]**](../Model/Route.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationPublicTransportSchedules**
> \KuntaAPI\Model\Schedule[] listOrganizationPublicTransportSchedules($organizationId)

Lists schedules of organization's public transport schedules

Lists schedules of organization's public transport schedules

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id

try {
    $result = $api_instance->listOrganizationPublicTransportSchedules($organizationId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->listOrganizationPublicTransportSchedules: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |

### Return type

[**\KuntaAPI\Model\Schedule[]**](../Model/Schedule.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationPublicTransportStopTimes**
> \KuntaAPI\Model\StopTime[] listOrganizationPublicTransportStopTimes($organizationId, $stopId, $departureTime, $sortBy, $sortDir, $firstResult, $maxResults)

Lists stopTimes of organization's public transport stopTimes

Lists stopTimes of organization's public transport stopTimes

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id
$stopId = "stopId_example"; // string | Filter stop times by stopId
$departureTime = 56; // int | Filter stop times that depart in or after specified time. Value is defined in seconds since midnight
$sortBy = "sortBy_example"; // string | DEPARTURE_TIME
$sortDir = "sortDir_example"; // string | ASC or DESC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listOrganizationPublicTransportStopTimes($organizationId, $stopId, $departureTime, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->listOrganizationPublicTransportStopTimes: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **stopId** | **string**| Filter stop times by stopId | [optional]
 **departureTime** | **int**| Filter stop times that depart in or after specified time. Value is defined in seconds since midnight | [optional]
 **sortBy** | **string**| DEPARTURE_TIME | [optional]
 **sortDir** | **string**| ASC or DESC | [optional]
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\StopTime[]**](../Model/StopTime.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationPublicTransportStops**
> \KuntaAPI\Model\Stop[] listOrganizationPublicTransportStops($organizationId)

Lists organizations public transport stops

Lists organizations public transport stops

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id

try {
    $result = $api_instance->listOrganizationPublicTransportStops($organizationId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->listOrganizationPublicTransportStops: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |

### Return type

[**\KuntaAPI\Model\Stop[]**](../Model/Stop.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationPublicTransportTrips**
> \KuntaAPI\Model\Trip[] listOrganizationPublicTransportTrips($organizationId)

Lists trips of organization's public transport trips

Lists trips of organization's public transport trips

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\PublicTransportApi();
$organizationId = "organizationId_example"; // string | Organization id

try {
    $result = $api_instance->listOrganizationPublicTransportTrips($organizationId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling PublicTransportApi->listOrganizationPublicTransportTrips: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |

### Return type

[**\KuntaAPI\Model\Trip[]**](../Model/Trip.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

