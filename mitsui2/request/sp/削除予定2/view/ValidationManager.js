
/*
 * バリデーション管理クラス
 */
jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('view.ValidationManager');
	MYNAMESPACE.view.ValidationManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.view.ValidationManager.prototype = {
		_instances			: {}

		/*
		 * コンストラクタ
		 * @param	void
		 * @return	void
		 */
		,initialize: function() {
			console.log('ValidationManager');
			var thisObj = this;
			_.bindAll(
				this
				,'setValidation'
			);
		}

		/*
		 * バリデーションをセットするメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,setValidation: function(inputElementData) {
			var thisObj = this;

			// var rules = {};
			// for (var i=0,len=inputElementData.length; i<len; i++) {
			// 	var id = inputElementData[i]['elementToAdd']['id'];
			// 	var validateRule = '';
			// 	var elem = $('#' + id);
			// 	console.log('validateRule = ' + inputElementData[i]['validateRule']);
			// 	if (inputElementData[i]['validateRule']) {
			// 		validateRule = inputElementData[i]['validateRule'];
			// 	}
			// 	console.log('data = ' + elem.attr('data-required'));
			// 	if (elem.attr('data-required') === '1') {
			// 		validateRule += ' chkrequired';
			// 	}
			// 	rules[id] = validateRule;
			// }
			// console.log(rules);

			// var validation = $("form")
			// 	.exValidation({
			// 		firstValidate: true
			// 		,rules: rules
			// 		,stepValidation: false
			// 		,errFocus:true
			// 		,errMsgPrefix:''
			// 		,scrollToErr:false
			// 	});
		}
		/*
		 * 入力された値が全角文字かどうかをチェックすrメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,checkZenkaku: function(elem) {
			var thisObj = this;
			var retObj = {
				isCorrect		: true,
				errorMessage	: ''
			}
			if (elem.val() === '') {
				retObj = {
					isCorrect		: false,
					errorMessage	: '必須入力項目です'
				}
			} else if (!elem.val().match(/^(?:[^a-zA-Z0-9@\<\>\;\:\[\]\{\}\|\^\=\/\!\*\"\#\$\+\%\&\'\(\)\,\.\-\_\?\\\s]+)*$/)) {
				retObj = {
					isCorrect		: false,
					errorMessage	: '全角文字で入力してください'
				}
			} else if (elem.val().match(/[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼]/)) {
				retObj = {
					isCorrect		: false,
					errorMessage	: '規定文字以外が入力されています。'
				}
			}
			return retObj;
		}
		/*
		 * 入力された値が全角カナ文字かどうかをチェックすrメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,checkZenkakuKana: function(elem) {
			var thisObj = this;
			var retObj = {
				isCorrect		: true,
				errorMessage	: ''
			}
			if (elem.val() === '') {
				retObj = {
					isCorrect		: false,
					errorMessage	: '必須入力項目です'
				}
			} else if (!elem.val().match(/^[\u30A0-\u30FF]+$/)) {
				retObj = {
					isCorrect		: false,
					errorMessage	: '全角カタカナで入力してください'
				}
			} else if (elem.val().match(/[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼]/)) {
				retObj = {
					isCorrect		: false,
					errorMessage	: '規定文字以外が入力されています。'
				}
			}
			return retObj;
		}
		/*
		 * 入力された値が郵便番号かどうかをチェックすrメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,checkZipcode: function(elem) {
			var thisObj = this;
			var retObj = {
				isCorrect		: true,
				errorMessage	: ''
			}
			if (
				(elem.val() === '' && Number(elem.val()) === 0 && !isNaN(Number(elem.val()))) ||
				isNaN(Number(elem.val()))
			) {
				retObj = {
					isCorrect		: false,
					errorMessage	: '半角数字で入力してください'
				}
			} else if (!elem.val().match(/(^\d{7}$)|^$/)) {
				retObj = {
					isCorrect		: false,
					errorMessage	: '７桁で入力してください'
				}
			}
			return retObj;
		}
		/*
		 * バリデーションをセットするメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,doValidation: function(elem) {
			var thisObj = this;
			var resultObj = {};
			if (elem.attr('type') === 'text') {
				if (elem.attr('name') === 'username' || elem.attr('name') === 'userfname') {	// 名前
					resultObj = thisObj.checkZenkaku(elem);
				} else if (elem.attr('name') === 'usernamekana' || elem.attr('name') === 'userfnamekana') {	// フリガナ
					resultObj = thisObj.checkZenkakuKana(elem);
				}
			} else if (elem.attr('type') === 'tel') {
			} else if (elem.attr('type') === 'email') {
			} else if (elem.attr('type') === 'number') {
				if (elem.attr('name') === 'userzipcd') {	// 郵便番号
					resultObj = thisObj.checkZipcode(elem);
				}
			} else {

			}
			elem.closest('section').find('.error-message').remove();
			if (resultObj['isCorrect'] === true) {
				elem.removeClass('error');
			} else {
				elem.addClass('error').closest('section').append($('<p>').addClass('error-message').html(resultObj['errorMessage']));
			}
		}
		/*
		 * バリデーションをセットするメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,setEvent: function(isEvent) {
			var thisObj = this;
			var formElem = $('form[name="form1"]');
			formElem.find('input[type="text"], input[type="tel"], input[type="email"], input[type="number"], select.full').each(function(i) {
				var elem = $(this);
				elem
					// .on('focus', function(event) {
					// 	thisObj.doValidation(elem);
					// })
					.on('blur', function(event) {
						thisObj.doValidation(elem);
					});
			});
		}
	}
});