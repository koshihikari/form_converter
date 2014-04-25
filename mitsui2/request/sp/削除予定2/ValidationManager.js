
/*
 * バリデーション管理クラス
 */
jQuery.noConflict();
jQuery(document).ready(function($){

	MYNAMESPACE.namespace('ValidationManager');
	MYNAMESPACE.ValidationManager = function() {
		this.initialize.apply(this, arguments);
	};
	MYNAMESPACE.ValidationManager.prototype = {
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
				,'checkEmpty'
				,'checkUnexpected'
				,'checkZenkaku'
				,'checkZenkakuKana'
				,'checkNumber'
			);
		}
		/*
		 * 入力された値が全角文字かどうかをチェックすrメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,checkEmpty: function(elem) {
			console.log('checkEmpty');
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
			}
			return retObj;
		}
		/*
		 * 入力された値が全角文字かどうかをチェックすrメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,checkUnexpected: function(elem) {
			console.log('checkUnexpected');
			var thisObj = this;
			var retObj = {
				isCorrect		: true,
				errorMessage	: ''
			}
			if (elem.val().match(/[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼]/)) {
				retObj = {
					isCorrect		: false,
					errorMessage	: '規定文字以外が入力されています。'
				}
			}
			return retObj;
		}
		/*
		 * 入力された値が全角文字かどうかをチェックすrメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,checkZenkaku: function(elem, isRequired) {
			console.log('checkZenkaku');
			var thisObj = this;
			var retObj = {
				isCorrect		: true,
				errorMessage	: ''
			}
			if (isRequired === true) {
				retObj = thisObj.checkEmpty(elem);
			// if (isRequired === true && elem.val() === '') {
			// 	retObj = {
			// 		isCorrect		: false,
			// 		errorMessage	: '必須入力項目です'
			// 	}
			} else if (!elem.val().match(/^(?:[^a-zA-Z0-9@\<\>\;\:\[\]\{\}\|\^\=\/\!\*\"\#\$\+\%\&\'\(\)\,\.\-\_\?\\\s]+)*$/)) {
				retObj = {
					isCorrect		: false,
					errorMessage	: '全角文字で入力してください'
				}
			} else {
				retObj = thisObj.checkUnexpected(elem);
			// } else if (elem.val().match(/[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼]/)) {
			// 	retObj = {
			// 		isCorrect		: false,
			// 		errorMessage	: '規定文字以外が入力されています。'
			// 	}
			}
			return retObj;
		}
		/*
		 * 入力された値が全角カナ文字かどうかをチェックすrメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,checkZenkakuKana: function(elem, isRequired) {
			console.log('checkZenkakuKana');
			var thisObj = this;
			var retObj = {
				isCorrect		: true,
				errorMessage	: ''
			}
			if (isRequired === true) {
				retObj = thisObj.checkEmpty(elem);
			// if (isRequired === true && elem.val() === '') {
			// 	retObj = {
			// 		isCorrect		: false,
			// 		errorMessage	: '必須入力項目です'
			// 	}
			} else if (!elem.val().match(/^[\u30A0-\u30FF]+$/)) {
				retObj = {
					isCorrect		: false,
					errorMessage	: '全角カタカナで入力してください'
				}
			} else {
				retObj = thisObj.checkUnexpected(elem);
			// } else if (elem.val().match(/[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼]/)) {
			// 	retObj = {
			// 		isCorrect		: false,
			// 		errorMessage	: '規定文字以外が入力されています。'
			// 	}
			}
			return retObj;
		}
		/*
		 * 入力された値が郵便番号かどうかをチェックすrメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,checkNumber: function(elem, limit) {
			console.log('checkNumber');
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
			} else {
				if (limit) {
					var re = new RegExp("(^\\d{" + limit + "}$)|^$");
					if (!elem.val().match(re)) {
						retObj = {
							isCorrect		: false,
							errorMessage	: limit + '桁で入力してください'
						}
					}
				}
			}
			return retObj;
		}
	}
});