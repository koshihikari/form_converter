
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
			// var thisObj = this;
			// _.bindAll(
			// 	this
			// 	,'setValidation'
			// );
		}

		/*
		 * バリデーションをセットするメソッド
		 * @param	inputElementData:Object		入力項目エレメントのデータオブジェクト(データ形式はDataElement.jsを参照)
		 * @return	void
		 */
		,setValidation: function(inputElementData) {
			// var thisObj = this;
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
	}
});