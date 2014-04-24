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
jQuery('html').hide();
jQuery(document).ready(function($){


console.log($().jquery);

	jQuery('html').show();
//ブラウザ判定、body,formのid,class付与―――――――――――――――――――――――――――――――――――
	var userAgent = window.navigator.userAgent.toLowerCase();
/*new*/	var appVersion = window.navigator.appVersion.toLowerCase();
	if (userAgent.indexOf("msie") != -1) {
		if (appVersion.indexOf("msie 10.") != -1) {
			$('html').addClass('elseBL ie10');
		} else if (appVersion.indexOf("msie 9.") != -1) {
			$('html').addClass('ie');
			$('html').addClass('ie9');
			// $('html').addClass('ie ie9');
		} else if (appVersion.indexOf("msie 8.") != -1) {
			$('html').addClass('ie');
		} else if (appVersion.indexOf("msie 7.") != -1) {
			$('html').addClass('ie');
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
	var ConfigManager	 	= new MYNAMESPACE.model.ConfigManager();
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
//backgroundColorを削除―――――――――――――――――――――――――――――――――――
	$('input[name="privacy"]').closest('td').attr('bgcolor','')

//Radio,Checkをlabelで囲む。―――――――――――――――――――――――――――――――――――
	$('#NT_tableQuestion').find('label').addClass('labelClass')

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

//住所自動入力は任意のidが必須（なかったら自動付与、というようにしてもよい）
	// var arrname =	[
	// 				 {'Selecter'	: $('input[name="col_4"]')				,'name': 'kanaEx_firstName'}
	// 				,{'Selecter'	: $('input[name="col_5"]')				,'name': 'kanaEx_lastName'}
	// 				,{'Selecter'	: $('input[name="col_14"]')				,'name': 'kanaEx_firstNameKatakana'}
	// 				// ,{'Selecter'	: $('input[name="col_14"]')				,'name': 'kanaEx_firstNameHiragana'}
	// 				,{'Selecter'	: $('input[name="col_15"]')				,'name': 'kanaEx_lastNameKatakana'}
	// 				// ,{'Selecter'	: $('input[name="col_15"]')				,'name': 'kanaEx_lastNameHiragana'}
	// 			]




	// for (var i=0,len=arrname.length; i<len; i++) {
	// 	arrname[i]['Selecter'].attr('name',arrname[i]['name']);
	// }



//ConfigManagerからisMust取得―――――――――――――――――――――――――――――――――――
	var isMust = ConfigManager.getMustBranch();
//validation
	var ExValidationObj = ConfigManager.getValidation();



//new――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

		//initialvalidateじゃない？	// var InitialBlankManager	 	= new MYNAMESPACE.view.InitialBlankManager($j);
	var FocusEventManager	 	= new MYNAMESPACE.view.FocusEventManager();
	var AutoEmManager		 	= new MYNAMESPACE.view.AutoEmManager();
	// var AutoKanaManager		 	= new MYNAMESPACE.view.AutoKanaManager();⇒プラグインで実装
	// var TextNumberManager	 	= new MYNAMESPACE.view.TextNumberManager($j);

	var RemainingItemsManager 	= new MYNAMESPACE.view.RemainingItemsManager();
	var RealtimeCheckManager 	= new MYNAMESPACE.view.RealtimeCheckManager(ExValidationObj,isMust);
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

	var Mediator	 			= new MYNAMESPACE.view.Mediator(RemainingItemsManager,RealtimeCheckManager,TimerSolutionManager);


//ConfigManagerからSubmit時のエラーコメント取得―――――――――――――――――――――――――――――――――――
	$(ConfigManager).on('onSetSubmitComment', function(event) {
		var SubmitCommentObj = ConfigManager.getSubmitComment();
		SubmitCheckManager.getSubmitComment(SubmitCommentObj)
	})
	ConfigManager.setSubmitComment();


//action――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

	Mediator			 		.setEvent()

	// InitialBlankManager	 	.initialBlank()
	if($('html').hasClass('ie9') === false){
		FocusEventManager	 		.focusEvent()
	}
	AutoEmManager		 		.autoEm()
	// AutoKanaManager		 	.autoKana()⇒プラグインで実装
	// TextNumberManager	 	.textNumber()

	PlaceholderManager	 	.placeholder()//たまにリロード時、placeholder値が入力欄に残るため、ieでval=placeholderの時の回避ができる。realtimeの前に置くことで、firstvalidate前にval=placeならvalを消去し、その後バリデーションをしている。
	RealtimeCheckManager.realtimeCheck()
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

	if($('html').hasClass('ie9') === true){
		FocusEventManager	 		.focusEvent()
	}

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
	// var timer = -1;
	// $('ie9 #username').off()
	// $('ie9 #username').blur(function(){
		// var x = 0;
		// 	timer = setInterval(function(){
		// 		// console.log('a')
		// 		if(x==10){
		// 			return false;
		// 		}
		// $('ie9 #username').blur();
		// x= (x+1)
		// 		},100
		// 	);//setInterval(function(x){～},100) 100は0.1秒
	// })

//『ご希望の住宅』について、マンション・戸建てにチェックを入れた際に詳細項目が必須に変化するが、
//マンション・戸建てのチェックが無い場合blankをつけないため、例外処理を入れている。
	if(isMust[0] === false){
		$('#keikaku_apartment').closest('div.lumpMix').removeClass('blank');
		$('#keikaku_kodate').closest('div.lumpMix').removeClass('blank');
	}
	$('body').css('height','auto');



// 	$('#bodyID').prepend($('<button id="jQueryB" style="padding:10px;">jQuery</div>'))
// 	$('#jQueryB').click(function(){
// 			console.log($().jquery);
// 		})

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




});
// $.noConflict(true);