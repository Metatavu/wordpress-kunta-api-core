# EnvironmentalWarning

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] 
**type** | **string** | Possible values   - WEATHER   - FLOOD | [optional] 
**context** | **string** | Possible values   - cold-weather   - forest-fire-weather   - grass-fire-weather   - hot-weather   - pedestrian-safety   - rain   - sea-icing   - sea-thunder-storm   - sea-water-height   - sea-wave-height   - sea-wind   - thunder-storm   - traffic-weather   - uv-note   - wind | [optional] 
**description** | [**\KuntaAPI\Model\LocalizedValue[]**](LocalizedValue.md) | Description of environmental warning | [optional] 
**causes** | **string[]** |  | [optional] 
**actualizationProbability** | **double** |  | [optional] 
**start** | [**\DateTime**](\DateTime.md) |  | [optional] 
**end** | [**\DateTime**](\DateTime.md) |  | [optional] 
**severity** | **string** | Possible values   - level-1   - level-2   - level-3   - level-4 | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


