

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.TimerSolutionManager');
	MYNAMESPACE.view.TimerSolutionManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.TimerSolutionManager.prototype = {
		_instances				: {}
		,_timer					: -1
		,_timerIE10				: -1
		,_timerAddress1			: -1
		,_timerAddress2			: -1
		,_roopTimes				: -1
		,_classNum				: -1
		,_currentIndex			: -1
		,_AutoAddressNum1Name  : null
		,_AutoAddressNum2Name  : null
		,_AutoAddressText1Name : null
		,_AutoAddressText2Name : null
		,_AutoAddressText3Name : null
		,initialize: function() {//初期設定的な
			var thisObj = this;
			this._instances = {//
			}
			_.bindAll(
				this
				,'timerSolutionAddressAndPlaceholder'
				,'setIntervalForCheck'
				,'timerSolutionAddressAndPlaceholderForIE10'
				,'timerSolutionKanaAndPlaceholder'
				,'timerSolutionPostAddress'
				,'setIntervalfunc'
				,'stopTimerSolutionPostAddress'
			);
			this._AutoAddressNum1Name  = $('#AutoAddressNum1').attr('name') 
			this._AutoAddressNum2Name  = $('#AutoAddressNum2').attr('name') 
			this._AutoAddressText1Name = $('#AutoAddressText1').attr('name')
			this._AutoAddressText2Name = $('#AutoAddressText2').attr('name')
			this._AutoAddressText3Name = $('#AutoAddressText3').attr('name')
		}
		,timerSolutionAddressAndPlaceholder: function() {//住所自動入力に伴うremoveClass(blank)とforIE文字黒
			var thisObj = this;
			var thisInput = $('#AutoAddressText1,#AutoAddressText2,#AutoAddressText3')
			thisInput.on('blur', function(event) {
				if (thisObj._timer) {
					clearInterval(thisObj._timer);//blurしたら消す（２重防止）
				}
			})

			$('form').on('focus', '#AutoAddressText1,#AutoAddressText2,#AutoAddressText3', function(event) {
				if (thisObj._timer) {
					clearInterval(thisObj._timer);//タイマー回ってたら消す（２重防止）
				}
				thisObj.setIntervalForCheck()
			})
			$('form').on('click', '#B1', function(event) {
				if (thisObj._timer) {
					clearInterval(thisObj._timer);//タイマー回ってたら消す（２重防止）
				}
				thisObj.setIntervalForCheck()
			})
		}
		,setIntervalForCheck: function() {//カナ自動入力に伴うremoveClass(blank)とforIE文字黒、PS消去
			var thisObj = this;
			var AutoAddressText1 = $('#AutoAddressText1')
			var AutoAddressText2 = $('#AutoAddressText2')
			var AutoAddressText3 = $('#AutoAddressText3')
			thisObj._timer = setInterval(function(){
				if ((AutoAddressText1.val() !== '') && (AutoAddressText1.val() !== AutoAddressText1.attr('placeholder'))){//value空じゃなかったら
					AutoAddressText1.removeClass('blank');
					if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){
						AutoAddressText1.css('color','black');
					}
					if ((AutoAddressText2.length === 0) && (AutoAddressText3.length === 0)){
						if (thisObj._timer) {
							clearInterval(thisObj._timer);//blurしたら消す（２重防止）
							// console.log('1 end')
						}
					}
					$(thisObj).trigger('onChangeBlankLength');
							// console.log(1)
				}
				if ((AutoAddressText2.length !== 0) && (AutoAddressText2.val() !== '') && (AutoAddressText2.val() !== AutoAddressText2.attr('placeholder'))){
					AutoAddressText2.removeClass('blank');
					if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){
						AutoAddressText2.css('color','black');
					}
					if (thisObj._timer) {
						clearInterval(thisObj._timer);//blurしたら消す（２重防止）
						// console.log(2)
					}
					$(thisObj).trigger('onChangeBlankLength');
				}
				if ((AutoAddressText3.length !== 0) && (AutoAddressText3.val() !== '') && (AutoAddressText3.val() !== AutoAddressText3.attr('placeholder'))){
					AutoAddressText3.removeClass('blank');
					if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){
						AutoAddressText3.css('color','black');
					}
					if (thisObj._timer) {
						clearInterval(thisObj._timer);//blurしたら消す（２重防止）
						// console.log(3)
					}
					$(thisObj).trigger('onChangeBlankLength');
				}
				// console.log('a')
				},100
			);//setInterval(function(x){～},100) 100は0.1秒
		}
		,timerSolutionAddressAndPlaceholderForIE10: function(N1,N2,T1,T2,T3,rimit) {//住所自動入力に伴うremoveClass(blank)とforIE文字黒
			var thisObj = this;
// 			var AutoAddressNum1  = $('#AutoAddressNum1')
// 			var AutoAddressNum2  = $('#AutoAddressNum2')
// 			var AutoAddressText1 = $('#AutoAddressText1')
// 			var AutoAddressText2 = $('#AutoAddressText2')
// 			var AutoAddressText3 = $('#AutoAddressText3')
// // 
// // alert('here is timerSolutionAddressAndPlaceholderForIE10'+','+N1+','+N2+','+T1+','+T2+','+T3)
// 				// if (thisObj._timerIE10) {
// 				// 	clearInterval(thisObj._timerIE10);//タイマー回ってたら消す（２重防止）
// 				// }
// 				// thisInput.on('blur', function(event) {
// 				// // thisInput.on('blur', function(event) {
// 				// 	if (thisObj._timerIE10) {
// 				// 		clearInterval(thisObj._timerIE10);//blurしたら消す（２重防止）
// 				// 	}
// 				// })
// 				thisObj._timerIE10 = setInterval(
// 					function() {//name変換
// 						if((thisObj._roopTimes-0) === rimit-0){
// 							// alert('stop')
// 							clearInterval(thisObj._timerIE10);
// 						}
// 						if($('#AutoAddressNum1').attr('name')  != N1){
// 							// alert('NG1'); 
// 							$('#AutoAddressNum1') .attr('name', N1)
// 						} else {
// 							// alert('ok1')
// 						}
// 						if($('#AutoAddressNum2').attr('name')  != N2){
// 							// alert('NG2'); 
// 							$('#AutoAddressNum2') .attr('name', N2)
// 						} else {
// 							// alert('ok2')
// 						}
// 						if($('#AutoAddressText1').attr('name') != T1){
// 							// alert('NG3'); 
// 							$('#AutoAddressText1').attr('name', T1)
// 						} else {
// 							// alert('ok3')
// 						}
// 						if($('#AutoAddressText2').attr('name') != T2){
// 							// alert('NG4'); 
// 							$('#AutoAddressText2').attr('name', T2)
// 						} else {
// 							// alert('ok4')
// 						}
// 						if($('#AutoAddressText3').attr('name') != T3){
// 							// alert('NG5'); 
// 							$('#AutoAddressText3').attr('name', T3)
// 						} else {
// 							// alert('ok5')
// 						}
// 						if ((AutoAddressText1.val() !== '') && (AutoAddressText1.val() !== AutoAddressText1.attr('placeholder'))){//value空じゃなかったら
// 							AutoAddressText1.removeClass('blank');
// 							// if ((AutoAddressText2.length === 0) && (AutoAddressText3.length === 0)){
// 							// 	// if (thisObj._timerIE10) {
// 							// 	// 	clearInterval(thisObj._timerIE10);//blurしたら消す（２重防止）
// 							// 	// 	// console.log('1 end')
// 							// 	// }
// 							// }
// 							$(thisObj).trigger('onChangeBlankLength');
// 									// console.log(1)
// 						}
// 						if ((AutoAddressText2.length !== 0) && (AutoAddressText2.val() !== '') && (AutoAddressText2.val() !== AutoAddressText2.attr('placeholder'))){
// 							AutoAddressText2.removeClass('blank');
// 							// if (thisObj._timerIE10) {
// 							// 	clearInterval(thisObj._timerIE10);//blurしたら消す（２重防止）
// 							// 	// console.log(2)
// 							// }
// 							$(thisObj).trigger('onChangeBlankLength');
// 						}
// 						if ((AutoAddressText3.length !== 0) && (AutoAddressText3.val() !== '') && (AutoAddressText3.val() !== AutoAddressText3.attr('placeholder'))){
// 							AutoAddressText3.removeClass('blank');
// 							// if (thisObj._timerIE10) {
// 							// 	clearInterval(thisObj._timerIE10);//（２重防止）
// 							// 	// console.log(3)
// 							// }
// 							$(thisObj).trigger('onChangeBlankLength');
// 						}
// 						// console.log('a')
// 						thisObj._roopTimes = (thisObj._roopTimes-0+1)
// 					},
// 					100//setInterval(function(x){～},100) 100は0.1秒
// 					// 100//setInterval(function(x){～},100) 100は0.1秒
// 				);
// 			// })
		}
		,timerSolutionKanaAndPlaceholder: function() {//カナ自動入力に伴うremoveClass(blank)とforIE文字黒、PS消去
			$('form').on('blur', 'input.firstName', function() {
				$j('input.firstNameKatakana,input.firstNameHiragana').blur();
				 $('input.firstNameKatakana,input.firstNameHiragana').blur();
				$('#err_'+$('input.firstNameKatakana').attr('id')).hide()
				$('#err_'+$('input.firstNameHiragana').attr('id')).hide()

			})
			$('form').on('blur', 'input.lastName', function() {
				$j('input.lastNameKatakana,input.lastNameHiragana').blur();
				 $('input.lastNameKatakana,input.lastNameHiragana').blur();
				$('#err_'+$('input.lastNameKatakana').attr('id')).hide()
				$('#err_'+$('input.lastNameHiragana').attr('id')).hide()
			})

			if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){
				//placeholderの色が残ってしまった時に黒にする。
				$('form').on('keyup blur', 'input.firstName', function() {
					if (($('input.firstNameKatakana').length !== 0) && ($('input.firstNameKatakana').val() !== '') && ($('input.firstNameKatakana').val() !== $('input.firstNameKatakana').attr('placeholder'))){//value空じゃなかったら
						$('input.firstNameKatakana').css('color','black');
					}
					if (($('input.firstNameHiragana').length !== 0) && ($('input.firstNameHiragana').val() !== '') && ($('input.firstNameHiragana').val() !== $('input.firstNameHiragana').attr('placeholder'))){//value空じゃなかったら
						$('input.firstNameHiragana').css('color','black');
					}
				})
				$('form').on('keyup blur', 'input.lastName', function() {
					if (($('input.lastNameKatakana').length !== 0) && ($('input.lastNameKatakana').val() !== '') && ($('input.lastNameKatakana').val() !== $('input.lastNameKatakana').attr('placeholder'))){//value空じゃなかったら
						$('input.lastNameKatakana').css('color','black');
					}
					if (($('input.lastNameHiragana').length !== 0) && ($('input.lastNameHiragana').val() !== '') && ($('input.lastNameHiragana').val() !== $('input.lastNameHiragana').attr('placeholder'))){//value空じゃなかったら
						$('input.lastNameHiragana').css('color','black');
					}
				})
				//漢字のみ入力があり、かつ漢字へ追加入力した際や、フォーカスしてすぐに入力した際でも、placeholderが残らないようにする施策。
				$('form').on('focus', 'input.lastName', function() {
					if($('input.lastNameKatakana').val() === $('input.lastNameKatakana').attr('placeholder')){
						$('input.lastNameKatakana').val('')
					}
					if($('input.lastNameHiragana').val() === $('input.lastNameHiragana').attr('placeholder')){
						$('input.lastNameHiragana').val('')
					}
				})
				$('form').on('focus', 'input.firstName', function() {
					if($('input.firstNameKatakana').val() === $('input.firstNameKatakana').attr('placeholder')){
						$('input.firstNameKatakana').val('')
					}
					if($('input.firstNameHiragana').val() === $('input.firstNameHiragana').attr('placeholder')){
						$('input.firstNameHiragana').val('')
					}
				})
			}
		}
		,timerSolutionPostAddress: function() {
			var thisObj = this;
			var tempTimerAddress = '';
			$('#js-post1>span.inlineB>a,#js-address2>div>span.inlineB>a').click(function(){
				var clickObjClass = $(this).attr('class')

				window.onfocus = function(){
					var prefText = null;
					var postAddressBox = null;
					if(clickObjClass == 'postAddressLink1'){
						prefText = $('#src_poststate')
						postAddressBox = $('#js-address1')
						$j('#userzipcd1,#userzipcd2').blur()
						$('#err_userzipcd1,#err_userzipcd2').hide()
						if($('#userzipcd1').attr('placeholder') != $('#userzipcd1').val()){
							$('#userzipcd1').css('color','black')
						}
						if($('#userzipcd2').attr('placeholder') != $('#userzipcd2').val()){
							$('#userzipcd2').css('color','black')
						}

					} else if(clickObjClass == 'postAddressLink2'){
						prefText = $('#src_sendstate')
						postAddressBox = $('#js-address2>div:eq(1)')
						$j('#sendzipcd1,#sendzipcd2').blur()
						$('#err_sendzipcd1,#err_sendzipcd2').hide()
						if($('#sendzipcd1').attr('placeholder') != $('#sendzipcd1').val()){
							$('#sendzipcd1').css('color','black')
						}
						if($('#sendzipcd2').attr('placeholder') != $('#sendzipcd2').val()){
							$('#sendzipcd2').css('color','black')
						}
					}
					if(prefText.text() != '未選択'){
						postAddressBox.removeClass('blank')
					} else {
						postAddressBox.addClass('blank')
					}
					$(thisObj).trigger('onChangeBlankLength');
					// $('#sendzipcd1,#sendzipcd2').blur()
					// $(thisObj).trigger('onCallStopTimerSolPA',[clickObjClass]);
				}



				// if (0 < thisObj._timerAddress){
				// 	clearInterval(thisObj._timerAddress);//２重防止
				// }
				// tempTimerAddress = setInterval(function(){thisObj.setIntervalfunc(thisObj,clickObjClass)}, 300)
				// if(clickObjClass == 'postAddressLink1'){
				// 	thisObj._timerAddress1 = tempTimerAddress;
				// } else if(clickObjClass == 'postAddressLink2'){
				// 	thisObj._timerAddress2 = tempTimerAddress;
				// }
			})
		}
		,setIntervalfunc: function(scope,clickObjClass) {
			var thisObj = scope;
			// var countPostAddress = 1;
			$(thisObj).trigger('onClickPostAddressButton',[clickObjClass]);
			$(thisObj).trigger('onChangeBlankLength');
				// countPostAddress = countPostAddress+1
		}
		,stopTimerSolutionPostAddress: function(stopClass) {
			var thisObj = this;
			if(stopClass == 'postAddressLink1'){
console.log('post1stop')
				clearInterval(thisObj._timerAddress1);//２重防止
			} else if(stopClass == 'postAddressLink2'){
console.log('post2stop')
				clearInterval(thisObj._timerAddress2);//２重防止
			}
		}
	}
});