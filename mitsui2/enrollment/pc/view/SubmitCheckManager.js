

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.SubmitCheckManager');
	MYNAMESPACE.view.SubmitCheckManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.SubmitCheckManager.prototype = {
		 _Num_Name1				: null
		,_Num_Name2				: null
		,_Text_Name1			: null
		,_Text_Name2			: null
		,_Text_Name3			: null
		,_Name2					: ''
		,_Name4					: ''
		,_isCorrect				: true
		,_AddressNumInput		: null
		,_AddressNumlength		: null
		,_SubmitCommentObj 		:{}
		,initialize: function() {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'getSubmitComment'
				,'submitCheck'
				,'submitAction'
			);

			this._instances = {//
			}
		}
		,getSubmitComment: function(SubmitCommentObj) {//初期設定的な
			var thisObj = this;
			thisObj._SubmitCommentObj = SubmitCommentObj
		}
		,submitCheck: function() {
			var thisObj = this;
			// $j('#formID>div.relative>p.center>a').attr('onclick','');

			if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){
				$j('#formID>div.relative>p.center>a').removeAttr('href');
			}
			$j('#formID>div.relative>p.center>a').click(function(event){
				// event.preventDefault();
				// alert('a click')
				thisObj.submitAction(event);
			// $j("form").submit(function() {//細かく対応。
			})
		}
		,submitAction: function(event) {
			var thisObj = this;

			//placeholderの値削除(IE)
			if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){
				$j('input').each(function(){
					if($j(this).attr('placeholder') !== undefined){
						var val = $j(this).val();
						var placeholder = $j(this).attr('placeholder');
						if(val == placeholder){
							$j(this).val('');
						}
					}
				})
			}

			var isCorrect = true;
			if($j('.blank').length == 0){//submit エラーなし対応
// alert('チェック用アラート：true start')
/*修正*/				if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){
/*check*/       		$(window).off('beforeunload');//$jはNG
				}
/*>>>>>>>>> Check Point*/
// $('input,select').each(function(){
// 	alert($(this).attr('name'))
// })
// return;
//―――――――――――――――――――――――――
// alert('チェック用アラート：true end')
			// return false;
					javascript:JumpPageUnique('form_ProfilePre_Input','./Profile','PROFILE_PRE_CONF');
				// event.preventDefault();


			} else {//エラーあり
// alert('チェック用アラート：false start')
				if($('html').hasClass('ie') === true){//placeholderの値削除(IE)
					var targetY = $j('form input.blank, form select.blank, form td.blank, form td>div.blank').eq(0).offset().top - 100;
					// var targetY = $j('form .blank').eq(0).offset().top - 100;
					$j('body,html').animate({scrollTop: targetY}, 0);
					$j('form input.blank, form select.blank, form td.blank, form td>div.blank').eq(0).blur();


//三井仕様にセレクタを変更　ここから
//非常にblurに時間がかかるため、三井用に個別指定。
var start = null;
start = new Date();
console.log("Operation took ver1 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();

// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"] input:not([type="radio"])').blur()
// console.log("Operation took ver2 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"] input').blur()
// console.log("Operation took ver3 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(5) input:not([type="radio"])').blur()
// console.log("Operation took ver5 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(6) input:not([type="radio"])').blur()
console.log("Operation took ver6 / " + (new Date().getTime() - start.getTime()) + " msec");
start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(7) input:not([type="radio"])').blur()
// console.log("Operation took ver7 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(8) input:not([type="radio"])').blur()
// console.log("Operation took ver8 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(9) input:not([type="radio"])').blur()
// console.log("Operation took ver9 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(10) input:not([type="radio"])').blur()
// console.log("Operation took ver10 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(11) input:not([type="radio"])').blur()
// console.log("Operation took ver11 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(12) input:not([type="radio"])').blur()
// console.log("Operation took ver12 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(13) input:not([type="radio"])').blur()
// console.log("Operation took ver13 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(14) input:not([type="radio"])').blur()
// console.log("Operation took ver14 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(15) input:not([type="radio"])').blur()
// console.log("Operation took ver15 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
// 					$('#formID>div.boxType2:eq(2)>div>table[summary="三井ハウジングメイトID基本情報"]>tbody>tr:lt(16) input:not([type="radio"])').blur()
// console.log("Operation took ver16 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();


//10mscしか変わらんかった.
// 					$('#username,#userfname,#usernamekana,#userfnamekana,#userownmoney,#useremail1,#useremail2,#useremail1_again,#useremail2_again').blur()
// console.log("Operation took ver6 / " + (new Date().getTime() - start.getTime()) + " msec");
// start = new Date();
					$('#userbirthyear,#userzipcd1,#userzipcd2,#useraddressstr,#sendzipcd1,#sendzipcd2,#jsmansion,#usertel,#UserMobilelNo,#userfamilynumber,#userofficezipcd1,#userofficezipcd2,#useroffice').blur()
console.log("Operation took ver6 / " + (new Date().getTime() - start.getTime()) + " msec");
start = new Date();





//三井仕様にセレクタを変更　ここまで
					// $('form input.blank, form select.blank, form td.blank, form td>div.blank').eq(0).blur();
					// $j('form .blank').eq(0).blur();
// $('input:not(input[type="radio"])').blur() //ながい

				} else {
					var targetY = $('form input.blank, form select.blank, form td.blank, form td>div.blank').eq(0).offset().top - 100;
					// var targetY = $('form .blank').eq(0).offset().top - 100;
					$j('form input.blank, form select.blank, form td.blank, form td>div.blank').eq(0).blur();
					// $j('form .blank').eq(0).blur();
					$('body,html').animate({scrollTop: targetY}, 200);
				}
				event.preventDefault();//falseの際、submitしないようにする。
//三井仕様、なぜかここだけポップアップ残る
			$('#err_userbirthday').hide()
// alert('チェック用アラート：false end')
			}
		}
	}
});