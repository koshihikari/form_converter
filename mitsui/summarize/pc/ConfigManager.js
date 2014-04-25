

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('model.ConfigManager');
	MYNAMESPACE.model.ConfigManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.model.ConfigManager.prototype = {
		 _instances			: {}
		 ,_classname		: []
		 ,_idname			: []
		 ,_Validation		: {}
		 ,_SubmitCommentObj	: {}
		 ,_formtable		: null
		 ,_isMust			: []
		,initialize: function() {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'SetIdname'
				,'SetClassname'
				,'SetMustBranch'
				,'SetValidation'
				,'setSubmitComment'
				,'getIdname'
				,'getMustBranch'
				,'getClassname'
				,'getValidation'
				,'getSubmitComment'
			);
			this._instances = {
			}
			this.SetIdname();
			this.SetMustBranch();
			// this.SetClassname();
			this.SetValidation();
		}

/*――――――――――――――*/
/*Settings Start*/
/*――――――――――――――*/
		,SetIdname: function() {
			var thisObj = this;
				thisObj._formtable = $('#innerWrap>div.boxType2>div.boxInner>table')
				thisObj._idname =	[
					 {'Selecter'	: thisObj._formtable.filter('[summary="「住まい探し」の登録情報"]')	,'id': 'NT_tableInfo'}
					,{'Selecter'	: thisObj._formtable.filter('[summary="アンケート"]')				,'id': 'NT_tableQuestion'}
					,{'Selecter'	: $('#innerWrap>table[summary="最近見た物件"]')			,'id': 'NT_tableBukken'}
					 // {'Selecter'	: $('input[name="col_14"]') 			,'id': 'AutoAddressNum1'}
					//  {'Selecter'	: $('input[name="col_4"]')				,'id': 'kanaEx_firstName'}
					// ,{'Selecter'	: $('input[name="col_5"]')				,'id': 'kanaEx_lastName'}
					// ,{'Selecter'	: $('input[name="col_14"]')				,'id': 'kanaEx_firstNameKatakana'}
					// ,{'Selecter'	: $('input[name="col_15"]')				,'id': 'kanaEx_lastNameKatakana'}
// 					 {'Selecter'	: $('input[name="col_19[]"]').eq(0) 	,'id': 'AutoAddressNum1'}
// 					,{'Selecter'	: $('input[name="col_19[]"]').eq(1) 	,'id': 'AutoAddressNum2'}
// 					// ,{'Selecter'	: $('input[name="col_21"]') 			,'id': 'AutoAddressText1'}
// 					,{'Selecter'	: $('select[name="col_12"]') 			,'id': 'AutoAddressText1'}
// 					,{'Selecter'	: $('input[name="col_21"]') 			,'id': 'AutoAddressText2'}
// 					,{'Selecter'	: $('input[name="col_22"]') 			,'id': 'AutoAddressText3'}
// /*td*/				,{'Selecter'	: formtableradio.eq(0)								,'id': 'RadioID_1'}
// 					,{'Selecter'	: formtableradio.eq(1)						 		,'id': 'RadioID_2'}
// 					,{'Selecter'	: $('form>table>tbody>tr>td>table:eq(6)>tbody>tr:eq(1)') 	,'id': 'RadioID_3'}
// 					,{'Selecter'	: $('#agree_privacy').closest('.font2_1') 					,'id': 'RadioID_4'}
				]

			$(thisObj).trigger('onSetIdname');
		}
		,SetClassname: function() {
			var thisObj = this;
				thisObj._classname =	[
//Placeholder
					 {'Selecter'	: $('#username') 						,'classname': 'firstName'}
					,{'Selecter'	: $('#userfname') 						,'classname': 'lastName'}
					,{'Selecter'	: $('#usernamekana') 					,'classname': 'firstNameKatakana'}
					,{'Selecter'	: $('#userfnamekana') 					,'classname': 'lastNameKatakana'}
					,{'Selecter'	: $('#userzipcd1')						,'classname': 'Address_Num_1st'}
					,{'Selecter'	: $('#userzipcd2')						,'classname': 'Address_Num_2nd'}
					,{'Selecter'	: $('#useraddressstr') 					,'classname': 'Address_Text_HouseName'}
					,{'Selecter'	: $('#useremail1') 						,'classname': 'Mail_beforeAt'}
					,{'Selecter'	: $('#useremail2') 						,'classname': 'Mail_afterAt'}
					,{'Selecter'	: $('#usertel')							,'classname': 'Tel1_nohyphen'}
					,{'Selecter'	: $('#userownmoney')					,'classname': 'OwnMoney'}
					,{'Selecter'	: $('#userbirthyear')					,'classname': 'BirthYear'}
					,{'Selecter'	: $('#userbirthmonth')					,'classname': 'BirthMonth'}
					,{'Selecter'	: $('#userbirthday')					,'classname': 'Birthdate'}
					,{'Selecter'	: $('#userfamilynumber')				,'classname': 'Familiy_Num'}

//カーソルフォーカス
					,{'Selecter'	: $('input').not('[type="radio"]') 		,'classname': 'CursorFocusEvent'}
//マウスオーバー
/*labeltext*/		,{'Selecter'	: $('.labelClass') 										,'classname': 'MouseoverRadioEvent'}
/*td*/				,{'Selecter'	: $('#NT_tableInfo td')			,'classname': 'MouseoverEvent'}
/*td*/				,{'Selecter'	: $('#NT_tableQuestion td')						,'classname': 'MouseoverEvent'}
/*td*/				,{'Selecter'	: $('#NT_tableBukken td')						,'classname': 'MouseoverEvent'}

//バリデーション　RealtimeCheckManager
/*radio,check以外のinput,select*/		,{'Selecter'	: $('input:not(input[type="radio"],input[type="checkbox"]),select') 	,'classname': 'ValidationTextInputAndSelect'}
// /*radioのinput*/							,{'Selecter'	: $('#r1,#r2')						,'classname': 'ValidationRadioInput'}
// /*radio未選択の際に色を付けたい場所*/		,{'Selecter'	: $('table[summary="「住まい探し」の登録情報"] td')		 ,'classname': 'ValidationRadioTd'}
// /*radio未選択の際に色を付けたい場所*/		,{'Selecter'	: $('table[summary="アンケート"] td')					 ,'classname': 'ValidationRadioTd'}
// /*radio未選択の際に色を付けたい場所*/		,{'Selecter'	: $('table[summary="最近見た物件"] td')				 ,'classname': 'ValidationRadioTd'}
// /*checkboxのinput*/							,{'Selecter'	: $('#keikaku_apartment') 											,'classname': 'ValidationCheckboxInput'}
// /*checkboxのinput*/							,{'Selecter'	: $('#keikaku_kodate') 											,'classname': 'ValidationCheckboxInput'}
/*checkboxのinput*/							,{'Selecter'	: $('#r1,#r2,#keikaku_apartment,#keikaku_kodate') 											,'classname': 'ValidationCheckboxInput'}
/*checkboxのinput*/							,{'Selecter'	: $('#apartItems,#kodateItems').find('input[type="checkbox"]') 											,'classname': 'ValidationCheckboxInput'}
// /*checkboxのinput*/							,{'Selecter'	: $('#kodateItems').find('input[type="checkbox"]') 											,'classname': 'ValidationCheckboxInput'}

//『	ご希望の住宅』の例外処理に対応するため、一度必須の対応としている。
/*checkbox未選択の際に色を付けたい場所*/		,{'Selecter'	: $('#NT_tableQuestion td div.lumpMix') 												 				,'classname': 'ValidationCheckboxTd'}//個人情報１

// /*checkbox未選択の際に色を付けたい場所*/		,{'Selecter'	: $('#apartItems')												 				,'classname': 'ValidationCheckboxTd'}//個人情報１
// /*checkbox未選択の際に色を付けたい場所*/		,{'Selecter'	: $('#kodateItems')												 				,'classname': 'ValidationCheckboxTd'}//個人情報１
/*checkbox未選択の際に色を付けたい場所*/		,{'Selecter'	: $('#r1').closest('#NT_tableQuestion td')												 				,'classname': thisObj._isMust[3]?'ValidationCheckboxTd':''}//個人情報１

//バリデーション　exvalidation Plugin
/*必須項目*/		,{'Selecter'	: $('input:not(input[type="radio"],input[type="checkbox"]),select') 			,'classname': 'ValidationTextInputAndSelect'}
/**/			,{'Selecter'	: $('input:not(input[type="radio"],input[type="checkbox"]),select') 			,'classname': 'ValidationTextInputAndSelect'}



				]

			$(thisObj).trigger('onSetClassname');
		}
		,SetMustBranch: function() {
			var thisObj = this;
			for (var i=0,len=7; i<len; i++) {
				thisObj._isMust.push(
					thisObj._formtable
						.filter('[summary="アンケート"]')
						.find('tbody>tr:eq('+i+')>th>span.must')
						.length===1
				)
			}
			thisObj._isMust.splice(1,1);
		}
		,SetValidation: function() {
			var thisObj = this;

	thisObj._Validation = 
					{//プロパティはコメントでも大丈夫
// 					 $('.ValidateClass').attr('id')	: "chkrequired"
/*					*/	 username 			: "chkrequired chkzenkaku chkdepend"
/*					*/	,userfname 			: "chkrequired chkzenkaku chkdepend"
/*					*/	,usernamekana 		: "chkrequired chkkatakana"
/*					*/	,userfnamekana		: "chkrequired chkkatakana"
/*					*/	,userbirthyear		: "chknumonly chkrequired chkyear"
/*					*/	,userbirthmonth		: "chkselect"
/*					*/	,userbirthday		: "chkselect chkretype_date-userbirthmonth chkretype_future-userbirthmonth"
/*					*/	,useremail1			: "chkemailBefore chkhankaku chkrequired"
/*					*/	,useremail2			: "chkemailAfter chkhankaku chkrequired"
/*					*/	,userzipcd1			: "chknumonly chkrequired chk3num"
/*					*/	,userzipcd2			: "chknumonly chkrequired chk4num"
/*					*/	,useraddressstr		: "chkrequired chkdepend"
/*					*/	,useroccupation		: "chkselect0"
/*					*/	,userownmoney		: thisObj._isMust[1]?"chknumonly chkrequired":"chknumonly"
/*					*/	,userhouse			: thisObj._isMust[2]?"chkselect0":""
/*					*/	,userlivetime		: thisObj._isMust[4]?"chkselect0":""
/*					*/	,userfamilynumber	: thisObj._isMust[5]?"chknumonly chkrequired":"chknumonly"
// /*					*/	,keikaku_apartment_yosan			: "chkselect0"
// /*					*/	,keikaku_apartment_menseki			: "chkselect0"
// /*					*/	,keikaku_kodate_yosan			: "chkselect0"
// /*					*/	,keikaku_kodate_menseki			: "chkselect0"
// /*					*/	,keikaku_kodate_tochi			: "chkselect0"
/*					*/	,usertel			: "chknumonly chkrequired chktelmin10"
					};


/*――――――――――――――*/
/*Settings end  */
/*――――――――――――――*/
			$(thisObj).trigger('onSetValidation');
		}
		,setSubmitComment: function() {
			var thisObj = this;
			thisObj._SubmitCommentObj = {  'mailaddr'			: 'メールアドレス'
										 , 'col_4'				: 'お名前(姓)'
										 , 'col_5'				: 'お名前(名)'
										 , 'col_14'				: 'フリガナ(セイ)'
										 , 'col_15'				: 'フリガナ(メイ)'
										 , 'col_16'			: '生年月日（年）'
										 , 'col_16_2'			: '生年月日（月）'
										 , 'col_16_3'			: '生年月日（日）'
										 , 'col_17'				: '年齢'
										 , ''					: '性別'
										 , 'AutoAddressNum1'	: 'ご住所(郵便番号)'
										 , 'AutoAddressNum2'	: 'ご住所(郵便番号)'
										 , 'AutoAddressText1'	: 'ご住所(都道府県)'
										 , 'AutoAddressText2'	: 'ご住所(市区)'
										 , 'AutoAddressText3'	: 'ご住所(町村)'
										 , 'col_23'				: 'ご住所(丁目・番地)'
										 , 'col_13'				: '電話番号'
										 , 'col_13_2'			: '電話番号'
										 , 'col_13_3'			: '電話番号'
										 , 'col_25'				: 'ご家族数'
										 , ''					: '買替の有無'	
										 , 'col_26'				: '現在のお住まい'	
										 , ''					: 'ご希望の間取り'
										 , 'col_28'				: 'ご希望の広さ'
										 , 'col_29'				: 'ご予算'
										 , 'col_30'				: 'ご希望の地域（第１希望）'
										 , ''					: 'クラブオーベル会員規約への同意'
										 , ''					: 'クラブオーベルにおける個人情報のお取扱いについてへの同意'
										 , 'RadioID_1'			: 'このホームページをどこでお知りになりましたか？'
										 , 'RadioID_2'			: 'ご希望の間取り'
										 , 'RadioID_3'			: '資料請求、お問合わせについての個人情報保護規約への同意'
										 , 'RadioID_4'			: 'クラブオーベルへのご入会についての個人情報保護規約への同意'
										}
			$(thisObj).trigger('onSetSubmitComment');
		}
		,getIdname : function() {
			var thisObj = this;
			return thisObj._idname;
		}
		,getClassname : function() {
			var thisObj = this;
			return thisObj._classname;
		}
		,getValidation : function() {
			var thisObj = this;
			return thisObj._Validation;
		}
		,getSubmitComment : function() {
			var thisObj = this;
			return thisObj._SubmitCommentObj;
		}
		,getMustBranch : function() {
			var thisObj = this;
			return thisObj._isMust;
		}
	}
});