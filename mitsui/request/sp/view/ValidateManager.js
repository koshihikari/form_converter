//有楽仕様あり

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.ValidateManager');
	MYNAMESPACE.view.ValidateManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.ValidateManager.prototype = {
		 _instances				: {}
		// ,_EventObj				: {}

		,initialize: function(DataManagerInstance) {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'setCheckInitial'
				,'setOneObj'
				,'checkOneObj'
				,'receiveEvent'
				,'checkText'
				,'checkSelect'
				,'checkRadio'
				,'checkCheckbox'
				,'checkCheckboxForYURAKU'
				,'addClassNoMSToDd'
				,'setEvent'
			);
			this._instances = {
				'DataManager'			: DataManagerInstance
			}
		}
		,setCheckInitial: function() {//validatemanagerの準備を伝達し、イニシャルチェック
			var thisObj = this;
			$(thisObj._instances['DataManager']).on('onCheckInitialValidate', function(event,EventObj,index){
				var checktype = 'MS_OFF'//エラーメッセージの有無	
				thisObj.checkOneObj(EventObj,checktype,index)
			})
			thisObj._instances['DataManager'].setInitialValidate();
		}
		,setOneObj: function() {//validatemanagerの準備を伝達し、イニシャルチェック
			var thisObj = this;
			$(thisObj._instances['DataManager']).on('onCheckOneValidate', function(event,EventObj,checktype){
				thisObj.checkOneObj(EventObj,checktype)
			})
		}
		,checkOneObj: function(EventObj,checktype,index) {
			var thisObj = this;
			if(EventObj.attr('type') == 'checkbox') {
				// thisObj.checkCheckbox(EventObj,checktype)
				return;
			} else if (EventObj.attr('type') == 'radio'){
				thisObj.checkRadio(EventObj,checktype)
				return;
			} else if (EventObj[0].nodeName == 'INPUT'){
				thisObj.checkText(EventObj,checktype)
				thisObj.addClassNoMSToDd(EventObj)	// errorMS用ddについて、初期状態で縦幅を削るためのアクション。
				return;
			} else if (EventObj[0].nodeName == 'SELECT'){
				thisObj.checkSelect(EventObj,checktype)
				return;
			}
		}
		,receiveEvent : function() {
			var thisObj = this;
			$(thisObj._instances['DataManager']).on('onUserClickAction onUserBlurAction onUserChangeAction', function(event,EventObj,index){
				var checktype = 'MS_ON'//エラーメッセージの有無	
													//console.log(event.type)
				if(event.type == 'onUserClickAction'){
														//console.log('<<click>>_NAME='+EventObj.attr('name')+',ID='+EventObj.attr('id')+',INDEX='+thisObj._index)
					if(EventObj.attr('type') == 'checkbox') {
						// thisObj.checkCheckbox(EventObj,checktype)
						return;
					} else if (EventObj.attr('type') == 'radio'){
						thisObj.checkRadio(EventObj,checktype)
						return;
					}
				}
				if(event.type == 'onUserBlurAction'){
													//console.log('<<blur>>_NAME='+EventObj.attr('name')+',ID='+EventObj.attr('id')+',INDEX='+thisObj._index)
					if (EventObj[0].nodeName == 'INPUT'){
						thisObj.checkText(EventObj,checktype)
						thisObj.addClassNoMSToDd(EventObj)
						return;
					}
				}
				if(event.type == 'onUserChangeAction'){
													//console.log('<<change>>_NAME='+EventObj.attr('name')+',ID='+EventObj.attr('id')+',INDEX='+thisObj._index)
					if (EventObj[0].nodeName == 'SELECT'){
						thisObj.checkSelect(EventObj,checktype)
						return;
					}
				}
			})



				// if(EventObj.hasClass('ちぇっくぼっくす') === true) {
				// 									//console.log('NT_V_req_SP')
				// 	thisObj.xxxxxxxxxxxx('B')
				// 	return;
				// }
				// if(EventObj.hasClass('NT_V_req_SP') === true) {
				// 									//console.log('NT_V_req_SP')
				// 	thisObj.validateNT_V_req_SP('B')
				// }
				// if(EventObj.hasClass('NT_V_mail_SP') === true) {
				// 									//console.log('NT_V_mail_SP')
				// 	thisObj.validateNT_V_mail_SP('B')
				// }
		}
		,checkText: function(EventObj,checktype) {//省略可
			var thisObj = this;

			var V_Result = 'ok'
			var AddMessage = ''
			if(EventObj.hasClass('NT_V_katakana_SP') === true){
				if(!EventObj.val().match(/^[ァ-ン]+$/)){
					V_Result = 'blank'
					AddMessage = '  全角カタカナで入力してください'
				}
			}
			if(EventObj.hasClass('NT_V_chk7num_SP') === true){
				if(!EventObj.val().match(/(^\d{7}$)|^$/)){
					V_Result = 'blank'
					AddMessage = '  ７桁で入力してください'
				}
			}
			if(EventObj.hasClass('NT_V_num_SP') === true){
				if(!isNaN(EventObj.val()) == ''){
					V_Result = 'blank'
					AddMessage = '  半角数字で入力してください'
				}
			}
			if(EventObj.hasClass('NT_V_mail_SP') === true){
				// if(!EventObj.val().match(/^[a-zA-Z0-9\.\!#\$%&'\*\+\/=\?_`\{\|\}~\-^]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){ //html5基準
				if(!EventObj.val().match(/^[0-9a-zA-Z\.\-_\/]{1,50}@[0-9a-zA-Z\.\-_\/]{1,50}$/)){ //三井オリジナル
				// if(!EventObj.val().match(/^[a-zA-Z0-9\.\!#\$%&'\*\+\/=\?_`\{\|\}\-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){ //html5基準-^~
/*>>>>>>>>> Check Point*///エラーもブランク扱い。
					V_Result = 'blank'
					AddMessage = '  メールアドレスの形式ではありません'
				}
			}
			if(EventObj.hasClass('NT_V_zenkaku_SP') === true){
				if(!EventObj.val().match(/^(?:[^a-zA-Z0-9@\<\>\;\:\[\]\{\}\|\^\=\/\!\*\"\#\$\+\%\&\'\(\)\,\.\-\_\?\\\s]+)*$/)){
					V_Result = 'blank'
					AddMessage = '  全角文字で入力してください'
				}
			}
			if(EventObj.hasClass('NT_V_depend_SP') === true){
				var cRegP = "[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼]";
				if (EventObj.val().match(cRegP)) {
					V_Result = 'blank'
					AddMessage = '  規定文字以外が入力されています。'
				}
			}
			if(EventObj.hasClass('NT_V_req_SP') === true){
				if(EventObj.val() == ''){
					V_Result = 'blank'
					AddMessage = '  必須入力項目です'
				}
			}
			thisObj._instances['DataManager'].sendValidateResult(EventObj,V_Result,AddMessage,checktype);
//三井仕様ここから
			if(EventObj.hasClass('NT_V_correctDate_SP') === true){
				thisObj._instances['DataManager'].sendCorrectDate(null,null,null,checktype);
			}
//三井仕様ここまで
		}
/*>>>>>>>>> Check Point*///blank付与はmultiに任せる
		,checkSelect: function(EventObj,checktype) {
			var thisObj = this;
										//console.log('select')
			var value = 1;
			if(EventObj.hasClass('NT_V_req_select_SP') === true){
				value = '';
			} else if(EventObj.hasClass('NT_V_req_select_SP_0') === true){
				value = 0;
			} else if(EventObj.hasClass('NT_V_req_select_SP_00') === true){
				value = 00;
			}

			if(value != 1){
				var blankObj = null;
				if(!$('.NT_V_SelectboxTd')){
					blankObj = EventObj
				} else {
					blankObj = EventObj.closest('.NT_V_SelectboxTd')
				}
				if(EventObj.children(':selected').val() == value){
					blankObj.addClass('blank')
				} else {
					blankObj.removeClass('blank')
				}
			}

//三井仕様ここから
			if(EventObj.hasClass('NT_V_correctDate_SP') === true){
				thisObj._instances['DataManager'].sendCorrectDate(null,null,null,checktype);
			}
//三井仕様ここまで


			//insertdiv処理
			$(thisObj).trigger('onChangeBlankLength');
		}
		,checkRadio: function(EventObj,checktype) {
			var thisObj = this;
			// 											//console.log('radio')
				// if(!thisClosestTd.find('.NT_V_RadioInput').filter(':checked').val()){
			
				var thisClosestTd = EventObj.closest('.NT_V_RadioTd')
				if(thisClosestTd.find('.NT_V_RadioInput').filter(':checked').val() === undefined){
					thisClosestTd.addClass('blank');
				} else { 
					thisClosestTd.removeClass('blank');
				}
				$(thisObj).trigger('onChangeBlankLength');
			// $('.NT_V_RadioInput').click(function(){
			// 	//判定
			// 	var thisClosestTd = $(this).closest('.NT_V_RadioTd')
			// 	if(!thisClosestTd.find('.NT_V_RadioInput').filter(':checked').val()){
			// 	// if(thisClosestTd.find('.NT_V_RadioInput').filter(':checked').val() !== undefined){
			// 		thisClosestTd.removeClass('blank');
				// 	}
			// 	//insertdiv処理
				// $(thisObj).trigger('onChangeBlankLength');
			// })
		}
/*>>>>>>>>> Check Point*///blank付与はmultiに任せる
		,checkCheckbox: function(EventObj,checktype) {
			var thisObj = this;
			var thisClosestTd = EventObj.closest('.NT_V_CheckboxTd')
//blankとinputの位置関係によって変化させる場合。
			// var thisClosestTd = null;
			// var tempclosesttd = EventObj.closest('.NT_V_CheckboxTd')
			// var tempnexttd = EventObj.next('.NT_V_CheckboxTd')
			// var isCorrectClosest = true
			// if(tempclosesttd.length !== 0){
			// 	thisClosestTd = tempclosesttd
			// } else if(tempnexttd.length !== 0){
			// 	isCorrect = 'next'
			// 	thisClosestTd = tempnexttd
			// } else {//for developper
			// 	alert('対象の".NT_V_CheckboxTdがありません"')
			// }
														//console.log('checkbox')
//有楽仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			if((EventObj.attr('name') === 'wellith') || (EventObj.attr('name') === 'agree_privacy')){
				thisObj.checkCheckboxForYURAKU()
			} else {
//有楽仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
				if(thisClosestTd.find('.NT_V_CheckboxInput').filter(':checked').val() === undefined){
					thisClosestTd.addClass('blank');
				} else {
					thisClosestTd.removeClass('blank');
				}
//有楽仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			}
//有楽仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

			//insertdiv処理
			$(thisObj).trigger('onChangeBlankLength');

		}
		,checkCheckboxForYURAKU: function() {
			var wellith = $('input[name="wellith"]')
			var agreeprivacy = $('input[name="agree_privacy"]')
			if(wellith.filter(':checked').val() !== undefined){//wにチェックあり
				if(agreeprivacy.filter(':checked').val() === undefined){
					agreeprivacy.closest('.NT_V_CheckboxTd').addClass('blank');
				} else {
					agreeprivacy.closest('.NT_V_CheckboxTd').removeClass('blank');
				}
			} else {
				agreeprivacy.closest('.NT_V_CheckboxTd').removeClass('blank');
			}
		}
		,addClassNoMSToDd: function(EventObj) {
			var thisObj = this;
			var thisDivClosestDd = $('div[nt_dd_num="'+EventObj.attr('nt_dd_num')+'"]').closest('dd')
			if(thisDivClosestDd.find('span').length === 0){
				thisDivClosestDd.addClass('NT_NoMS')
			} else {
				thisDivClosestDd.removeClass('NT_NoMS')
			}
		}
		,setEvent: function() {
			var thisObj = this;
			thisObj.receiveEvent()
			thisObj.setOneObj()
			thisObj.setCheckInitial()
		}
	}
});