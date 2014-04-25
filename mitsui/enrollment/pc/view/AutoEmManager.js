

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.AutoEmManager');
	MYNAMESPACE.view.AutoEmManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.AutoEmManager.prototype = {
		_instances			: {}
		,_classNum			: -1
		,_currentIndex			: -1

		,initialize: function() {//初期設定的な
			var thisObj = this;
			this._instances = {//
			}
			_.bindAll(
				this
				,'autoEm'
			);
		}
		,autoEm: function() {
			var EmSelectorTxt = 'input:not(input[type="select"],input[type="radio"])';
			$('form').on('blur',EmSelectorTxt,function(){
				if($(this).attr('id') == 'usertel'){
					//長音、全角ハイフン、全角ハイフンマイナス、全角ダッシュ、半角ハイフンマイナス
					var replaceVal = $(this).val().replace(/ー|‐|−|―|-/g,'').replace('＠','@').replace('＿','_').replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)})
					// var replaceVal = $(this).val().replace('－','').replace('-','').replace('＠','@').replace('＿','_').replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)})
				} else {
					var replaceVal = $(this).val().replace('－','-').replace('＠','@').replace('＿','_').replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)})
				}
				$(this).val(replaceVal)
			});
		}
	}
});