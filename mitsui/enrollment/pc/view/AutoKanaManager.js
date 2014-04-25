

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.AutoKanaManager');
	MYNAMESPACE.view.AutoKanaManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.AutoKanaManager.prototype = {
		_instances			: {}
		,_classNum			: -1
		,_currentIndex			: -1

		,initialize: function() {//初期設定的な
			var thisObj = this;
			this._instances = {//
			}
			_.bindAll(
				this
				,'autoKana'
			);
		}
		,autoKana: function(arr) {
			// var thisObj = this;

		}
	}
});