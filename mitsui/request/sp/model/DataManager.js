

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('model.DataManager');
	MYNAMESPACE.model.DataManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.model.DataManager.prototype = {
		_status								: ''
	//	,_currentBtnIndex						: -1
		// ,_precurrentBtnIndex						: -1
		,_IniClassName					: {}
		,_IniAttrName					: {}
		,_IniAttrType					: {}
		,_Placeholder					: {}
		,_SubmitComment					: {}
		,_beforeAttrName				: []
		,_SelectValue					: ''

		,initialize: function() {
			var thisObj = this;
			_.bindAll(
				this
				,'setIniClass'
				,'setIniAttrName'
				,'setIniAttrType'
				,'setPlaceholder'
				,'setSubmitComment'
				,'getIniClass'
				,'getIniAttrName'
				,'getIniAttrType'
				,'getPlaceholder'
				,'getSubmitComment'
				,'setInitialValidate'
				,'sendInitialValidateObj'
				,'sendOneValidateObj'
				,'sendUserAction'
				,'sendValidateResult'
				,'sendCorrectDate'
			);
		}
		,setIniClass : function(IniClassNameObj) {
			var thisObj = this;
			thisObj._IniClassName = IniClassNameObj
			$(thisObj).trigger('onCompSetIniClass');
		}
		,setIniAttrName : function(IniAttrNameObj) {
			var thisObj = this;
			thisObj._IniAttrName = IniAttrNameObj
			$(thisObj).trigger('onCompSetIniAttrName');
		}
		,setIniAttrType : function(IniAttrTypeObj) {
			var thisObj = this;
			thisObj._IniAttrType = IniAttrTypeObj
			$(thisObj).trigger('onCompSetIniAttrType');
		}
		,setPlaceholder : function(PlaceholderObj) {
			var thisObj = this;
			thisObj._Placeholder = PlaceholderObj
			$(thisObj).trigger('onCompSetPlaceholder');
		}
		,setSubmitComment : function(SubmitCommentObj) {
			var thisObj = this;
			thisObj._SubmitComment = SubmitCommentObj
			$(thisObj).trigger('onCompSubmitComment');
		}
		,getIniClass : function() {
			var thisObj = this;
			return thisObj._IniClassName;
		}
		,getIniAttrName : function() {
			var thisObj = this;
			return thisObj._IniAttrName;
		}
		,getIniAttrType : function() {
			var thisObj = this;
			return thisObj._IniAttrType;
		}
		,getPlaceholder : function() {
			var thisObj = this;
			return thisObj._Placeholder;
		}
		,getSubmitComment : function() {
			var thisObj = this;
			return thisObj._SubmitComment;
		}
		,setBeforeAttrName : function(beforeAttrName) {
			var thisObj = this;		//console.log('sendUserAction  '+'EventObj_'+EventObj+'index_'+index);
			thisObj._beforeAttrName = beforeAttrName
		}
		,getBeforeAttrName : function() {
			var thisObj = this;		//console.log('sendUserAction  '+'EventObj_'+EventObj+'index_'+index);
			return thisObj._beforeAttrName;
		}
		,setInitialValidate : function() {
			var thisObj = this;		//console.log('sendUserAction  '+'EventObj_'+EventObj+'index_'+index);
			$(thisObj).trigger('onCompSetIniValidate')
		}
		,sendInitialValidateObj : function(EventObj,index) {
			var thisObj = this;
			$(thisObj).trigger('onCheckInitialValidate', [EventObj,index])
		}
		,sendOneValidateObj : function(EventObj,checktype) {
			var thisObj = this;
			$(thisObj).trigger('onCheckOneValidate', [EventObj,checktype])
		}
		,sendUserAction : function(EventObj,index,EventName) {
			var thisObj = this;
			$(thisObj).trigger('onUser'+EventName+'Action', [EventObj,index])
		}
		,sendValidateResult : function(EventObj,V_Result,AddMessage,checktype) {
			var thisObj = this;
			$(thisObj).trigger('onReceiveFormEvent', [EventObj,V_Result,AddMessage,checktype])
		}
		,sendCorrectDate : function(EventObj,V_Result,AddMessage,checktype) {
			var thisObj = this;
			$(thisObj).trigger('onChkCorrectDate', [EventObj,V_Result,AddMessage,checktype])
		}
	}
});