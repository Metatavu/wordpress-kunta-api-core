# KuntaAPI\JobsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationJob**](JobsApi.md#findOrganizationJob) | **GET** /organizations/{organizationId}/jobs/{jobId} | Finds organizations job
[**listOrganizationJobs**](JobsApi.md#listOrganizationJobs) | **GET** /organizations/{organizationId}/jobs | Lists organizations jobs


# **findOrganizationJob**
> \KuntaAPI\Model\Job findOrganizationJob($organizationId, $jobId)

Finds organizations job

Finds single organization job

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\JobsApi();
$organizationId = "organizationId_example"; // string | Organization id
$jobId = "jobId_example"; // string | job id

try {
    $result = $api_instance->findOrganizationJob($organizationId, $jobId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling JobsApi->findOrganizationJob: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **jobId** | **string**| job id |

### Return type

[**\KuntaAPI\Model\Job**](../Model/Job.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationJobs**
> \KuntaAPI\Model\Job[] listOrganizationJobs($organizationId, $sortBy, $sortDir, $firstResult, $maxResults)

Lists organizations jobs

Lists organizations jobs

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\JobsApi();
$organizationId = "organizationId_example"; // string | Organization id
$sortBy = "sortBy_example"; // string | PUBLICATION_START or PUBLICATION_END
$sortDir = "sortDir_example"; // string | ASC or DESC
$firstResult = 789; // int | First result
$maxResults = 789; // int | Max results

try {
    $result = $api_instance->listOrganizationJobs($organizationId, $sortBy, $sortDir, $firstResult, $maxResults);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling JobsApi->listOrganizationJobs: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **sortBy** | **string**| PUBLICATION_START or PUBLICATION_END | [optional]
 **sortDir** | **string**| ASC or DESC | [optional]
 **firstResult** | **int**| First result | [optional]
 **maxResults** | **int**| Max results | [optional]

### Return type

[**\KuntaAPI\Model\Job[]**](../Model/Job.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

