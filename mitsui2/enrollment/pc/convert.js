
var timeNow = new Date();
console.log('TimeStamp ／ '+timeNow.getHours()+':'+timeNow.getMinutes())

//目次
//ブラウザ判定、body,formのid,class付与
//ConfigManagerからid取得
//ID付与（IDがない場合）(nameが被った場合、単にiを付与する方が処理が軽い)
//事前コンバート
//ConfigManagerからclass取得
//ConfigManagerからvalidation取得
//new
//action

// window.onunload = function(){}
// if(window.name != "xyz"){
// 	location.reload();
// 	window.name = "xyz";
// }
jQuery.noConflict();
// jQuery('html').hide();
jQuery(document).ready(function($){

	// jQuery('html').show();
//ブラウザ判定、body,formのid,class付与―――――――――――――――――――――――――――――――――――
	var userAgent = window.navigator.userAgent.toLowerCase();
/*new*/	var appVersion = window.navigator.appVersion.toLowerCase();
	if (userAgent.indexOf("msie") != -1) {
		if (appVersion.indexOf("msie 10.") != -1) {
			$('html').addClass('elseBL ie10');
		} else if (appVersion.indexOf("msie 9.") != -1) {
			$('html').addClass('ie');
			// $('html').addClass('ie9');
			// $('html').addClass('ie ie9');
		} else if (appVersion.indexOf("msie 8.") != -1) {
			$('html').addClass('ie');
		// } else if (appVersion.indexOf("msie 7.") != -1) {
		// 	$('html').addClass('ie');
		} else if (appVersion.indexOf("msie 11.") != -1) {
			$('html').addClass('elseBL ie10');
		} else {
			return false;
		}
	} else {
		$('html').addClass('elseBL');
	}


	$('body').addClass('pc');
	if($('body').attr('id') === undefined){//css point用
		$('body').attr('id','bodyID')
	}
	if($('form').attr('id') === undefined){//css point用
		$('form').attr('id','formID')
	}
//―――――――――――――――――――――――――――――――――――

//ConfigManagerからid取得―――――――――――――――――――――――――――――――――――
	// var ConfigManager	 	= new MYNAMESPACE.model.ConfigManagerDouble();
	if($('#formID p.boxTitle img[alt="「ファインコート倶楽部」ご希望条件"]').length > 0){
console.log('finecoourt')
		var ConfigManager	 	= new MYNAMESPACE.model.ConfigFineManager();
	} else {
console.log('not finecourt')
		var ConfigManager	 	= new MYNAMESPACE.model.ConfigManager();
	}

	// if($('#formID>input[name="urlid"]').val() == 100001){
	// 	var ConfigManager	 	= new MYNAMESPACE.model.ConfigManager();
	// } else if($('#formID>input[name="urlid"]').val() == 100003){
	// 	var ConfigManager	 	= new MYNAMESPACE.model.ConfigFineManager();
	// } else {
	// 	return;
	// }
	var arrid = ConfigManager.getIdname();
	for (var i=0,len=arrid.length; i<len; i++) {
		arrid[i]['Selecter'].attr('id',arrid[i]['id']);
	}


//ID付与(nameが被った場合、単にiを付与する方が処理が軽い)
		$('input,select').not('input[type="radio"],input[name="col_34"],select[name="col_33"],select[name="col_41"],select[name="col_42"]').each(function(i) {//ok
			if($(this).attr('id') === undefined){
				if($(this).attr('name') !== undefined){//nameと同名をつける
/*有楽仕様*/			var thisname = $(this).attr('name').replace('[]','')
					var sameIDlength = $('input[id='+thisname+'],select[id='+thisname+']').length
					if(sameIDlength === 0){
						$(this).attr('id', thisname);
					} else {
						for (var j=0,len=5; j<len; j++) {
							sameIDlength = $('input[id='+thisname+'_'+(j+2)+'],select[id='+thisname+'_'+(j+2)+']').length
							if(sameIDlength === 0){
								$(this).attr('id', thisname+'_'+(j+2));
								break;
							}
						}
					}
				} else {//nameを持っていない場合、id=AddID+i
					$(this).attr('id', 'AddID'+i);
				}
			}
		})







//事前コンバート―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
	// $('#conciergewrap>div.concierge').hide();
	// $('#js-post2>div.js-hideOut').hide();
	$('#js-mansion').attr('id','jsmansion')

	var sendInput = $('table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:eq(12)>td>div:eq(0) input')

	sendInput.eq(0).attr('id','sendID_1').end().eq(1).attr('id','sendID_2')
	// sendInput.eq(0).attr('id','sendID_1')
	// sendInput.eq(1).attr('id','sendID_2')

	var selectTellsAfter = $('<div><span>ご連絡先をお選びください。</span><br></div>')
	var tempMessage = ['ご自宅','携帯電話','どちらも可']
	$('table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:eq(13)>td>p:eq(3)')
		.attr('id','selectTells')
		.find('input')
		.each(function(i){
			$(this).attr('id','selectTell_'+(i+1))
			selectTellsAfter.append($(this)).append($('<label>').attr('for','selectTell_'+(i+1)).text(tempMessage[i]))
		})
	$('#selectTells').html(selectTellsAfter)
	// $('#selectTells').append($('#selectTell_2').nextAll().contents().clone())
		// .css('background','red')

//backgroundColorを削除―――――――――――――――――――――――――――――――――――
	$('input[name="privacy"]').closest('td').attr('bgcolor','')

//Radio,Checkをlabelで囲む。―――――――――――――――――――――――――――――――――――
	$('table[summary="アンケート"] label').addClass('labelClass')

//フォーム依存――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
//submit
	$('#task').closest('td').find('a').attr('onclick','')

	// $j('#task').closest('td').click(function(){
	// 	$j('form').submit();
	// })
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

//デフォルト記入例の削除―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
	$('#AutoAddressText2').closest('td').html($('#AutoAddressText2').closest('td').find('input'))
	$('#AutoAddressText3').closest('td').html($('#AutoAddressText3').closest('td').find('input'))
	$('#col_23').closest('td').html($('#col_23').closest('td').find('input'))
	$('#col_24').closest('td').html($('#col_24').closest('td').find('input'))

//事前コンバートここまで―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
//a移動無効――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
	$('a[href=#]').click(function(e){
		e.preventDefault();
	})
//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――


//ConfigManagerからclass取得―――――――――――――――――――――――――――――――――――
	$(ConfigManager).on('onSetClassname', function(event) {
		var arr = ConfigManager.getClassname();
		for (var i=0,len=arr.length; i<len; i++) {
			arr[i]['Selecter'].addClass(arr[i]['classname']);
		}
	})
	ConfigManager.SetClassname();

//ConfigManagerからリアルタイムで取得。―――――――――――――――――――――――――
	// ConfigManager.SetClassname();
	// $(ConfigManager).on('onSetIdname', function(event) {
	// })
	// ConfigManager.SetIdname();
//―――――――――――――――――――――――――――――――――――

/*――――――――――――――――――――――――――*/
/*	AddID&Name from Class	*/
/*――――――――――――――――――――――――――*/

	// for (var i=0,len=arrname.length; i<len; i++) {
	// 	arrname[i]['Selecter'].attr('name',arrname[i]['name']);
	// }




//validation
	var ExValidationObj = ConfigManager.getValidation();



//new――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

		//initialvalidateじゃない？	// var InitialBlankManager	 	= new MYNAMESPACE.view.InitialBlankManager($j);
	var FocusEventManager	 	= new MYNAMESPACE.view.FocusEventManager();
	var AutoEmManager		 	= new MYNAMESPACE.view.AutoEmManager();
	// var AutoKanaManager		 	= new MYNAMESPACE.view.AutoKanaManager();⇒プラグインで実装
	// var TextNumberManager	 	= new MYNAMESPACE.view.TextNumberManager($j);

	var RemainingItemsManager 	= new MYNAMESPACE.view.RemainingItemsManager();
	var RealtimeCheckManager 	= new MYNAMESPACE.view.RealtimeCheckManager(ExValidationObj);
	var SubmitCheckManager 		= new MYNAMESPACE.view.SubmitCheckManager();
	var PlaceholderManager	 	= new MYNAMESPACE.view.PlaceholderManager();
		// if($('html').hasClass('ie') === true){
		// 	var PlaceholderManagerForIE	= new MYNAMESPACE.view.PlaceholderManagerForIE();
		// }
	// if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){
	// 	var AutoAddressManager	 	= new MYNAMESPACE.view.AutoAddressManagerForIE();
	// } else {
	// 	var AutoAddressManager	 	= new MYNAMESPACE.view.AutoAddressManager();
	// }
	var TimerSolutionManager	= new MYNAMESPACE.view.TimerSolutionManager();
	var MouseEventManager	 	= new MYNAMESPACE.view.MouseEventManager();
	// var LoginColorManager	 	= new MYNAMESPACE.view.LoginColorManager();

	var Mediator	 			= new MYNAMESPACE.view.Mediator(RemainingItemsManager,RealtimeCheckManager,TimerSolutionManager,SubmitCheckManager);


//ConfigManagerからSubmit時のエラーコメント取得―――――――――――――――――――――――――――――――――――
	$(ConfigManager).on('onSetSubmitComment', function(event) {
		var SubmitCommentObj = ConfigManager.getSubmitComment();
		SubmitCheckManager.getSubmitComment(SubmitCommentObj)
	})
	ConfigManager.setSubmitComment();


//action――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

	Mediator			 		.setEvent()

	// InitialBlankManager	 	.initialBlank()
	FocusEventManager	 		.focusEvent()
	AutoEmManager		 		.autoEm()
	// AutoKanaManager		 	.autoKana()⇒プラグインで実装
	// TextNumberManager	 	.textNumber()

	RealtimeCheckManager.realtimeCheck()
	PlaceholderManager	 	.placeholder()
	if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){
		PlaceholderManager	 .placeholderForIE()
	}
	SubmitCheckManager.submitCheck()
	// AutoAddressManager	 	.autoAddress()
	TimerSolutionManager	 	.timerSolutionKanaAndPlaceholder()
	TimerSolutionManager	 	.timerSolutionAddressAndPlaceholder()
//三井ここから
	TimerSolutionManager	 	.timerSolutionPostAddress()
//三井ここまで
	RemainingItemsManager 	.insertdiv()
	RemainingItemsManager 	.setEvent()
	// LoginColorManager 	.setEvent()

	MouseEventManager	 	.mouseEvent()

	if($('html').hasClass('ie') === true && $('#float').exFixed) {
		$('#float').exFixed();
	}

	function blankLoginCheck(scope) {
		if(scope.val() != ''){
			scope.removeClass('blankLogin')
		} else {
			scope.addClass('blankLogin')
		}
	}
	blankLoginCheck($('#loginid'));
	blankLoginCheck($('#loginpass'));
	$('form').on('blur' , '#loginid,#loginpass', function(event) {
		blankLoginCheck($(this));
	});
	var hopeAreaTd = $('#kibou_chiiki13').closest('td');
	var hopeSelect = $('#kibou_chiiki11,#kibou_chiiki12,#kibou_chiiki13');
	hopeCheck(event,hopeAreaTd,hopeSelect,false);
	$('#kibou_chiiki11,#kibou_chiiki12,#kibou_chiiki13').change(function(){
		// hopeCheck(event,hopeAreaTd,hopeSelect,false;
		// alert(event.type)
		// // alert(event.target)
		// if(event.target.tagName == 'SELECT'){
		// 	alert()
		// }
		hopeCheck(event,hopeAreaTd,hopeSelect,$(this));
		RemainingItemsManager.remainingItemsCheck()
	})
	hopeAreaTd.find('input[name="sel_kibou_chiiki1"]').click(function(){
		// hopeCheck(event,hopeAreaTd,hopeSelect,false;
		hopeCheck(event,hopeAreaTd,hopeSelect,$(this));
		RemainingItemsManager.remainingItemsCheck()
	})

	hopeAreaTd.find('input[type="checkbox"]:not([id="applyMembership"])').click(function(){
		// hopeCheck(event,hopeAreaTd,hopeSelect,false);
		hopeCheck(event,hopeAreaTd,hopeSelect,$(this));
		RemainingItemsManager.remainingItemsCheck()
	})
	// var hopeSelect = hopeAreaTd.find('select');
	// for (var i=0,len=hopeSelect; i<len; i++) {
	// 	hopeSelect.blur(function(){
	// 		console.log('blur')
	// 	})
	// }

//for文に書き換えたい　そして、何回回すかと主語を何にするかをfalseで判定。
	function hopeCheck(e,hopeAreaTd,hopeSelect,thisObj){
			var count = 0;
			var isCorrect = false;

			//thisObjが存在する場合
			if(thisObj !== false){
console.log('//thisObjが存在する場合')
				//selectがchangeされた時
					//checkboxはselectがchangeされたら全てチェックされ直すので、チェックされているか確認せずにblankを消す。
					//尚、displaynoneだとieは:checkedが無しとなってしまうため、この処置をしている。

				var eTarget = null;
				if(($('html').hasClass('ie') === false)&&($('html').hasClass('ie9') === false)){
					eTarget = e.target
				} else {
					eTarget = e.srcElement
				}


				if(
					(eTarget.tagName == 'SELECT')
					&&(e.type == 'change')
				){
console.log('//true//thisObjが存在する場合 //tag=SELECT type=change  /// '+thisObj.closest('div.mb05').find('select').children(':checked').val())
					var jQueryObjSelect = thisObj.closest('div.mb05').find('select');
					if(jQueryObjSelect.children(':checked').val() != ''){
						isCorrect = true;
					}

				//クリックが「上記以外のエリア」の場合
				} else if(
					(thisObj.attr('name') == 'sel_kibou_chiiki1')
					&&(thisObj.attr('value') == '26')
				){
console.log('//true//thisObjが存在する場合 //クリックが「上記以外のエリア」の場合')
					isCorrect = true;

				//クリックが「上記以外のエリア」ではない場合
				} else {
console.log('//thisObjが存在する場合 //クリックが「上記以外のエリア」ではない場合')
					var hopeDiv = thisObj.closest('div.mb05');
					hopeSelect = hopeDiv.find('select');
					var selectVal = hopeSelect.val();
					//selectで選択されているoptionがそのselect内で何番目か取得。
					var selectIndex = hopeSelect.children('option').index(hopeSelect.find('option[value="'+selectVal+'"]'))

					//セレクトがある、かつ、それに応じたチェックボックスにチェックが１つ以上あれば、trueをつける。
					//selectindexは0の時は「お選び下さい」なので-1する。
					if((selectVal != '')&&(hopeDiv.find('ul:eq('+(selectIndex-1)+') input[type="checkbox"]:checked').length >= 1)){
console.log('//true//thisObjが存在する場合 //クリックが「上記以外のエリア」ではない場合 //セレクトがある、かつ、それに応じたチェックボックスにチェックが１つ以上あれば、trueをつける。')
						isCorrect = true;
					}
				}

			//thisObjが存在しない場合
			} else {
console.log('//thisObjが存在しない場合')
				for (var i=0,len=2; i<len; i++) {
					var selectVal = hopeSelect.eq(i).val();
					var selectIndex = hopeSelect.eq(i).children('option').index(hopeSelect.eq(i).find('option[value="'+selectVal+'"]'))

					//セレクトがある、かつ、それに応じたチェックボックスにチェックが１つ以上あれば、trueをつける。
					if((selectVal !== '')&&(hopeSelect.eq(i).closest('div.mb05').find('ul:eq('+(selectIndex-1)+') input:checked').length >= 1)){
console.log('//true//thisObjが存在しない場合 //セレクトがある、かつ、それに応じたチェックボックスにチェックが１つ以上あれば、trueをつける。')
						isCorrect = true;
					}
				}
				if($('input[name="sel_kibou_chiiki1"][value="26"]:checked').length >= 1){
console.log('//true//thisObjが存在しない場合 //input[name="sel_kibou_chiiki1"][value="26"]:checked')
					isCorrect = true;
				}
			}

			if(isCorrect === false){
				hopeAreaTd.addClass('blank');
			} else {
				hopeAreaTd.removeClass('blank');
			}

	}

	$('body').css('height','auto');

// //テスト簡易化――――――――――――――――――――――――――――――――――――――――――――――――――
	// $('body').prepend('<button id="testButton" style="display:block; padding:20px;">入力</button>');
	// var testVal = [
	// 	 {key:'username 		', val	: "テスト"}
	// 	,{key:'userfname 		', val	: "テスト"}
	// 	,{key:'usernamekana 	', val	: "テスト"}
	// 	,{key:'userfnamekana	', val	: "テスト"}
	// 	,{key:'userownmoney		', val	: "2000"}
	// 	,{key:'userbirthyear	', val	: "2000"}
	// 	,{key:'userbirthmonth	', val	: "01"}
	// 	,{key:'userbirthday		', val	: "01"}
	// 	,{key:'useremail1		', val	: "test"}
	// 	,{key:'useremail1_again	', val	: "test"}
	// 	,{key:'useremail2		', val	: "gmail.com"}
	// 	,{key:'useremail2_again	', val	: "gmail.com"}
	// 	,{key:'userzipcd1		', val	: "164"}
	// 	,{key:'sendzipcd1		', val	: "164"}
	// 	,{key:'userzipcd2		', val	: "0011"}
	// 	,{key:'sendzipcd2		', val	: "0011"}
	// 	,{key:'useraddressstr	', val	: "テスト"}
	// 	,{key:'jsmansion		', val	: "テスト"}
	// 	,{key:'useroccupation	', val	: "01"}
	// 	,{key:'userhouse		', val	: "01"}
	// 	,{key:'usertel			', val	: "08012341234"}
	// 	,{key:'UserMobilelNo	', val	: "08012341234"}
	// 	,{key:'userfamilynumber	', val	: "1"}
	// 	,{key:'userid			', val	: "housing321"}
	// 	,{key:'userpass			', val	: "pass321"}
	// 	,{key:'userpass2		', val	: "pass321"}
	// 	,{key:'userfamilynumber	', val	: "1"}
	// 	,{key:'keikaku_apartment_yosan	', val	: "01"}
	// 	,{key:'keikaku_apartment_menseki', val	: "01"}
	// ]
	// var testCheck = [
	// 	 {name:'keikaku_apartment 			', selector	: 'table[summary="住まい探し「三井の住まい」ご希望条件"]>tbody>tr:eq(0)>td>div>div>label'}
	// 	,{name:'keikaku_apartment_madori1 	', selector	: 'table[summary="住まい探し「三井の住まい」ご希望条件"]>tbody>tr:eq(0)>td>div dd label'}
	// 	,{name:'kaikaeyotei 				', selector	: 'table[summary="住まい探し「三井の住まい」ご希望条件"]>tbody>tr:eq(2)>td>label'}
	// 	,{name:'sel_kibou_chiiki1 			', selector	: 'table[summary="住まい探し「三井の住まい」ご希望条件"]>tbody>tr:eq(3)>td>label'}
	// ]
	// $('#testButton').on('click',function(){
	// 	for (var i = 0; i < testVal.length; i++) {
	// 		$('#'+testVal[i]['key']).val(testVal[i]['val'])
	// 	};
	// 	for (var i = 0; i < testCheck.length; i++) {
	// 		console.log($(testCheck[i]['selector']).find('input:eq(0)').attr('name'))
	// 		$(testCheck[i]['selector']).find('input:eq(0)').attr('checked',true);
	// 	};
	// 	RealtimeCheckManager.realtimeCheck()



	// 	$('table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:eq(8)>td input[name="usersex"]').attr('checked',true);
	// 	$('table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:eq(8)>td').removeClass('blank');
	// 	$('table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:eq(13)>td input[name="contacttelflg"]').attr('checked',true);
	// 	$('table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:eq(13)>td').removeClass('blank');
	// 	$('table[summary="住まい探し「三井の住まい」ご希望条件"]>tbody>tr:eq(1)>td>div.lumpMix').removeClass('blank');
	// 	$('table[summary="住まい探し「三井の住まい」ご希望条件"]>tbody>tr:eq(2)>td').removeClass('blank');
	// 	$('table[summary="住まい探し「三井の住まい」ご希望条件"]>tbody>tr:eq(3)>td').removeClass('blank');

	// 	RemainingItemsManager 	.remainingItemsCheck()

	// });
// //テスト簡易化――――――――――――――――――――――――――――――――――――――――――――――――――

// $('#kibou_chiiki11').change(function(){
// 	console.log('change kibou_chiiki11')
// 	$(this).nextAll('ul').css('height','auto')
// })


});