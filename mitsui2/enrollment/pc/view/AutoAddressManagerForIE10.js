

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.AutoAddressManagerForIE10');
	MYNAMESPACE.view.AutoAddressManagerForIE10 = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.AutoAddressManagerForIE10.prototype = {
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
		,initialize: function() {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'autoAddress'
				,'ajaxZip3Action'
				,'changeNameAddressNum'
				,'changeNameAddressText'
				,'realTimeCheck'
				,'returnName'
				,'ajaxZip3zip2addrAction'
			);

			this._instances = {//
			}
			this._Num_Name1 = $('#AutoAddressNum1').attr('name')
			this._Num_Name2 = $('#AutoAddressNum2').attr('name')
			this._Text_Name1 = $('#AutoAddressText1').attr('name')
			this._Text_Name2 = $('#AutoAddressText2').attr('name')
			this._Text_Name3 = $('#AutoAddressText3').attr('name')
		}
		,autoAddress: function() {
			var thisObj = this;

			$('#B1').click(function(){
				var rimit = 10000
/*消すべき？*/	$(thisObj).trigger('onChangeAddressName',[thisObj._Num_Name1,thisObj._Num_Name2,thisObj._Text_Name1,thisObj._Text_Name2,thisObj._Text_Name3,rimit]);
			})


			if($('#AutoAddressNum2').length === 0){
				thisObj._AddressNumlength = 7
				thisObj._AddressNumInput = $('#AutoAddressNum1')
			} else {
				thisObj._AddressNumlength = 4
				thisObj._AddressNumInput = $('#AutoAddressNum2')
			//次のフォームへ移る
				$('form')
					.on('keyup', '#AutoAddressNum1', function(event) {
						if($('#AutoAddressNum1').val().replace('-', '').replace('－', '').length == 3){
							$('#AutoAddressNum2').focus();
						};
					})
			}
			thisObj._AddressNumInput
				.on('keyup change', function(event) {
					var countval = thisObj._AddressNumInput.val().replace('-', '').replace('－', '').replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});
					var count = countval.length;
					if(count == thisObj._AddressNumlength){
						thisObj.ajaxZip3Action();
					}
				})
		}
		,ajaxZip3Action: function() {
			var thisObj = this;

				thisObj.changeNameAddressNum();//name1、2を確定させるアクション
				thisObj.changeNameAddressText();//name3,4,5を確定させるアクション
				thisObj.ajaxZip3zip2addrAction();
/*カスタマイズ*/		thisObj.realTimeCheck();//飛ばされた項目をblurする。
				thisObj.returnName();//name1,2を戻すアクション

				var rimit = 30
/*消すべき？*/	$(thisObj).trigger('onChangeAddressName',[thisObj._Num_Name1,thisObj._Num_Name2,thisObj._Text_Name1,thisObj._Text_Name2,thisObj._Text_Name3,rimit]);
		}
		,changeNameAddressNum: function() {
			var thisObj = this;
			if($('#AutoAddressNum1').length !== 0){
				// thisObj._Num_Name1 = $('#AutoAddressNum1').attr('name')
				$('#AutoAddressNum1').attr('name','name1')
				if($('#AutoAddressNum2').length !== 0){
					// thisObj._Num_Name2 = $('#AutoAddressNum2').attr('name')
					$('#AutoAddressNum2').attr('name','name2')
					thisObj._Name2 = 'name2'
				} else {
					thisObj._Name2 = ''
				}
			} else {
				alert('class=AutoAddressNum1を設定してください。')
			}
		}
		,changeNameAddressText: function() {
			var thisObj = this;
			if($('#AutoAddressText1').length !== 0){//true
				// thisObj._Text_Name1 = $('#AutoAddressText1').attr('name')
				$('#AutoAddressText1').attr('name','name3')
				if($('#AutoAddressText2').length !== 0){//true
					// thisObj._Text_Name2 = $('#AutoAddressText2').attr('name')
					$('#AutoAddressText2').attr('name','name4')
					thisObj._Name4 = 'name4'
					if($('#AutoAddressText3').length !== 0){//false
						thisObj._isCorrect = false;
						// thisObj._Text_Name3 = $('#AutoAddressText3').attr('name')
						$('#AutoAddressText3').attr('name','name5')
					}
				} else {
					thisObj._Name4 = 'name3'
				}
			} else {
				alert('class=AutoAddressText1を設定してください。')
			}
		}
		,realTimeCheck: function() {
			var thisObj = this;
			$('#AutoAddressText1,#AutoAddressText2,#AutoAddressText3').blur()
		}
		,returnName: function() {
			var thisObj = this;
			// alert(thisObj._Num_Name1+' , '+thisObj._Num_Name2+' , '+thisObj._Text_Name1+' , '+thisObj._Text_Name2+' , '+thisObj._Text_Name3)
			var arr =	[
							 {'class':'AutoAddressNum1' ,	'name':thisObj._Num_Name1	}
							,{'class':'AutoAddressNum2' ,	'name':thisObj._Num_Name2	}
							,{'class':'AutoAddressText1' ,	'name':thisObj._Text_Name1	}
							,{'class':'AutoAddressText2' ,	'name':thisObj._Text_Name2	}
							,{'class':'AutoAddressText3' ,	'name':thisObj._Text_Name3	}
						]
			for (var i=0,len=arr.length; i<len; i++) {
				$('.' + arr[i]['class']).attr('name',arr[i]['name']);
			}
		}
		,ajaxZip3zip2addrAction: function() {
			var thisObj = this;
			if(thisObj._isCorrect === true){
				AjaxZip3.zip2addr('name1',thisObj._Name2,'name3',thisObj._Name4);//県・市区町村
			} else if (thisObj._isCorrect === false){
				AjaxZip3.zip2addr('name1',thisObj._Name2,'name3','name4','','name5');//県・市区・町村
			}
		}
	}
});