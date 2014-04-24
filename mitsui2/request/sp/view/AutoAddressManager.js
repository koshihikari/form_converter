

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.AutoAddressManager');
	MYNAMESPACE.view.AutoAddressManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.AutoAddressManager.prototype = {
		 _instances				: null
		,_EventObj				: null
		,_index					: null
		,_Name2					: ''
		,_Name4					: ''
		,_isCorrect				: true
		,initialize: function(DataManagerInstance) {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'receiveEvent'
				,'autoNextFocus'
				,'ajaxZip3Action'
				,'setEvent'
			);

			this._instances = {
				'DataManager'			: DataManagerInstance
			}
		}
		,receiveEvent : function() {
			var thisObj = this;
			$(thisObj._instances['DataManager']).on('onUserKeyupAction', function(event,EventObj,index){
				thisObj._EventObj 	= EventObj
				thisObj._index 		= index
							console.log('<<keyup>>NAME='+thisObj._EventObj.attr('name')+',ID='+thisObj._EventObj.attr('id')+',INDEX='+thisObj._index)
				if(thisObj._EventObj.hasClass('NT_AutoAddrNum_2_1') === true) {
							console.log('autoNextFocus')
					thisObj.autoNextFocus()
				}
				if(thisObj._EventObj.hasClass('NT_AutoAddrNum_1_1') === true) {
							console.log('ZipA')
					thisObj.ajaxZip3Action('A')
				}
				if(thisObj._EventObj.hasClass('NT_AutoAddrNum_2_2') === true) {
							console.log('ZipB')
					thisObj.ajaxZip3Action('B')
				}
			})
		}
		,autoNextFocus: function() {
			//次の項目へ移る
			var thisObj = this;
			if(thisObj._EventObj.val().replace('-', '').replace('－', '').length == 3){
				$('input[nt_base_index="'+((thisObj._EventObj.attr('nt_base_index')-0+1))+'"]').focus();
			};
		}
		,ajaxZip3Action: function(type) {
			var thisObj = this;
			var countval = thisObj._EventObj.val().replace('-', '').replace('－', '').replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});
			if(countval.length == 4){
				if(type === 'B'){
					thisObj._Name2 = 'NT_AutoAddrNum_2'
				}
				if($('.NT_AutoAddrText_2').length !== 0){//true
					thisObj._Name4 = 'NT_AutoAddrText_2'
					if($('.NT_AutoAddrText_3').length !== 0){//false
						thisObj._isCorrect = false;
					}
				} else {
					thisObj._Name4 = 'NT_AutoAddrText_1'
				}
				if(thisObj._isCorrect === true){
					console.log('AJAX,NAME2&NAME4'+thisObj._Name2+','+thisObj._Name4)
					AjaxZip3.zip2addr('NT_AutoAddrNum_1',thisObj._Name2,'NT_AutoAddrText_1',thisObj._Name4);//県・市区町村
				} else if (thisObj._isCorrect === false){
					console.log('AJAX,NAME2&NAME4'+thisObj._Name2+','+thisObj._Name4)
					AjaxZip3.zip2addr('NT_AutoAddrNum_1',thisObj._Name2,'NT_AutoAddrText_1','NT_AutoAddrText_2','','NT_AutoAddrText_3');//県・市区・町村
				}
			}
		}
		,setEvent: function() {
			var thisObj = this;
			thisObj.receiveEvent()
		}
	}
});