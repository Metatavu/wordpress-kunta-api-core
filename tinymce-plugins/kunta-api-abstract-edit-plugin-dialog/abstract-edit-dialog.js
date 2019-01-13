'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}(function($){'use strict';var KuntaApiAbstractEditDialog=function(){function KuntaApiAbstractEditDialog(editor){_classCallCheck(this,KuntaApiAbstractEditDialog);this.supportedLocales=['fi','en','sv'];this.localeNames={'fi':'Suomi','en':'Englanti','sv':'Ruotsi'};this.serviceHourTypeNames={'OverMidnight':'P\xE4ivystys','DaysOfTheWeek':'Normaali','Exceptional':'Poikkeus'};this.dayNames={0:'Sunnuntai',1:'Maanantai',2:'Tiistai',3:'Keskiviikko',4:'Torstai',5:'Perjantai',6:'Lauantai'};this.editor=editor;this.listeners=[]}_createClass(KuntaApiAbstractEditDialog,[{key:'getLocaleName',value:function getLocaleName(locale){return this.localeNames[locale]}},{key:'getServiceHourTypeName',value:function getServiceHourTypeName(type){return this.serviceHourTypeNames[type]}},{key:'getDayName',value:function getDayName(index,short){var name=this.dayNames[index];if(short){return name.substring(0,2)}return name}},{key:'formatServiceHour',value:function formatServiceHour(serviceHour){var _this=this;var type=this.getServiceHourTypeName(serviceHour.serviceHourType);if(serviceHour.serviceHourType==='Exceptional'){console.log('serviceHour',serviceHour);var result='('+type+')';if(serviceHour.isClosed){result+=' Suljettu'}var openingHour=serviceHour.openingHour&&serviceHour.openingHour.length?serviceHour.openingHour[0]:null;var openFrom=openingHour?openingHour.from:null;var openTo=openingHour?openingHour.to:null;if(serviceHour.validFrom&&serviceHour.validTo){result+=' '+this.formatDateWithTime(serviceHour.validFrom,openFrom)+' - '+this.formatDateWithTime(serviceHour.validTo,openTo)}else if(serviceHour.validFrom){result+=' '+this.formatDateWithTimes(serviceHour.validFrom,openFrom,openTo)}var additionalInformation=this.getAnyLocalizedValue(serviceHour.additionalInformation);if(additionalInformation){return result+' - '+additionalInformation}return result}else{if(serviceHour.openingHour.length===0&&!serviceHour.isClosed){return'('+type+') Aina avoinna (24/7)'}var openingHours=(serviceHour.openingHour||[]).map(function(openingHour){return _this.formatOpeningHour(openingHour)});return'('+type+') '+openingHours.join(',')}}},{key:'formatDateTime',value:function formatDateTime(dateTime){return moment(dateTime).locale('fi').format('lll')}},{key:'formatDate',value:function formatDate(date){return moment(date).locale('fi').format('ll')}},{key:'formatDateWithTime',value:function formatDateWithTime(date,time){console.log('formatDateWithTime',date,time);var result=this.formatDate(date);if(time){return result+' '+time}console.log('result',result);return result}},{key:'formatDateWithTimes',value:function formatDateWithTimes(date,startTime,endTime){var start=this.formatDateWithTime(date,startTime);return endTime?start+' - '+endTime:start}},{key:'formatOpeningHour',value:function formatOpeningHour(dailyOpeningTime){if(!dailyOpeningTime){return null}if(dailyOpeningTime.dayFrom===null){return''}else{var result=this.getDayName(dailyOpeningTime.dayFrom,true);if(dailyOpeningTime.dayTo&&dailyOpeningTime.dayTo!==dailyOpeningTime.dayFrom){result+=' - '+this.getDayName(dailyOpeningTime.dayTo,true)}if(dailyOpeningTime.from){result+=' '+dailyOpeningTime.from}if(dailyOpeningTime.to){result+=' - '+dailyOpeningTime.to}return result}}},{key:'openMetaformDialog',value:function openMetaformDialog(viewModel,formValues,callback){var dialog=$('<div>').attr({'title':viewModel.title});var dialogContents=$('<div>').addClass('container-fluid').html(mfRender({viewModel:viewModel,formValues:formValues})).appendTo(dialog);$(dialog).dialog({modal:true,draggable:false,width:$(window).width()*0.9,height:$(window).height()*0.9,buttons:[{text:'Tallenna',click:function click(){var formValues={};$(dialog).find('form.metaform').metaform('val',true).forEach(function(value){formValues[value.name]=value.value});callback(formValues);$(dialog).dialog('close')}},{text:'Peruuta',click:function click(){$(dialog).dialog('close')}}]});$(dialog).find('form.metaform').metaform();return dialog}},{key:'openTabbedMetaformDialog',value:function openTabbedMetaformDialog(tabs,viewModel,formTabValues,callback){var dialog=$('<div>').attr({'title':viewModel.title});var dialogContents=$('<div>').addClass('container-fluid').appendTo(dialog);var dialogTabs=$('<ul>').appendTo(dialogContents);tabs.forEach(function(tab){var tabId=tab.id;$('<li>').appendTo(dialogTabs).append($('<a>').attr('href','#'+tabId).text(tab.title));$('<div>').attr('id',tabId).html(mfRender({viewModel:viewModel,formValues:formTabValues[tab.id]})).appendTo(dialogContents)});dialogContents.tabs();$(dialog).dialog({modal:true,draggable:false,width:$(window).width()*0.9,height:$(window).height()*0.9,buttons:[{text:'Tallenna',click:function click(){callback()}},{text:'Peruuta',click:function click(){$(dialog).dialog('close')}}]});$(dialog).find('form.metaform').metaform();return dialog}},{key:'openLocalizedMetaformDialog',value:function openLocalizedMetaformDialog(viewModel,formValues,callback){var _this2=this;var formTabValues={};this.supportedLocales.forEach(function(locale){formTabValues['locale-tab-'+locale]=formValues[locale]});var dialog=this.openTabbedMetaformDialog(this.supportedLocales.map(function(locale){return{id:'locale-tab-'+locale,title:_this2.getLocaleName(locale)}}),viewModel,formTabValues,function(){var formValues={};_this2.supportedLocales.forEach(function(locale){formValues[locale]={};$(dialog).find('#locale-tab-'+locale+' form.metaform').metaform('val',true).forEach(function(value){formValues[locale][value.name]=value.value})});callback(formValues)});return dialog}},{key:'findOrganization',value:function findOrganization(id){return new Promise(function(resolve,reject){$.post(ajaxurl,{'action':'kunta_api_find_organization','id':id},function(response){resolve(JSON.parse(response))}).fail(function(response){reject(response.responseText||response.statusText)})})}},{key:'searchCodes',value:function searchCodes(types,search){return new Promise(function(resolve,reject){$.post(ajaxurl,{'action':'kunta_api_search_codes','types':types,'search':search},function(response){var codes=JSON.parse(response);resolve(codes)}).fail(function(response){reject(response.responseText||response.statusText)})})}},{key:'searchOrganizations',value:function searchOrganizations(search){var _this3=this;return new Promise(function(resolve,reject){$.post(ajaxurl,{'action':'kunta_api_search_organizations','search':_this3.splitSearchTerms(search)},function(response){resolve(JSON.parse(response))}).fail(function(response){reject(response.responseText||response.statusText)})})}},{key:'findElectronicServiceChannel',value:function findElectronicServiceChannel(id){return new Promise(function(resolve,reject){$.post(ajaxurl,{'action':'kunta_api_load_electronic_service_channel','id':id},function(response){resolve(JSON.parse(response))}).fail(function(response){reject(response.responseText||response.statusText)})})}},{key:'findWebPageServiceChannel',value:function findWebPageServiceChannel(id){return new Promise(function(resolve,reject){$.post(ajaxurl,{'action':'kunta_api_load_webpage_service_channel','id':id},function(response){resolve(JSON.parse(response))}).fail(function(response){reject(response.responseText||response.statusText)})})}},{key:'findPrintableFormServiceChannel',value:function findPrintableFormServiceChannel(id){return new Promise(function(resolve,reject){$.post(ajaxurl,{'action':'kunta_api_load_printable_form_service_channel','id':id},function(response){resolve(JSON.parse(response))}).fail(function(response){reject(response.responseText||response.statusText)})})}},{key:'findPhoneServiceChannel',value:function findPhoneServiceChannel(id){return new Promise(function(resolve,reject){$.post(ajaxurl,{'action':'kunta_api_load_phone_service_channel','id':id},function(response){resolve(JSON.parse(response))}).fail(function(response){reject(response.responseText||response.statusText)})})}},{key:'findServiceLocationServiceChannel',value:function findServiceLocationServiceChannel(id){return new Promise(function(resolve,reject){$.post(ajaxurl,{'action':'kunta_api_load_service_location_service_channel','id':id},function(response){resolve(JSON.parse(response))}).fail(function(response){reject(response.responseText||response.statusText)})})}},{key:'searchElectronicServiceChannels',value:function searchElectronicServiceChannels(search){return this.executeSearch('search_electronic_service_channels',search)}},{key:'searchPhoneServiceChannels',value:function searchPhoneServiceChannels(search){return this.executeSearch('search_phone_service_channels',search)}},{key:'searchPrintableFormServiceChannels',value:function searchPrintableFormServiceChannels(search){return this.executeSearch('search_printable_form_service_channels',search)}},{key:'searchWebPageServiceChannels',value:function searchWebPageServiceChannels(search){return this.executeSearch('search_web_page_service_channels',search)}},{key:'searchServiceLocationServiceChannels',value:function searchServiceLocationServiceChannels(search){return this.executeSearch('search_service_location_channels',search)}},{key:'executeSearch',value:function executeSearch(action,search){var _this4=this;return new Promise(function(resolve,reject){$.post(ajaxurl,{'action':'kunta_api_'+action,'search':_this4.splitSearchTerms(search)},function(response){resolve(JSON.parse(response))}).fail(function(response){reject(response.responseText||response.statusText)})})}},{key:'getCodeTypeName',value:function getCodeTypeName(type){switch(type){case'Municipality':return'kunta';case'Province':return'maakunta';case'HospitalRegions':return'sairaanhoitopiiri';case'BusinessRegions':return'yrityspalvelujen seutualue';case'Country':return'maa';case'Language':return'kieli';case'Postal':return'postinumero';}}},{key:'getCodeNameWithType',value:function getCodeNameWithType(codeItem){var name=this.getLocalizedValue(codeItem.name||codeItem.names,'fi');var type=this.getCodeTypeName(codeItem.type);return name+' ('+type+')'}},{key:'getMunicipalityNameWithType',value:function getMunicipalityNameWithType(municipality){var name=this.getLocalizedValue(municipality.names,'fi');var type=this.getCodeTypeName('Municipality');return name+' ('+type+')'}},{key:'showError',value:function showError(title,text){var contents=$('<div>').addClass('error').text(text);var dialog=$('<div>').attr('title',title).append(contents).dialog({modal:true,draggable:false,width:600,height:350,buttons:{Ok:function Ok(){$(dialog).dialog('close')}}})}},{key:'getTypedLocalizedValue',value:function getTypedLocalizedValue(values,locale,type){if(!values){return null}for(var i=0;i<values.length;i++){if(locale===values[i].language&&type===values[i].type){return values[i].value}}return null}},{key:'getLocalizedValue',value:function getLocalizedValue(values,locale,property){if(!values){return null}for(var i=0;i<values.length;i++){if(locale===values[i].language){return values[i][property||'value']}}return null}},{key:'getAnyLocalizedValue',value:function getAnyLocalizedValue(values){for(var i=0;i<this.supportedLocales.length;i++){var result=this.getLocalizedValue(values,this.supportedLocales[i]);if(result){return result}}return null}},{key:'getLocalizedPhoneNumbers',value:function getLocalizedPhoneNumbers(phones,locale){return(phones||[]).filter(function(phone){return phone.number&&phone.language===locale}).map(function(phone){return Object.assign({},phone,{isFinnishServiceNumber:phone.isFinnishServiceNumber?'true':'false'})})}},{key:'getLocalizedEmails',value:function getLocalizedEmails(emails,locale){return this.getLocalizedValues(emails,locale)}},{key:'getLocalizedValues',value:function getLocalizedValues(values,locale){return(values||[]).filter(function(value){return value.value&&value.language===locale})}},{key:'getLocalizedWebPages',value:function getLocalizedWebPages(webPages,locale){return(webPages||[]).filter(function(webPage){return webPage.url&&webPage.language===locale})}},{key:'getLocalizedWebPageUrl',value:function getLocalizedWebPageUrl(webPages,locale){var localeWebPages=this.getLocalizedWebPages(webPages,locale);if(localeWebPages&&localeWebPages.length){return localeWebPages[0].url}return null}},{key:'setLocalizedWebPages',value:function setLocalizedWebPages(result,resultProperty,localeValues,formProperty,language){this.setLocalizedPropertyValue(result,resultProperty,'url',localeValues,formProperty,language)}},{key:'setLocalizedPropertyValue',value:function setLocalizedPropertyValue(result,resultProperty,resultField,localeValues,formProperty,language){if(!result[resultProperty]){result[resultProperty]=[]}var value=localeValues[formProperty];if(!value){return}for(var i=0;i<result[resultProperty].length;i++){if(result[resultProperty][i].language===language){result[resultProperty][i].value=value;return}}var resultItem={language:language};resultItem[resultField]=value;result[resultProperty].push(resultItem)}},{key:'getFormBooleanValue',value:function getFormBooleanValue(value,defaultValue){if(value==='true'){return true}else if(value==='false'){return false}return defaultValue}},{key:'setLocalizedValue',value:function setLocalizedValue(result,resultProperty,localeValues,formProperty,language){this.setLocalizedPropertyValue(result,resultProperty,'value',localeValues,formProperty,language)}},{key:'setTypedLocalizedValue',value:function setTypedLocalizedValue(result,resultProperty,localeValues,formProperty,language,type){if(!result[resultProperty]){result[resultProperty]=[]}var value=localeValues[formProperty];if(!value){return}for(var i=0;i<result[resultProperty].length;i++){if(result[resultProperty][i].language===language&&result[resultProperty][i].type===type){result[resultProperty][i].value=value;return}}result[resultProperty].push({value:value,language:language,type:type})}},{key:'setLocalizedTableValues',value:function setLocalizedTableValues(result,resultProperty,localeValues,formProperty,language,filterFunction,mapFunction){if(!result[resultProperty]){result[resultProperty]=[]}var value=localeValues[formProperty];if(!value){return}var tableValues=JSON.parse(value);if(filterFunction){tableValues=tableValues.filter(filterFunction)}var mappedValues=tableValues.map(mapFunction?mapFunction:function(value){return Object.assign({language:language},value)})||[];result[resultProperty]=result[resultProperty].concat(mappedValues)}},{key:'prepareViewModel',value:function prepareViewModel(viewModel){var _this5=this;(viewModel.sections||[]).forEach(function(section){(section.fields||[]).forEach(function(field,index){var localeVariableIndex=field.name.indexOf('{LOCALE}');if(localeVariableIndex!==-1){section.fields.splice(index,1);_this5.supportedLocales.forEach(function(locale){section.fields.splice(index,0,Object.assign({},field,{name:field.name.replace(/\{LOCALE\}/g,locale),title:field.title.replace(/\{LOCALE\}/g,_this5.getLocaleName(locale))}))})}})});return viewModel}},{key:'parseIsoDate',value:function parseIsoDate(string){if(!string){return null}return new Date(Date.parse(string))}},{key:'createLanguagesAutocomplete',value:function createLanguagesAutocomplete(element,languageCodes){var _this6=this;element.metaformMultivalueAutocomplete('val',languageCodes).metaformMultivalueAutocomplete('option','customSource',function(input,callback){_this6.searchCodes('Language',input.term+'*').then(function(codes){callback(codes.map(function(codeItem){return{value:codeItem.code,label:_this6.getLocalizedValue(codeItem.names,'fi')}}))}).catch(function(err){tinyMCE.activeEditor.windowManager.alert(err)})})}},{key:'createAreasAutocomplete',value:function createAreasAutocomplete(element,areaCodes){var _this7=this;element.metaformMultivalueAutocomplete('val',areaCodes).metaformMultivalueAutocomplete('option','customSource',function(input,callback){_this7.searchCodes('Municipality,Province,HospitalRegions,BusinessRegions',input.term+'*').then(function(codes){callback(codes.map(function(areaCode){return{value:areaCode.type+':'+areaCode.code,label:_this7.getCodeNameWithType(areaCode)}}))}).catch(function(err){tinyMCE.activeEditor.windowManager.alert(err)})})}},{key:'languagesToForm',value:function languagesToForm(languages){var _this8=this;var languageQuery=languages.map(function(language){return'code:'+language}).join(' ');return this.searchCodes('Language','+('+languageQuery+')').then(function(languageQueryResult){var languageMap={};languageQueryResult.forEach(function(queryResult){languageMap[queryResult.code]=_this8.getLocalizedValue(queryResult.names,'fi')});return languages.map(function(language){return{value:language,label:languageMap[language]||language}})})}},{key:'areasToForm',value:function areasToForm(areas){var _this9=this;var areaCodes=[];areas.forEach(function(area){if(area.type!=='Municipality'){areaCodes.push({value:area.type+':'+area.code,label:_this9.getCodeNameWithType(area)})}else{area.municipalities.forEach(function(municipality){areaCodes.push({value:'Municipality:'+municipality.code,label:_this9.getMunicipalityNameWithType(municipality)})})}});return areaCodes}},{key:'areasFromForm',value:function areasFromForm(areaType,areas){if(areaType==='AreaType'){var mucicipalitiesIndex=-1;var result=[];(areas||'').split(',').forEach(function(area){var parts=area.split(':');var type=parts[0];var code=parts[1];if(type==='Municipality'){if(mucicipalitiesIndex>-1){result[mucicipalitiesIndex].municipalities.push({code:code})}else{mucicipalitiesIndex=result.push({'type':'Municipality','municipalities':[{code:code}]})-1}}else{result.push({type:type,code:code})}});return result}}},{key:'splitSearchTerms',value:function splitSearchTerms(search){if(!search){return null}var searchTerms=_.map(search.replace(/\ {1,}/g,' ').split(' '),function(term){return'+('+term+'*)'});return searchTerms.join(' ')}},{key:'linkInputs',value:function linkInputs(dialog,linkedInputsNames){var linkedInputsSelector=linkedInputsNames.map(function(name){return'input[name="'+name+'"]'}).join(',');$(dialog).on('change',linkedInputsSelector,this.onLinkedInputChange.bind(this))}},{key:'trigger',value:function trigger(event,data){this.listeners.forEach(function(listener){if(listener.event===event){listener.callable(data||{})}})}},{key:'saveService',value:function saveService(service,callback){$.post(ajaxurl,{'action':'kunta_api_save_service','service':JSON.stringify(service)},function(response){callback()}).fail(function(response){callback(response.responseText||response.statusText||'Unknown error occurred')})}},{key:'updateLinkedCheckbox',value:function updateLinkedCheckbox(dialog,input,name){var value=input.val();dialog.find('*[name="'+name+'"]').filter(function(index,element){return!$(element).is(input)&&value!==$(element).val()}).val(value).change()}},{key:'updateLinkedRadio',value:function updateLinkedRadio(dialog,input,name){var value=input.val();var linkedInputs=dialog.find('*[name="'+name+'"]').filter(function(index,element){var checked=$(element).is(':checked');var elementValue=$(element).attr('value');if(elementValue===value&&!checked){return true}return false}).prop('checked','checked').change()}},{key:'updateLinkedInput',value:function updateLinkedInput(dialog,input,name){var value=input.val();dialog.find('*[name="'+name+'"]').filter(function(index,element){return!$(element).is(input)&&value!==$(element).val()}).val(value).change()}},{key:'onLinkedInputChange',value:function onLinkedInputChange(event){var input=$(event.target);var name=input.attr('name');var dialog=input.closest('.ui-dialog-content');var type=input.attr('type');switch(type){case'checkbox':this.updateLinkedCheckbox(dialog,input,name);break;case'radio':this.updateLinkedRadio(dialog,input,name);break;default:this.updateLinkedInput(dialog,input,name);break;}}},{key:'on',value:function on(event,callable){this.listeners.push({event:event,callable:callable})}}]);return KuntaApiAbstractEditDialog}();window.KuntaApiAbstractEditDialog=KuntaApiAbstractEditDialog})(jQuery);
//# sourceMappingURL=abstract-edit-dialog.js.map
