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
		,_currentIndex			: -1
		,_inputApart			: $('#keikaku_apartment')
		,_inputKodate			: $('#keikaku_kodate')
		,_DivLumpMix			: $('table[summary="住まい探し「三井の住まい」ご希望条件"] td div.lumpMix')

		,initialize: function(ExValidationObj) {//初期設定的な
			var thisObj = this;
			this._instances = {//
			}
			this._ExValidationObj = ExValidationObj
			_.bindAll(
				this
				,'realtimeCheck'
				,'setExValidation'
				,'setBlurAction'
				,'setRadioAction'
				,'checkCallAddress' //三井専用
				,'setCheckboxAction'
				,'checkCheckBox'
				,'checkKeikaku'
				,'firstValidate'
				,'checkPostAddressText'
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

			$('input.ValidationTextInputAndSelect,select.ValidationTextInputAndSelect').not('.w440,.w374').blur(function(){
				// console.log('blur::'+$(this))

				var tempBlurId = $(this).attr('id')
				switch(tempBlurId) {
//三井　確認チェック　ここから+++++++++++++++++++++++
					case 'userpass':
						$j('#'+tempBlurId+'2').blur();
						$('#err_'+tempBlurId+'2').hide();
						break;
					case 'useremail1':
					case 'useremail2':
						$j('#'+tempBlurId+'_again').blur();
						$('#err_'+tempBlurId+'_again').hide();
						break;
//三井　確認チェック　ここまで+++++++++++++++++++++++
//三井　存在しない日付チェックのため　ここから+++++++++++++++++++++++
					case 'userbirthmonth':
					case 'userbirthyear':
						if($('#userbirthday').val() != ''){
							$j('#userbirthday').blur()
						}
						break;
//三井　存在しない日付チェックのため　ここまで+++++++++++++++++++++++
				}
				if(($(this).attr('name') == 'usertel')||($(this).attr('name') == 'UserMobilelNo')){
					thisObj.checkCallAddress();
				} else {
					if($(this).closest('#apartItems').length > 0){
							thisObj.checkKeikaku(thisObj._inputApart);
					} else if($(this).closest('#kodateItems').length > 0){
							thisObj.checkKeikaku(thisObj._inputKodate);
					}
				}

				$(thisObj).trigger('onChangeBlankLength');
			})
		}
		,setRadioAction: function() {
			var thisObj = this;
			//一般のラジオボタン
			$('input.ValidationRadioInput').click(function(){
						console.log('radio click')

				//判定
				var thisClosestTd = $(this).closest('.ValidationRadioTd')
				if(thisClosestTd.find('input.ValidationRadioInput').filter(':checked').val() !== undefined){
					thisClosestTd.removeClass('blank');
				}

				// if($(this).attr('id') == 'sendID_1'){
				// 	console.log('send1 click')
				// 	$('js-post2 input.blank').removeClass('blank');
				// }
				// if($(this).attr('id') == 'sendID_2'){
				// 	console.log('send2 click')
				// 	$('js-post2 input').blur();
				// }
				//insertdiv処理
				$(thisObj).trigger('onChangeBlankLength');
			})

//三井仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			//ご連絡先のラジオボタン
			$('#selectTells input').click(function(){
				thisObj.checkCallAddress();
				$(thisObj).trigger('onChangeBlankLength');
			})

			//住所のラジオボタン
			$('#sendID_1').click(function(){
				$('#js-post2 input.blank').removeClass('blank');
				$('#js-address2>div:eq(1)').removeClass('blank')
				$(thisObj).trigger('onChangeBlankLength');
			})
			$('#sendID_2').change(function(){
				$('#sendzipcd1').addClass('blank');
				$('#sendzipcd2').addClass('blank');
				$('#jsmansion').addClass('blank');
				$('#sendzipcd1,#sendzipcd2').blur()
				$('#err_sendzipcd1,#err_sendzipcd2').hide()
				$(thisObj).trigger('onClickPostAddressButton',['postAddressLink2']);
			})
//三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		}
//三井仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		,checkCallAddress: function() {
			var thisObj = this;
			if(
				(
					(
						($('#usertel').val() != '')
						&&($('#usertel').val() != $('#usertel').attr('placeholder'))
						// &&($('#usertel').val().isNumeric() === true)
					)&&(
						($('#selectTell_1').is(':checked') === true)
						// ||($('#selectTell_3').is(':checked') === true)
					)
				)
				||(
					(
						($('#UserMobilelNo').val() != '')
						&&($('#UserMobilelNo').val() != $('#UserMobilelNo').attr('placeholder'))
						// &&($('#UserMobilelNo').val().isNumeric() === true)
					)&&(
						($('#selectTell_2').is(':checked') === true)
						// ||($('#selectTell_3').is(':checked') === true)
					)
				)
				||(
					(
						($('#usertel').val() != '')
						&&($('#usertel').val() != $('#usertel').attr('placeholder'))
					)&&(
						($('#UserMobilelNo').val() != '')
						&&($('#UserMobilelNo').val() != $('#UserMobilelNo').attr('placeholder'))
					)&&(
						$('#selectTell_3').is(':checked') === true
					)
				)
			){
				$('#usertel').closest('td').removeClass('blank');
			} else {
				$('#usertel').closest('td').addClass('blank');
			}
		}
//三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		,setCheckboxAction: function() {
			var thisObj = this;
			$('input.ValidationCheckboxInput').click(function(){
				thisObj.checkCheckBox(thisObj,$(this));
			});
		}
		,checkCheckBox: function(scope,checkboxScope) {
			var thisObj = scope;
				var thisClosestTd = checkboxScope.closest('.ValidationCheckboxTd')
console.log('checkClick')
//三井仕様↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
				if((checkboxScope.attr('id') === 'keikaku_apartment') || (checkboxScope.attr('id') === 'keikaku_kodate')){
					var apartCheckVal = thisObj._inputApart.filter(':checked').val();
					var kodateCheckVal = thisObj._inputKodate.filter(':checked').val();

					if(
						(apartCheckVal === undefined)
						&&(kodateCheckVal === undefined)
					){//いずれもチェックなし
						thisObj._DivLumpMix.addClass('blank');
					} else if(
						(apartCheckVal !== undefined)
						&&(kodateCheckVal !== undefined)
					){//いずれかにチェックあり
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
				} else if(checkboxScope.closest('#apartItems').length > 0){
						thisObj.checkKeikaku(thisObj._inputApart);
				} else if(checkboxScope.closest('#kodateItems').length > 0){
						thisObj.checkKeikaku(thisObj._inputKodate);
				} else if(checkboxScope.closest('dd.FineCoatPlanTd').length > 0){
					var FineCoatPlanTd = checkboxScope.closest('dd.FineCoatPlanTd');
					if(FineCoatPlanTd.find('input[type="checkbox"]:checked').val() === undefined){
						FineCoatPlanTd.addClass('blank');
					} else {
						FineCoatPlanTd.removeClass('blank');
					}
				} else if(checkboxScope.closest('dd.FineCoatAreaTd').length > 0){
					var FineCoatAreaTd = checkboxScope.closest('dd.FineCoatAreaTd');
					if(FineCoatAreaTd.find('input[type="checkbox"]:checked').val() === undefined){
						FineCoatAreaTd.addClass('blank');
					} else {
						FineCoatAreaTd.removeClass('blank');
					}
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

		}
		,checkKeikaku: function(inputObj) {
			var thisObj = this;
			var inputObjDl = inputObj.closest('div.lumpMix').find('div.lumpEnd>dl')
			var selectDl = inputObjDl.find('select');
			var isCorrect = true;
			for (var i=0,len=selectDl.length; i<len; i++) {
				if(selectDl.eq(i).val() == 00){
					isCorrect = false;
				} else {
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
			var thisObj = this;
			$j('input.ValidationTextInputAndSelect:not([type="checkbox"],[type="radio"]),select.ValidationTextInputAndSelect').blur()
			$('.formError').hide()
			$('.ValidationRadioTd').each(function(){
				if($(this).find('.ValidationRadioInput').filter(':checked').val() === undefined){
					$(this).addClass('blank');
				}
			})
			$('.ValidationCheckboxTd').each(function(){
				var thisFindInput = $(this).find('.ValidationCheckboxInput')
				thisObj.checkCheckBox(thisObj, thisFindInput);
			})

//三井仕様 ご連絡先のバリデーション↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
				thisObj.checkCallAddress();

// 			var tempTd = $('table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:eq(13)>td');
// 			if((
// 					(tempTd.find('input:eq(0)').val() != '')
// 					||(tempTd.find('input:eq(1)').val() != '')
// 				)
// 				&&(
// 					tempTd.find('input[type="checkbox"]').filter(':checked').val() === undefined
// 				)
// 			){
// console.log('test:: addClass')
// 				tempTd.addClass('blank')
// 			} else {
// console.log('test:: removeClass')
// 				tempTd.removeClass('blank')
// 			}
//三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//三井仕様 マンション・戸建て欄の網掛けの非表示↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			if($('#keikaku_apartment').filter(':checked').val() !== undefined){
				$('#apartHide').hide();
			}
			if($('#keikaku_kodate').filter(':checked').val() !== undefined){
				$('#kodateHide').hide();
			}
//三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//三井仕様 郵便物の送付先住所↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			var prefText = null;
			var postAddressBox = null;
			if($('#src_poststate').text() != '未選択'){
				$('#js-address1').removeClass('blank')
			} else {
				$('#js-address1').addClass('blank')
			}
			if($('#src_sendstate').text() != '未選択'){
				$('#js-address2>div:eq(1)').removeClass('blank')
			} else {
				$('#js-address2>div:eq(1)').addClass('blank')
			}

			if($('#sendID_1').is(':checked') === true){
				$('#sendzipcd1,#sendzipcd2,#js-address2>div.blank,#jsmansion').removeClass('blank')
				$('#js-post2>div.js-hideOut').show()
			}
//三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

		}
//三井仕様 ご自宅住所の入力状況↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		,checkPostAddressText: function(event,clickClass) {
			var thisObj = this;
			// alert($('#src_poststate').attr('id'))
			// alert($('#src_postcity').attr('id'))
			// alert($('#src_postaddress1').attr('id'))
console.log(clickClass)

			var prefText = null;
			var postAddressBox = null;
			if(clickClass == 'postAddressLink1'){
				prefText = $('#src_poststate')
				postAddressBox = $('#js-address1')
			} else if(clickClass == 'postAddressLink2'){
				prefText = $('#src_sendstate')
				postAddressBox = $('#js-address2>div:eq(1)')
			}
			if(prefText.text() != '未選択'){
				postAddressBox.removeClass('blank')
			} else {
				postAddressBox.addClass('blank')
			}
			// window.onfocus = function(){
			// 	$j('#sendzipcd1,#sendzipcd2').blur().css('color','black')
			// 	// $('#sendzipcd1,#sendzipcd2').blur()
			// 	$('#err_sendzipcd1,#err_sendzipcd2').hide()
			// 	$(thisObj).trigger('onCallStopTimerSolPA',[clickClass]);
			// }

		}
//三井仕様↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	}
});