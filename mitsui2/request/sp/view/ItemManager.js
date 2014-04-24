

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.ItemManager');
	MYNAMESPACE.view.ItemManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.ItemManager.prototype = {
		_instances			: {}
		,_inputselect		: null
		,_index				: -1
		,_EventName			: null
		,initialize: function(DataManagerInstance, thisinputselect, index) {//indexを受け取る（何番目のクラスか）
			var thisObj = this;
			this._instances = {
				'DataManager'			: DataManagerInstance
				};
			this._inputselect 	= thisinputselect;
			this._index 		= index;
			_.bindAll(
				this
				,'addClassItem'
				,'setEvent'
				,'sendUserAction'
				,'firstValidate'
			);
			this.addClassItem()
			this.setEvent()
			this.firstValidate()
		}
		,addClassItem: function() {
			//console.log('Item Addclass')
			var thisObj = this;
			thisObj._inputselect.attr('nt_base_index',this._index);
			$(thisObj).trigger('onCompleteMakeItem',thisObj._index)
		}
		,firstValidate: function() {
			var thisObj = this;
			$(thisObj._instances['DataManager']).on('onCompSetIniValidate', function(event){
				thisObj._instances['DataManager'].sendInitialValidateObj(thisObj._inputselect,thisObj._index);
			})
		}
		,setEvent: function() {//sendまで
			var thisObj = this;
			thisObj._inputselect.on('focus', function(event) {
				thisObj._EventName = 'Focus'
				thisObj.sendUserAction()
			})
			thisObj._inputselect.on('blur', function(event) {
				thisObj._EventName = 'Blur'
				thisObj.sendUserAction()
			})
			thisObj._inputselect.on('change', function(event) {
				thisObj._EventName = 'Change'
				thisObj.sendUserAction()
			})
			thisObj._inputselect.on('click', function(event) {
				thisObj._EventName = 'Click'
				thisObj.sendUserAction()
			})
			thisObj._inputselect.on('keyup', function(event) {
				thisObj._EventName = 'Keyup'
				thisObj.sendUserAction()
			})
		}
		,sendUserAction: function() {//sendまで
			var thisObj = this;
			thisObj._instances['DataManager'].sendUserAction(thisObj._inputselect,thisObj._index,thisObj._EventName);
		}
	}
});