function getAdditionalDetailsMetaform(){return {"title":"Lisätiedot","sections":[{"title":"Lisätiedot","fields":[{"name":"languages","type":"autocomplete-multiple","title":"Kielet, joilla palvelupaikassa palvellaan","required":true},{"title":"Alue, jolla palvelupaikka palvelee","name":"areaType","type":"radio","required":true,"options":[{"name":"WholeCountry","text":"Koko maa"},{"name":"WholeCountryExceptAlandIslands","text":"Koko maa paitsi ei Ahvenanmaa","checked":true},{"name":"AreaType","text":"Rajattu alue"}],"contexts":["FORM"],"editable":true},{"visible-if":{"field":"areaType","equals":"AreaType"},"name":"areas","type":"autocomplete-multiple","title":"Valitse yksi tai useampi alue","required":true}]}]};}function getServiceHourMetaform(){return {"title":"Palveluaika","sections":[{"title":"Palvelunajan tyyppi","fields":[{"title":"Valitse","name":"type","type":"radio","required":true,"options":[{"name":"Standard","text":"Normaalit palveluajat: viikonpäivät","checked":true},{"name":"Special","text":"Normaalit palveluajat: vuorokauden yli (päivystys)"},{"name":"Exception","text":"Poikkeavat palveluajat"}],"contexts":["FORM"],"editable":true}]},{"visible-if":{"field":"type","equals":"Standard"},"title":"Normaalit palveluajat: viikonpäivät","fields":[{"title":"Toistaiseksi voimassa oleva","name":"Standard-validForNow","type":"radio","required":true,"options":[{"name":"true","text":"Toistaiseksi voimassa oleva","checked":true},{"name":"false","text":"Voimassa ajanjaksolla"}],"contexts":["FORM"],"editable":true},{"visible-if":{"field":"Standard-validForNow","equals":"false"},"title":"Voimassaolo alkaa","name":"Standard-validFrom","type":"date","required":true,"contexts":["FORM"],"editable":true},{"visible-if":{"field":"Standard-validForNow","equals":"false"},"title":"Voimassaolo päättyy","name":"Standard-validTo","type":"date","required":true,"contexts":["FORM"],"editable":true},{"title":"Aina avoinna (24/7).","name":"Standard-open24h","type":"boolean","required":true,"contexts":["FORM"],"editable":true},{"visible-if":{"field":"Standard-open24h","not-equals":true},"name":"Standard-openinghours","type":"table","title":"Palveluajat","required":true,"contexts":"FORM","addRows":true,"columns":[{"type":"enum","title":"Viikonpäivä","name":"day","values":[{"value":"1","text":"Maanantai"},{"value":"2","text":"Tiistai"},{"value":"3","text":"Keskiviikko"},{"value":"4","text":"Torstai"},{"value":"5","text":"Perjantai"},{"value":"6","text":"Lauantai"},{"value":"0","text":"Sunnuntai"}]},{"type":"time","title":"Avautuu","name":"from"},{"type":"time","title":"Sulkeutuu","name":"to"}]}]},{"visible-if":{"field":"type","equals":"Special"},"title":"Normaalit palveluajat: vuorokauden yli (päivystys)","fields":[{"title":"Toistaiseksi voimassa oleva","name":"Special-validForNow","type":"radio","required":true,"options":[{"name":"true","text":"Toistaiseksi voimassa oleva","checked":true},{"name":"false","text":"Voimassa ajanjaksolla"}],"contexts":["FORM"],"editable":true}]},{"visible-if":{"field":"type","equals":"Special"},"fields":[{"visible-if":{"field":"Special-validForNow","not-equals":"true"},"title":"Voimassaolo alkaa","name":"Special-validFrom","type":"date-time","required":true,"contexts":["FORM"],"editable":true},{"visible-if":{"field":"Special-validForNow","not-equals":"true"},"title":"Voimassaolo päättyy","name":"Special-validTo","type":"date-time","required":true,"contexts":["FORM"],"editable":true},{"title":"Alkupäivä","name":"Special-from-date","type":"select","options":[{"name":"1","text":"Maanantai"},{"name":"2","text":"Tiistai"},{"name":"3","text":"Keskiviikko"},{"name":"4","text":"Torstai"},{"name":"5","text":"Perjantai"},{"name":"6","text":"Lauantai"},{"name":"0","text":"Sunnuntai"}]},{"title":"Alkuaika","name":"Special-from-time","type":"time","required":true,"contexts":["FORM"],"editable":true},{"title":"Päättysmispäivä","name":"Special-to-date","type":"select","options":[{"name":"1","text":"Maanantai"},{"name":"2","text":"Tiistai"},{"name":"3","text":"Keskiviikko"},{"name":"4","text":"Torstai"},{"name":"5","text":"Perjantai"},{"name":"6","text":"Lauantai"},{"name":"0","text":"Sunnuntai"}]},{"title":"Päättymisaika","name":"Special-to-time","type":"time","required":true,"contexts":["FORM"],"editable":true}]},{"visible-if":{"field":"type","equals":"Exception"},"title":"Poikkeavat palveluajat","fields":[{"title":"Lisätieto ({LOCALE})","name":"Exception-additional-information-{LOCALE}","type":"text","required":true,"contexts":["FORM"],"editable":true},{"name":"Exception-type","type":"radio","required":true,"options":[{"name":"single","text":"Päivä"},{"name":"range","text":"Ajanjakso"},{"name":"closed-all-day","text":"Suljettu koko päivän","checked":true}],"contexts":["FORM"],"editable":true},{"title":"Alkupäivä","name":"Exception-from-date","type":"date","required":true,"contexts":["FORM"],"editable":true},{"visible-if":{"field":"Exception-type","equals":"range"},"title":"Päättymispäivä","name":"Exception-to-date","type":"date","required":true,"contexts":["FORM"],"editable":true},{"visible-if":{"field":"Exception-type","equals":"single","or":[{"field":"Exception-type","equals":"range"}]},"title":"Alkamisaika","name":"Exception-from-time","type":"time","required":true,"contexts":["FORM"],"editable":true},{"visible-if":{"field":"Exception-type","equals":"single","or":[{"field":"Exception-type","equals":"range"}]},"title":"Päättymisaika","name":"Exception-to-time","type":"time","required":true,"contexts":["FORM"],"editable":true}]}]};}function getServiceLocationServiceChannelMetaform(){return {"title":"Palvelupiste","sections":[{"fields":[{"name":"name","type":"text","title":"Nimi","required":false,"contexts":"FORM","placeholder":"Kirjoita palvelupaikan nimi."},{"name":"shortDescription","type":"memo","title":"Tiivistelmä","required":false,"contexts":"FORM","placeholder":"Kirjoita lyhyt tiivistelmä hakukoneita varten."},{"name":"description","type":"memo","title":"Kuvaus","required":false,"contexts":"FORM","placeholder":"Kirjoita selkeä ja ymmärrettävä kuvausteksti."}]},{"fields":[{"name":"addresses","type":"table","title":"Käyntiosoite","required":false,"contexts":"FORM","addRows":true,"columns":[{"type":"text","name":"street","title":"Kadunnimi","placeholder":"esim. Mannerheimintie","column-width":300},{"type":"text","name":"streetNumber","title":"Osoitenumero","placeholder":"esim. 12 A 23","column-width":40},{"type":"text","name":"postOfficeCode","title":"Postinumero","column-width":270,"placeholder":"Postitoimipaikka haetaan automaaattisesti"},{"type":"text","name":"additionalInformation","title":"Osoitteen lisätieto","placeholder":"Anna tarvittaessa osoitetta täsmentävä tieto tekstinä."},{"column-width":63,"type":"button","text":"Poista","class":"btn-warning","action":"delete-row"}]},{"name":"foreignAddresses","type":"table","title":"Käyntiosoite - ulkomainen (Vapaasti täydennettävä osoite)","required":false,"contexts":"FORM","addRows":true,"columns":[{"type":"text","name":"foreign","placeholder":"Kirjoita ulkomainen osoite."}]},{"name":"emails","type":"table","title":"Sähköpostit","required":false,"contexts":"FORM","addRows":true,"columns":[{"type":"text","name":"email","placeholder":"esim. osoite@organisaatio.fi"}]},{"name":"webPages","type":"table","title":"Verkkosivut","required":false,"contexts":"FORM","addRows":true,"columns":[{"title":"Verkkosivun nimi","type":"text","name":"value","placeholder":"Kirjoita verkkosivun nimi"},{"title":"Verkko-osoite","type":"text","name":"url","placeholder":"Kirjoita tarkka verkko-osoite, aloita osoite http:// tai https://"}]},{"name":"phoneNumbers","type":"table","title":"Puhelinnumerot","required":false,"contexts":"FORM","addRows":true,"columns":[{"title":"Maan suuntanumero","type":"text","name":"prefixNumber","placeholder":"esim. +358","column-width":150},{"title":"Numero","type":"text","name":"number","placeholder":"esim. 45123467"},{"title":"Voi soittaa ulkomailta","type":"enum","name":"isFinnishServiceNumber","values":[{"value":"true","text":"Ei"},{"value":"false","text":"Kyllä"}]},{"title":"Maksullisuus","type":"enum","name":"serviceChargeType","values":[{"value":"Charged","text":"Maksullinen"},{"value":"Free","text":"Maksuton"},{"value":"Other","text":"Muu"}]},{"title":"Hintatiedot sanallisesti","type":"text","name":"chargeDescription","placeholder":"esim. jonotusajalta peritään normaali puhelumaksu."},{"title":"Lisätieto","type":"text","name":"additionalInformation","placeholder":"esim. Vaihde"}]},{"name":"faxes","type":"table","title":"Faksinumerot","required":false,"contexts":"FORM","addRows":true,"columns":[{"title":"Maan suuntanumero","type":"text","name":"prefixNumber","placeholder":"esim. +358","column-width":150},{"title":"Numero","type":"text","name":"number","placeholder":"esim. 45123467"}]},{"name":"serviceHours","type":"html","title":"Palveluajat","required":false,"contexts":"FORM","html":"<table class=\"serviceHours\"><tbody></tbody></table>"},{"name":"add-service-hour","type":"html","html":"<a class=\"btn btn-sm btn-success add-service-hour\">Lisää palveluaika</a>"},{"name":"edit-additional-details","type":"html","html":"<p><a class=\"btn btn-sm btn-success edit-additional-details\">Muokkaa lisätietoja</a></p>"}]}]};}'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}/* jshint esversion: 6 *//* global ajaxurl, tinymce, moment, Promise */(function(tinymce,$){var SUPPORTED_COMPONENTS={'name':{'title':'Palvelupisteen nimi'},'description':{'title':'Palvelupisteen kuvaus'},'email':{'title':'Palvelupisteen s\xE4hk\xF6postiosoitteet'},'addresses':{'title':'Palvelupisteen osoitetiedot'},'fax':{'title':'Palvelupisteen faksi'},'phone':{'title':'Palvelupisteen puhelinnumerot'},'servicehours':{'title':'Palvelupisteen aukioloajat'},'webpages':{'title':'Palvelupisteen verkkosivustot'}};var ServiceLocationServiceChannelDialog=function(_window$KuntaApiAbstr){_inherits(ServiceLocationServiceChannelDialog,_window$KuntaApiAbstr);/**
     * Constructs service location service channel dialog
     * 
     * @param {type} editor TinyMCE editor instance
     * @param {type} serviceLocationServiceChannel
     */function ServiceLocationServiceChannelDialog(editor,serviceLocationServiceChannel){_classCallCheck(this,ServiceLocationServiceChannelDialog);var _this=_possibleConstructorReturn(this,(ServiceLocationServiceChannelDialog.__proto__||Object.getPrototypeOf(ServiceLocationServiceChannelDialog)).call(this,editor));_this.serviceLocationServiceChannel=serviceLocationServiceChannel;return _this}_createClass(ServiceLocationServiceChannelDialog,[{key:'saveServiceLocationServiceChannel',value:function saveServiceLocationServiceChannel(serviceLocationServiceChannel,callback){$.post(ajaxurl,{'action':'kunta_api_save_service_location_service_channel','serviceLocationServiceChannel':JSON.stringify(this.serviceLocationServiceChannel)},function(response){callback()}).fail(function(response){callback(response.responseText||response.statusText||'Unknown error occurred')})}},{key:'open',value:function open(){var _this2=this;var viewModel=getServiceLocationServiceChannelMetaform();var formValues={};this.supportedLocales.map(function(locale){formValues[locale]=_this2.serviceLocationServiceChannelToForm(locale,_this2.serviceLocationServiceChannel)});var dialog=this.openLocalizedMetaformDialog(viewModel,formValues,function(newFormValues){dialog.dialog('widget').addClass('loading');var updatedChannel=_this2.translateServiceLocationServiceChannelFromForm(_this2.serviceLocationServiceChannel,newFormValues);var validationError=_this2.validate(updatedChannel);if(validationError!==null){_this2.showError('Virheellinen sy\xF6te',validationError)}else{_this2.serviceLocationServiceChannel=updatedChannel;_this2.saveServiceLocationServiceChannel(_this2.serviceLocationServiceChannel,function(err){dialog.dialog('widget').removeClass('loading');if(err){_this2.showError('Virhe tallentaessa',err)}else{dialog.dialog('close')}})}});$(dialog).on('click','.add-service-hour',this._onAddServiceHourClick.bind(this));$(dialog).on('click','.edit-service-hour',this._onEditServiceHourClick.bind(this));$(dialog).on('click','.remove-service-hour',this._onRemoveServiceHourClick.bind(this));$(dialog).on('click','.edit-additional-details',this._onEditAdditionalDetailsClick.bind(this));this.redrawServiceHours()}},{key:'openServiceHourEditDialog',value:function openServiceHourEditDialog(serviceHour,callback){var _this3=this;var viewModel=getServiceHourMetaform();var formValues=this.serviceHourToForm(serviceHour);var dialog=this.openMetaformDialog(this.prepareViewModel(viewModel),formValues,function(newFormValues){var updatedServiceHour=_this3.serviceHourFromForm(newFormValues);callback(updatedServiceHour)})}},{key:'openAdditionalDetailsEditDialog',value:function openAdditionalDetailsEditDialog(){var _this4=this;var viewModel=getAdditionalDetailsMetaform();this.additionalDetailsToForm(this.serviceLocationServiceChannel).then(function(formValues){var dialog=_this4.openMetaformDialog(_this4.prepareViewModel(viewModel),formValues,function(newFormValues){_this4.additionalDetailsFromForm(newFormValues)});dialog.find('*[data-name="languages"]').metaformMultivalueAutocomplete('val',formValues.languageCodes).metaformMultivalueAutocomplete('option','customSource',function(input,callback){_this4.searchCodes('Language',input.term+'*').then(function(codes){callback(codes.map(function(codeItem){return{value:codeItem.type+':'+codeItem.code,label:_this4.getLocalizedValue(codeItem.names,'fi')}}))}).catch(function(err){tinyMCE.activeEditor.windowManager.alert(err)})});dialog.find('*[data-name="areas"]').metaformMultivalueAutocomplete('val',formValues.areaCodes).metaformMultivalueAutocomplete('option','customSource',function(input,callback){_this4.searchCodes('Municipality,Province,HospitalRegions,BusinessRegions',input.term+'*').then(function(codes){callback(codes.map(function(areaCode){return{value:areaCode.type+':'+areaCode.code,label:_this4.getCodeNameWithType(areaCode)}}))}).catch(function(err){tinyMCE.activeEditor.windowManager.alert(err)})})})}},{key:'validate',value:function validate(serviceLocationServiceChannel){var addressSubtypes=[];for(var j=0;j<serviceLocationServiceChannel.addresses.length;j++){var address=serviceLocationServiceChannel.addresses[j];if(address.subtype==='Abroad'||address.subtype==='Single'){for(var i=0;i<addressSubtypes.length;i++){if(addressSubtypes[i]!==address.subtype){return'Toimipisteell\xE4 ei voi olla yht\xE4aikaa kotimaista ja ulkomaista osoitetta'}}}addressSubtypes.push(address.subtype)}return null}},{key:'redrawServiceHours',value:function redrawServiceHours(){var _this5=this;var serviceHourTexts=this.serviceLocationServiceChannel.serviceHours.map(function(serviceHour){return _this5.formatServiceHour(serviceHour)});$('table.serviceHours tbody').empty();if(serviceHourTexts.length){serviceHourTexts.forEach(function(serviceHourText){var row=$('<tr>').appendTo($('table.serviceHours tbody'));$('<td>').html(serviceHourText).appendTo(row);$('<td>').append($('<a>').addClass('btn btn-sm btn-warning remove-service-hour').html('Poista')).appendTo(row);$('<td>').append($('<a>').addClass('btn btn-sm btn-success edit-service-hour').html('Muokkaa')).appendTo(row)})}else{$('<tr>').append($('<td>').html('Palveluaikoja ei ole viel\xE4 m\xE4\xE4ritelty')).appendTo($('table.serviceHours tbody'))}}},{key:'serviceHourFromFormException',value:function serviceHourFromFormException(formValues){var additionalInformation=[];var isClosed=formValues.type==='closed-all-day';var validForNow=false;var toTime=isClosed?null:formValues['Exception-to-time'];var fromTime=isClosed?null:formValues['Exception-from-time'];var openingHour=[];if(toTime||fromTime){openingHour.push({dayFrom:null,dayTo:null,from:fromTime,to:toTime,isExtra:false})}this.supportedLocales.forEach(function(locale){var value=formValues['Exception-additional-information-'+locale];if(value){additionalInformation.push({language:locale,value:value})}});return{serviceHourType:formValues.type,validFrom:this.parseIsoDate(formValues['Exception-from-date']),validTo:this.parseIsoDate(formValues['Exception-to-date']),isClosed:isClosed,validForNow:validForNow,additionalInformation:additionalInformation,openingHour:openingHour}}},{key:'serviceHourFromFormStandard',value:function serviceHourFromFormStandard(formValues){var isClosed=false;var validForNow=formValues[formValues.type+'-validForNow']==='true';var additionalInformation=[];var serviceHours=JSON.parse(formValues['Standard-openinghours']);var openingHour=formValues['Standard-open24h']?[]:serviceHours.map(function(serviceHour){return{dayFrom:parseInt(serviceHour.day),dayTo:parseInt(serviceHour.day),from:serviceHour.from,to:serviceHour.to,isExtra:false}});return{serviceHourType:formValues.type,validFrom:validForNow?null:this.parseIsoDate(formValues[formValues.type+'-validFrom']),validTo:validForNow?null:this.parseIsoDate(formValues[formValues.type+'-validTo']),isClosed:isClosed,validForNow:validForNow,additionalInformation:additionalInformation,openingHour:openingHour}}},{key:'serviceHourFromFormSpecial',value:function serviceHourFromFormSpecial(formValues){var isClosed=false;var validForNow=formValues[formValues.type+'-validForNow']==='true';var additionalInformation=[];var openingHour=[{dayFrom:parseInt(formValues['Special-from-date']),dayTo:parseInt(formValues['Special-to-date']),from:formValues['Special-from-time'],to:formValues['Special-to-time'],isExtra:false}];return{serviceHourType:formValues.type,validFrom:validForNow?null:this.parseIsoDate(formValues[formValues.type+'-validFrom']),validTo:validForNow?null:this.parseIsoDate(formValues[formValues.type+'-validTo']),isClosed:isClosed,validForNow:validForNow,additionalInformation:additionalInformation,openingHour:openingHour}}},{key:'serviceHourFromForm',value:function serviceHourFromForm(formValues){var serviceHourType=formValues.type;switch(serviceHourType){case'Exception':return this.serviceHourFromFormException(formValues);case'Standard':return this.serviceHourFromFormStandard(formValues);case'Special':return this.serviceHourFromFormSpecial(formValues);};}},{key:'translateServiceLocationServiceChannelFromForm',value:function translateServiceLocationServiceChannelFromForm(existingLocationServiceChannel,formValues){var serviceLocationServiceChannel=JSON.parse(JSON.stringify(existingLocationServiceChannel));serviceLocationServiceChannel.addresses=[];serviceLocationServiceChannel.descriptions=[];serviceLocationServiceChannel.emails=[];serviceLocationServiceChannel.phoneNumbers=[];this.supportedLocales.forEach(function(locale){var localeValues=formValues[locale];var localeAddresses=JSON.parse(localeValues.addresses).filter(function(address){return!!address.street&&!!address.street.trim()});localeAddresses.forEach(function(localeAddress,addressIndex){var address=void 0;if(serviceLocationServiceChannel.addresses.length-1<addressIndex){address={additionalInformations:[],streetAddress:[],subtype:'Single',type:'Location',country:'FI'};serviceLocationServiceChannel.addresses.push(address)}else{address=serviceLocationServiceChannel.addresses[addressIndex]}if(localeAddress.additionalInformation){localeAddress.additionalInformation=localeAddress.additionalInformation.trim()}if(localeAddress.additionalInformation){address.additionalInformations.push({'language':locale,'value':localeAddress.additionalInformation})}address.streetAddress.push({'language':locale,'value':localeAddress.street});address.postalCode=localeAddress.postOfficeCode;address.streetNumber=localeAddress.streetNumber});var foreignAddresses=JSON.parse(localeValues.foreignAddresses).filter(function(address){return!!address.foreign});foreignAddresses.forEach(function(foreignAddress,foreignAddressIndex){var addressIndex=localeAddresses.length+foreignAddressIndex;var address=void 0;if(serviceLocationServiceChannel.addresses.length-1<addressIndex){address={subtype:'Abroad',type:'Location',locationAbroad:[]};serviceLocationServiceChannel.addresses.push(address)}else{address=serviceLocationServiceChannel.addresses[addressIndex]}address.locationAbroad.push({'language':locale,'value':foreignAddress.foreign})});serviceLocationServiceChannel.emails=serviceLocationServiceChannel.emails.concat(JSON.parse(localeValues.emails).filter(function(email){return!!email.email}).map(function(email){return{'language':locale,'value':email.email}}));serviceLocationServiceChannel.phoneNumbers=serviceLocationServiceChannel.phoneNumbers.concat(JSON.parse(localeValues.phoneNumbers).filter(function(phoneNumber){return!!phoneNumber.prefixNumber&&!!phoneNumber.number}).map(function(phoneNumber){return Object.assign(phoneNumber,{'type':'Phone','language':locale,'isFinnishServiceNumber':phoneNumber.isFinnishServiceNumber==='true'})}));serviceLocationServiceChannel.phoneNumbers=serviceLocationServiceChannel.phoneNumbers.concat(JSON.parse(localeValues.faxes).filter(function(fax){return!!fax.prefixNumber&&!!fax.number}).map(function(fax){return{'type':'Fax','language':locale,'number':fax.number,'prefixNumber':fax.prefixNumber,'isFinnishServiceNumber':false}}));serviceLocationServiceChannel.webPages=serviceLocationServiceChannel.webPages.concat(JSON.parse(localeValues.webPages).filter(function(webPage){return!!webPage.url}).map(function(webPage){return Object.assign(webPage,{'language':locale})}));if(localeValues.description){localeValues.description=localeValues.description.trim()}if(localeValues.description){serviceLocationServiceChannel.descriptions.push({'language':locale,'value':localeValues.description,'type':'Description'})}if(localeValues.shortDescription){localeValues.shortDescription=localeValues.shortDescription.trim()}if(localeValues.shortDescription){serviceLocationServiceChannel.descriptions.push({'language':locale,'value':localeValues.shortDescription,'type':'ShortDescription'})}});return serviceLocationServiceChannel}},{key:'serviceHourToForm',value:function serviceHourToForm(serviceHour){var _this6=this;if(!serviceHour){return{}}var type=serviceHour.serviceHourType;var validForNow=serviceHour.validForNow?'true':'false';var validFrom=serviceHour.validForNow||!serviceHour.validFrom?null:moment(serviceHour.validFrom);var validTo=serviceHour.validForNow||!serviceHour.validTo?null:moment(serviceHour.validTo);var open24h=serviceHour.openingHour.length===0&&!serviceHour.isClosed;var validFromStr=validFrom?validFrom.format():null;var validToStr=validTo?validTo.format():null;var openingHour=serviceHour.openingHour&&serviceHour.openingHour.length?serviceHour.openingHour[0]:null;var openingHours=[];(serviceHour.openingHour||[]).forEach(function(openingHour){for(var day=openingHour.dayFrom;day<=openingHour.dayTo;day++){openingHours.push({day:day,from:openingHour.from,to:openingHour.to})};});switch(type){case'Standard':return{'type':type,'Standard-validForNow':validForNow,'Standard-validFrom':validFromStr,'Standard-validTo':validToStr,'Standard-open24h':open24h,'Standard-openinghours':openingHours};case'Special':return{'type':type,'Special-validForNow':validForNow,'Special-validFrom':validFromStr,'Special-validTo':validToStr,'Special-from-date':openingHour?openingHour.dayFrom:null,'Special-from-time':openingHour?openingHour.from:null,'Special-to-date':openingHour?openingHour.dayTo:null,'Special-to-time':openingHour?openingHour.to:null};case'Exception':var openFrom=openingHour?openingHour.from:null;var openTo=openingHour?openingHour.to:null;var exceptionType=!validTo?!openFrom&&!openTo?'closed-all-day':'single':'range';if(validFrom&&openFrom){var parts=openFrom.split(':');validFrom.hour(parseInt(parts[0]));validFrom.minute(parseInt(parts[1]))}if(validTo&&openTo){var _parts=openTo.split(':');validTo.hour(parseInt(_parts[0]));validTo.minute(parseInt(_parts[1]))}var result={'type':type,'Exception-type':exceptionType,'Exception-from-date':validFrom?validFrom.format():null,'Exception-to-date':validTo?validTo.format():null,'Exception-from-time':openFrom,'Exception-to-time':openTo};this.supportedLocales.forEach(function(locale){result['Exception-additional-information-'+locale]=_this6.getLocalizedValue(serviceHour.additionalInformation,locale)});return result;default:throw new Error('Unknown service hour type '+type);break;}}},{key:'additionalDetailsToForm',value:function additionalDetailsToForm(serviceLocationServiceChannel){var _this7=this;var languageQuery=serviceLocationServiceChannel.languages.map(function(language){return'code:'+language}).join(' ');return this.searchCodes('Language','+('+languageQuery+')').then(function(languageQueryResult){var languageMap={};languageQueryResult.forEach(function(queryResult){languageMap[queryResult.code]=_this7.getLocalizedValue(queryResult.names,'fi')});var languageCodes=serviceLocationServiceChannel.languages.map(function(language){return{value:language,label:languageMap[language]||language}});var areaCodes=[];serviceLocationServiceChannel.areas.forEach(function(area){if(area.type!=='Municipality'){areaCodes.push({value:area.type+':'+area.code,label:_this7.getCodeNameWithType(area)})}else{area.municipalities.forEach(function(municipality){areaCodes.push({value:'Municipality:'+municipality.code,label:_this7.getMunicipalityNameWithType(municipality)})})}});return{languageCodes:languageCodes,areaCodes:areaCodes,areaType:serviceLocationServiceChannel.areaType}})}},{key:'additionalDetailsFromForm',value:function additionalDetailsFromForm(newFormValues){this.serviceLocationServiceChannel.areaType=newFormValues.areaType;this.serviceLocationServiceChannel.languages=(newFormValues.languages||'').split(',');if(newFormValues.areaType==='AreaType'){var mucicipalitiesIndex=-1;var areas=[];(newFormValues.areas||'').split(',').forEach(function(area){var parts=area.split(':');var type=parts[0];var code=parts[1];if(type==='Municipality'){if(mucicipalitiesIndex>-1){areas[mucicipalitiesIndex].municipalities.push({code:code})}else{mucicipalitiesIndex=areas.push({'type':'Municipality','municipalities':[{code:code}]})-1}}else{areas.push({type:type,code:code})}});this.serviceLocationServiceChannel.areas=areas}}},{key:'serviceLocationServiceChannelToForm',value:function serviceLocationServiceChannelToForm(locale,serviceLocationServiceChannel){var _this8=this;var name=this.getTypedLocalizedValue(serviceLocationServiceChannel.names,locale,'Name');var shortDescription=this.getTypedLocalizedValue(serviceLocationServiceChannel.descriptions,locale,'ShortDescription');var description=this.getTypedLocalizedValue(serviceLocationServiceChannel.descriptions,locale,'Description');var visitAddresses=serviceLocationServiceChannel.addresses.filter(function(address){return address.subtype!=='Abroad'});var foreignAddresses=serviceLocationServiceChannel.addresses.filter(function(address){return address.subtype==='Abroad'});var emails=serviceLocationServiceChannel.emails.filter(function(email){return locale===email.language});var faxes=serviceLocationServiceChannel.phoneNumbers.filter(function(phoneNumber){return phoneNumber.type==='Fax'&&locale===phoneNumber.language});var phoneNumbers=serviceLocationServiceChannel.phoneNumbers.filter(function(phoneNumber){return phoneNumber.type==='Phone'&&locale===phoneNumber.language});var webPages=serviceLocationServiceChannel.webPages.filter(function(webPage){return locale===webPage.language});var addresses=visitAddresses.map(function(address){return{street:_this8.getLocalizedValue(address.streetAddress,locale),streetNumber:address.streetNumber,postOfficeCode:address.postalCode,additionalInformation:_this8.getLocalizedValue(address.additionalInformations,locale)}});return{name:name,description:description,shortDescription:shortDescription,addresses:addresses,emails:emails.map(function(email){return{email:email.value}}),phoneNumbers:phoneNumbers.map(function(phoneNumber){return Object.assign(phoneNumber,{isFinnishServiceNumber:phoneNumber.isFinnishServiceNumber?'true':'false'})}),faxes:faxes,foreignAddresses:foreignAddresses.map(function(foreignAddress){return{foreign:_this8.getLocalizedValue(foreignAddress.locationAbroad,locale)}}),webPages:webPages}}},{key:'_onAddServiceHourClick',value:function _onAddServiceHourClick(event){var _this9=this;this.openServiceHourEditDialog(null,function(createdServiceHour){_this9.serviceLocationServiceChannel.serviceHours.push(createdServiceHour);_this9.redrawServiceHours()})}},{key:'_onEditAdditionalDetailsClick',value:function _onEditAdditionalDetailsClick(){this.openAdditionalDetailsEditDialog(this.serviceLocationServiceChannel)}},{key:'_onEditServiceHourClick',value:function _onEditServiceHourClick(event){var _this10=this;var row=$(event.target).closest('tr');var index=row.index();var serviceHour=this.serviceLocationServiceChannel.serviceHours[index];this.openServiceHourEditDialog(serviceHour,function(updatedServiceHour){_this10.serviceLocationServiceChannel.serviceHours.splice(index,1,updatedServiceHour);_this10.redrawServiceHours()})}},{key:'_onRemoveServiceHourClick',value:function _onRemoveServiceHourClick(event){var row=$(event.target).closest('tr');var index=row.index();this.serviceLocationServiceChannel.serviceHours.splice(index,1);this.redrawServiceHours()}}]);return ServiceLocationServiceChannelDialog}(window.KuntaApiAbstractEditDialog);var ServiceLocationServiceChannelEditor=function(){function ServiceLocationServiceChannelEditor(editor){_classCallCheck(this,ServiceLocationServiceChannelEditor);this.buttonStyle={'color':'#555','width':'100%','border':'1px solid #ccc','background':'#f7f7f7','display':'block','padding':'5px','margin-top':'5px','margin-bottom':'5px','cursor':'pointer'};this.editor=editor;this.editor.on('BeforeSetcontent',this.onBeforeSetcontent.bind(this));this.editor.on('GetContent',this.onGetContent.bind(this));this.editor.on('DblClick',this.onDblClick.bind(this));this.editor.addCommand('kunta-api-service-location-channel-edit',this.onServiceLocationChannelEdit.bind(this))}_createClass(ServiceLocationServiceChannelEditor,[{key:'parseAttributes',value:function parseAttributes(string){var result=[];var re=/([a-zA-Z-_]*)(\=\")([a-zA-Z0-9-]*)(\")/g;var match=null;do{match=re.exec(string);if(match&&match.length>3){result.push({name:match[1],value:match[3]})}}while(match);return result}},{key:'getComponentTitle',value:function getComponentTitle(name){return SUPPORTED_COMPONENTS[name].title}},{key:'replaceShortcodes',value:function replaceShortcodes(content){var _this11=this;return content.replace(/(\[kunta_api_location_channel_component)([a-zA-Z0-9 -=]*)(\])/g,function(all,tag,attributesText,end){var attributes=_this11.parseAttributes(attributesText);var placeholder=$('<input>').attr({'type':'button','data-kunta-api-placeholder':'location_channel_component'}).css(_this11.buttonStyle);for(var i=0;i<attributes.length;i++){var attribute=attributes[i];placeholder.attr('data-'+attribute.name,attribute.value)}var component=placeholder.attr('data-component');if(!SUPPORTED_COMPONENTS[component]){return all}placeholder.attr('value',_this11.getComponentTitle(component));return $('<div>').append(placeholder).html()})}},{key:'restoreShortcodes',value:function restoreShortcodes(content){return content.replace(/<input [^>]+>/g,function(match){var input=$(match);if(input.attr('data-kunta-api-placeholder')==='location_channel_component'){var shortcodeAttributes=[];var attributeNames=['channel-id','component'];for(var i=0;i<attributeNames.length;i++){var attributeName=attributeNames[i];var attributeValue=input.attr('data-'+attributeName);shortcodeAttributes.push([attributeName,'"'+attributeValue+'"'].join('='))}return'[kunta_api_location_channel_component '+shortcodeAttributes.join(' ')+']'}return match})}},{key:'openElementEditor',value:function openElementEditor(element){var placeholderAttr=element.attributes['data-kunta-api-placeholder'];if(placeholderAttr){var serviceLocationServiceChannelId=element.attributes['data-channel-id'].value;this.editor.execCommand('kunta-api-service-location-channel-edit','',{serviceLocationServiceChannelId:serviceLocationServiceChannelId})}}},{key:'findServiceLocationServiceChannel',value:function findServiceLocationServiceChannel(id,callback){$.post(ajaxurl,{'action':'kunta_api_load_service_location_service_channel','serviceLocationServiceChannelId':id},function(response){callback(null,JSON.parse(response))}).fail(function(response){callback(response.responseText||response.statusText)})}},{key:'onBeforeSetcontent',value:function onBeforeSetcontent(event){event.content=this.replaceShortcodes(event.content)}},{key:'onGetContent',value:function onGetContent(event){event.content=this.restoreShortcodes(event.content)}},{key:'onDblClick',value:function onDblClick(event){var element=event.target;this.openElementEditor(element)}},{key:'onServiceLocationChannelEdit',value:function onServiceLocationChannelEdit(ui,options){var _this12=this;this.findServiceLocationServiceChannel(options.serviceLocationServiceChannelId,function(err,serviceLocationServiceChannel){if(err){tinyMCE.activeEditor.windowManager.alert(err)}else{var dialog=new ServiceLocationServiceChannelDialog(_this12.editor,serviceLocationServiceChannel);dialog.open()}})}}]);return ServiceLocationServiceChannelEditor}();var ServiceLocationServiceChannelEmbed=function(){function ServiceLocationServiceChannelEmbed(editor){_classCallCheck(this,ServiceLocationServiceChannelEmbed);this.editor=editor;this.displayLocale='fi';this.searching=false;this.pending=false;this.addButton()}_createClass(ServiceLocationServiceChannelEmbed,[{key:'addButton',value:function addButton(){var _this13=this;this.editor.addButton('kunta_api_service_location_embed',{title:'Search Kunta API service location channels',onclick:function onclick(){_this13.editor.windowManager.open({title:'Search Kunta API service location channels',width:768,height:500,body:[{type:'textbox',name:'kunta-api-service-query',label:'Query',onKeyUp:function onKeyUp(e){if(!_this13.searching){_this13.searching=true;_this13.searchServiceLocationChannels(e.target.value,function(response){_this13.searching=false;if(_this13.pending){_this13.searchServiceLocationChannels(e.target.value,function(innerResponse){_this13.handleResponse(innerResponse)})}else{_this13.handleResponse(response)}})}else{_this13.pending=true}}},{type:'label',classes:'kunta-api-search-info',text:'Kirjoita hakusana yll\xE4 olevaan hakukentt\xE4\xE4n'},{type:'container',classes:'kunta-api-search-results',minHeight:400}],onsubmit:function onsubmit(e){var responseHtml='';var allEmbedsFromSameChannel=true;var componentsToEmbed=$('.service-component-embed-input:checked');var firstServiceLocationChannelId=componentsToEmbed.first().attr('data-service-location-channel-id');var serviceLocationChannelName=componentsToEmbed.first().attr('data-service-location-channel-name');componentsToEmbed.each(function(){var component=$(this).attr('data-component-type');var serviceLocationChannelId=$(this).attr('data-service-location-channel-id');responseHtml+='[kunta_api_location_channel_component channel-id="'+serviceLocationChannelId+'" component="'+component+'"]';if(serviceLocationChannelId!==firstServiceLocationChannelId){allEmbedsFromSameChannel=false}});if(allEmbedsFromSameChannel){_this13.editor.windowManager.confirm('Merkit\xE4\xE4nk\xF6 sivu palvelukanavan: '+serviceLocationChannelName+' sivuksi?',function(confirmed){if(confirmed){var pageId=$('#post_ID').val();this.markAsServiceLocationPage(firstServiceLocationChannelId,pageId)}})}_this13.editor.insertContent(responseHtml)}})}})}},{key:'markAsServiceLocationPage',value:function markAsServiceLocationPage(serviceLocationChannelId,pageId){$.post(ajaxurl,{'action':'kunta_api_mark_page_as_location_page','pageId':pageId,'locationChannelId':serviceLocationChannelId},function(response){})}},{key:'searchServiceLocationChannels',value:function searchServiceLocationChannels(query,callback){$('.mce-kunta-api-search-results').empty();$('.mce-kunta-api-search-results').append($('<div>').addClass('mce-kunta-api-search-results-loader'));$('.mce-kunta-api-search-info').text('Ladataan...');$.post(ajaxurl,{'action':'kunta_api_search_service_location_channels','data':query},function(response){$('.mce-kunta-api-search-results-loader').remove();callback(JSON.parse(response))})}},{key:'getLocalizedValueAndType',value:function getLocalizedValueAndType(values,locale,type){for(var i=0;i<values.length;i++){if(locale===values[i].language&&type===values[i].type){return values[i].value}}return null}},{key:'appendResult',value:function appendResult(result){var resultContainer=$('<div>').addClass('mce-kunta-api-search-result-row');var name=this.getLocalizedValueAndType(result.names,this.displayLocale,'Name');resultContainer.append($('<p>').addClass('mce-kunta-api-search-result-title').text(name));Object.keys(SUPPORTED_COMPONENTS).forEach(function(component){var options=SUPPORTED_COMPONENTS[component];resultContainer.append($('<p>').append($('<input>').addClass('service-component-embed-input').attr({'type':'checkbox','data-service-location-channel-name':name,'data-component-type':component,'data-service-location-channel-id':result.id})).append($('<span>').text(options.title)))});$('.mce-kunta-api-search-results').append(resultContainer)}},{key:'handleResponse',value:function handleResponse(response){$('.mce-kunta-api-search-results').empty();if(response.length===0){$('.mce-kunta-api-search-info').text('Hakusanalla ei l\xF6ytynyt yht\xE4\xE4n palvelua')}else{$('.mce-kunta-api-search-info').text('Kirjoita hakusana yll\xE4 olevaan hakukentt\xE4\xE4n')}for(var i=0;i<response.length;i++){this.appendResult(response[i])}}}]);return ServiceLocationServiceChannelEmbed}();tinymce.PluginManager.add('kunta_api_service_location_embed',function(editor,url){new ServiceLocationServiceChannelEmbed(editor);new ServiceLocationServiceChannelEditor(editor)})})(tinymce,jQuery);
//# sourceMappingURL=plugin.js.map
