

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.MouseEventManager');
	MYNAMESPACE.view.MouseEventManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.MouseEventManager.prototype = {
		_instances			: {}
		,_classNum			: -1
		,_currentIndex			: -1

		,initialize: function() {//初期設定的な
			var thisObj = this;
			this._instances = {//
			}
			_.bindAll(
				this
				,'mouseEvent'
			);
		}
		,mouseEvent: function() {
			var thisObj = this;
			$('.MouseoverEvent').hover(
				function(){
					$(this).addClass('MouseoverNow')
				},
				function(){
					$(this).removeClass('MouseoverNow')
				}
			)
			$('.MouseoverRadioEvent').hover(
				function(){
					$(this).addClass('MouseoverRadioNow')
				},
				function(){
					$(this).removeClass('MouseoverRadioNow')
				}
			)

		}
	}
});