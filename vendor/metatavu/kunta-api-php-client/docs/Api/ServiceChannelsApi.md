# KuntaAPI\ServiceChannelsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findElectronicServiceChannel**](ServiceChannelsApi.md#findElectronicServiceChannel) | **GET** /electronicServiceChannels/{electronicServiceChannelId} | Finds an electronic service channel by id
[**findPhoneServiceChannel**](ServiceChannelsApi.md#findPhoneServiceChannel) | **GET** /phoneServiceChannels/{phoneServiceChannelId} | Finds a phone service channel by id
[**findPrintableFormServiceChannel**](ServiceChannelsApi.md#findPrintableFormServiceChannel) | **GET** /printableFormServiceChannels/{printableFormServiceChannelId} | Finds a printable form service channel
[**findServiceLocationServiceChannel**](ServiceChannelsApi.md#findServiceLocationServiceChannel) | **GET** /serviceLocationServiceChannels/{serviceLocationServiceChannelId} | Finds a service location service by id
[**findWebPageServiceChannel**](ServiceChannelsApi.md#findWebPageServiceChannel) | **GET** /webPageServiceChannels/{webPageServiceChannelId} | Finds a web page service channel by id
[**listElectronicServiceChannels**](ServiceChannelsApi.md#listElectronicServiceChannels) | **GET** /electronicServiceChannels | Lists electronic service channels
[**listPhoneServiceChannels**](ServiceChannelsApi.md#listPhoneServiceChannels) | **GET** /phoneServiceChannels | Lists phone service channels
[**listPrintableFormServiceChannels**](ServiceChannelsApi.md#listPrintableFormServiceChannels) | **GET** /printableFormServiceChannels | Lists printable form service channels
[**listServiceLocationServiceChannels**](ServiceChannelsApi.md#listServiceLocationServiceChannels) | **GET** /serviceLocationServiceChannels | Lists service location service channels
[**listWebPageServiceChannels**](ServiceChannelsApi.md#listWebPageServiceChannels) | **GET** /webPageServiceChannels | Lists web page service channels
[**updateElectronicServiceChannel**](ServiceChannelsApi.md#updateElectronicServiceChannel) | **PUT** /electronicServiceChannels/{electronicServiceChannelId} | Updates a channel
[**updatePhoneServiceChannel**](ServiceChannelsApi.md#updatePhoneServiceChannel) | **PUT** /phoneServiceChannels/{phoneServiceChannelId} | Updates a channel
[**updatePrintableFormServiceChannel**](ServiceChannelsApi.md#updatePrintableFormServiceChannel) | **PUT** /printableFormServiceChannels/{printableFormServiceChannelId} | Updates a channel
[**updateServiceLocationServiceChannel**](ServiceChannelsApi.md#updateServiceLocationServiceChannel) | **PUT** /serviceLocationServiceChannels/{serviceLocationServiceChannelId} | Updates a service location channel
[**updateWebPageServiceChannel**](ServiceChannelsApi.md#updateWebPageServiceChannel) | **PUT** /webPageServiceChannels/{webPageServiceChannelId} | Updates a channel


# **findElectronicServiceChannel**
> \KuntaAPI\Model\ElectronicServiceChannel findElectronicServiceChannel($electronicServiceChannelId)

Finds an electronic service channel by id

Finds an electronic service channel by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$electronicServiceChannelId = "electronicServiceChannelId_example"; // string | electronicChannel id

try {
    $result = $api_instance->findElectronicServiceChannel($electronicServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->findElectronicServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **electronicServiceChannelId** | **string**| electronicChannel id |

### Return type

[**\KuntaAPI\Model\ElectronicServiceChannel**](../Model/ElectronicServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findPhoneServiceChannel**
> \KuntaAPI\Model\PhoneServiceChannel findPhoneServiceChannel($phoneServiceChannelId)

Finds a phone service channel by id

Finds a phone service channel by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$phoneServiceChannelId = "phoneServiceChannelId_example"; // string | Phone service channel id

try {
    $result = $api_instance->findPhoneServiceChannel($phoneServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->findPhoneServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **phoneServiceChannelId** | **string**| Phone service channel id |

### Return type

[**\KuntaAPI\Model\PhoneServiceChannel**](../Model/PhoneServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findPrintableFormServiceChannel**
> \KuntaAPI\Model\PrintableFormServiceChannel findPrintableFormServiceChannel($printableFormServiceChannelId)

Finds a printable form service channel

Finds a printable form service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$printableFormServiceChannelId = "printableFormServiceChannelId_example"; // string | Printable form service channel id

try {
    $result = $api_instance->findPrintableFormServiceChannel($printableFormServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->findPrintableFormServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **printableFormServiceChannelId** | **string**| Printable form service channel id |

### Return type

[**\KuntaAPI\Model\PrintableFormServiceChannel**](../Model/PrintableFormServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findServiceLocationServiceChannel**
> \KuntaAPI\Model\ServiceLocationServiceChannel findServiceLocationServiceChannel($serviceLocationServiceChannelId)

Finds a service location service by id

Finds a service location service by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$serviceLocationServiceChannelId = "serviceLocationServiceChannelId_example"; // string | serviceLocationChannel id

try {
    $result = $api_instance->findServiceLocationServiceChannel($serviceLocationServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->findServiceLocationServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceLocationServiceChannelId** | **string**| serviceLocationChannel id |

### Return type

[**\KuntaAPI\Model\ServiceLocationServiceChannel**](../Model/ServiceLocationServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findWebPageServiceChannel**
> \KuntaAPI\Model\WebPageServiceChannel findWebPageServiceChannel($webPageServiceChannelId)

Finds a web page service channel by id

Finds a web page service channel by id

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$webPageServiceChannelId = "webPageServiceChannelId_example"; // string | webPageChannel id

try {
    $result = $api_instance->findWebPageServiceChannel($webPageServiceChannelId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->findWebPageServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webPageServiceChannelId** | **string**| webPageChannel id |

### Return type

[**\KuntaAPI\Model\WebPageServiceChannel**](../Model/WebPageServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listElectronicServiceChannels**
> \KuntaAPI\Model\ElectronicServiceChannel[] listElectronicServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists electronic service channels

Lists electronic service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$organizationId = "organizationId_example"; // string | Organization id
$search = "search_example"; // string | Search channels by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listElectronicServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->listElectronicServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id | [optional]
 **search** | **string**| Search channels by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL or SCORE). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
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

# **listPhoneServiceChannels**
> \KuntaAPI\Model\PhoneServiceChannel[] listPhoneServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists phone service channels

Lists phone service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$organizationId = "organizationId_example"; // string | Organization id
$search = "search_example"; // string | Search channels by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listPhoneServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->listPhoneServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id | [optional]
 **search** | **string**| Search channels by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL or SCORE). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
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

# **listPrintableFormServiceChannels**
> \KuntaAPI\Model\PrintableFormServiceChannel[] listPrintableFormServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists printable form service channels

Lists printable form service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$organizationId = "organizationId_example"; // string | Organization id
$search = "search_example"; // string | Search channels by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listPrintableFormServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->listPrintableFormServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id | [optional]
 **search** | **string**| Search channels by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL or SCORE). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
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

# **listServiceLocationServiceChannels**
> \KuntaAPI\Model\ServiceLocationServiceChannel[] listServiceLocationServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists service location service channels

Lists service location service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$organizationId = "organizationId_example"; // string | Organization id
$search = "search_example"; // string | Search service location channels by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listServiceLocationServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->listServiceLocationServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id | [optional]
 **search** | **string**| Search service location channels by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL or SCORE). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
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

# **listWebPageServiceChannels**
> \KuntaAPI\Model\WebPageServiceChannel[] listWebPageServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults)

Lists web page service channels

Lists web page service channels

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$organizationId = "organizationId_example"; // string | Organization id
$search = "search_example"; // string | Search channels by free-text query
$sortBy = "sortBy_example"; // string | define order (NATURAL or SCORE). Default is NATURAL
$sortDir = "sortDir_example"; // string | ASC or DESC. Default is ASC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listWebPageServiceChannels($organizationId, $search, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->listWebPageServiceChannels: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id | [optional]
 **search** | **string**| Search channels by free-text query | [optional]
 **sortBy** | **string**| define order (NATURAL or SCORE). Default is NATURAL | [optional]
 **sortDir** | **string**| ASC or DESC. Default is ASC | [optional]
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

# **updateElectronicServiceChannel**
> \KuntaAPI\Model\ElectronicServiceChannel updateElectronicServiceChannel($electronicServiceChannelId, $payload)

Updates a channel

Updates a service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$electronicServiceChannelId = "electronicServiceChannelId_example"; // string | electronicChannel id
$payload = new \KuntaAPI\Model\ElectronicServiceChannel(); // \KuntaAPI\Model\ElectronicServiceChannel | New electronic service data

try {
    $result = $api_instance->updateElectronicServiceChannel($electronicServiceChannelId, $payload);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->updateElectronicServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **electronicServiceChannelId** | **string**| electronicChannel id |
 **payload** | [**\KuntaAPI\Model\ElectronicServiceChannel**](../Model/\KuntaAPI\Model\ElectronicServiceChannel.md)| New electronic service data |

### Return type

[**\KuntaAPI\Model\ElectronicServiceChannel**](../Model/ElectronicServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updatePhoneServiceChannel**
> \KuntaAPI\Model\PhoneServiceChannel updatePhoneServiceChannel($phoneServiceChannelId, $payload)

Updates a channel

Updates a service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$phoneServiceChannelId = "phoneServiceChannelId_example"; // string | phone channel id
$payload = new \KuntaAPI\Model\PhoneServiceChannel(); // \KuntaAPI\Model\PhoneServiceChannel | New phone service data

try {
    $result = $api_instance->updatePhoneServiceChannel($phoneServiceChannelId, $payload);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->updatePhoneServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **phoneServiceChannelId** | **string**| phone channel id |
 **payload** | [**\KuntaAPI\Model\PhoneServiceChannel**](../Model/\KuntaAPI\Model\PhoneServiceChannel.md)| New phone service data |

### Return type

[**\KuntaAPI\Model\PhoneServiceChannel**](../Model/PhoneServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updatePrintableFormServiceChannel**
> \KuntaAPI\Model\PrintableFormServiceChannel updatePrintableFormServiceChannel($printableFormServiceChannelId, $payload)

Updates a channel

Updates a service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$printableFormServiceChannelId = "printableFormServiceChannelId_example"; // string | printable form channel id
$payload = new \KuntaAPI\Model\PrintableFormServiceChannel(); // \KuntaAPI\Model\PrintableFormServiceChannel | New printable form service data

try {
    $result = $api_instance->updatePrintableFormServiceChannel($printableFormServiceChannelId, $payload);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->updatePrintableFormServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **printableFormServiceChannelId** | **string**| printable form channel id |
 **payload** | [**\KuntaAPI\Model\PrintableFormServiceChannel**](../Model/\KuntaAPI\Model\PrintableFormServiceChannel.md)| New printable form service data |

### Return type

[**\KuntaAPI\Model\PrintableFormServiceChannel**](../Model/PrintableFormServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updateServiceLocationServiceChannel**
> \KuntaAPI\Model\ServiceLocationServiceChannel updateServiceLocationServiceChannel($serviceLocationServiceChannelId, $serviceLocationChannel)

Updates a service location channel

Updates a service location channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$serviceLocationServiceChannelId = "serviceLocationServiceChannelId_example"; // string | serviceLocationChannel id
$serviceLocationChannel = new \KuntaAPI\Model\ServiceLocationServiceChannel(); // \KuntaAPI\Model\ServiceLocationServiceChannel | New service location channel data

try {
    $result = $api_instance->updateServiceLocationServiceChannel($serviceLocationServiceChannelId, $serviceLocationChannel);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->updateServiceLocationServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **serviceLocationServiceChannelId** | **string**| serviceLocationChannel id |
 **serviceLocationChannel** | [**\KuntaAPI\Model\ServiceLocationServiceChannel**](../Model/\KuntaAPI\Model\ServiceLocationServiceChannel.md)| New service location channel data |

### Return type

[**\KuntaAPI\Model\ServiceLocationServiceChannel**](../Model/ServiceLocationServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **updateWebPageServiceChannel**
> \KuntaAPI\Model\WebPageServiceChannel updateWebPageServiceChannel($webPageServiceChannelId, $payload)

Updates a channel

Updates a service channel

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ServiceChannelsApi();
$webPageServiceChannelId = "webPageServiceChannelId_example"; // string | webPageChannel id
$payload = new \KuntaAPI\Model\WebPageServiceChannel(); // \KuntaAPI\Model\WebPageServiceChannel | New webPage service data

try {
    $result = $api_instance->updateWebPageServiceChannel($webPageServiceChannelId, $payload);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ServiceChannelsApi->updateWebPageServiceChannel: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webPageServiceChannelId** | **string**| webPageChannel id |
 **payload** | [**\KuntaAPI\Model\WebPageServiceChannel**](../Model/\KuntaAPI\Model\WebPageServiceChannel.md)| New webPage service data |

### Return type

[**\KuntaAPI\Model\WebPageServiceChannel**](../Model/WebPageServiceChannel.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

