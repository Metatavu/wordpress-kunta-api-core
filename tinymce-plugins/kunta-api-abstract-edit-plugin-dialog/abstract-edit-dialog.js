'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}/* jshint esversion: 6 *//* global ajaxurl, moment, Promise */(function($){var KuntaApiAbstractEditDialog=function(){/**
     * Constructs abstract dialog class
     * 
     * @param {type} editor TinyMCE editor instance
     */function KuntaApiAbstractEditDialog(editor){_classCallCheck(this,KuntaApiAbstractEditDialog);this.supportedLocales=['fi','en','sv'];this.localeNames={'fi':'Suomi','en':'Englanti','sv':'Ruotsi'};this.serviceHourTypeNames={'Special':'P\xE4ivystys','Standard':'Normaali','Exception':'Poikkeus'};this.dayNames={0:'Sunnuntai',1:'Maanantai',2:'Tiistai',3:'Keskiviikko',4:'Torstai',5:'Perjantai',6:'Lauantai'};this.editor=editor;this.listeners=[]}_createClass(KuntaApiAbstractEditDialog,[{key:'getLocaleName',value:function getLocaleName(locale){return this.localeNames[locale]}},{key:'getServiceHourTypeName',value:function getServiceHourTypeName(type){return this.serviceHourTypeNames[type]}},{key:'getDayName',value:function getDayName(index,short){var name=this.dayNames[index];if(short){return name.substring(0,2)}return name}},{key:'formatServiceHour',value:function formatServiceHour(serviceHour){var _this=this;var type=this.getServiceHourTypeName(serviceHour.serviceHourType);if(serviceHour.serviceHourType==='Exception'){var result='('+type+')';if(serviceHour.isClosed){result+=' Suljettu'}var openingHour=serviceHour.openingHour&&serviceHour.openingHour.length?serviceHour.openingHour[0]:null;var openFrom=openingHour?openingHour.from:null;var openTo=openingHour?openingHour.to:null;if(serviceHour.validFrom&&serviceHour.validTo){result+=' '+this.formatDateWithTime(serviceHour.validFrom,openFrom)+' - '+this.formatDateWithTime(serviceHour.validTo,openTo)}else if(serviceHour.validFrom){result+=' '+this.formatDateWithTimes(serviceHour.validFrom,openFrom,openTo)}var additionalInformation=this.getAnyLocalizedValue(serviceHour.additionalInformation);if(additionalInformation){return result+' - '+additionalInformation}return result}else{if(serviceHour.openingHour.length===0&&!serviceHour.isClosed){return'('+type+') Aina avoinna (24/7)'}var openingHours=serviceHour.openingHour.map(function(openingHour){return _this.formatOpeningHour(openingHour)});return'('+type+') '+openingHours.join(',')}}},{key:'formatDateTime',value:function formatDateTime(dateTime){return moment(dateTime).locale('fi').format('lll')}},{key:'formatDate',value:function formatDate(date){return moment(date).locale('fi').format('ll')}},{key:'formatDateWithTime',value:function formatDateWithTime(date,time){var result=this.formatDate(date);if(time){return result+' '+time}return result}},{key:'formatDateWithTimes',value:function formatDateWithTimes(date,startTime,endTime){var start=this.formatDateWithTime(date,startTime);return endTime?start+' - '+endTime:start}},{key:'formatOpeningHour',value:function formatOpeningHour(dailyOpeningTime){if(dailyOpeningTime.dayFrom===null){return''}else{var result=this.getDayName(dailyOpeningTime.dayFrom,true);if(dailyOpeningTime.dayTo!==null&&dailyOpeningTime.dayTo!==dailyOpeningTime.dayFrom){result+=' - '+this.getDayName(dailyOpeningTime.dayTo,true)}if(dailyOpeningTime.from){result+=' '+dailyOpeningTime.from}if(dailyOpeningTime.to){result+=' - '+dailyOpeningTime.to}return result}}},{key:'openMetaformDialog',value:function openMetaformDialog(viewModel,formValues,callback){var dialog=$('<div>').attr({'title':viewModel.title});var dialogContents=$('<div>').addClass('container-fluid').html(mfRender({viewModel:viewModel,formValues:formValues})).appendTo(dialog);$(dialog).dialog({modal:true,draggable:false,width:$(window).width()*0.9,height:$(window).height()*0.9,buttons:[{text:'Tallenna',click:function click(){var formValues={};$(dialog).find('form.metaform').metaform('val',true).forEach(function(value){formValues[value.name]=value.value});callback(formValues);$(dialog).dialog('close')}},{text:'Peruuta',click:function click(){$(dialog).dialog('close')}}]});$(dialog).find('form.metaform').metaform();return dialog}},{key:'openLocalizedMetaformDialog',value:function openLocalizedMetaformDialog(viewModel,formValues,callback){var _this2=this;var dialog=$('<div>').attr({'title':viewModel.title});var dialogContents=$('<div>').addClass('container-fluid').appendTo(dialog);var dialogTabs=$('<ul>').appendTo(dialogContents);this.supportedLocales.forEach(function(locale){var tabId='locale-tab-'+locale;$('<li>').appendTo(dialogTabs).append($('<a>').attr('href','#'+tabId).text(_this2.getLocaleName(locale)));$('<div>').attr('id',tabId).html(mfRender({viewModel:viewModel,formValues:formValues[locale]})).appendTo(dialogContents)});dialogContents.tabs();$(dialog).dialog({modal:true,draggable:false,width:$(window).width()*0.9,height:$(window).height()*0.9,buttons:[{text:'Tallenna',click:function click(){var formValues={};_this2.supportedLocales.forEach(function(locale){formValues[locale]={};$(dialog).find('#locale-tab-'+locale+' form.metaform').metaform('val',true).forEach(function(value){formValues[locale][value.name]=value.value})});callback(formValues)}},{text:'Peruuta',click:function click(){$(dialog).dialog('close')}}]});$(dialog).find('form.metaform').metaform();return dialog}},{key:'searchCodes',value:function searchCodes(types,search){return new Promise(function(resolve,reject){$.post(ajaxurl,{'action':'kunta_api_search_codes','types':types,'search':search},function(response){var codes=JSON.parse(response);resolve(codes)}).fail(function(response){reject(response.responseText||response.statusText)})})}},{key:'getCodeTypeName',value:function getCodeTypeName(type){switch(type){case'Municipality':return'kunta';case'Province':return'maakunta';case'HospitalRegions':return'sairaanhoitopiiri';case'BusinessRegions':return'yrityspalvelujen seutualue';case'Country':return'maa';case'Language':return'kieli';case'Postal':return'postinumero';}}},{key:'getCodeNameWithType',value:function getCodeNameWithType(codeItem){var name=this.getLocalizedValue(codeItem.name||codeItem.names,'fi');var type=this.getCodeTypeName(codeItem.type);return name+' ('+type+')'}},{key:'getMunicipalityNameWithType',value:function getMunicipalityNameWithType(municipality){var name=this.getLocalizedValue(municipality.names,'fi');var type=this.getCodeTypeName('Municipality');return name+' ('+type+')'}},{key:'showError',value:function showError(title,text){var contents=$('<div>').addClass('error').text(text);var dialog=$('<div>').attr('title',title).append(contents).dialog({modal:true,draggable:false,width:600,height:350,buttons:{Ok:function Ok(){$(dialog).dialog('close')}}})}},{key:'getTypedLocalizedValue',value:function getTypedLocalizedValue(values,locale,type){if(!values){return null}for(var i=0;i<values.length;i++){if(locale===values[i].language&&type===values[i].type){return values[i].value}}return null}/**
     * Returns localized value
     * 
     * @param {Array} values array containing localized values
     * @param {String} locale Locale
     * @param {String} property property containing value. Defaults to 'value'
     * @returns {unresolved}
     */},{key:'getLocalizedValue',value:function getLocalizedValue(values,locale,property){if(!values){return null}for(var i=0;i<values.length;i++){if(locale===values[i].language){return values[i][property||'value']}}return null}},{key:'getAnyLocalizedValue',value:function getAnyLocalizedValue(values){for(var i=0;i<this.supportedLocales.length;i++){var result=this.getLocalizedValue(values,this.supportedLocales[i]);if(result){return result}}return null}/**
     * Sets localized value (e.g. service requirements) value
     * 
     * @param {type} result result object
     * @param {type} resultProperty result object property
     * @param {type} localeValues locale values from form
     * @param {type} formProperty form property
     * @param {type} language locale
     */},{key:'setLocalizedValue',value:function setLocalizedValue(result,resultProperty,localeValues,formProperty,language){if(!result[resultProperty]){result[resultProperty]=[]}var value=localeValues[formProperty];if(!value){return}for(var i=0;i<result[resultProperty].length;i++){if(result[resultProperty][i].language===language){result[resultProperty][i].value=value;return}}result[resultProperty].push({value:value,language:language})}/**
     * Sets typed localized value (e.g. service description) value
     * 
     * @param {type} result result object
     * @param {type} resultProperty result object property
     * @param {type} localeValues locale values from form
     * @param {type} formProperty form property
     * @param {type} language locale
     * @param {type} type type
     */},{key:'setTypedLocalizedValue',value:function setTypedLocalizedValue(result,resultProperty,localeValues,formProperty,language,type){if(!result[resultProperty]){result[resultProperty]=[]}var value=localeValues[formProperty];if(!value){return}for(var i=0;i<result[resultProperty].length;i++){if(result[resultProperty][i].language===language&&result[resultProperty][i].type===type){result[resultProperty][i].value=value;return}}result[resultProperty].push({value:value,language:language,type:type})}},{key:'setLocalizedTableValues',value:function setLocalizedTableValues(result,resultProperty,localeValues,formProperty,language,filterFunction,mapFunction){if(!result[resultProperty]){result[resultProperty]=[]}var value=localeValues[formProperty];if(!value){return}var tableValues=JSON.parse(value);if(filterFunction){tableValues=tableValues.filter(filterFunction)}var mappedValues=tableValues.map(mapFunction?mapFunction:function(value){return Object.assign({language:language},value)})||[];result[resultProperty]=result[resultProperty].concat(mappedValues)}},{key:'prepareViewModel',value:function prepareViewModel(viewModel){var _this3=this;(viewModel.sections||[]).forEach(function(section){(section.fields||[]).forEach(function(field,index){var localeVariableIndex=field.name.indexOf('{LOCALE}');if(localeVariableIndex!==-1){section.fields.splice(index,1);_this3.supportedLocales.forEach(function(locale){section.fields.splice(index,0,Object.assign({},field,{name:field.name.replace(/\{LOCALE\}/g,locale),title:field.title.replace(/\{LOCALE\}/g,_this3.getLocaleName(locale))}))})}})});return viewModel}},{key:'parseIsoDate',value:function parseIsoDate(string){if(!string){return null}return new Date(Date.parse(string))}/**
     * Creates autocomplete field for selecting languages
     * 
     * @param {jQuery} element autocomplete element
     * @param {Array} languageCodes language codes
     */},{key:'createLanguagesAutocomplete',value:function createLanguagesAutocomplete(element,languageCodes){var _this4=this;element.metaformMultivalueAutocomplete('val',languageCodes).metaformMultivalueAutocomplete('option','customSource',function(input,callback){_this4.searchCodes('Language',input.term+'*').then(function(codes){callback(codes.map(function(codeItem){return{value:codeItem.code,label:_this4.getLocalizedValue(codeItem.names,'fi')}}))}).catch(function(err){tinyMCE.activeEditor.windowManager.alert(err)})})}/**
     * Creates autocomplete field for selecting areas
     * 
     * @param {jQuery} element autocomplete element
     * @param {Array} areaCodes area codes
     */},{key:'createAreasAutocomplete',value:function createAreasAutocomplete(element,areaCodes){var _this5=this;element.metaformMultivalueAutocomplete('val',areaCodes).metaformMultivalueAutocomplete('option','customSource',function(input,callback){_this5.searchCodes('Municipality,Province,HospitalRegions,BusinessRegions',input.term+'*').then(function(codes){callback(codes.map(function(areaCode){return{value:areaCode.type+':'+areaCode.code,label:_this5.getCodeNameWithType(areaCode)}}))}).catch(function(err){tinyMCE.activeEditor.windowManager.alert(err)})})}/**
     * Translates language list to be suitable for form
     * 
     * @param {Array} languages language codes
     * @returns {Promise} promise for language items
     */},{key:'languagesToForm',value:function languagesToForm(languages){var _this6=this;var languageQuery=languages.map(function(language){return'code:'+language}).join(' ');return this.searchCodes('Language','+('+languageQuery+')').then(function(languageQueryResult){var languageMap={};languageQueryResult.forEach(function(queryResult){languageMap[queryResult.code]=_this6.getLocalizedValue(queryResult.names,'fi')});return languages.map(function(language){return{value:language,label:languageMap[language]||language}})})}/**
     * Translates areas to be suitable for form
     * 
     * @param {Array} areas areas
     * @returns {Array} area items
     */},{key:'areasToForm',value:function areasToForm(areas){var _this7=this;var areaCodes=[];areas.forEach(function(area){if(area.type!=='Municipality'){areaCodes.push({value:area.type+':'+area.code,label:_this7.getCodeNameWithType(area)})}else{area.municipalities.forEach(function(municipality){areaCodes.push({value:'Municipality:'+municipality.code,label:_this7.getMunicipalityNameWithType(municipality)})})}});return areaCodes}/**
     * Translates areas from form to be suitable for REST
     * 
     * @param {String} areaType area type 
     * @param {Array} areas array of area values
     * @returns {Array} result
     */},{key:'areasFromForm',value:function areasFromForm(areaType,areas){if(areaType==='AreaType'){var mucicipalitiesIndex=-1;var result=[];(areas||'').split(',').forEach(function(area){var parts=area.split(':');var type=parts[0];var code=parts[1];if(type==='Municipality'){if(mucicipalitiesIndex>-1){result[mucicipalitiesIndex].municipalities.push({code:code})}else{mucicipalitiesIndex=result.push({'type':'Municipality','municipalities':[{code:code}]})-1}}else{result.push({type:type,code:code})}});return result}}},{key:'trigger',value:function trigger(event,data){this.listeners.forEach(function(listener){if(listener.event===event){listener.callable(data||{})}})}},{key:'on',value:function on(event,callable){this.listeners.push({event:event,callable:callable})}}]);return KuntaApiAbstractEditDialog}();window.KuntaApiAbstractEditDialog=KuntaApiAbstractEditDialog})(jQuery);
//# sourceMappingURL=abstract-edit-dialog.js.map
