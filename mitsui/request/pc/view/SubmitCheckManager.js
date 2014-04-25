

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
			$('#innerWrap>p.mt40>a').attr('onclick','');
			$j('#innerWrap>p.mt40>a').click(function(){
			// $j("form").submit(function() {//細かく対応。
						if(($('html').hasClass('ie') === true)||($('html').hasClass('ie9') === true)){//placeholderの値削除(IE)
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
							// for (var i=0,len=arr.length; i<len; i++) {
							// 	$j('#' + arr[i]['afterid']).attr('id',arr[i]['beforeid']);
							// }
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
javascript:JumpPageUnique('form_Docu_Input','DocumentInput','DOCUMENT_CONF');

						} else {//エラーあり
// alert('チェック用アラート：false start')
							if($('html').hasClass('ie') === true){//placeholderの値削除(IE)
								var targetY = $j('form .blank').eq(0).offset().top - 100;
								$j('body,html').animate({scrollTop: targetY}, 0);
								$j('form .blank').eq(0).blur();
								$('input:not(input[type="radio"])').blur()
							} else {
								var targetY = $('form .blank').eq(0).offset().top - 100;
								$j('form .blank').eq(0).blur();
								$('body,html').animate({scrollTop: targetY}, 200);
							}
//三井仕様、なぜかここだけポップアップ残る
			$('#err_userbirthday').hide()
// alert('チェック用アラート：false end')
							return false;
						}
					})
		}
	}
});