# KuntaAPI\MenusApi

All URIs are relative to *https://demo.kuntaapi.fi/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findOrganizationMenu**](MenusApi.md#findOrganizationMenu) | **GET** /organizations/{organizationId}/menus/{menuId} | Finds organizations menu
[**findOrganizationMenuItem**](MenusApi.md#findOrganizationMenuItem) | **GET** /organizations/{organizationId}/menus/{menuId}/items/{menuItemId} | Finds organization menu item
[**listOrganizationMenuItems**](MenusApi.md#listOrganizationMenuItems) | **GET** /organizations/{organizationId}/menus/{menuId}/items | Lists organizations menu items
[**listOrganizationMenus**](MenusApi.md#listOrganizationMenus) | **GET** /organizations/{organizationId}/menus | Lists organizations menus


# **findOrganizationMenu**
> \KuntaAPI\Model\Menu findOrganizationMenu($organizationId, $menuId)

Finds organizations menu

Finds single organization menu

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\MenusApi();
$organizationId = "organizationId_example"; // string | Organization id
$menuId = "menuId_example"; // string | menu id

try {
    $result = $api_instance->findOrganizationMenu($organizationId, $menuId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling MenusApi->findOrganizationMenu: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **menuId** | **string**| menu id |

### Return type

[**\KuntaAPI\Model\Menu**](../Model/Menu.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **findOrganizationMenuItem**
> \KuntaAPI\Model\MenuItem findOrganizationMenuItem($organizationId, $menuId, $menuItemId)

Finds organization menu item

Finds single organization menu item

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\MenusApi();
$organizationId = "organizationId_example"; // string | Organization id
$menuId = "menuId_example"; // string | menu id
$menuItemId = "menuItemId_example"; // string | menu item id

try {
    $result = $api_instance->findOrganizationMenuItem($organizationId, $menuId, $menuItemId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling MenusApi->findOrganizationMenuItem: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **menuId** | **string**| menu id |
 **menuItemId** | **string**| menu item id |

### Return type

[**\KuntaAPI\Model\MenuItem**](../Model/MenuItem.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationMenuItems**
> \KuntaAPI\Model\MenuItem[] listOrganizationMenuItems($organizationId, $menuId)

Lists organizations menu items

Lists organization menu items

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\MenusApi();
$organizationId = "organizationId_example"; // string | Organization id
$menuId = "menuId_example"; // string | menu id

try {
    $result = $api_instance->listOrganizationMenuItems($organizationId, $menuId);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling MenusApi->listOrganizationMenuItems: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **menuId** | **string**| menu id |

### Return type

[**\KuntaAPI\Model\MenuItem[]**](../Model/MenuItem.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **listOrganizationMenus**
> \KuntaAPI\Model\Menu[] listOrganizationMenus($organizationId, $slug)

Lists organizations menus

Lists organizations menus

### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure HTTP basic authorization: basicAuth
KuntaAPI\Configuration::getDefaultConfiguration()->setUsername('YOUR_USERNAME');
KuntaAPI\Configuration::getDefaultConfiguration()->setPassword('YOUR_PASSWORD');

$api_instance = new KuntaAPI\Api\MenusApi();
$organizationId = "organizationId_example"; // string | Organization id
$slug = "slug_example"; // string | Filter with slug

try {
    $result = $api_instance->listOrganizationMenus($organizationId, $slug);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling MenusApi->listOrganizationMenus: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **organizationId** | **string**| Organization id |
 **slug** | **string**| Filter with slug | [optional]

### Return type

[**\KuntaAPI\Model\Menu[]**](../Model/Menu.md)

### Authorization

[basicAuth](../../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json;charset=utf-8
 - **Accept**: application/json;charset=utf-8

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

