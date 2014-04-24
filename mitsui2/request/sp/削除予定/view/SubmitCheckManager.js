

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.SubmitCheckManager');
	MYNAMESPACE.view.SubmitCheckManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.SubmitCheckManager.prototype = {
		 _instances				: {}
		,_SubmitCommentObj		: {}
		,initialize: function(DataManagerInstance) {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'submitCheck'
				,'onSubmitComment'
				,'setEvent'
			);

			this._instances = {
				'DataManager'			: DataManagerInstance
			}
		}
		,submitCheck: function() {
			var thisObj = this;

				$("form")
					.submit(function() {//細かく対応。
						var blankObj = $('.blank');
						// if(blankObj.length != 0){//submit エラーなし対応
						if(blankObj.length == 0){//submit エラーなし対応
							var arr = thisObj._instances['DataManager'].getBeforeAttrName();
							for (var i=0,len=arr.length; i<len; i++) {//name戻し
		/*name確認用*/	// alert(arr[i]['Selecter'].attr('name'))
								arr[i]['Selecter'].attr('name',arr[i]['name']);
		/*name確認用*/	// alert(arr[i]['Selecter'].attr('name'))
							}
		/*name確認用*/	// var inputAll = $('input')
		/*name確認用*/	// for (var i=0,len=inputAll.length; i<len; i++) {//name戻し
		/*name確認用*/	// 	alert(inputAll.eq(i).attr('type')+':'+inputAll.eq(i).attr('name'))
		/*name確認用*/	// }
							// my_submit("confirm")
						} else {//エラーあり
//for yuraku(error alert)　↓―――――――――――――――――――――――――――――――――――
							// var FirstBlank = blankObj.eq(0)
							// if(FirstBlank.val().length != 0){
							// 	// if(FirstBlank.hasClass('NT_V_num_SP') === true){
							// 	// 	alert(thisObj._SubmitCommentObj[FirstBlank.attr('nt_dd_num')]+'は半角数字で入力してください')
							// 	// } else if(FirstBlank.hasClass('NT_V_katakana_SP') === true){
							// 	// 	alert(thisObj._SubmitCommentObj[FirstBlank.attr('nt_dd_num')]+'は全角カタカナで入力してください')
							// 	// } else if(FirstBlank.hasClass('NT_V_mail_SP') === true){
							// 	// 	alert(thisObj._SubmitCommentObj[FirstBlank.attr('nt_dd_num')]+'はメールアドレスの形式ではありません')
							// 	// } else {	}
							// 	// alert(thisObj._SubmitCommentObj[FirstBlank.attr('nt_dd_num')]+'の入力が間違っています')

							// } else {
							// 	// if(FirstBlank.attr('nt_dd_num') == 'a_0'){
							// 	// 	alert('送信するには個人情報保護規約への同意が必要となります')
							// 	// } else if(FirstBlank.attr('nt_dd_num') == 'a_1'){
							// 	// 	alert('「クラブオーベル個人情報保護規約への同意」がされていません')
							// 	// } else if(FirstBlank[0].nodeName == 'INPUT'){
							// 	// 	alert(thisObj._SubmitCommentObj[FirstBlank.attr('nt_dd_num')]+'が入力されていません')
							// 	// } else if(FirstBlank[0].nodeName == 'SELECT'){//select
							// 	// 	alert(thisObj._SubmitCommentObj[FirstBlank.attr('nt_dd_num')]+'が選択されていません')
							// 	// } else if(FirstBlank[0].nodeName == 'DIV'){//select用
							// 	// 	alert(thisObj._SubmitCommentObj[FirstBlank.children('select').attr('nt_dd_num')]+'が選択されていません')
							// 	// } else {
							// 	// 	if(FirstBlank.is(':has(input[type="radio"])') === true){
							// 	// 		alert(thisObj._SubmitCommentObj[FirstBlank.attr('nt_dd_num')]+'が選択されていません')
							// 	// 	} else if(FirstBlank.is(':has(input[type="checkbox"])') === true){
							// 	// 		alert(thisObj._SubmitCommentObj[FirstBlank.attr('nt_dd_num')]+'がチェックされていません')
							// 	// 	}
							// 	// }
							// }
//for yuraku　↑―――――――――――――――――――――――――――――――――――
							var blankObjEq0 = blankObj.eq(0)
							var targetY = blankObjEq0.offset().top - 100;
							thisObj._instances['DataManager'].sendOneValidateObj(blankObjEq0,'MS_ON');//メッセージあり
							$('html,body').animate({scrollTop: targetY}, 200);
							return false;
						}
					})
		}
		,onSubmitComment: function() {
			var thisObj = this;
			$(thisObj._instances['DataManager']).on('onCompSubmitComment', function(event) {
				thisObj._SubmitCommentObj = thisObj._instances['DataManager'].getSubmitComment();
			})
		}
		,setEvent: function() {
			var thisObj = this;
			thisObj.submitCheck();
			thisObj.onSubmitComment();
		}
	}
});