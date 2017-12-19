function getServiceLocationChannelAdditionalDetailsMetaform(){return {"title":"Lisätiedot","sections":[{"title":"Lisätiedot","fields":[{"name":"languages","type":"autocomplete-multiple","title":"Kielet, joilla palvelupaikassa palvellaan","required":true},{"title":"Alue, jolla palvelupaikka palvelee","name":"areaType","type":"radio","required":true,"options":[{"name":"WholeCountry","text":"Koko maa"},{"name":"WholeCountryExceptAlandIslands","text":"Koko maa paitsi ei Ahvenanmaa","checked":true},{"name":"AreaType","text":"Rajattu alue"}],"contexts":["FORM"],"editable":true},{"visible-if":{"field":"areaType","equals":"AreaType"},"name":"areas","type":"autocomplete-multiple","title":"Valitse yksi tai useampi alue","required":true}]}]};}function getServiceLocationServiceChannelMetaform(){return {"title":"Palvelupiste","sections":[{"fields":[{"name":"name","type":"text","title":"Nimi","required":false,"contexts":"FORM","placeholder":"Kirjoita palvelupaikan nimi."},{"name":"shortDescription","type":"memo","title":"Tiivistelmä","required":false,"contexts":"FORM","placeholder":"Kirjoita lyhyt tiivistelmä hakukoneita varten."},{"name":"description","type":"memo","title":"Kuvaus","required":false,"contexts":"FORM","placeholder":"Kirjoita selkeä ja ymmärrettävä kuvausteksti."}]},{"fields":[{"name":"addresses","type":"table","title":"Käyntiosoite","required":false,"contexts":"FORM","addRows":true,"columns":[{"type":"text","name":"street","title":"Kadunnimi","placeholder":"esim. Mannerheimintie","column-width":300},{"type":"text","name":"streetNumber","title":"Osoitenumero","placeholder":"esim. 12 A 23","column-width":40},{"type":"text","name":"postOfficeCode","title":"Postinumero","column-width":270,"placeholder":"Postitoimipaikka haetaan automaaattisesti"},{"type":"text","name":"additionalInformation","title":"Osoitteen lisätieto","placeholder":"Anna tarvittaessa osoitetta täsmentävä tieto tekstinä."},{"column-width":63,"type":"button","text":"Poista","class":"btn-warning","action":"delete-row"}]},{"name":"foreignAddresses","type":"table","title":"Käyntiosoite - ulkomainen (Vapaasti täydennettävä osoite)","required":false,"contexts":"FORM","addRows":true,"columns":[{"type":"text","name":"foreign","placeholder":"Kirjoita ulkomainen osoite."}]},{"name":"emails","type":"table","title":"Sähköpostit","required":false,"contexts":"FORM","addRows":true,"columns":[{"type":"text","name":"email","placeholder":"esim. osoite@organisaatio.fi"}]},{"name":"webPages","type":"table","title":"Verkkosivut","required":false,"contexts":"FORM","addRows":true,"columns":[{"title":"Verkkosivun nimi","type":"text","name":"value","placeholder":"Kirjoita verkkosivun nimi"},{"title":"Verkko-osoite","type":"text","name":"url","placeholder":"Kirjoita tarkka verkko-osoite, aloita osoite http:// tai https://"}]},{"name":"phoneNumbers","type":"table","title":"Puhelinnumerot","required":false,"contexts":"FORM","addRows":true,"columns":[{"title":"Maan suuntanumero","type":"text","name":"prefixNumber","placeholder":"esim. +358","column-width":150},{"title":"Numero","type":"text","name":"number","placeholder":"esim. 45123467"},{"title":"Voi soittaa ulkomailta","type":"enum","name":"isFinnishServiceNumber","values":[{"value":"true","text":"Ei"},{"value":"false","text":"Kyllä"}]},{"title":"Maksullisuus","type":"enum","name":"serviceChargeType","values":[{"value":"Charged","text":"Maksullinen"},{"value":"Free","text":"Maksuton"},{"value":"Other","text":"Muu"}]},{"title":"Hintatiedot sanallisesti","type":"text","name":"chargeDescription","placeholder":"esim. jonotusajalta peritään normaali puhelumaksu."},{"title":"Lisätieto","type":"text","name":"additionalInformation","placeholder":"esim. Vaihde"}]},{"name":"faxes","type":"table","title":"Faksinumerot","required":false,"contexts":"FORM","addRows":true,"columns":[{"title":"Maan suuntanumero","type":"text","name":"prefixNumber","placeholder":"esim. +358","column-width":150},{"title":"Numero","type":"text","name":"number","placeholder":"esim. 45123467"}]},{"name":"serviceHours","type":"html","title":"Palveluajat","required":false,"contexts":"FORM","html":"<table class=\"serviceHours\"><tbody></tbody></table>"},{"name":"add-service-hour","type":"html","html":"<a class=\"btn btn-sm btn-success add-service-hour\">Lisää palveluaika</a>"},{"name":"edit-additional-details","type":"html","html":"<p><a class=\"btn btn-sm btn-success edit-additional-details\">Muokkaa lisätietoja</a></p>"}]}]};}'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}(function(tinymce,$){var SUPPORTED_COMPONENTS={'name':{'title':'Palvelupisteen nimi'},'description':{'title':'Palvelupisteen kuvaus'},'email':{'title':'Palvelupisteen s\xE4hk\xF6postiosoitteet'},'addresses':{'title':'Palvelupisteen osoitetiedot'},'fax':{'title':'Palvelupisteen faksi'},'phone':{'title':'Palvelupisteen puhelinnumerot'},'servicehours':{'title':'Palvelupisteen aukioloajat'},'webpages':{'title':'Palvelupisteen verkkosivustot'}};var ServiceLocationServiceChannelDialog=function(_window$AbstractServi){_inherits(ServiceLocationServiceChannelDialog,_window$AbstractServi);function ServiceLocationServiceChannelDialog(editor,serviceChannel){_classCallCheck(this,ServiceLocationServiceChannelDialog);var _this=_possibleConstructorReturn(this,(ServiceLocationServiceChannelDialog.__proto__||Object.getPrototypeOf(ServiceLocationServiceChannelDialog)).call(this,editor,serviceChannel,'kunta_api_save_service_location_service_channel'));_this.on('afterDialogOpen',_this.onAfterDialogOpen.bind(_this));return _this}_createClass(ServiceLocationServiceChannelDialog,[{key:'getServiceChannelFormViewModel',value:function getServiceChannelFormViewModel(){return getServiceLocationServiceChannelMetaform()}},{key:'openAdditionalDetailsEditDialog',value:function openAdditionalDetailsEditDialog(){var _this2=this;var viewModel=getServiceLocationChannelAdditionalDetailsMetaform();this.additionalDetailsToForm(this.serviceChannel).then(function(formValues){var dialog=_this2.openMetaformDialog(_this2.prepareViewModel(viewModel),formValues,function(newFormValues){_this2.additionalDetailsFromForm(newFormValues)});_this2.createLanguagesAutocomplete(dialog.find('*[data-name="languages"]'),formValues.languageCodes);_this2.createAreasAutocomplete(dialog.find('*[data-name="areas"]'),formValues.areaCodes)})}},{key:'validate',value:function validate(serviceLocationServiceChannel){var addressSubtypes=[];for(var j=0;j<serviceLocationServiceChannel.addresses.length;j++){var address=serviceLocationServiceChannel.addresses[j];if(address.subtype==='Abroad'||address.subtype==='Single'){for(var i=0;i<addressSubtypes.length;i++){if(addressSubtypes[i]!==address.subtype){return'Toimipisteell\xE4 ei voi olla yht\xE4aikaa kotimaista ja ulkomaista osoitetta'}}}addressSubtypes.push(address.subtype)}return null}},{key:'serviceChannelFromForm',value:function serviceChannelFromForm(existingLocationServiceChannel,formValues){var serviceLocationServiceChannel=JSON.parse(JSON.stringify(existingLocationServiceChannel));serviceLocationServiceChannel.addresses=[];serviceLocationServiceChannel.descriptions=[];serviceLocationServiceChannel.emails=[];serviceLocationServiceChannel.phoneNumbers=[];this.supportedLocales.forEach(function(locale){var localeValues=formValues[locale];var localeAddresses=JSON.parse(localeValues.addresses).filter(function(address){return!!address.street&&!!address.street.trim()});localeAddresses.forEach(function(localeAddress,addressIndex){var address=void 0;if(serviceLocationServiceChannel.addresses.length-1<addressIndex){address={additionalInformations:[],streetAddress:[],subtype:'Single',type:'Location',country:'FI'};serviceLocationServiceChannel.addresses.push(address)}else{address=serviceLocationServiceChannel.addresses[addressIndex]}if(localeAddress.additionalInformation){localeAddress.additionalInformation=localeAddress.additionalInformation.trim()}if(localeAddress.additionalInformation){address.additionalInformations.push({'language':locale,'value':localeAddress.additionalInformation})}address.streetAddress.push({'language':locale,'value':localeAddress.street});address.postalCode=localeAddress.postOfficeCode;address.streetNumber=localeAddress.streetNumber});var foreignAddresses=JSON.parse(localeValues.foreignAddresses).filter(function(address){return!!address.foreign});foreignAddresses.forEach(function(foreignAddress,foreignAddressIndex){var addressIndex=localeAddresses.length+foreignAddressIndex;var address=void 0;if(serviceLocationServiceChannel.addresses.length-1<addressIndex){address={subtype:'Abroad',type:'Location',locationAbroad:[]};serviceLocationServiceChannel.addresses.push(address)}else{address=serviceLocationServiceChannel.addresses[addressIndex]}address.locationAbroad.push({'language':locale,'value':foreignAddress.foreign})});serviceLocationServiceChannel.emails=serviceLocationServiceChannel.emails.concat(JSON.parse(localeValues.emails).filter(function(email){return!!email.email}).map(function(email){return{'language':locale,'value':email.email}}));serviceLocationServiceChannel.phoneNumbers=serviceLocationServiceChannel.phoneNumbers.concat(JSON.parse(localeValues.phoneNumbers).filter(function(phoneNumber){return!!phoneNumber.prefixNumber&&!!phoneNumber.number}).map(function(phoneNumber){return Object.assign(phoneNumber,{'type':'Phone','language':locale,'isFinnishServiceNumber':phoneNumber.isFinnishServiceNumber==='true'})}));serviceLocationServiceChannel.phoneNumbers=serviceLocationServiceChannel.phoneNumbers.concat(JSON.parse(localeValues.faxes).filter(function(fax){return!!fax.prefixNumber&&!!fax.number}).map(function(fax){return{'type':'Fax','language':locale,'number':fax.number,'prefixNumber':fax.prefixNumber,'isFinnishServiceNumber':false}}));serviceLocationServiceChannel.webPages=serviceLocationServiceChannel.webPages.concat(JSON.parse(localeValues.webPages).filter(function(webPage){return!!webPage.url}).map(function(webPage){return Object.assign(webPage,{'language':locale})}));if(localeValues.description){localeValues.description=localeValues.description.trim()}if(localeValues.description){serviceLocationServiceChannel.descriptions.push({'language':locale,'value':localeValues.description,'type':'Description'})}if(localeValues.shortDescription){localeValues.shortDescription=localeValues.shortDescription.trim()}if(localeValues.shortDescription){serviceLocationServiceChannel.descriptions.push({'language':locale,'value':localeValues.shortDescription,'type':'ShortDescription'})}});return serviceLocationServiceChannel}},{key:'additionalDetailsToForm',value:function additionalDetailsToForm(serviceLocationServiceChannel){var _this3=this;return this.languagesToForm(serviceLocationServiceChannel.languages).then(function(languageCodes){return{languageCodes:languageCodes,areaCodes:_this3.areasToForm(serviceLocationServiceChannel.areas),areaType:serviceLocationServiceChannel.areaType}})}},{key:'additionalDetailsFromForm',value:function additionalDetailsFromForm(newFormValues){this.serviceChannel.areaType=newFormValues.areaType;this.serviceChannel.languages=(newFormValues.languages||'').split(',');this.serviceChannel.areas=this.areasFromForm(newFormValues.areaType,newFormValues.areas)}},{key:'serviceChannelToForm',value:function serviceChannelToForm(locale){var _this4=this;var name=this.getTypedLocalizedValue(this.serviceChannel.names,locale,'Name');var shortDescription=this.getTypedLocalizedValue(this.serviceChannel.descriptions,locale,'ShortDescription');var description=this.getTypedLocalizedValue(this.serviceChannel.descriptions,locale,'Description');var visitAddresses=this.serviceChannel.addresses.filter(function(address){return address.subtype!=='Abroad'});var foreignAddresses=this.serviceChannel.addresses.filter(function(address){return address.subtype==='Abroad'});var emails=this.serviceChannel.emails.filter(function(email){return locale===email.language});var faxes=this.serviceChannel.phoneNumbers.filter(function(phoneNumber){return phoneNumber.type==='Fax'&&locale===phoneNumber.language});var phoneNumbers=this.serviceChannel.phoneNumbers.filter(function(phoneNumber){return phoneNumber.type==='Phone'&&locale===phoneNumber.language});var webPages=this.getLocalizedWebPages(this.serviceChannel.webPages,locale);var addresses=visitAddresses.map(function(address){return{street:_this4.getLocalizedValue(address.streetAddress,locale),streetNumber:address.streetNumber,postOfficeCode:address.postalCode,additionalInformation:_this4.getLocalizedValue(address.additionalInformations,locale)}});return{name:name,description:description,shortDescription:shortDescription,addresses:addresses,emails:emails.map(function(email){return{email:email.value}}),phoneNumbers:phoneNumbers.map(function(phoneNumber){return Object.assign(phoneNumber,{isFinnishServiceNumber:phoneNumber.isFinnishServiceNumber?'true':'false'})}),faxes:faxes,foreignAddresses:foreignAddresses.map(function(foreignAddress){return{foreign:_this4.getLocalizedValue(foreignAddress.locationAbroad,locale)}}),webPages:webPages}}},{key:'onAfterDialogOpen',value:function onAfterDialogOpen(data){var dialog=data.dialog;$(dialog).on('click','.add-service-hour',this.onAddServiceHourClick.bind(this));$(dialog).on('click','.edit-service-hour',this.onEditServiceHourClick.bind(this));$(dialog).on('click','.remove-service-hour',this.onRemoveServiceHourClick.bind(this));$(dialog).on('click','.edit-additional-details',this.onEditAdditionalDetailsClick.bind(this));this.redrawServiceHours()}},{key:'onAddServiceHourClick',value:function onAddServiceHourClick(event){var _this5=this;this.openServiceHourEditDialog(null,function(createdServiceHour){_this5.serviceChannel.serviceHours.push(createdServiceHour);_this5.redrawServiceHours()})}},{key:'onEditAdditionalDetailsClick',value:function onEditAdditionalDetailsClick(){this.openAdditionalDetailsEditDialog(this.serviceChannel)}},{key:'onEditServiceHourClick',value:function onEditServiceHourClick(event){var _this6=this;var row=$(event.target).closest('tr');var index=row.index();var serviceHour=this.serviceChannel.serviceHours[index];this.openServiceHourEditDialog(serviceHour,function(updatedServiceHour){_this6.serviceChannel.serviceHours.splice(index,1,updatedServiceHour);_this6.redrawServiceHours()})}},{key:'onRemoveServiceHourClick',value:function onRemoveServiceHourClick(event){var row=$(event.target).closest('tr');var index=row.index();this.serviceChannel.serviceHours.splice(index,1);this.redrawServiceHours()}},{key:'onEditAdditionalDetailsClick',value:function onEditAdditionalDetailsClick(){this.openAdditionalDetailsEditDialog(this.serviceChannel)}}]);return ServiceLocationServiceChannelDialog}(window.AbstractServiceChannelEditorDialog);var ServiceLocationServiceChannelEditor=function(){function ServiceLocationServiceChannelEditor(editor){_classCallCheck(this,ServiceLocationServiceChannelEditor);this.buttonStyle={'color':'#555','width':'100%','border':'1px solid #ccc','background':'#f7f7f7','display':'block','padding':'5px','margin-top':'5px','margin-bottom':'5px','cursor':'pointer'};this.editor=editor;this.editor.on('BeforeSetcontent',this.onBeforeSetcontent.bind(this));this.editor.on('GetContent',this.onGetContent.bind(this));this.editor.on('DblClick',this.onDblClick.bind(this));this.editor.addCommand('kunta-api-service-location-channel-edit',this.onServiceLocationChannelEdit.bind(this))}_createClass(ServiceLocationServiceChannelEditor,[{key:'parseAttributes',value:function parseAttributes(string){var result=[];var re=/([a-zA-Z-_]*)(\=\")([a-zA-Z0-9-]*)(\")/g;var match=null;do{match=re.exec(string);if(match&&match.length>3){result.push({name:match[1],value:match[3]})}}while(match);return result}},{key:'getComponentTitle',value:function getComponentTitle(name){return SUPPORTED_COMPONENTS[name].title}},{key:'replaceShortcodes',value:function replaceShortcodes(content){var _this7=this;return content.replace(/(\[kunta_api_location_channel_component)([a-zA-Z0-9 -=]*)(\])/g,function(all,tag,attributesText,end){var attributes=_this7.parseAttributes(attributesText);var placeholder=$('<input>').attr({'type':'button','data-kunta-api-placeholder':'location_channel_component'}).css(_this7.buttonStyle);for(var i=0;i<attributes.length;i++){var attribute=attributes[i];placeholder.attr('data-'+attribute.name,attribute.value)}var component=placeholder.attr('data-component');if(!SUPPORTED_COMPONENTS[component]){return all}placeholder.attr('value',_this7.getComponentTitle(component));return $('<div>').append(placeholder).html()})}},{key:'restoreShortcodes',value:function restoreShortcodes(content){return content.replace(/<input [^>]+>/g,function(match){var input=$(match);if(input.attr('data-kunta-api-placeholder')==='location_channel_component'){var shortcodeAttributes=[];var attributeNames=['channel-id','component'];for(var i=0;i<attributeNames.length;i++){var attributeName=attributeNames[i];var attributeValue=input.attr('data-'+attributeName);shortcodeAttributes.push([attributeName,'"'+attributeValue+'"'].join('='))}return'[kunta_api_location_channel_component '+shortcodeAttributes.join(' ')+']'}return match})}},{key:'openElementEditor',value:function openElementEditor(element){var placeholderAttr=element.attributes['data-kunta-api-placeholder'];if(placeholderAttr&&placeholderAttr.value==='location_channel_component'){var serviceLocationServiceChannelId=element.attributes['data-channel-id'].value;this.editor.execCommand('kunta-api-service-location-channel-edit','',{serviceLocationServiceChannelId:serviceLocationServiceChannelId})}}},{key:'findServiceLocationServiceChannel',value:function findServiceLocationServiceChannel(id,callback){$.post(ajaxurl,{'action':'kunta_api_load_service_location_service_channel','serviceLocationServiceChannelId':id},function(response){callback(null,JSON.parse(response))}).fail(function(response){callback(response.responseText||response.statusText)})}},{key:'onBeforeSetcontent',value:function onBeforeSetcontent(event){event.content=this.replaceShortcodes(event.content)}},{key:'onGetContent',value:function onGetContent(event){event.content=this.restoreShortcodes(event.content)}},{key:'onDblClick',value:function onDblClick(event){var element=event.target;this.openElementEditor(element)}},{key:'onServiceLocationChannelEdit',value:function onServiceLocationChannelEdit(ui,options){var _this8=this;this.findServiceLocationServiceChannel(options.serviceLocationServiceChannelId,function(err,serviceLocationServiceChannel){if(err){tinyMCE.activeEditor.windowManager.alert(err)}else{var dialog=new ServiceLocationServiceChannelDialog(_this8.editor,serviceLocationServiceChannel);dialog.open()}})}}]);return ServiceLocationServiceChannelEditor}();var ServiceLocationServiceChannelEmbed=function(){function ServiceLocationServiceChannelEmbed(editor){_classCallCheck(this,ServiceLocationServiceChannelEmbed);this.editor=editor;this.displayLocale='fi';this.searching=false;this.pending=false;this.addButton()}_createClass(ServiceLocationServiceChannelEmbed,[{key:'addButton',value:function addButton(){var _this9=this;this.editor.addButton('kunta_api_service_location_embed',{title:'Search Kunta API service location channels',onclick:function onclick(){_this9.editor.windowManager.open({title:'Search Kunta API service location channels',width:768,height:500,body:[{type:'textbox',name:'kunta-api-service-query',label:'Query',onKeyUp:function onKeyUp(e){if(!_this9.searching){_this9.searching=true;_this9.searchServiceLocationChannels(e.target.value,function(response){_this9.searching=false;if(_this9.pending){_this9.searchServiceLocationChannels(e.target.value,function(innerResponse){_this9.handleResponse(innerResponse)})}else{_this9.handleResponse(response)}})}else{_this9.pending=true}}},{type:'label',classes:'kunta-api-search-info',text:'Kirjoita hakusana yll\xE4 olevaan hakukentt\xE4\xE4n'},{type:'container',classes:'kunta-api-search-results',minHeight:400}],onsubmit:function onsubmit(e){var responseHtml='';var allEmbedsFromSameChannel=true;var componentsToEmbed=$('.service-component-embed-input:checked');var firstServiceLocationChannelId=componentsToEmbed.first().attr('data-service-location-channel-id');var serviceLocationChannelName=componentsToEmbed.first().attr('data-service-location-channel-name');componentsToEmbed.each(function(){var component=$(this).attr('data-component-type');var serviceLocationChannelId=$(this).attr('data-service-location-channel-id');responseHtml+='[kunta_api_location_channel_component channel-id="'+serviceLocationChannelId+'" component="'+component+'"]';if(serviceLocationChannelId!==firstServiceLocationChannelId){allEmbedsFromSameChannel=false}});if(allEmbedsFromSameChannel){_this9.editor.windowManager.confirm('Merkit\xE4\xE4nk\xF6 sivu palvelukanavan: '+serviceLocationChannelName+' sivuksi?',function(confirmed){if(confirmed){var pageId=$('#post_ID').val();this.markAsServiceLocationPage(firstServiceLocationChannelId,pageId)}})}_this9.editor.insertContent(responseHtml)}})}})}},{key:'markAsServiceLocationPage',value:function markAsServiceLocationPage(serviceLocationChannelId,pageId){$.post(ajaxurl,{'action':'kunta_api_mark_page_as_location_page','pageId':pageId,'locationChannelId':serviceLocationChannelId},function(response){})}},{key:'searchServiceLocationChannels',value:function searchServiceLocationChannels(query,callback){$('.mce-kunta-api-search-results').empty();$('.mce-kunta-api-search-results').append($('<div>').addClass('mce-kunta-api-search-results-loader'));$('.mce-kunta-api-search-info').text('Ladataan...');$.post(ajaxurl,{'action':'kunta_api_search_service_location_channels','data':query},function(response){$('.mce-kunta-api-search-results-loader').remove();callback(JSON.parse(response))})}},{key:'getLocalizedValueAndType',value:function getLocalizedValueAndType(values,locale,type){for(var i=0;i<values.length;i++){if(locale===values[i].language&&type===values[i].type){return values[i].value}}return null}},{key:'appendResult',value:function appendResult(result){var resultContainer=$('<div>').addClass('mce-kunta-api-search-result-row');var name=this.getLocalizedValueAndType(result.names,this.displayLocale,'Name');resultContainer.append($('<p>').addClass('mce-kunta-api-search-result-title').text(name));Object.keys(SUPPORTED_COMPONENTS).forEach(function(component){var options=SUPPORTED_COMPONENTS[component];resultContainer.append($('<p>').append($('<input>').addClass('service-component-embed-input').attr({'type':'checkbox','data-service-location-channel-name':name,'data-component-type':component,'data-service-location-channel-id':result.id})).append($('<span>').text(options.title)))});$('.mce-kunta-api-search-results').append(resultContainer)}},{key:'handleResponse',value:function handleResponse(response){$('.mce-kunta-api-search-results').empty();if(response.length===0){$('.mce-kunta-api-search-info').text('Hakusanalla ei l\xF6ytynyt yht\xE4\xE4n palvelua')}else{$('.mce-kunta-api-search-info').text('Kirjoita hakusana yll\xE4 olevaan hakukentt\xE4\xE4n')}for(var i=0;i<response.length;i++){this.appendResult(response[i])}}}]);return ServiceLocationServiceChannelEmbed}();tinymce.PluginManager.add('kunta_api_service_location_embed',function(editor,url){new ServiceLocationServiceChannelEmbed(editor);new ServiceLocationServiceChannelEditor(editor)})})(tinymce,jQuery);
//# sourceMappingURL=plugin.js.map
