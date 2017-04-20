# KuntaAPI\ContactsApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationContact**](ContactsApi.md#findOrganizationContact) | **GET** /organizations/{organizationId}/contacts/{contactId} | Finds an organizations contact
[**listOrganizationContacts**](ContactsApi.md#listOrganizationContacts) | **GET** /organizations/{organizationId}/contacts | Lists organizations contacts


# **findOrganizationContact**
> \KuntaAPI\Model\Contact findOrganizationContact($organizationId, $contactId)

Finds an organizations contact

Finds organization's single contact

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ContactsApi();
$organizationId = "organizationId_example"; // string | Organization id
$contactId = "contactId_example"; // string | Contact id

try {
    $result = $api_instance->findOrganizationContact($organizationId, $contactId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ContactsApi->findOrganizationContact: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **contactId** | **string**| Contact id |

### Return type

[**\KuntaAPI\Model\Contact**](../Model/Contact.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationContacts**
> \KuntaAPI\Model\Contact[] listOrganizationContacts($organizationId)

Lists organizations contacts

Lists organizations contacts

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\ContactsApi();
$organizationId = "organizationId_example"; // string | Organization id

try {
    $result = $api_instance->listOrganizationContacts($organizationId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ContactsApi->listOrganizationContacts: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |

### Return type

[**\KuntaAPI\Model\Contact[]**](../Model/Contact.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

