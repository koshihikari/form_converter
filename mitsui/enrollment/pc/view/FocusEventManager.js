

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.FocusEventManager');
	MYNAMESPACE.view.FocusEventManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.FocusEventManager.prototype = {
		_instances			: {}
		,_classNum			: -1
		,_currentIndex			: -1

		,initialize: function() {//初期設定的な
			var thisObj = this;
			this._instances = {//
			}
			_.bindAll(
				this
				,'focusEvent'
			);
		}
		,focusEvent: function(arr) {
			// var thisObj = this;
			$('input.CursorFocusEvent').focus(function(){
			// $('input[class="CursorFocusEvent"]').focus(function(){
				$(this).addClass('CursorFocusNow')
			})
			$('input.CursorFocusEvent').blur(function(){
			// $('input[class="CursorFocusEvent"]').blur(function(){
				$(this).removeClass('CursorFocusNow')
			})
		}
	}
});