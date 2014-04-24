

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.MultiItemsManager');
	MYNAMESPACE.view.MultiItemsManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.MultiItemsManager.prototype = {
		 _instances				: {}
		,_dummyInputselect		: null
		,_index					: null
		,_EventName				: null
		,_originalMultiObj				: null

		,initialize: function(DataManagerInstance) {
			var thisObj = this;
			this._instances = {
				'DataManager'			: DataManagerInstance,
				'ItemManager'			: []
			};
			_.bindAll(
				this
				,'makeItems'
				,'reflectEventResult'
				,'setEvent'
			);
			//console.log('Multi initialize')
		}
		,makeItems: function() {
			var thisObj = this;
			var inputselect = $('input,select')
			for (var i=0,len=inputselect.length; i<len; i++) {
				var thisinputselect = inputselect.eq(i)
				thisObj._instances['ItemManager'][i] = new MYNAMESPACE.view.ItemManager(thisObj._instances['DataManager'], thisinputselect , i);
			}
//重くなるため、必要であれば+++++++++++++++++++++++
			// $(thisObj._instances['ItemManager']).on('onCompleteMakeItem', function(event, i) {
			// 	//console.log('inputselectクラス_'+ i +'  作成完了');
			// })
			// for (var i=0,len=inputselect.length; i<len; i++) {
			// 	thisObj._instances['ItemManager'][i].AddClassItem()
			// 	thisObj._instances['ItemManager'][i].setEvent()
			// }
//++++++++++++++++++++++++++++++++++++++++++++++
		}
		,reflectEventResult: function() {//V_Resultに応じてページ表示。
			var thisObj = this;
			$(thisObj._instances['DataManager']).on('onReceiveFormEvent', function(event,EventObj,V_Result,AddMessage,checktype){
				var ChangeClassObj = EventObj;
				var AddMessageObj = EventObj;
// console.log(EventObj.attr('name')+'  '+V_Result+'   '+AddMessage)				
				// var AddMessageObj = EventObj.next('label');
// 				if(EventObj.attr('type') == 'radio'){
// /*>>>>>>>>> Check Point*/ラジオ
// 					ChangeClassObj = EventObj.closest('.xxxxxxxxxxxx')
// 					AddMessageObj = EventObj.closest('.xxxxxxxxxxxx')
// 				}
				// ChangeClassObj.removeClass('blank error ok').addClass(V_Result)
				ChangeClassObj.removeClass('blank')
				ChangeClassObj.removeClass('ok')
				ChangeClassObj.removeClass('error')
				ChangeClassObj.addClass(V_Result)
				$('span.errorMS,span.blankMS,span.okMS').filter('[nt_MS_index="'+ChangeClassObj.attr('nt_base_index')+'"]').remove()
// console.log(checktype)
				if(checktype === 'MS_OFF'){
					return;
				}
				// $('span.'+V_Result+'MS[nt_MS_index="'+ChangeClassObj.attr('nt_base_index')+'"]').remove()
				// if($('span.'+V_Result+'MS[nt_MS_index="'+ChangeClassObj.attr('nt_base_index')+'"]').length === 0){
//表示させる場所だけ考える。


//ちがう。指定しないと。どのddの何番目ですと。					AddMessageObj.next().append($('<span>').addClass(V_Result+'MS').attr('nt_MS_index', AddMessageObj.attr('nt_base_index')).append(AddMessage).hide())

// alert(AddMessageObj.attr('nt_dd_num'))
						// $('div[nt_dd_num="'+AddMessageObj.attr('nt_dd_num')+'"]').append($('<span>'))

				if(AddMessage != ''){
					$('div[nt_dd_num="'+AddMessageObj.attr('nt_dd_num')+'"]').append($('<span>').addClass(V_Result+'MS').attr('nt_MS_index', AddMessageObj.attr('nt_base_index')).append(AddMessage).hide())
				}

						// AddMessageObj.after($('<span>').addClass(V_Result+'MS').attr('nt_MS_index', AddMessageObj.attr('nt_base_index')).append(AddMessage).hide())
														// var HissuObjId = ChangeClassObj.attr('id')
														// if((ChangeClassObj.hasClass('NT_firstNameKatakana') === true) || (ChangeClassObj.hasClass('NT_firstNameKatakana') === true)){
														// 	HissuObjId = 'vcname_kana1_id'
														// } else if((ChangeClassObj.attr('name') == 'col_16[]') || (ChangeClassObj.attr('name') == 'col_17')) {
														// 	HissuObjId = 'birth_year_id'
														// } else if(ChangeClassObj.attr('id') == '') {
														// } else if(ChangeClassObj.attr('id') == '') {
														// }
														// $('label[for="'+HissuObjId+'"]').after($('<span>').addClass(V_Result+'MS').attr('nt_MS_index', AddMessageObj.attr('nt_base_index')).append(AddMessage).hide())
				// }
				$('span.'+V_Result+'MS').filter('[nt_MS_index="'+ChangeClassObj.attr('nt_base_index')+'"]').fadeIn('slow')

//有楽―――――――――――――――――――――――――
				// var HissuObjId = ChangeClassObj.attr('id')
				// if((ChangeClassObj.hasClass('NT_firstNameKatakana') === true) || (ChangeClassObj.hasClass('NT_firstNameKatakana') === true)){
				// 	HissuObjId = 'vcname_kana1_id'
				// } else if((ChangeClassObj.attr('name') == 'col_16[]') || (ChangeClassObj.attr('name') == 'col_17')) {
				// 	HissuObjId = 'birth_year_id'
				// } else if(ChangeClassObj.attr('id') == '') {
				// } else if(ChangeClassObj.attr('id') == '') {
				// }
				// $('label[for="'+HissuObjId+'"]').find('span.redtext').addClass('NT_appeal').fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500,function(){$(this).removeClass('NT_appeal')})
//―――――――――――――――――――――――――
			})
		}
		,setEventExtraItem: function() {//sendまで
			var thisObj = this;
			thisObj._originalMultiObj	 = $('#privacy,#wellith,#privacy2')
			thisObj._dummyInputselect	 = thisObj._originalMultiObj.closest('div.ui-checkbox').find('label')
			thisObj._dummyInputselect.on('click', function(event) {
				thisObj._EventName = 'Click'
				thisObj._index = 'dummy_checkbox'
				var originalObj = $(this).closest('div.ui-checkbox').find('input')//クリックされたとみなすobj
				thisObj.sendUserActionExtraItem(originalObj)
			})
		}
		,sendUserActionExtraItem: function(originalObj) {//sendまで
			var thisObj = this;
			thisObj._instances['DataManager'].sendUserAction(originalObj, thisObj._index, thisObj._EventName);
		}
		,setEvent: function() {
			var thisObj = this;
			thisObj.reflectEventResult()
			thisObj.makeItems()
			thisObj.setEventExtraItem()
		}
	}
});
