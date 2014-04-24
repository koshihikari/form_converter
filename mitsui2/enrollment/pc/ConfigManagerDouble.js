

jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('model.ConfigManagerDouble');
	MYNAMESPACE.model.ConfigManagerDouble = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.model.ConfigManagerDouble.prototype = {
		 _instances			: {}
		 ,_classname		: []
		 ,_idname			: []
		 ,_Validation		: {}
		 ,_SubmitCommentObj	: {}
		 ,_isFinecourt		: null
		,initialize: function() {//初期設定的な
			var thisObj = this;
			_.bindAll(
				this
				,'SetIdname'
				,'SetClassname'
				,'SetValidation'
				,'setSubmitComment'
				,'getIdname'
				,'getClassname'
				,'getValidation'
				,'getSubmitComment'
			);
console.log('initialize//before?'+thisObj._isFinecourt)
			thisObj._isFinecourt = $('#formID>div>div>table[summary="「ファインコート倶楽部」ご希望条件"]').length>0?true:false
console.log('initialize//after?'+thisObj._isFinecourt)
			this._instances = {
			}
			this.SetIdname();
			// this.SetClassname();
			this.SetValidation();
		}

/*――――――――――――――*/
/*Settings Start*/
/*――――――――――――――*/
		,SetIdname: function() {
			var thisObj = this;
console.log('Config Double')
				var temptd = $('#js-checker>tbody>tr:last>td')

				thisObj._idname =	[
					 // {'Selecter'	: $('input[name="col_14"]') 			,'id': 'AutoAddressNum1'}
					//  {'Selecter'	: $('input[name="col_4"]')				,'id': 'kanaEx_firstName'}
					// ,{'Selecter'	: $('input[name="col_5"]')				,'id': 'kanaEx_lastName'}
					// ,{'Selecter'	: $('input[name="col_14"]')				,'id': 'kanaEx_firstNameKatakana'}
					// ,{'Selecter'	: $('input[name="col_15"]')				,'id': 'kanaEx_lastNameKatakana'}
					 // {'Selecter'	: $('input[name="col_19[]"]').eq(0) 	,'id': 'AutoAddressNum1'}
					// ,{'Selecter'	: $('input[name="col_19[]"]').eq(1) 	,'id': 'AutoAddressNum2'}
					// ,{'Selecter'	: $('input[name="col_21"]') 			,'id': 'AutoAddressText1'}
					// ,{'Selecter'	: $('select[name="col_12"]') 			,'id': 'AutoAddressText1'}
					// ,{'Selecter'	: $('input[name="col_21"]') 			,'id': 'AutoAddressText2'}
					// ,{'Selecter'	: $('input[name="col_22"]') 			,'id': 'AutoAddressText3'}
// /*td*/				,{'Selecter'	: formtableradio.eq(0)								,'id': 'RadioID_1'}
					// ,{'Selecter'	: formtableradio.eq(1)						 		,'id': 'RadioID_2'}
					// ,{'Selecter'	: $('form>table>tbody>tr>td>table:eq(6)>tbody>tr:eq(1)') 	,'id': 'RadioID_3'}
					{'Selecter'	: temptd.find('input[name="userofficezipcd1"]') 	,'id': 'userofficezipcd1'}
					,{'Selecter'	: temptd.find('input[name="userofficezipcd2"]') 	,'id': 'userofficezipcd2'}
					,{'Selecter'	: temptd.find('input[name="useroffice"]') 			,'id': 'useroffice'}
				]

			$(thisObj).trigger('onSetIdname');
		}
		,SetClassname: function() {
			var thisObj = this;
				var formtable = $('form>table>tbody>tr>td>table').addClass('formtable')
//ファインコート
				var fineRoomPlan = $('#formID>div>div>table[summary="「ファインコート倶楽部」ご希望条件"]>tbody>tr:eq(0)>td>dl>dd:last')
				var fineArea	 = $('#formID>div>div>table[summary="「ファインコート倶楽部」ご希望条件"]>tbody>tr:eq(2)>td')

				thisObj._classname =	[
//Placeholder
					 {'Selecter'	: $('#username') 						,'classname': 'firstName'}
					,{'Selecter'	: $('#userfname') 						,'classname': 'lastName'}
					,{'Selecter'	: $('#usernamekana') 					,'classname': 'firstNameKatakana'}
					,{'Selecter'	: $('#userfnamekana') 					,'classname': 'lastNameKatakana'}
					,{'Selecter'	: $('#userzipcd1')						,'classname': 'Address_Num_1st'}
					,{'Selecter'	: $('#userzipcd2')						,'classname': 'Address_Num_2nd'}
					,{'Selecter'	: $('#useraddressstr') 					,'classname': 'Address_Text_HouseName'}
					,{'Selecter'	: $('#sendzipcd1')						,'classname': 'Address_Num_1st'}
					,{'Selecter'	: $('#sendzipcd2')						,'classname': 'Address_Num_2nd'}
					,{'Selecter'	: $('#jsmansion') 					,'classname': 'Address_Text_HouseName'}
					,{'Selecter'	: $('#useremail1') 						,'classname': 'Mail_beforeAt'}
					,{'Selecter'	: $('#useremail1_again') 						,'classname': 'Mail_beforeAt'}
					,{'Selecter'	: $('#useremail2') 						,'classname': 'Mail_afterAt'}
					,{'Selecter'	: $('#useremail2_again') 						,'classname': 'Mail_afterAt'}
					,{'Selecter'	: $('#usertel')							,'classname': 'Tel1_nohyphen'}
					,{'Selecter'	: $('#UserMobilelNo')							,'classname': 'Tel1_nohyphen'}
					,{'Selecter'	: $('#userownmoney')					,'classname': 'OwnMoney'}
					,{'Selecter'	: $('#userbirthyear')					,'classname': 'BirthYear'}
					,{'Selecter'	: $('#userbirthmonth')					,'classname': 'BirthMonth'}
					,{'Selecter'	: $('#userbirthday')					,'classname': 'Birthdate'}
					,{'Selecter'	: $('#userfamilynumber')					,'classname': 'Familiy_Num'}
					,{'Selecter'	: $('#userid')					,'classname': 'NT_id'}
					,{'Selecter'	: $('#userpass')					,'classname': 'NT_pass'}
					,{'Selecter'	: $('#userpass2')					,'classname': 'NT_pass2'}

//カーソルフォーカス
					,{'Selecter'	: $('input').not('[type="radio"]') 		,'classname': 'CursorFocusEvent'}
//マウスオーバー
/*labeltext*/		,{'Selecter'	: $('.labelClass') 										,'classname': 'MouseoverRadioEvent'}
/*td*/				,{'Selecter'	: $('table[summary="「住まい探し」の登録情報"] td')			,'classname': 'MouseoverEvent'}
/*td*/				,{'Selecter'	: $('table[summary="アンケート"] td')						,'classname': 'MouseoverEvent'}
/*td*/				,{'Selecter'	: $('table[summary="最近見た物件"] td')						,'classname': 'MouseoverEvent'}

//バリデーション　RealtimeCheckManager
/*radio,check以外のinput,select*/		,{'Selecter'	: $('input:not(input[type="radio"],input[type="checkbox"]),select') 	,'classname': 'ValidationTextInputAndSelect'}
/*radioのinput*/							,{'Selecter'	: $('#r1,#r2')						,'classname': 'ValidationRadioInput'}
/*radioのinput*/							,{'Selecter'	: $('input[name="usersex"]')						,'classname': 'ValidationRadioInput'}
/*radioのinput*/							,{'Selecter'	: $('input[name="kaikaeyotei"]')					,'classname': 'ValidationRadioInput'}
/*radioのinput*/							,{'Selecter'	: $('sendID_1')					,'classname': 'ValidationRadioInput'}
/*radioのinput*/							,{'Selecter'	: $('sendID_2')					,'classname': 'ValidationRadioInput'}
/*radio未選択の際に色を付けたい場所*/		,{'Selecter'	: $('input[name="usersex"]').closest('td')		 ,'classname': 'ValidationRadioTd'}
/*radio未選択の際に色を付けたい場所*/		,{'Selecter'	: $('input[name="kaikaeyotei"]').closest('td')		 ,'classname': 'ValidationRadioTd'}
/*checkboxのinput*/							,{'Selecter'	: $('#keikaku_apartment,#keikaku_kodate') 											,'classname': 'ValidationCheckboxInput'}
/*checkboxのinput*/							,{'Selecter'	: $('#apartItems,#kodateItems').find('input[type="checkbox"]') 											,'classname': 'ValidationCheckboxInput'}
/*checkboxのinput*/							,{'Selecter'	: fineRoomPlan.find('input[type="checkbox"]') 											,'classname': 'ValidationCheckboxInput'}
/*checkboxのinput*/							,{'Selecter'	: fineArea.find('input[type="checkbox"]') 											,'classname': 'ValidationCheckboxInput'}
/*checkbox未選択の際に色を付けたい場所*/		,{'Selecter'	: $('table[summary="アンケート"] td div.lumpMix') 												 				,'classname': 'ValidationCheckboxTd'}//個人情報１
/*checkbox未選択の際に色を付けたい場所*/		,{'Selecter'	: $('table[summary="住まい探し「三井の住まい」ご希望条件"] td div.lumpMix') 												 				,'classname': 'ValidationCheckboxTd'}//個人情報１
/*checkbox未選択の際に色を付けたい場所*/		,{'Selecter'	: $('#r1').closest('table[summary="アンケート"] td')												 				,'classname': 'ValidationCheckboxTd'}//個人情報１

/*ファインコートcheckbox未選択の際に色を付けたい場所*/		,{'Selecter'	: fineRoomPlan	,'classname': 'ValidationCheckboxTd'}
/*ファインコートcheckbox未選択の際に色を付けたい場所*/		,{'Selecter'	: fineRoomPlan	,'classname': 'FineCoatPlanTd'}
/*ファインコートcheckbox未選択の際に色を付けたい場所*/		,{'Selecter'	: fineArea		,'classname': 'ValidationCheckboxTd'}
/*ファインコートcheckbox未選択の際に色を付けたい場所*/		,{'Selecter'	: fineArea		,'classname': 'FineCoatAreaTd'}

//バリデーション　exvalidation Plugin
/*必須項目*/		,{'Selecter'	: $('input:not(input[type="radio"],input[type="checkbox"]),select') 			,'classname': 'ValidationTextInputAndSelect'}
/**/			,{'Selecter'	: $('input:not(input[type="radio"],input[type="checkbox"]),select') 			,'classname': 'ValidationTextInputAndSelect'}


// 三井ここから
			,{'Selecter'	: $('#js-post1>span.inlineB>a') 			,'classname': 'postAddressLink1'}
			,{'Selecter'	: $('#js-address2>div>span.inlineB>a') 			,'classname': 'postAddressLink2'}
// 三井ここまで

				]

			$(thisObj).trigger('onSetClassname');
		}
		,SetValidation: function() {
console.log('SetValidation//'+thisObj._isFinecourt)
			var thisObj = this;

	thisObj._Validation = 
					{//プロパティはコメントでも大丈夫
// 					 $('.ValidateClass').attr('id')	: "chkrequired"
/*					*/	 username 			: "chkrequired chkzenkaku chkdepend"
/*					*/	,userfname 			: "chkrequired chkzenkaku chkdepend"
/*					*/	,usernamekana 		: "chkrequired chkkatakana"
/*					*/	,userfnamekana		: "chkrequired chkkatakana"
/*					*/	,userownmoney		: "chknumonly chkrequired"
/*					*/	,userbirthyear		: "chknumonly chkrequired chkyear"
/*					*/	,userbirthmonth		: "chkselect"
/*					*/	,userbirthday		: "chkselect chkretype_date-userbirthmonth chkretype_future-userbirthmonth"
/*					*/	,useremail1			: "chkemailBefore chkhankaku chkrequired"
/*					*/	,useremail2			: "chkemailAfter chkhankaku chkrequired"
/*					*/	,userzipcd1			: "chknumonly chkrequired chk3num"
/*					*/	,sendzipcd1			: "chknumonly chkrequired chk3num"
/*					*/	,userzipcd2			: "chknumonly chkrequired chk4num"
/*					*/	,sendzipcd2			: "chknumonly chkrequired chk4num"
/*					*/	,useraddressstr		: "chkrequired chkdepend"
/*					*/	,jsmansion			: "chkrequired chkdepend"
/*					*/	,useroccupation		: "chkselect0"
/*					*/	,userhouse			: "chkselect0"
// /*					*/	,keikaku_apartment_yosan			: "chkselect0"
// /*					*/	,keikaku_apartment_menseki			: "chkselect0"
/*	ファインコート	*/	,keikaku_kodate_yosan	: thisObj._isFinecourt?"chkselect0":""
/*	ファインコート	*/	,keikaku_kodate_menseki	: thisObj._isFinecourt?"chkselect0":""
/*	ファインコート	*/	,keikaku_kodate_tochi	: thisObj._isFinecourt?"chkselect0":""
/*					*/	,usertel			: "chknumonly chktelmin10"
/*					*/	,UserMobilelNo		: "chknumonly chktelmin11"



/*					*/	,userfamilynumber	: "chknumonly chkrequired"
/*					*/	,useremail1_again	: "chkretype_email-useremail1 chkrequired"
/*					*/	,useremail2_again	: "chkretype_email-useremail2 chkrequired"
/*					*/	,userpass	: "chknocharUnsco chkrequired chkmin5 chkmax31"
/*					*/	,userpass2	: "chkretype_pass-userpass chkrequired"
/*					*/	,userid	: "chknocharUnsco chkfirstABC chkrequired chkmin4 chkmax16"
/*					*/	,userofficezipcd1	: "chknumonly chk3num"
/*					*/	,userofficezipcd2	: "chknumonly chk4num"
/*					*/	,useroffice	: "chkdepend"
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
	}
});