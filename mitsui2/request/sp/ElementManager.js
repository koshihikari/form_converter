
/*
 * エレメント管理クラス
 */
// jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('ElementManager');
	MYNAMESPACE.ElementManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.ElementManager.prototype = {
		_instances			: {}
		,_timerId			: -1
		,_formElem			: null
		,_addressElem		: null
		,_Validation		: {}

		/*
		 * コンストラクタ
		 * @param	dataManager:dataManager		DataManagerクラスのインスタンス
		 * @return	void
		 */
		,initialize: function() {
			var thisObj = this;
			thisObj._formElem = $('form[name="form1"]');
			thisObj._addressElem = $('#labeladd');
			thisObj._Validation = {
				username 			: "chkrequired chkzenkaku chkdepend"
				,userfname 			: "chkrequired chkzenkaku chkdepend"
				,usernamekana 		: "chkrequired chkkatakana"
				,userfnamekana		: "chkrequired chkkatakana"
				,userzipcd			: "chknumonly chkrequired chk7num"
				,useraddressstr		: "chkrequired chkdepend"
				,usertel			: "chknumonly chkrequired"
				,useremail			: "chkemail2 chkhankaku chkrequired"
				,userbirthyear		: "chknumonly chkrequired chkyear"
				,userbirthmonth		: "chknumonly chkrequired chkmonth"
				,userbirthday		: "chknumonly chkrequired chkday"
				,useroccupation		: "chkselect0"
			}
			_.bindAll(
				this
				,'setAttrOfElement'
				,'checkAddress'
				,'setEnable'
			);
		}

		/*
		 * エレメントのAttributeに値ををセットするメソッド
		 * @param	void
		 * @return	void
		 */
		,setAttrOfElement: function() {
			var thisObj = this;
			thisObj._formElem.find('input, select[name="useroccupation"]')
				.not('input[type="hidden"], input[type="image"], input[type="image"], input[type="checkbox"]')
					.each(function(i) {
						var elem = $(this);
						elem.attr('id', elem.attr('name')).addClass('err blank');
					});
			thisObj._formElem.find('.addressinput').addClass('err blank');
			thisObj._formElem.find('input[type="image"]').attr('onclick', '');
		}

		/*
		 * エレメント成形メソッド
		 * @param	Object:event	Eventオブジェクト
		 * @return	void
		 */
		,checkAddress: function(event) {
			var thisObj = this;
			if (thisObj._addressElem.text() === '選択してください') {
				thisObj._formElem.find('.addressinput').addClass('err blank');
			} else {
				thisObj._formElem.find('.addressinput').removeClass('err blank');
			}
		}
		/*
		 * バリデーションを有効にするメソッド
		 * @param	void
		 * @return	void
		 */
		,setEnable: function() {
			var thisObj = this;
			var validation = thisObj._formElem
				.exValidation({
					rules				: thisObj._Validation
					,errTipPos			: "left"
					,errTipCloseBtn		: false
					,firstValidate		: true
					,stepValidation		: true
					,errFocus			: true
					,errMsgPrefix		: ''
					,scrollToErr		: false
				});
			thisObj._formElem.find('input[type="image"]')
				.on('click', function(event) {
					event.preventDefault();
					event.stopPropagation();
					var count = thisObj._formElem.find('.err').not('input[name="loginID"], input[name="loginPass"], input[type="hidden"], input[type="image"], input[type="checkbox"]').length;
					console.log('count = ' + count);

					if (count === 0) {
						javascript:JumpPage('AC_CONF')
					} else {
						var errorElem = thisObj._formElem.find('.err').not('input[name="loginID"], input[name="loginPass"], input[type="hidden"], input[type="image"], input[type="checkbox"]').eq(0);
						var targetY = errorElem.offset().top - 100;
						errorElem.blur();
						$('body,html').animate({scrollTop: targetY}, 200);
					}
					return false;
				});
			thisObj._timerId = setInterval(thisObj.checkAddress, 1000);
		}
	}
});