

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.AutoAddressManagerForIE');
	MYNAMESPACE.view.AutoAddressManagerForIE = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.AutoAddressManagerForIE.prototype = {
		_instances			: {}
		,_classNum			: -1
		,_currentIndex			: -1

		,initialize: function() {//初期設定的な
			var thisObj = this;
			this._instances = {//
			}
			_.bindAll(
				this
				,'autoAddress'
			);
		}
		,autoAddress: function() {
			var thisObj = this;
			var AutoAddressNumNode = null;
			var AutoAddressCount = null;
			var AutoAddressNumName = null;
			if($('.AutoAddressNum2').length !== 0){
				AutoAddressNumNode = $('.AutoAddressNum2')
				AutoAddressCount = 4;
				AutoAddressNumName = 'AutoAddressNum2';
				$('form')
					.on('keyup', '.AutoAddressNum1', function(event) {
						if($('.AutoAddressNum1').val().replace('-', '').replace('－', '').length == 3){
							AutoAddressNumNode.focus();
						};
					})
			} else {
				AutoAddressNumNode = $('.AutoAddressNum1')
				AutoAddressCount = 7;
				AutoAddressNumName = '';
			}

//Ajaxzip3、ieの場合はidで動作を確認。
			AutoAddressNumNode
				.on('keyup', function(event) {
					var countval = AutoAddressNumNode.val().replace('-', '').replace('－', '').replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});
					var count = countval.length;
					if(count == AutoAddressCount){
						AutoAddressNumNode.val(countval)//replaceした値を挿入

						if($('.AutoAddressText1').length !== 0){
							if($('.AutoAddressText2').length !== 0){
								if($('.AutoAddressText3').length !== 0){
									AjaxZip3.zip2addr('AutoAddressNum1',AutoAddressNumName,'AutoAddressText1','AutoAddressText2','','AutoAddressText3');
								} else {
									AjaxZip3.zip2addr('AutoAddressNum1',AutoAddressNumName,'AutoAddressText1','AutoAddressText2');
								}
							} else {
								AjaxZip3.zip2addr('AutoAddressNum1',AutoAddressNumName,'AutoAddressText1','AutoAddressText1');
							}
						} else {

						}
					}
				})
				// .on('keyup　change', function(event) {
				// })

		}
	}
});