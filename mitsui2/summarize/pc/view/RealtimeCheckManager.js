//有楽仕様あり

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.RealtimeCheckManager');
	MYNAMESPACE.view.RealtimeCheckManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.RealtimeCheckManager.prototype = {
		_instances			: {}
		,_classNum			: -1
		,_currentIndex		: -1
		,_inputApart		: $('#keikaku_apartment')
		,_inputKodate		: $('#keikaku_kodate')
		,_DivLumpMix		: $('#innerWrap>div.boxType2>div.boxInner>table.con_table_outline:last td div.lumpMix')
		,_isMust			: []

		,initialize: function(ExValidationObj,isMust) {//初期設定的な
			var thisObj = this;
			this._instances = {//
			}
			this._ExValidationObj = ExValidationObj
			this._isMust = isMust
			_.bindAll(
				this
				,'realtimeCheck'
				,'setExValidation'
				,'setBlurAction'
				,'setRadioAction'
				,'setCheckboxAction'
				,'checkKeikaku'
				,'firstValidate'
			);
		}
		,realtimeCheck: function() {
			var thisObj = this;
			thisObj.setExValidation();
			thisObj.setBlurAction();
			thisObj.setRadioAction();
			thisObj.setCheckboxAction();
			thisObj.firstValidate();
		}
		,setExValidation: function() {
			var thisObj = this;
/*check!!!!*/	var validation = $j("form")
				.exValidation({
					firstValidate: true
					,rules: thisObj._ExValidationObj//convert.jsで定義
					,stepValidation: true
					,errFocus:true
					,errMsgPrefix:''
					// ,errHoverHide:true
					,scrollToErr:false
					// ,customSubmit: function() {}
					// ,errInsertPos: 'after'
					 //	,errPosition: 'fixed'
			})
		}
		,setBlurAction: function() {
			var thisObj = this;

			$('input.ValidationTextInputAndSelect,select.ValidationTextInputAndSelect').blur(function(){
//三井　存在しない日付チェックのため　ここから+++++++++++++++++++++++
				if(($(this).attr('id') == 'userbirthmonth')||($(this).attr('id') == 'userbirthyear')){
					if($('#userbirthday').val() != ''){
						$j('#userbirthday').blur()
					}
				}
//三井　存在しない日付チェックのため　ここまで+++++++++++++++++++++++
				if($(this).closest('#apartItems').length > 0){
						thisObj.checkKeikaku(thisObj._inputApart);
				} else if($(this).closest('#kodateItems').length > 0){
						thisObj.checkKeikaku(thisObj._inputKodate);
				}
				$(thisObj).trigger('onChangeBlankLength');
			})
		}
		,setRadioAction: function() {
			var thisObj = this;
			$('input.ValidationRadioInput').click(function(){
				//判定
				var thisClosestTd = $(this).closest('.ValidationRadioTd')
				if(thisClosestTd.find('input.ValidationRadioInput').filter(':checked').val() !== undefined){
// //有楽仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 					if(thisClosestTd.find('.ValidationRadioInput').filter(':checked').val() !== '同意しない'){
// //有楽仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
						thisClosestTd.removeClass('blank');
// //有楽仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 					} else {
// 						thisClosestTd.addClass('blank');
// 					}
// //有楽仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
				}
				//insertdiv処理
				$(thisObj).trigger('onChangeBlankLength');
			})
		}
		,setCheckboxAction: function() {
			var thisObj = this;
			$('input.ValidationCheckboxInput').click(function(){
				var thisClosestTd = $(this).closest('.ValidationCheckboxTd')
//三井仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
				// var thisObj._DivLumpMix = $('table[summary="アンケート"] td div.lumpMix')
				// var inputApart = $('#keikaku_apartment');
				// var thisObj._inputKodate = $('#keikaku_kodate');
				if(($(this).attr('id') === 'keikaku_apartment') || ($(this).attr('id') === 'keikaku_kodate')){

						var apartCheckVal = thisObj._inputApart.filter(':checked').val();
						var kodateCheckVal = thisObj._inputKodate.filter(':checked').val();
						if(
							(apartCheckVal === undefined)
							&&(kodateCheckVal === undefined)
						){//いずれもチェックなし
							//↓
							if(thisObj._isMust[0] === true){
							//↑
							thisObj._DivLumpMix.addClass('blank');
							//↓
							} else {
								thisObj._DivLumpMix.removeClass('blank');
							}
							//↑
						} else if(
							(apartCheckVal !== undefined)
							&&(kodateCheckVal !== undefined)
						){//両方チェックあり
							thisObj._DivLumpMix.addClass('blank');
							thisObj.checkKeikaku(thisObj._inputApart);
							thisObj.checkKeikaku(thisObj._inputKodate);
						} else if(apartCheckVal !== undefined){//マンションにチェックあり
							thisObj._inputKodate.closest(thisObj._DivLumpMix).removeClass('blank');
							thisObj.checkKeikaku(thisObj._inputApart);
						} else if(kodateCheckVal !== undefined){//戸建てにチェックあり
							thisObj._inputApart.closest(thisObj._DivLumpMix).removeClass('blank');
							thisObj.checkKeikaku(thisObj._inputKodate);
						}
				} else if($(this).closest('#apartItems').length > 0){
						thisObj.checkKeikaku(thisObj._inputApart);
				} else if($(this).closest('#kodateItems').length > 0){
						thisObj.checkKeikaku(thisObj._inputKodate);
				} else {
//三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

					if(thisClosestTd.find('.ValidationCheckboxInput').filter(':checked').val() === undefined){
						thisClosestTd.addClass('blank');
					} else {
						thisClosestTd.removeClass('blank');
					}
//三井仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
				}
//三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

				//insertdiv処理
				$(thisObj).trigger('onChangeBlankLength');

			});
		}
		,checkKeikaku: function(inputObj) {
			var thisObj = this;
			var inputObjDl = inputObj.closest('div.lumpMix').find('div.lumpEnd>dl')
			var selectDl = inputObjDl.find('select');
			var isCorrect = true;
// alert('kokkara')
			for (var i=0,len=selectDl.length; i<len; i++) {
				if(selectDl.eq(i).val() == 00){
					isCorrect = false;
					// alert('false')
				} else {
					// alert('true')
				}
			}
			if(
				(isCorrect === false)
				||(inputObjDl.find('input[type="checkbox"]:checked').length == 0)
			){
				inputObj.closest('div.ValidationCheckboxTd').addClass('blank');
			} else {
				inputObj.closest('div.ValidationCheckboxTd').removeClass('blank');
				// inputObj.closest(thisObj._DivLumpMix).removeClass('blank');
			}
		}
		,firstValidate: function() {
			if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){
				// console.log('firstValidate///  usernameval= '+$('input[name="username"]').val()+'  ///usernameplace= '+$('input[name="username"]').attr('placeholder'))
				// var tempSelectors = []
				// if($('input[name="username"]').val() == $('input[name="username"]').attr('placeholder')){
				// 	console.log('username fvali')
				// 	$('input[name="username"]').attr('value','');
				// }

				var tempSelectors = ['username','userfname','usernamekana','userfnamekana','useremail1','useremail2','userzipcd1','userzipcd2','useraddressstr','usertel','userownmoney','userbirthyear','userfamilynumber']
				for (var i=0,len=tempSelectors.length; i<len; i++) {
				console.log('fvali')
					var tempSelector = $('input[name="'+tempSelectors[i]+'"]')
					if(tempSelector.val() == tempSelector.attr('placeholder')) {
					console.log('in')
						if($('html').hasClass('ie9') === true){
							tempSelector.val('')
						} else {
							tempSelector.attr('value','')
						}
					}
				}


				// if($('input[name="userfname"]').val() == $('input[name="username"]').attr('placeholder')){
				// 	console.log('username fvali')
				// 	$('input[name="username"]').attr('value','');
				// }
				// if($('input[name="userownmoney"]').val() == $('input[name="username"]').attr('placeholder')){
				// 	console.log('username fvali')
				// 	$('input[name="username"]').attr('value','');
				// }
			}
			var thisObj = this;
			$j('.ValidationTextInputAndSelect').blur()
			$('.formError').hide()
			// $j('input[name="col_4"]').focus()
			// $j('input[name="col_4"]').blur()
			// $j('input[name="col_5"]').focus()
			// $j('input[name="col_5"]').blur()
			// $('.formError').hide()

			$('.ValidationRadioTd').each(function(){
				if($(this).find('.ValidationRadioInput').filter(':checked').val() === undefined){
					$(this).addClass('blank');
				}
			})
			$('.ValidationCheckboxTd').each(function(){
				var thisFindInput = $(this).find('.ValidationCheckboxInput')
//チェックボックスが複数ある場合、eachは無駄になる
//有楽仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
				if(thisFindInput.attr('name') === 'wellith'){
				} else if(thisFindInput.attr('name') === 'agree_privacy'){
					if($('input[name="wellith"]:checked').val() !== undefined){//wにチェックあり
						if($('input[name="agree_privacy"]:checked').val() === undefined){
							$('input[name="agree_privacy"]').closest('.ValidationCheckboxTd').addClass('blank');
						} else {
							$('input[name="agree_privacy"]').closest('.ValidationCheckboxTd').removeClass('blank');
						}
					} else {
						$('input[name="agree_privacy"]').closest('.ValidationCheckboxTd').removeClass('blank');
					}
				} else {
//有楽仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
					if(thisFindInput.filter(':checked').val() === undefined){
						$(this).addClass('blank');
					} else {
						$(this).removeClass('blank');
					}
//有楽仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
				}
//有楽仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
			})

			$('#keikaku_apartment').click();
			$('#keikaku_apartment').click();
			$('#keikaku_kodate').click();
			$('#keikaku_kodate').click();
			// if($('#keikaku_apartment').is(':checked')===false){

			// } else {
			// }



//三井仕様 郵便物の送付先住所↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			var prefText = null;
			var postAddressBox = null;
			if($('#src_poststate').text() != '未選択'){
				$('#js-address1').removeClass('blank')
			} else {
				$('#js-address1').addClass('blank')
			}

//三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑





// //三井仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 				// var thisObj._DivLumpMix = $('table[summary="アンケート"] td div.lumpMix')
// 				// var inputApart = $('#keikaku_apartment');
// 				// var thisObj._inputKodate = $('#keikaku_kodate');
// 				if(($(this).attr('id') === 'keikaku_apartment') || ($(this).attr('id') === 'keikaku_kodate')){

// 						var apartCheckVal = thisObj._inputApart.filter(':checked').val();
// 						var kodateCheckVal = thisObj._inputKodate.filter(':checked').val();
// 						if(
// 							(apartCheckVal === undefined)
// 							&&(kodateCheckVal === undefined)
// 						){//いずれもチェックなし
// 							//↓
// 							if(thisObj._isMust[0] === true){
// 							//↑
// 							thisObj._DivLumpMix.addClass('blank');
// 							//↓
// 							} else {
// 								thisObj._DivLumpMix.removeClass('blank');
// 							}
// 							//↑
// 						} else if(
// 							(apartCheckVal !== undefined)
// 							&&(kodateCheckVal !== undefined)
// 						){//両方チェックあり
// 							thisObj._DivLumpMix.addClass('blank');
// 							thisObj.checkKeikaku(thisObj._inputApart);
// 							thisObj.checkKeikaku(thisObj._inputKodate);
// 						} else if(apartCheckVal !== undefined){//マンションにチェックあり
// 							thisObj._inputKodate.closest(thisObj._DivLumpMix).removeClass('blank');
// 							thisObj.checkKeikaku(thisObj._inputApart);
// 						} else if(kodateCheckVal !== undefined){//戸建てにチェックあり
// 							thisObj._inputApart.closest(thisObj._DivLumpMix).removeClass('blank');
// 							thisObj.checkKeikaku(thisObj._inputKodate);
// 						}
// 				} else if($(this).closest('#apartItems').length > 0){
// 						thisObj.checkKeikaku(thisObj._inputApart);
// 				} else if($(this).closest('#kodateItems').length > 0){
// 						thisObj.checkKeikaku(thisObj._inputKodate);
// 				} else {
// //三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// 					if(thisClosestTd.find('.ValidationCheckboxInput').filter(':checked').val() === undefined){
// 						thisClosestTd.addClass('blank');
// 					} else {
// 						thisClosestTd.removeClass('blank');
// 					}
// //三井仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 				}
// //三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑








		}
	}
});