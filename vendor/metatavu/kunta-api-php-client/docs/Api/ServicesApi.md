# KuntaAPI\ServicesApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createService**](ServicesApi.md#createService) | **POST** /services | Create service
[**findService**](ServicesApi.md#findService) | **GET** /services/{serviceId} | Finds a service by id
[**findServiceElectronicChannel**](ServicesApi.md#findServiceElectronicChannel) | **GET** /services/{serviceId}/electronicChannels/{electronicChannelId} | finds ElectronicChannel by electronicChannelId
[**findServicePhoneChannel**](ServicesApi.md#findServicePhoneChannel) | **GET** /services/{serviceId}/phoneChannels/{phoneChannelId} | finds PhoneChannel by phoneChannelId
[**findServicePrintableFormChannel**](ServicesApi.md#findServicePrintableFormChannel) | **GET** /services/{serviceId}/printableFormChannels/{printableFormChannelId} | finds PrintableFormChannel by printableFormChannelId
[**findServiceServiceLocationChannel**](ServicesApi.md#findServiceServiceLocationChannel) | **GET** /services/{serviceId}/serviceLocationChannels/{serviceLocationChannelId} | finds ServiceLocationChannel by serviceLocationChannelId
[**findServiceWebPageChannel**](ServicesApi.md#findServiceWebPageChannel) | **GET** /services/{serviceId}/webPageChannels/{webPageChannelId} | finds WebPageChannel by webPageChannelId
[**listServiceElectronicChannels**](ServicesApi.md#listServiceElectronicChannels) | **GET** /services/{serviceId}/electronicChannels | Lists ElectronicChannels by serviceId
[**listServicePhoneChannels**](ServicesApi.md#listServicePhoneChannels) | **GET** /services/{serviceId}/phoneChannels | Lists PhoneChannels by serviceId
[**listServicePrintableFormChannels**](ServicesApi.md#listServicePrintableFormChannels) | **GET** /services/{serviceId}/printableFormChannels | Lists PrintableFormChannels by serviceId
[**listServiceServiceLocationChannels**](ServicesApi.md#listServiceServiceLocationChannels) | **GET** /services/{serviceId}/serviceLocationChannels | Lists ServiceLocationChannels by serviceId
[**listServiceWebPageChannels**](ServicesApi.md#listServiceWebPageChannels) | **GET** /services/{serviceId}/webPageChannels | Lists WebPageChannels by serviceId
[**listServices**](ServicesApi.md#listServices) | **GET** /services | Service list
[**updateService**](ServicesApi.md#updateService) | **PUT** /services/{serviceId} | Updates service


# **createService**
> \KuntaAPI\Model\Service createService($body)

Create service

Creates new service

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$body = new \KuntaAPI\Model\Service(); // \KuntaAPI\Model\Service | Payload

try {
    $result = $api_instance->createService($body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->createService: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**\KuntaAPI\Model\Service**](../Model/\KuntaAPI\Model\Service.md)| Payload |

### Return type

[**\KuntaAPI\Model\Service**](../Model/Service.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findService**
> \KuntaAPI\Model\Service findService($serviceId)

Finds a service by id

Finds service

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id

try {
    $result = $api_instance->findService($serviceId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->findService: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |

### Return type

[**\KuntaAPI\Model\Service**](../Model/Service.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServiceElectronicChannel**
> \KuntaAPI\Model\ElectronicServiceChannel findServiceElectronicChannel($serviceId, $electronicChannelId)

finds ElectronicChannel by electronicChannelId

finds ElectronicChannels by electronicChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id
$electronicChannelId = "electronicChannelId_example"; // string | electronicChannel id

try {
    $result = $api_instance->findServiceElectronicChannel($serviceId, $electronicChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->findServiceElectronicChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **electronicChannelId** | **string**| electronicChannel id |

### Return type

[**\KuntaAPI\Model\ElectronicServiceChannel**](../Model/ElectronicServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServicePhoneChannel**
> \KuntaAPI\Model\PhoneServiceChannel findServicePhoneChannel($serviceId, $phoneChannelId)

finds PhoneChannel by phoneChannelId

finds PhoneChannels by phoneChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id
$phoneChannelId = "phoneChannelId_example"; // string | phoneChannel id

try {
    $result = $api_instance->findServicePhoneChannel($serviceId, $phoneChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->findServicePhoneChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **phoneChannelId** | **string**| phoneChannel id |

### Return type

[**\KuntaAPI\Model\PhoneServiceChannel**](../Model/PhoneServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServicePrintableFormChannel**
> \KuntaAPI\Model\PrintableFormServiceChannel findServicePrintableFormChannel($serviceId, $printableFormChannelId)

finds PrintableFormChannel by printableFormChannelId

finds PrintableFormChannels by printableFormChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id
$printableFormChannelId = "printableFormChannelId_example"; // string | printableFormChannel id

try {
    $result = $api_instance->findServicePrintableFormChannel($serviceId, $printableFormChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->findServicePrintableFormChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **printableFormChannelId** | **string**| printableFormChannel id |

### Return type

[**\KuntaAPI\Model\PrintableFormServiceChannel**](../Model/PrintableFormServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServiceServiceLocationChannel**
> \KuntaAPI\Model\ServiceLocationServiceChannel findServiceServiceLocationChannel($serviceId, $serviceLocationChannelId)

finds ServiceLocationChannel by serviceLocationChannelId

finds ServiceLocationChannels by serviceLocationChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id
$serviceLocationChannelId = "serviceLocationChannelId_example"; // string | serviceLocationChannel id

try {
    $result = $api_instance->findServiceServiceLocationChannel($serviceId, $serviceLocationChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->findServiceServiceLocationChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **serviceLocationChannelId** | **string**| serviceLocationChannel id |

### Return type

[**\KuntaAPI\Model\ServiceLocationServiceChannel**](../Model/ServiceLocationServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServiceWebPageChannel**
> \KuntaAPI\Model\WebPageServiceChannel findServiceWebPageChannel($serviceId, $webPageChannelId)

finds WebPageChannel by webPageChannelId

finds WebPageChannels by webPageChannelId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id
$webPageChannelId = "webPageChannelId_example"; // string | webPageChannel id

try {
    $result = $api_instance->findServiceWebPageChannel($serviceId, $webPageChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->findServiceWebPageChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **webPageChannelId** | **string**| webPageChannel id |

### Return type

[**\KuntaAPI\Model\WebPageServiceChannel**](../Model/WebPageServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceElectronicChannels**
> \KuntaAPI\Model\ElectronicServiceChannel[] listServiceElectronicChannels($serviceId, $firstResult, $maxResults)

Lists ElectronicChannels by serviceId

Lists ElectronicChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServiceElectronicChannels($serviceId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->listServiceElectronicChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\ElectronicServiceChannel[]**](../Model/ElectronicServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServicePhoneChannels**
> \KuntaAPI\Model\PhoneServiceChannel[] listServicePhoneChannels($serviceId, $firstResult, $maxResults)

Lists PhoneChannels by serviceId

Lists PhoneChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServicePhoneChannels($serviceId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->listServicePhoneChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\PhoneServiceChannel[]**](../Model/PhoneServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServicePrintableFormChannels**
> \KuntaAPI\Model\PrintableFormServiceChannel[] listServicePrintableFormChannels($serviceId, $firstResult, $maxResults)

Lists PrintableFormChannels by serviceId

Lists PrintableFormChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServicePrintableFormChannels($serviceId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->listServicePrintableFormChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\PrintableFormServiceChannel[]**](../Model/PrintableFormServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceServiceLocationChannels**
> \KuntaAPI\Model\ServiceLocationServiceChannel[] listServiceServiceLocationChannels($serviceId, $firstResult, $maxResults)

Lists ServiceLocationChannels by serviceId

Lists ServiceLocationChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServiceServiceLocationChannels($serviceId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->listServiceServiceLocationChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\ServiceLocationServiceChannel[]**](../Model/ServiceLocationServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServiceWebPageChannels**
> \KuntaAPI\Model\WebPageServiceChannel[] listServiceWebPageChannels($serviceId, $firstResult, $maxResults)

Lists WebPageChannels by serviceId

Lists WebPageChannels by serviceId

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Service id
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServiceWebPageChannels($serviceId, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->listServiceWebPageChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Service id |
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\WebPageServiceChannel[]**](../Model/WebPageServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listServices**
> \KuntaAPI\Model\Service[] listServices($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults, $electronicServiceChannelId, $phoneServiceChannelId, $printableFormServiceChannelId, $serviceLocationServiceChannelId, $webPageServiceChannelId)

Service list

Lists services

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$organizationId = "organizationId_example"; // string | Return only services belonging to specified organization
$search = "search_example"; // string | Search services by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results
$electronicServiceChannelId = "electronicServiceChannelId_example"; // string | Return only services that are connected to specified electronic service channel
$phoneServiceChannelId = "phoneServiceChannelId_example"; // string | Return only services that are connected to specified phone service channel
$printableFormServiceChannelId = "printableFormServiceChannelId_example"; // string | Return only services that are connected to specified printable form service channel
$serviceLocationServiceChannelId = "serviceLocationServiceChannelId_example"; // string | Return only services that are connected to specified location service channel
$webPageServiceChannelId = "webPageServiceChannelId_example"; // string | Return only services that are connected to specified webpage service channel

try {
    $result = $api_instance->listServices($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults, $electronicServiceChannelId, $phoneServiceChannelId, $printableFormServiceChannelId, $serviceLocationServiceChannelId, $webPageServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->listServices: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Return only services belonging to specified organization | [optional]
 **search** | **string**| Search services by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL or SCORE). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]
 **electronicServiceChannelId** | **string**| Return only services that are connected to specified electronic service channel | [optional]
 **phoneServiceChannelId** | **string**| Return only services that are connected to specified phone service channel | [optional]
 **printableFormServiceChannelId** | **string**| Return only services that are connected to specified printable form service channel | [optional]
 **serviceLocationServiceChannelId** | **string**| Return only services that are connected to specified location service channel | [optional]
 **webPageServiceChannelId** | **string**| Return only services that are connected to specified webpage service channel | [optional]

### Return type

[**\KuntaAPI\Model\Service[]**](../Model/Service.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updateService**
> \KuntaAPI\Model\Service updateService($serviceId, $body)

Updates service

Updates service

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServicesApi();
$serviceId = "serviceId_example"; // string | Organization service id
$body = new \KuntaAPI\Model\Service(); // \KuntaAPI\Model\Service | Payload

try {
    $result = $api_instance->updateService($serviceId, $body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServicesApi->updateService: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceId** | **string**| Organization service id |
 **body** | [**\KuntaAPI\Model\Service**](../Model/\KuntaAPI\Model\Service.md)| Payload |

### Return type

[**\KuntaAPI\Model\Service**](../Model/Service.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

