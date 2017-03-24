# ServiceHour

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **string** | Type of service hour (Standard, Exception or Special). | [optional] 
**exceptionHourType** | **string** | Type of service hour exception type. Valid values are: Open or Closed. | [optional] 
**validFrom** | [**\DateTime**](\DateTime.md) | Date time where from this entry is valid. | [optional] 
**validTo** | [**\DateTime**](\DateTime.md) | Date time to this entry is valid. | [optional] 
**days** | **int[]** | Array of week numbers indices where serice hour is active (0 &#x3D;&#x3D; sunday) | [optional] 
**opens** | **string** | Opening time in format HH:mm for example 08:00. | [optional] 
**closes** | **string** | Closing time in format HH:mm for example 19:00 | [optional] 
**timezone** | **string** |  | [optional] 
**additionalInformation** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) |  | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


