# ServiceHour

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**serviceHourType** | **string** |  | [optional] 
**validFrom** | [**\DateTime**](\DateTime.md) | Date time where from this entry is valid. | [optional] 
**validTo** | [**\DateTime**](\DateTime.md) | Date time to this entry is valid. | [optional] 
**isClosed** | **bool** | Set to true to present a time between the valid from and to times as closed. | [optional] 
**validForNow** | **bool** | Set to true to present that this entry is valid for now. | [optional] 
**additionalInformation** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | Localized list of additional information. | [optional] 
**openingHour** | [**\KuntaAPI\Model\DailyOpeningTime[]**](DailyOpeningTime.md) | List of servicing hours (open and closes times). | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


